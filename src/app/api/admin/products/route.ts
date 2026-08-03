import { NextResponse } from "next/server";
import { requireAdminRequest } from "@/lib/admin/apiAuth";
import { createProduct, getSubcategoryProductCount, listAllProducts, searchProducts } from "@/services/admin/productService";
import { logActivity } from "@/lib/admin/activityLogger";
import { revalidatePathsAndTags } from "@/lib/admin/cacheRevalidation";

export async function GET(req: Request) {
  const auth = await requireAdminRequest(req);
  if (auth.response) return auth.response;

  const { searchParams } = new URL(req.url);

  if (searchParams.get("action") === "count" && searchParams.get("subcategory")) {
    const subcategory = searchParams.get("subcategory")!;
    const count = await getSubcategoryProductCount(subcategory);
    return NextResponse.json({ success: true, subcategory, count });
  }

  const hasAdvancedParams = [
    "search",
    "category",
    "subcategory",
    "brand",
    "active",
    "featured",
    "sortBy",
    "page",
    "limit",
  ].some((key) => searchParams.has(key));

  if (!hasAdvancedParams || !process.env.MONGODB_URI) {
    return NextResponse.json({ success: true, data: await listAllProducts() });
  }

  const result = await searchProducts({
    search: searchParams.get("search") || undefined,
    category: searchParams.get("category") || undefined,
    subcategory: searchParams.get("subcategory") || undefined,
    brand: searchParams.get("brand") || undefined,
    active: searchParams.get("active") || undefined,
    featured: searchParams.get("featured") || undefined,
    sortBy: searchParams.get("sortBy") || undefined,
    page: Number(searchParams.get("page")) || 1,
    limit: Number(searchParams.get("limit")) || 20,
  });

  return NextResponse.json({ success: true, data: result.data, pagination: result.pagination });
}

export async function POST(req: Request) {
  const auth = await requireAdminRequest(req);
  if (auth.response) return auth.response;

  try {
    const data = await req.json();
    const status = data.status ?? (data.active === false ? "HIDDEN" : "PUBLISHED");
    const product = await createProduct({
      title: data.title ?? data.name,
      slug: data.slug,
      description: data.description ?? "",
      shortDescription: data.shortDescription,
      overview: data.overview,
      brandingCapabilities: data.brandingCapabilities,
      showBrandingCapabilities: data.showBrandingCapabilities,
      category: data.category,
      subcategory: data.subcategory ?? data.category,
      brand: data.brand,
      featuredImage: data.featuredImage || "",
      galleryImages: data.galleryImages || [],
      cloudinaryPublicId: data.cloudinaryPublicId,
      galleryPublicIds: data.galleryPublicIds || [],
      images: data.galleryImages || [],
      features: data.features ?? [],
      specifications: data.specifications ?? {},
      tags: data.tags ?? [],
      moq: Number(data.moq ?? 1),
      featured: Boolean(data.featured),
      active: status !== "HIDDEN",
      status,
      // @ts-ignore
      budget: data.budget,
      // @ts-ignore
      displayName: data.displayName,
      // @ts-ignore
      applyToSubcategory: data.applyToSubcategory ?? data.applyOverviewToSubcategory,
      // @ts-ignore
      applyOverviewToSubcategory: data.applyOverviewToSubcategory ?? data.applyToSubcategory,
      // @ts-ignore
      applyBrandingVisibilityToSubcategory: data.applyBrandingVisibilityToSubcategory,
    });


    if (product) {
      await logActivity({
        action: "CREATE_PRODUCT",
        entityType: "Product",
        entityId: product.id,
        entityName: product.title,
        newValue: product,
        req,
      });

      if (product.cloudinaryPublicId || product.galleryPublicIds?.length) {
        await logActivity({
          action: "IMAGE_UPLOADED",
          entityType: "Product",
          entityId: product.id,
          entityName: product.title,
          newValue: {
            cloudinaryPublicId: product.cloudinaryPublicId,
            galleryPublicIds: product.galleryPublicIds,
            featuredImage: product.featuredImage,
          },
          req,
        });
      }

      await revalidatePathsAndTags();
    }

    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
