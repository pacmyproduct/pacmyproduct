"use client";

import { getCanonicalCategorySlug, getCanonicalSubcategorySlug } from "./slugResolver";
import { getCategoryDefaultOverview } from "./catalogDefaults";

export interface TaxonomyCategory {
  id?: string;
  name?: string;
  slug?: string;
  overview?: string;
}

export interface TaxonomySubcategory {
  id?: string;
  name?: string;
  slug?: string;
  category?: string;
  overview?: string;
}

// In-memory client-side taxonomy cache
let categoriesCache: TaxonomyCategory[] | null = null;
let subcategoriesCache: TaxonomySubcategory[] | null = null;
let fetchPromise: Promise<{ categories: TaxonomyCategory[]; subcategories: TaxonomySubcategory[] }> | null = null;

export async function fetchLiveTaxonomy(forceRefresh: boolean = false) {
  if (!forceRefresh && categoriesCache && subcategoriesCache) {
    return { categories: categoriesCache, subcategories: subcategoriesCache };
  }

  if (fetchPromise && !forceRefresh) {
    return fetchPromise;
  }

  fetchPromise = (async () => {
    try {
      const [catRes, subRes] = await Promise.all([
        fetch("/api/catalog/categories", { cache: "no-store" }),
        fetch("/api/catalog/subcategories", { cache: "no-store" }),
      ]);
      const catData = await catRes.json();
      const subData = await subRes.json();

      categoriesCache = Array.isArray(catData.data) ? catData.data : [];
      subcategoriesCache = Array.isArray(subData.data) ? subData.data : [];
      return { categories: categoriesCache || [], subcategories: subcategoriesCache || [] };
    } catch (err) {
      console.error("Failed to fetch live taxonomy:", err);
      return { categories: categoriesCache || [], subcategories: subcategoriesCache || [] };
    } finally {
      fetchPromise = null;
    }
  })();

  return fetchPromise;
}

export function invalidateLiveTaxonomyCache() {
  categoriesCache = null;
  subcategoriesCache = null;
  fetchPromise = null;
}

/**
 * Live Runtime Resolver for Product Overview
 * Resolution Priority:
 * 1. Product Custom Overview (product.overview / product.rawOverview)
 * 2. Live Subcategory Overview Lookup (subcategory.overview)
 * 3. Live Category Overview Lookup (category.overview)
 * 4. System Default Overview (getCategoryDefaultOverview)
 */
export function resolveLiveOverview(
  product?: { overview?: string; rawOverview?: string; category?: string; subcategory?: string } | null,
  categories: TaxonomyCategory[] = [],
  subcategories: TaxonomySubcategory[] = []
): string {
  if (!product) return getCategoryDefaultOverview();

  // 1. Custom Product Overview Override
  const customOverview = (product.rawOverview || product.overview || "").trim();
  if (customOverview.length > 0) {
    return customOverview;
  }

  const reqSub = (product.subcategory || "").toLowerCase().trim();
  const reqCat = (product.category || "").toLowerCase().trim();
  const canonSub = getCanonicalSubcategorySlug(reqSub);
  const canonCat = getCanonicalCategorySlug(reqCat);

  // 2. Live Subcategory Overview Lookup
  if (reqSub && subcategories.length > 0) {
    const matchedSub = subcategories.find((s) => {
      const sSlug = (s.slug || "").toLowerCase().trim();
      return (
        sSlug === reqSub ||
        (canonSub && getCanonicalSubcategorySlug(sSlug) === canonSub)
      );
    });

    if (matchedSub && matchedSub.overview && matchedSub.overview.trim().length > 0) {
      return matchedSub.overview.trim();
    }
  }

  // 3. Live Category Overview Lookup
  if (reqCat && categories.length > 0) {
    const matchedCat = categories.find((c) => {
      const cSlug = (c.slug || "").toLowerCase().trim();
      return (
        cSlug === reqCat ||
        (canonCat && getCanonicalCategorySlug(cSlug) === canonCat)
      );
    });

    if (matchedCat && matchedCat.overview && matchedCat.overview.trim().length > 0) {
      return matchedCat.overview.trim();
    }
  }

  // 4. System Default Overview
  return getCategoryDefaultOverview(product.category, product.subcategory);
}
