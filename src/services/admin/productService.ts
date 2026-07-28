import { createRecord, deleteRecord, listRecords, updateRecord } from "@/repositories/adminRepository";
import type { ProductRecord } from "@/lib/admin/types";
import { realCatalogImage } from "@/lib/catalogImages";
import { localCatalogImage } from "@/lib/localCatalogImages";
import { connectMongoDB } from "@/lib/mongodb";
import { destroyCloudinaryAssets, uniquePublicIds } from "@/lib/admin/cloudinaryLifecycle";
import { ProductModel } from "@/models/cmsModels";
import { resolveProductImage } from "@/lib/imageResolver";
import { getCanonicalCategorySlug, getCanonicalSubcategorySlug, getCategorySlugAliases, getSubcategorySlugAliases, cleanProductTitle, getCanonicalCategoryName, isPaperWeightProduct } from "@/lib/slugResolver";
import { listAllCategories, listAllSubcategories } from "@/services/admin/taxonomyService";
import { resolveProductOverview, resolveProductBranding } from "@/lib/catalogDefaults";

export function listProducts(): ProductRecord[] {
  return listRecords("products").filter((product) => product.active).map(p => {
    let category = getCanonicalCategorySlug(p.category) || p.category || "";
    let subcategory = getCanonicalSubcategorySlug(p.subcategory) || p.subcategory || "";
    if (subcategory === "paper-weight") {
      category = "table-top";
    } else if (subcategory === "table-top" || category === "table-top") {
      if (isPaperWeightProduct(p)) {
        subcategory = "paper-weight";
        category = "table-top";
      }
    }
    return {
      ...p,
      title: cleanProductTitle(p.title),
      category,
      subcategory,
    };
  });
}

export async function listAllProducts(): Promise<ProductRecord[]> {
  if (!process.env.MONGODB_URI) return listProducts();
  await connectMongoDB();
  const products = await ProductModel.find({ isDeleted: { $ne: true } }).sort({ createdAt: -1 }).lean<any[]>();
  return products.map(mapMongoProduct);
}

export async function searchProducts(options: {
  search?: string;
  category?: string;
  subcategory?: string;
  brand?: string;
  active?: string;
  featured?: string;
  sortBy?: string;
  page?: number;
  limit?: number;
}) {
  await connectMongoDB();

  const page = Math.max(1, Number(options.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(options.limit) || 20));
  const query: Record<string, any> = { isDeleted: { $ne: true } };

  const canonSub = options.subcategory ? getCanonicalSubcategorySlug(options.subcategory) : undefined;
  const canonCat = options.category ? getCanonicalCategorySlug(options.category) : undefined;

  if (options.search) {
    const cleanSearch = options.search.toLowerCase().replace(/[^a-z0-9]/g, "");
    const isPaperWeightQuery = cleanSearch.includes("paperweight") || cleanSearch.includes("paper-weight");
    const isPenQuery = cleanSearch.includes("pen") || cleanSearch === "pens" || cleanSearch === "pen";
    const isCapQuery = cleanSearch.includes("cap") || cleanSearch === "caps" || cleanSearch === "cap";
    const isTableTopQuery = !isPaperWeightQuery && (cleanSearch.includes("table") || cleanSearch.includes("mousepad") || cleanSearch.includes("organiser") || cleanSearch.includes("organizer") || cleanSearch.includes("tablemat") || cleanSearch.includes("tabletop"));
    const isDiaryQuery = cleanSearch.includes("diar") || cleanSearch.includes("notebook") || cleanSearch.includes("diary") || cleanSearch.includes("diaries");
    const isTrolleyQuery = cleanSearch.includes("trolley") || cleanSearch.includes("canvastrolley");
    const isHouseholdQuery = cleanSearch.includes("household") || cleanSearch === "decorative" || cleanSearch === "decoratives";
    const isEidQuery = cleanSearch === "eid" || cleanSearch === "eidkits" || cleanSearch === "eidhampers" || cleanSearch === "eidhamper" || cleanSearch === "eidkit";
    const isChristmasQuery = cleanSearch === "christmas" || cleanSearch === "christmaskits" || cleanSearch === "christmashampers" || cleanSearch === "christmashamper" || cleanSearch === "christmaskit";

    if (isPaperWeightQuery) {
      query.$or = [
        { $text: { $search: options.search } },
        { subcategory: { $in: getSubcategorySlugAliases("paper-weight") } },
        { name: { $regex: /paper\s*weight/i } },
        { title: { $regex: /paper\s*weight/i } },
        { displayName: { $regex: /paper\s*weight/i } }
      ];
    } else if (isPenQuery) {
      query.$or = [
        { $text: { $search: options.search } },
        { category: { $in: getCategorySlugAliases("pens") } },
        { subcategory: { $in: getSubcategorySlugAliases("pens") } }
      ];
    } else if (isCapQuery) {
      query.$or = [
        { $text: { $search: options.search } },
        { category: { $in: getCategorySlugAliases("caps") } },
        { subcategory: { $in: getSubcategorySlugAliases("caps") } }
      ];
    } else if (isTableTopQuery) {
      query.$or = [
        { $text: { $search: options.search } },
        { category: { $in: getCategorySlugAliases("table-top") } },
        { subcategory: { $in: getSubcategorySlugAliases("table-top") } }
      ];
    } else if (isDiaryQuery) {
      query.$or = [
        { $text: { $search: options.search } },
        { category: { $in: getCategorySlugAliases("diaries-notebooks") } },
        { subcategory: { $in: getSubcategorySlugAliases("diaries-notebooks") } }
      ];
    } else if (isTrolleyQuery) {
      query.$or = [
        { $text: { $search: options.search } },
        { subcategory: { $in: getSubcategorySlugAliases("trolley-bags") } }
      ];
    } else if (isHouseholdQuery) {
      query.$or = [
        { $text: { $search: options.search } },
        { category: { $in: getCategorySlugAliases("household-utilities") } },
        { subcategory: { $in: getSubcategorySlugAliases("household-utilities") } }
      ];
    } else if (isEidQuery) {
      query.$or = [
        { $text: { $search: options.search } },
        { subcategory: { $in: getSubcategorySlugAliases("eid-kits") } }
      ];
    } else if (isChristmasQuery) {
      query.$or = [
        { $text: { $search: options.search } },
        { subcategory: { $in: getSubcategorySlugAliases("christmas-kits") } }
      ];
    } else {
      query.$text = { $search: options.search };
    }
  }

  if (canonSub === "paper-weight") {
    query.$or = [
      { subcategory: { $in: getSubcategorySlugAliases("paper-weight") } },
      {
        $and: [
          { $or: [{ category: { $in: getCategorySlugAliases("table-top") } }, { subcategory: { $in: getSubcategorySlugAliases("table-top") } }] },
          {
            $or: [
              { name: { $regex: /paper\s*weight/i } },
              { title: { $regex: /paper\s*weight/i } },
              { displayName: { $regex: /paper\s*weight/i } },
              { tags: { $in: [/paper\s*weight/i] } }
            ]
          }
        ]
      }
    ];
  } else if (options.subcategory && options.subcategory !== "all") {
    query.subcategory = { $in: getSubcategorySlugAliases(options.subcategory) };
  } else if (options.category && options.category !== "all") {
    const categoryFilters = getCategorySlugAliases(options.category);
    query.$and = [{ $or: [{ category: { $in: categoryFilters } }, { subcategory: { $in: categoryFilters } }] }];
  }
  if (options.brand) query.brand = options.brand;
  if (options.active === "true") query.status = { $ne: "HIDDEN" };
  if (options.active === "false") query.status = "HIDDEN";
  if (options.featured === "true") query.featured = true;
  if (options.featured === "false") query.featured = { $ne: true };

  const sortMap: Record<string, Record<string, 1 | -1>> = {
    name: { title: 1, name: 1 },
    oldest: { createdAt: 1 },
    moq: { moq: 1 },
    price: { price: 1 },
    order: { order: 1, createdAt: -1 },
    newest: { createdAt: -1 },
  };
  const sort = sortMap[options.sortBy || "newest"] || sortMap.newest;
  const projection = options.search ? { score: { $meta: "textScore" } } : undefined;
  const mongoSort: any = options.search && !options.sortBy ? { score: { $meta: "textScore" }, createdAt: -1 } : sort;

  const rawProducts = await ProductModel.find(query, projection)
    .sort(mongoSort)
    .lean<any[]>();

  let mappedProducts = rawProducts.map(mapMongoProduct);

  if (canonSub && canonSub !== "all") {
    mappedProducts = mappedProducts.filter((p) => p.subcategory === canonSub);
  }

  const total = mappedProducts.length;
  const paginated = mappedProducts.slice((page - 1) * limit, page * limit);

  return {
    data: paginated,
    pagination: {
      page,
      limit,
      total,
      pages: Math.max(1, Math.ceil(total / limit)),
    },
  };
}

export async function searchCatalogProducts(options: {
  search?: string;
  category?: string;
  subcategory?: string;
  brand?: string;
  featured?: string;
  sortBy?: string;
  page?: number;
  limit?: number;
  budget?: string;
}) {
  await connectMongoDB();

  const page = Math.max(1, Number(options.page) || 1);
  const limit = Math.min(1000, Math.max(1, Number(options.limit) || 1000));
  const query: Record<string, any> = { status: "PUBLISHED", isDeleted: { $ne: true } };
  
  const canonSub = options.subcategory ? getCanonicalSubcategorySlug(options.subcategory) : undefined;

  if (options.search) {
    const cleanSearch = options.search.toLowerCase().replace(/[^a-z0-9]/g, "");
    const isPaperWeightQuery = cleanSearch.includes("paperweight") || cleanSearch.includes("paper-weight");
    const isPenQuery = cleanSearch.includes("pen") || cleanSearch === "pens" || cleanSearch === "pen";
    const isCapQuery = cleanSearch.includes("cap") || cleanSearch === "caps" || cleanSearch === "cap";
    const isTableTopQuery = !isPaperWeightQuery && (cleanSearch.includes("table") || cleanSearch.includes("mousepad") || cleanSearch.includes("organiser") || cleanSearch.includes("organizer") || cleanSearch.includes("tablemat") || cleanSearch.includes("tabletop"));
    const isDiaryQuery = cleanSearch.includes("diar") || cleanSearch.includes("notebook") || cleanSearch.includes("diary") || cleanSearch.includes("diaries");
    const isTrolleyQuery = cleanSearch.includes("trolley") || cleanSearch.includes("canvastrolley");
    const isHouseholdQuery = cleanSearch.includes("household") || cleanSearch === "decorative" || cleanSearch === "decoratives";
    const isEidQuery = cleanSearch === "eid" || cleanSearch === "eidkits" || cleanSearch === "eidhampers" || cleanSearch === "eidhamper" || cleanSearch === "eidkit";
    const isChristmasQuery = cleanSearch === "christmas" || cleanSearch === "christmaskits" || cleanSearch === "christmashampers" || cleanSearch === "christmashamper" || cleanSearch === "christmaskit";

    if (isPaperWeightQuery) {
      query.$or = [
        { $text: { $search: options.search } },
        { subcategory: { $in: getSubcategorySlugAliases("paper-weight") } },
        { name: { $regex: /paper\s*weight/i } },
        { title: { $regex: /paper\s*weight/i } },
        { displayName: { $regex: /paper\s*weight/i } }
      ];
    } else if (isPenQuery) {
      query.$or = [
        { $text: { $search: options.search } },
        { category: { $in: getCategorySlugAliases("pens") } },
        { subcategory: { $in: getSubcategorySlugAliases("pens") } }
      ];
    } else if (isCapQuery) {
      query.$or = [
        { $text: { $search: options.search } },
        { category: { $in: getCategorySlugAliases("caps") } },
        { subcategory: { $in: getSubcategorySlugAliases("caps") } }
      ];
    } else if (isTableTopQuery) {
      query.$or = [
        { $text: { $search: options.search } },
        { category: { $in: getCategorySlugAliases("table-top") } },
        { subcategory: { $in: getSubcategorySlugAliases("table-top") } }
      ];
    } else if (isDiaryQuery) {
      query.$or = [
        { $text: { $search: options.search } },
        { category: { $in: getCategorySlugAliases("diaries-notebooks") } },
        { subcategory: { $in: getSubcategorySlugAliases("diaries-notebooks") } }
      ];
    } else if (isTrolleyQuery) {
      query.$or = [
        { $text: { $search: options.search } },
        { subcategory: { $in: getSubcategorySlugAliases("trolley-bags") } }
      ];
    } else if (isHouseholdQuery) {
      query.$or = [
        { $text: { $search: options.search } },
        { category: { $in: getCategorySlugAliases("household-utilities") } },
        { subcategory: { $in: getSubcategorySlugAliases("household-utilities") } }
      ];
    } else if (isEidQuery) {
      query.$or = [
        { $text: { $search: options.search } },
        { subcategory: { $in: getSubcategorySlugAliases("eid-kits") } }
      ];
    } else if (isChristmasQuery) {
      query.$or = [
        { $text: { $search: options.search } },
        { subcategory: { $in: getSubcategorySlugAliases("christmas-kits") } }
      ];
    } else {
      query.$text = { $search: options.search };
    }
  }
  
  if (canonSub === "paper-weight") {
    query.$or = [
      { subcategory: { $in: getSubcategorySlugAliases("paper-weight") } },
      {
        $and: [
          { $or: [{ category: { $in: getCategorySlugAliases("table-top") } }, { subcategory: { $in: getSubcategorySlugAliases("table-top") } }] },
          {
            $or: [
              { name: { $regex: /paper\s*weight/i } },
              { title: { $regex: /paper\s*weight/i } },
              { displayName: { $regex: /paper\s*weight/i } },
              { tags: { $in: [/paper\s*weight/i] } }
            ]
          }
        ]
      }
    ];
  } else if (options.subcategory && options.subcategory !== "all") {
    query.subcategory = { $in: getSubcategorySlugAliases(options.subcategory) };
  } else if (options.category && options.category !== "all") {
    const categoryFilters = getCategorySlugAliases(options.category);
    query.$and = [{ $or: [{ category: { $in: categoryFilters } }, { subcategory: { $in: categoryFilters } }] }];
  }
  if (options.brand) query.brand = options.brand;
  if (options.featured === "true") query.featured = true;
  if (options.featured === "false") query.featured = { $ne: true };

  if (options.budget && options.budget !== "all") {
    const norm = options.budget.toLowerCase().trim();
    let possibleBudgets = [options.budget];
    if (norm.includes("under 250") || norm.includes("0-250")) {
      possibleBudgets = ["Under ₹250", "₹0–250", "0-250", "₹0–₹250"];
    } else if (norm.includes("250 - 500") || norm.includes("250-500")) {
      possibleBudgets = ["₹250 - ₹500", "₹250–500", "250-500", "₹250–₹500"];
    } else if (norm.includes("500 - 1000") || norm.includes("500-1000")) {
      possibleBudgets = ["₹500 - ₹1000", "₹500–1000", "500-1000", "₹500–₹1000"];
    } else if (norm.includes("1000 - 2500") || norm.includes("1000-2500")) {
      possibleBudgets = ["₹1000 - ₹2500", "₹1000–2500", "1000-2500", "₹1000–₹2500"];
    } else if (norm.includes("2500-5000") || norm.includes("2500 - 5000")) {
      possibleBudgets = ["₹2500+", "₹2500–5000", "2500-5000", "₹2500–₹5000"];
    } else if (norm.includes("5000") || norm.includes("5000+")) {
      possibleBudgets = ["₹2500+", "₹5000+", "5000+", "₹5000+ Premium"];
    }
    query["specifications.budget"] = { $in: possibleBudgets };
  }

  const sortMap: Record<string, Record<string, 1 | -1>> = {
    name: { title: 1, name: 1 },
    oldest: { createdAt: 1 },
    moq: { moq: 1 },
    price: { price: 1 },
    order: { order: 1, createdAt: -1 },
    newest: { createdAt: -1 },
  };
  const projection = options.search ? { score: { $meta: "textScore" } } : undefined;
  const sort: any = options.search && !options.sortBy ? { score: { $meta: "textScore" }, createdAt: -1 } : sortMap[options.sortBy || "order"] || sortMap.order;

  const rawProducts = await ProductModel.find(query, projection)
    .sort(sort)
    .lean<any[]>();

  let mappedProducts = rawProducts.map(mapMongoProduct);

  if (canonSub && canonSub !== "all") {
    mappedProducts = mappedProducts.filter((p) => p.subcategory === canonSub);
  }

  const total = mappedProducts.length;
  const paginated = mappedProducts.slice((page - 1) * limit, page * limit);

  return {
    data: paginated,
    pagination: {
      page,
      limit,
      total,
      pages: Math.max(1, Math.ceil(total / limit)),
    },
  };
}

export function getProductBySlug(slug: string): ProductRecord | null {
  const product = listRecords("products").find((product) => product.slug === slug) ?? null;
  if (!product) return null;
  let category = getCanonicalCategorySlug(product.category) || product.category || "";
  let subcategory = getCanonicalSubcategorySlug(product.subcategory) || product.subcategory || "";
  if (subcategory === "paper-weight") {
    category = "table-top";
  } else if (subcategory === "table-top" || category === "table-top") {
    if (isPaperWeightProduct(product)) {
      subcategory = "paper-weight";
      category = "table-top";
    }
  }
  return {
    ...product,
    title: cleanProductTitle(product.title),
    category,
    subcategory,
  };
}

const normalizeSpecifications = (specifications: any) => {
  if (!specifications) return {};
  if (specifications instanceof Map) return Object.fromEntries(specifications);
  if (Array.isArray(specifications)) return Object.fromEntries(specifications);
  return specifications;
};

const normalizeForLookup = (str: string) => {
  if (!str) return "";
  const words = str.toLowerCase().split(/[^a-z0-9]+/);
  const filtered = words.filter((w) => w && w !== "pmp");
  const unique = Array.from(new Set(filtered));
  unique.sort();
  return unique.join("");
};

const mapMongoProduct = (product: any): ProductRecord => {
  const title = product.name || product.title || "";
  let category = getCanonicalCategorySlug(product.category) || product.category || "";
  let subcategory = getCanonicalSubcategorySlug(product.subcategory) || product.subcategory || "";
  
  if (subcategory === "paper-weight") {
    category = "table-top";
  } else if (subcategory === "table-top" || category === "table-top") {
    if (isPaperWeightProduct(product)) {
      subcategory = "paper-weight";
      category = "table-top";
    }
  }
  
  // Resolve primary image via database-first centralized resolver
  const matchedImage = resolveProductImage({
    title,
    name: product.name,
    featuredImage: product.featuredImage,
    featuredImageUrl: product.featuredImageUrl,
    image: product.image,
    images: product.images,
    galleryImages: product.galleryImages,
    category,
    subcategory,
    slug: product.slug
  });

  const sourceImages = (product.galleryImages?.length
    ? product.galleryImages
    : product.images?.length
      ? product.images
      : product.featuredImage
        ? [product.featuredImage]
        : []
  ).filter(Boolean);
  const images = [matchedImage, ...sourceImages].filter((image, index, self) => image && self.indexOf(image) === index);
  const finalFeaturedImage = matchedImage || images[0] || "";

  const rawOverview = typeof product.overview === "string" ? product.overview : "";
  const rawBrandingCapabilities = Array.isArray(product.brandingCapabilities) ? product.brandingCapabilities : [];
  const showBrandingCapabilities = product.showBrandingCapabilities !== false;

  const overview = resolveProductOverview({ overview: rawOverview, category, subcategory });
  const brandingCapabilities = resolveProductBranding({ brandingCapabilities: rawBrandingCapabilities, showBrandingCapabilities, category, subcategory });

  return {
    id: String(product._id),
    title: cleanProductTitle(title),
    slug: product.slug,
    description: product.description || "",
    shortDescription: product.shortDescription,
    overview,
    brandingCapabilities,
    showBrandingCapabilities,
    rawOverview,
    rawBrandingCapabilities,
    category,
    subcategory,
    brand: product.brand,
    featuredImage: finalFeaturedImage,
    galleryImages: images,
    cloudinaryPublicId: product.cloudinaryPublicId,
    galleryPublicIds: product.galleryPublicIds || [],
    images,
    features: product.features || [],
    specifications: normalizeSpecifications(product.specifications),
    tags: product.tags || [],
    moq: product.moq || 1,
    price: product.price,
    featured: Boolean(product.featured),
    active: product.status !== "HIDDEN",
    status: product.status,
    order: product.order || 0,
    budget: product.specifications instanceof Map 
      ? product.specifications.get("budget") 
      : product.specifications?.budget || "",
    displayName: product.specifications instanceof Map 
      ? product.specifications.get("displayName") 
      : product.specifications?.displayName || "",
    createdAt: product.createdAt?.toISOString?.() || new Date().toISOString(),
    updatedAt: product.updatedAt?.toISOString?.() || new Date().toISOString(),
  };
};

export async function getCatalogProducts(): Promise<ProductRecord[]> {
  if (!process.env.MONGODB_URI) return listProducts();
  await connectMongoDB();
  const products = await ProductModel.find({ status: "PUBLISHED", isDeleted: { $ne: true } }).sort({ order: 1, createdAt: -1 }).lean<any[]>();
  return products.map(mapMongoProduct);
}

export async function getCatalogProductBySlug(slug: string): Promise<ProductRecord | null> {
  if (!process.env.MONGODB_URI) return getProductBySlug(slug);
  await connectMongoDB();
  
  // 1. Try exact match
  let product = await ProductModel.findOne({ slug, status: "PUBLISHED", isDeleted: { $ne: true } }).lean<any>();
  if (product) return mapMongoProduct(product);

  // 2. Try match with "pmp-" prefix adjustment if missing or added
  const normalizedSlug = slug.startsWith("pmp-") ? slug : `pmp-${slug}`;
  product = await ProductModel.findOne({ slug: normalizedSlug, status: "PUBLISHED", isDeleted: { $ne: true } }).lean<any>();
  if (product) return mapMongoProduct(product);

  // 3. Try fallback match by normalized word composition (handles duplicate slug words, etc.)
  const reqNorm = normalizeForLookup(slug);
  const allProducts = await ProductModel.find({ status: "PUBLISHED", isDeleted: { $ne: true } }).lean<any[]>();
  const match = allProducts.find((p) => normalizeForLookup(p.slug) === reqNorm);
  if (match) return mapMongoProduct(match);

  // 4. Try legacy JSON list lookup fallback
  return getProductBySlug(slug);
}

export async function createProduct(input: Omit<ProductRecord, "id" | "createdAt" | "updatedAt">) {
  const canonicalCat = getCanonicalCategorySlug(input.category);
  const canonicalSub = getCanonicalSubcategorySlug(input.subcategory ?? input.category);

  // 1. Validate Category
  const categories = await listAllCategories();
  const catExists = categories.some((c) => c.slug === canonicalCat);
  if (!catExists) {
    throw new Error("Category validation failed.");
  }

  // 2. Validate Subcategory
  const subcategories = await listAllSubcategories();
  const subRecord = subcategories.find((s) => s.slug === canonicalSub);
  if (!subRecord) {
    throw new Error("Subcategory not found.");
  }

  // 3. Validate Parent Category Match
  if (subRecord.category !== canonicalCat) {
    const catName = getCanonicalCategoryName(canonicalCat) || canonicalCat;
    throw new Error(`Selected subcategory does not belong to ${catName}.`);
  }

  // 4. Validate Duplicate Slug
  if (input.slug) {
    let dup = null;
    if (process.env.MONGODB_URI) {
      dup = await ProductModel.findOne({ slug: input.slug, isDeleted: { $ne: true } }).lean();
    } else {
      dup = listRecords("products").find((p) => p.slug === input.slug);
    }
    if (dup) {
      throw new Error("Duplicate product slug.");
    }
  }

  if (process.env.MONGODB_URI) {
    await connectMongoDB();
    const images = input.galleryImages?.length ? input.galleryImages : input.images ?? [];
    const galleryPublicIds = input.galleryPublicIds?.length
      ? input.galleryPublicIds
      : input.cloudinaryPublicId
        ? [input.cloudinaryPublicId]
        : [];
    const specs = { ...(input.specifications || {}) };
    // @ts-ignore
    if (input.budget) {
      // @ts-ignore
      specs.budget = input.budget;
    }
    // @ts-ignore
    if (input.displayName) {
      // @ts-ignore
      specs.displayName = input.displayName;
    }

    const product = await ProductModel.create({
      name: input.title,
      title: input.title,
      slug: input.slug,
      description: input.description,
      shortDescription: input.shortDescription,
      overview: input.overview || "",
      brandingCapabilities: Array.isArray(input.brandingCapabilities) ? input.brandingCapabilities : [],
      showBrandingCapabilities: input.showBrandingCapabilities !== false,
      category: canonicalCat,
      subcategory: canonicalSub,
      brand: input.brand,
      featuredImage: input.featuredImage || images[0],
      galleryImages: images,
      cloudinaryPublicId: input.cloudinaryPublicId || galleryPublicIds[0],
      galleryPublicIds,
      images,
      features: input.features,
      specifications: specs,
      tags: input.tags,
      moq: input.moq,
      price: input.price,
      featured: input.featured,
      status: input.active ? "PUBLISHED" : "HIDDEN",
      active: input.active,
      order: input.order || 0,
    });
    return mapMongoProduct(product.toObject());
  }

  return createRecord("products", {
    ...input,
    category: canonicalCat,
    subcategory: canonicalSub,
  });
}

export async function updateProduct(id: string, patch: Partial<ProductRecord> & { status?: string }) {
  const canonicalCat = patch.category ? getCanonicalCategorySlug(patch.category) : undefined;
  const canonicalSub = patch.subcategory ? getCanonicalSubcategorySlug(patch.subcategory) : undefined;

  let existingProduct: any = null;
  if (process.env.MONGODB_URI) {
    existingProduct = await ProductModel.findById(id).lean<any>();
  } else {
    existingProduct = listRecords("products").find((p) => p.id === id);
  }
  if (!existingProduct) {
    throw new Error("Product not found");
  }

  const finalCat = canonicalCat ?? existingProduct.category;
  const finalSub = canonicalSub ?? existingProduct.subcategory;

  if (canonicalCat !== undefined) {
    const categories = await listAllCategories();
    const catExists = categories.some((c) => c.slug === canonicalCat);
    if (!catExists) {
      throw new Error("Category validation failed.");
    }
  }

  if (canonicalSub !== undefined) {
    const subcategories = await listAllSubcategories();
    const subRecord = subcategories.find((s) => s.slug === canonicalSub);
    if (!subRecord) {
      throw new Error("Subcategory not found.");
    }
    if (subRecord.category !== finalCat) {
      const catName = getCanonicalCategoryName(finalCat) || finalCat;
      throw new Error(`Selected subcategory does not belong to ${catName}.`);
    }
  } else if (canonicalCat !== undefined) {
    const subcategories = await listAllSubcategories();
    const subRecord = subcategories.find((s) => s.slug === finalSub);
    if (subRecord && subRecord.category !== finalCat) {
      const catName = getCanonicalCategoryName(finalCat) || finalCat;
      throw new Error(`Selected subcategory does not belong to ${catName}.`);
    }
  }

  if (patch.slug && patch.slug !== existingProduct.slug) {
    let dup = null;
    if (process.env.MONGODB_URI) {
      dup = await ProductModel.findOne({ slug: patch.slug, _id: { $ne: id }, isDeleted: { $ne: true } }).lean();
    } else {
      dup = listRecords("products").find((p) => p.slug === patch.slug && p.id !== id);
    }
    if (dup) {
      throw new Error("Duplicate product slug.");
    }
  }

  if (process.env.MONGODB_URI) {
    await connectMongoDB();
    const images = patch.galleryImages?.length ? patch.galleryImages : patch.images;
    const galleryPublicIds = patch.galleryPublicIds?.length
      ? patch.galleryPublicIds
      : patch.cloudinaryPublicId
        ? [patch.cloudinaryPublicId]
        : undefined;
    let specs = patch.specifications;
    // @ts-ignore
    if (patch.budget !== undefined || patch.displayName !== undefined) {
      const existingSpecs = normalizeSpecifications(existingProduct?.specifications) || {};
      specs = {
        ...existingSpecs,
        ...(specs || {}),
      };
      // @ts-ignore
      if (patch.budget !== undefined) specs.budget = patch.budget;
      // @ts-ignore
      if (patch.displayName !== undefined) specs.displayName = patch.displayName;
    }

    const update: Record<string, unknown> = {
      ...patch,
      category: canonicalCat ?? patch.category,
      subcategory: canonicalSub ?? patch.subcategory,
      name: patch.title,
      featuredImage: patch.featuredImage || images?.[0],
      galleryImages: images,
      cloudinaryPublicId: patch.cloudinaryPublicId || galleryPublicIds?.[0],
      galleryPublicIds,
      status: patch.status ?? (patch.active === false ? "HIDDEN" : patch.active === true ? "PUBLISHED" : undefined),
      specifications: specs,
    };

    Object.keys(update).forEach((key) => update[key] === undefined && delete update[key]);
    const product = await ProductModel.findByIdAndUpdate(id, { $set: update }, { new: true }).lean<any>();
    return product ? mapMongoProduct(product) : null;
  }

  return updateRecord("products", id, {
    ...patch,
    category: canonicalCat ?? patch.category,
    subcategory: canonicalSub ?? patch.subcategory,
  });
}

export async function deleteProduct(id: string, permanent: boolean = false, adminId?: string) {
  if (process.env.MONGODB_URI) {
    await connectMongoDB();
    if (permanent) {
      const product = await ProductModel.findById(id).lean<any>();
      if (product) {
        await destroyCloudinaryAssets(uniquePublicIds([product.cloudinaryPublicId, ...(product.galleryPublicIds || [])]));
      }
      const result = await ProductModel.deleteOne({ _id: id });
      return result.deletedCount > 0;
    } else {
      const result = await ProductModel.findByIdAndUpdate(id, {
        $set: {
          isDeleted: true,
          deletedAt: new Date(),
          deletedBy: adminId,
        },
      });
      return !!result;
    }
  }

  return deleteRecord("products", id);
}
