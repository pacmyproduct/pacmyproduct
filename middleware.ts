import { NextRequest, NextResponse } from "next/server";

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((o) => o.trim()).filter(Boolean)
  : [
      "https://pacmyproduct.com",
      "https://www.pacmyproduct.com",
      "http://localhost:3000",
      "http://localhost:3001",
    ];

function getCorsHeaders(origin: string | null) {
  const isAllowed = origin && allowedOrigins.includes(origin);
  const allowedOrigin = isAllowed ? origin : allowedOrigins[0];
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
  };
}

const base64UrlToBytes = (value: string) => {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  const binary = atob(base64);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
};

const base64UrlEncode = (bytes: Uint8Array) =>
  btoa(String.fromCharCode(...bytes)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");

async function getJwtPayload(token: string) {
  try {
    const [header, payload, signature] = token.split(".");
    if (!header || !payload || !signature) return null;

    const data = new TextEncoder().encode(`${header}.${payload}`);
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(process.env.JWT_SECRET || "development-access-secret"),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const expected = new Uint8Array(await crypto.subtle.sign("HMAC", key, data));
    if (base64UrlEncode(expected) !== signature) return null;

    const decodedPayload = JSON.parse(new TextDecoder().decode(base64UrlToBytes(payload))) as {
      sub: string;
      role: string;
      email?: string;
      exp?: number;
    };
    if (decodedPayload.exp && decodedPayload.exp * 1000 <= Date.now()) return null;
    return decodedPayload;
  } catch {
    return null;
  }
}

type AdminRole = "SUPER_ADMIN" | "ADMIN" | "EDITOR" | "VIEWER";

const canAccessAdminApi = (role: string, pathname: string, method: string) => {
  if (role === "SUPER_ADMIN") return true;

  const isRead = method === "GET";
  const isPermanentDelete = method === "DELETE" && new URLSearchParams(pathname.split("?")[1] || "").get("permanent") === "true";

  if (role === "VIEWER") {
    return isRead && !pathname.startsWith("/api/admin/activity-logs");
  }

  if (role === "EDITOR") {
    if (pathname.startsWith("/api/admin/activity-logs") || pathname.startsWith("/api/admin/trash") || pathname.startsWith("/api/admin/restore")) {
      return false;
    }
    if (pathname.startsWith("/api/admin/orders") || pathname.startsWith("/api/admin/enquiries")) {
      return isRead;
    }
    if (pathname.startsWith("/api/admin/quotes")) {
      return isRead || method === "PATCH";
    }
    if (isPermanentDelete) return false;
    return true;
  }

  if (role === "ADMIN") {
    if (pathname.startsWith("/api/admin/users") || pathname.startsWith("/api/admin/settings")) {
      return false;
    }
    if (isPermanentDelete) return false;
    return true;
  }

  return false;
};

const canAccessAdminPage = (role: string, pathname: string) => {
  if (role === "SUPER_ADMIN") return true;
  if (role === "ADMIN") return !pathname.startsWith("/87564/admin/users") && !pathname.startsWith("/87564/admin/settings");
  if (role === "EDITOR") {
    return ![
      "/87564/admin/activity-logs",
      "/87564/admin/trash",
      "/87564/admin/users",
      "/87564/admin/settings",
    ].some((path) => pathname.startsWith(path));
  }
  if (role === "VIEWER") {
    return ![
      "/87564/admin/activity-logs",
      "/87564/admin/trash",
      "/87564/admin/users",
      "/87564/admin/settings",
    ].some((path) => pathname.startsWith(path));
  }
  return false;
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const origin = req.headers.get("origin");

  // Redirect legacy /admin paths to new secure admin path
  if (pathname === "/admin" || pathname === "/admin/login") {
    return NextResponse.redirect(new URL("/87564/admin/login", req.url));
  }
  if (pathname.startsWith("/admin/")) {
    const subPath = pathname.replace(/^\/admin/, "/87564/admin");
    return NextResponse.redirect(new URL(subPath, req.url));
  }

  // Preflight OPTIONS handling for API routes
  if (pathname.startsWith("/api/") && req.method === "OPTIONS") {
    const headers = getCorsHeaders(origin);
    return new NextResponse(null, { status: 204, headers });
  }

  // Helper to attach CORS headers to API responses
  const applyCorsHeaders = (res: NextResponse) => {
    if (pathname.startsWith("/api/")) {
      const cors = getCorsHeaders(origin);
      Object.entries(cors).forEach(([key, value]) => {
        res.headers.set(key, value);
      });
    }
    return res;
  };

  // 1. API Route Protection
  if (pathname.startsWith("/api/admin")) {
    if (
      pathname === "/api/admin/auth/login" ||
      pathname === "/api/admin/auth/refresh"
    ) {
      return applyCorsHeaders(NextResponse.next());
    }

    const token = req.cookies.get("pmp_admin_access")?.value;
    if (!token) {
      return applyCorsHeaders(NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 }));
    }

    const payload = await getJwtPayload(token);
    if (!payload) {
      return applyCorsHeaders(NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 }));
    }

    const role = payload.role as AdminRole;
    if (!canAccessAdminApi(role, req.nextUrl.pathname + req.nextUrl.search, req.method)) {
      return applyCorsHeaders(NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 }));
    }

    return applyCorsHeaders(NextResponse.next());
  }

  // Apply CORS to non-admin API routes
  if (pathname.startsWith("/api/")) {
    return applyCorsHeaders(NextResponse.next());
  }

  // 2. Admin UI Page Protection
  if (pathname.startsWith("/87564/admin") && pathname !== "/87564/admin/login") {
    const token = req.cookies.get("pmp_admin_access")?.value;
    const loginUrl = new URL("/87564/admin/login", req.url);

    if (!token) {
      return NextResponse.redirect(loginUrl);
    }

    const payload = await getJwtPayload(token);
    if (!payload) {
      return NextResponse.redirect(loginUrl);
    }

    const role = payload.role as AdminRole;
    if (!canAccessAdminPage(role, pathname)) {
      return new NextResponse("Unauthorized: role cannot access this admin screen", { status: 403 });
    }

    if (pathname === "/87564/admin") {
      return NextResponse.redirect(new URL("/87564/admin/dashboard", req.url));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/87564/admin/:path*", "/api/:path*"],
};
