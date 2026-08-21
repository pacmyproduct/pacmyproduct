"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useParams, useRouter, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Filter, Search, SlidersHorizontal, ChevronRight, 
  Home, RefreshCw, X, ShoppingBag, MapPin, ArrowRight, Loader2
} from "lucide-react";
import { ProductCard } from "@/components/ui/ProductCard";
import { Pagination } from "@/components/ui/Pagination";
import { getBudgetsConfig } from "@/app/87564/admin/budgets/actions";
import type { BudgetConfigItem } from "@/services/admin/budgetCollectionService";
import { normalizeBudgetRange, budgetsMatch } from "@/app/gifts-by-budget/page";
import { BackgroundGradient } from "@/components/layout/BackgroundGradient";
import { clientCache } from "@/lib/clientCache";
import { useNavigationCache } from "@/context/NavigationCacheContext";

interface CatalogProduct {
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  category: string;
  subcategory: string;
  brand?: string;
  tags?: string[];
  images: string[];
  moq: number;
  features: string[];
  displayName?: string;
  overview?: string;
  rawOverview?: string;
  brandingCapabilities?: string[];
  showBrandingCapabilities?: boolean;
  budget?: string;
  price?: number | string;
}

interface CatalogNode {
  name: string;
  slug: string;
}

const ITEMS_PER_PAGE = 12;

const SLUG_TO_BUDGET_ID: Record<string, string> = {
  "under-250": "0-250",
  "0-250": "0-250",
  "0": "0-250",
  "250-500": "250-500",
  "1": "250-500",
  "500-1000": "500-1000",
  "2": "500-1000",
  "1000-2500": "1000-2500",
  "3": "1000-2500",
  "2500-5000": "2500-5000",
  "4": "2500-5000",
  "5000-plus": "5000",
  "5000": "5000",
  "5": "5000",
};

const BUDGET_ID_TO_SLUG: Record<string, string> = {
  "0-250": "under-250",
  "250-500": "250-500",
  "500-1000": "500-1000",
  "1000-2500": "1000-2500",
  "2500-5000": "2500-5000",
  "5000": "5000-plus",
};

function BudgetCollectionContent() {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { getPageState, setPageState, getScrollPosition, setScrollPosition } = useNavigationCache();
  const rawSlug = (params?.slug as string) || "";
  
  const budgetId = SLUG_TO_BUDGET_ID[rawSlug] || rawSlug;

  const cacheKey = useMemo(() => {
    const paramsStr = searchParams?.toString();
    return pathname + (paramsStr ? `?${paramsStr}` : "");
  }, [pathname, searchParams]);

  // Read config from global clientCache to hydrate instantly if visited
  const [budgets, setBudgets] = useState<BudgetConfigItem[]>(() => {
    if (typeof window !== "undefined") {
      return clientCache.get<BudgetConfigItem[]>("budgets-config") ?? [];
    }
    return [];
  });

  const [products, setProducts] = useState<CatalogProduct[]>(() => {
    if (typeof window !== "undefined") {
      return clientCache.get<CatalogProduct[]>(`budget-products-${budgetId}`) ?? [];
    }
    return [];
  });

  const [categories, setCategories] = useState<CatalogNode[]>(() => {
    if (typeof window !== "undefined") {
      return clientCache.get<CatalogNode[]>(`budget-categories-${budgetId}`) ?? [{ name: "All Categories", slug: "all" }];
    }
    return [{ name: "All Categories", slug: "all" }];
  });
  
  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const saved = getPageState<any>(cacheKey);
      return saved?.selectedCategory ?? "all";
    }
    return "all";
  });

  const [searchQuery, setSearchQuery] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const saved = getPageState<any>(cacheKey);
      return saved?.searchQuery ?? "";
    }
    return "";
  });

  const [currentPage, setCurrentPage] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const saved = getPageState<any>(cacheKey);
      return saved?.currentPage ?? 1;
    }
    return 1;
  });

  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window !== "undefined") {
      return !clientCache.has(`budget-products-${budgetId}`);
    }
    return true;
  });

  const [lightboxImageUrl, setLightboxImageUrl] = useState<string | null>(null);

  // Active selected budget configuration metadata
  const selectedBudget = useMemo(() => {
    return budgets.find((b) => b.id === budgetId);
  }, [budgets, budgetId]);

  // Save state (filters & page index) into context on changes
  useEffect(() => {
    setPageState(cacheKey, {
      selectedCategory,
      searchQuery,
      currentPage,
    });
  }, [cacheKey, selectedCategory, searchQuery, currentPage, setPageState]);

  // Track window scroll and save to state context
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(cacheKey, window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [cacheKey, setScrollPosition]);

  // Restore scroll Y position once rendering is complete
  useEffect(() => {
    if (!isLoading) {
      const savedScroll = getScrollPosition(cacheKey);
      if (savedScroll > 0) {
        const timer = setTimeout(() => {
          window.scrollTo({ top: savedScroll, behavior: "instant" });
        }, 80);
        return () => clearTimeout(timer);
      }
    }
  }, [cacheKey, isLoading, getScrollPosition]);

  useEffect(() => {
    let active = true;

    async function loadData() {
      const hasCached = clientCache.has(`budget-products-${budgetId}`);
      if (!hasCached) {
        setIsLoading(true);
      }

      try {
        // Execute server action with cache (promise de-duplicated)
        const configRes = await clientCache.executeWithCache<BudgetConfigItem[]>(
          "budgets-config",
          () => getBudgetsConfig(),
          true // Always fetch latest in background
        );

        if (!active) return;

        if (JSON.stringify(configRes) !== JSON.stringify(budgets)) {
          setBudgets(configRes);
        }

        const currentBudget = configRes.find((b) => b.id === budgetId);
        const rawProducts = currentBudget?.products || [];
        
        const allProducts: CatalogProduct[] = rawProducts.map((p) => ({
          title: p.displayName,
          slug: p.slug,
          description: p.description,
          shortDescription: p.description,
          category: p.category,
          subcategory: p.category,
          brand: p.brand || "PacMyProduct",
          tags: p.tags || [],
          images: p.gallery && p.gallery.length > 0 ? p.gallery : [p.featuredImage],
          moq: p.moq,
          features: p.brandingOptions || [],
          displayName: p.displayName,
          budget: currentBudget?.value || "",
          price: p.price || ""
        }));

        if (JSON.stringify(allProducts) !== JSON.stringify(products)) {
          setProducts(allProducts);
          clientCache.set(`budget-products-${budgetId}`, allProducts);
        }

        const uniqueCategories = Array.from(new Set(allProducts.map((p) => p.category))).filter(Boolean);
        const finalCategories = [
          { name: "All Categories", slug: "all" },
          ...uniqueCategories.map((catName) => ({
            name: catName,
            slug: catName.toLowerCase().replace(/[^a-z0-9]+/g, "-")
          }))
        ];

        if (JSON.stringify(finalCategories) !== JSON.stringify(categories)) {
          setCategories(finalCategories);
          clientCache.set(`budget-categories-${budgetId}`, finalCategories);
        }
      } catch (err) {
        console.error("Failed to load budget collection data in background:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
    return () => {
      active = false;
    };
  }, [budgetId]);

  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setCurrentPage(1);
  };

  // Filter products by active budget range & chosen category/search criteria
  const filteredProducts = useMemo(() => {
    if (!selectedBudget) return [];

    return products.filter((product) => {
      // Filter by category
      const productCatSlug = product.category.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const matchesCategory = 
        selectedCategory === "all" || 
        productCatSlug === selectedCategory;

      // Search Query
      const matchesSearchText = (text: string, q: string) => {
        if (!text || !q) return false;
        return text.toLowerCase().replace(/[^a-z0-9]/g, "").includes(q.toLowerCase().replace(/[^a-z0-9]/g, ""));
      };

      const normalizedSearchQuery = searchQuery.toLowerCase().replace(/[^a-z0-9]/g, "");
      const matchesSearch = 
        !searchQuery ||
        (normalizedSearchQuery === "household" || normalizedSearchQuery === "householdutilities" || normalizedSearchQuery === "householdutility"
          ? (product.category === "household-utilities" || product.subcategory === "household-utilities" || product.title.toLowerCase().includes("household"))
          : (normalizedSearchQuery === "eidkits" || normalizedSearchQuery === "eidkit" || normalizedSearchQuery === "eidhampers" || normalizedSearchQuery === "eidhamper" || normalizedSearchQuery === "eid"
            ? (product.subcategory === "eid-kits" || product.title.toLowerCase().includes("eid"))
            : (normalizedSearchQuery === "christmaskits" || normalizedSearchQuery === "christmaskit" || normalizedSearchQuery === "christmashampers" || normalizedSearchQuery === "christmashamper" || normalizedSearchQuery === "christmas"
              ? (product.subcategory === "christmas-kits" || product.title.toLowerCase().includes("christmas"))
              : (
                matchesSearchText(product.category, searchQuery) ||
                (product.subcategory && matchesSearchText(product.subcategory, searchQuery)) ||
                (product.brand && matchesSearchText(product.brand, searchQuery)) ||
                (product.tags && product.tags.some(tag => matchesSearchText(tag, searchQuery))) ||
                (product.description && matchesSearchText(product.description, searchQuery)) ||
                matchesSearchText(product.title, searchQuery)
              )
            )
          )
        );

      return matchesCategory && matchesSearch;
    });
  }, [products, selectedBudget, selectedCategory, searchQuery]);

  // Interleave collection image showcase cards into the product listing grid
  const gridItems = useMemo(() => {
    const items: Array<
      | { type: "product"; data: CatalogProduct }
      | { type: "collectionImage"; data: { url: string; publicId: string; title?: string; description?: string } }
    > = [];

    const collectionImages = selectedBudget?.collectionImages || [];
    const prods = filteredProducts;

    let imgIdx = 0;
    prods.forEach((prod, idx) => {
      items.push({ type: "product", data: prod });
      // Interleave a promotional card after every 3 products
      if ((idx + 1) % 3 === 0 && imgIdx < collectionImages.length) {
        items.push({ type: "collectionImage", data: collectionImages[imgIdx] });
        imgIdx++;
      }
    });

    // Append any remaining collection marketing cards
    while (imgIdx < collectionImages.length) {
      items.push({ type: "collectionImage", data: collectionImages[imgIdx] });
      imgIdx++;
    }

    return items;
  }, [filteredProducts, selectedBudget]);

  // Paginated elements
  const totalPages = Math.ceil(gridItems.length / ITEMS_PER_PAGE);
  const paginatedItems = useMemo(() => {
    return gridItems.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );
  }, [gridItems, currentPage]);

  if (!isLoading && !selectedBudget) {
    return (
      <div className="pt-32 pb-24 text-center bg-[#FAF9F6] min-h-screen">
        <div className="max-w-md mx-auto p-8 bg-white border border-[#F5C2C2] rounded-3xl shadow-sm">
          <X className="w-12 h-12 text-[#D32F2F] mx-auto mb-4" />
          <h2 className="text-xl font-black text-gray-950 mb-2">Budget Range Not Found</h2>
          <p className="text-sm text-gray-500 font-semibold mb-6">
            The budget collection path you are trying to visit is not valid or active.
          </p>
          <Link href="/gifts-by-budget" className="inline-flex items-center gap-1 text-xs font-black uppercase text-[#D32F2F] hover:underline">
            View All Budgets <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 bg-[#FAF9F6] min-h-screen relative overflow-hidden">
      <BackgroundGradient className="opacity-10 blur-[130px]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-6">
          <Link href="/" className="hover:text-[#D32F2F] flex items-center gap-1 transition-colors">
            <Home className="w-3.5 h-3.5" /> Home
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-300" />
          <Link href="/gifts-by-budget" className="hover:text-[#D32F2F] transition-colors">
            Gifts By Budget
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-300" />
          <span className="text-gray-900">{selectedBudget?.title || "Collection"}</span>
        </nav>

        {/* Page Header */}
        <div className="mb-12 text-left">
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Gifts under <span className="text-[#D32F2F]">{selectedBudget?.title || "Budget"}</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6B63] mt-2 max-w-xl leading-relaxed font-semibold">
            {selectedBudget?.description || "Explore cost-effective B2B giveaways, custom team hampers, and corporate goodies."}
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white border border-[#F5C2C2] p-4 rounded-2xl shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search in this budget collection..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-[#F5C2C2] focus:outline-none focus:border-[#D32F2F] focus:ring-1 focus:ring-[#D32F2F]/20 text-sm font-medium"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-150"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <div className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider">
              {isLoading ? "Searching items..." : `Showing ${gridItems.length} catalogue items`}
            </div>

            <button
              onClick={() => setShowMobileFilters(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-[#FAF9F6] hover:bg-[#F8F7F3] text-[#6B6B63] rounded-xl border border-[#F5C2C2] text-xs font-bold transition-all"
            >
              <Filter className="w-3.5 h-3.5 text-[#D32F2F]" /> Filters
            </button>
          </div>
        </div>

        {/* Main Section */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Sidebar: Filters */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6 sticky top-28">
            
            {/* Category Filters */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm text-left">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
                <h3 className="text-[11px] font-extrabold text-[#2B2B2B] uppercase tracking-widest flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#D32F2F]" /> Categories
                </h3>
                {(selectedCategory !== "all" || searchQuery !== "") && (
                  <button 
                    onClick={handleResetFilters}
                    className="text-[9px] font-extrabold text-[#D32F2F] hover:underline uppercase tracking-wider flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" /> Reset
                  </button>
                )}
              </div>
              <div className="space-y-1 max-h-[360px] overflow-y-auto pr-1">
                {categories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => handleCategoryChange(cat.slug)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-between ${
                      selectedCategory === cat.slug
                        ? "bg-[#F8F7F3] text-[#D32F2F]"
                        : "text-[#6B6B63] hover:bg-[#FAF9F6] hover:text-[#2B2B2B]"
                    }`}
                  >
                    <span>{cat.name}</span>
                    {selectedCategory === cat.slug && <span className="w-1.5 h-1.5 bg-[#D32F2F] rounded-full" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Tier Collection Switcher Links */}
            <div className="bg-white border border-[#F5C2C2] rounded-2xl p-6 shadow-sm text-left">
              <h3 className="text-[11px] font-extrabold text-[#2B2B2B] uppercase tracking-widest pb-4 border-b border-[#F5C2C2] mb-4 flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#D32F2F]" /> Price Collections
              </h3>
              <div className="space-y-1">
                <Link
                  href="/products"
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold text-[#6B6B63] hover:bg-[#FAF9F6] hover:text-[#2B2B2B] transition-all block"
                >
                  All Budgets (General Catalogue)
                </Link>
                {budgets.filter((b) => b.active).map((b) => {
                  const isActive = b.id === budgetId;
                  const s = BUDGET_ID_TO_SLUG[b.id] || b.id;
                  return (
                    <Link
                      key={b.id}
                      href={`/gifts-by-budget/${s}`}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-between ${
                        isActive
                          ? "bg-[#F8F7F3] text-[#D32F2F]"
                          : "text-[#6B6B63] hover:bg-[#FAF9F6] hover:text-[#2B2B2B]"
                      }`}
                    >
                      <span>{b.title}</span>
                      {isActive && <span className="w-1.5 h-1.5 bg-[#D32F2F] rounded-full" />}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Logistics widget */}
            <div className="bg-[#2B2B2B] border border-white/10 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden text-left">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#D32F2F]/10 rounded-full blur-xl pointer-events-none" />
              <MapPin className="w-6 h-6 text-[#EF5350] mb-3" />
              <h4 className="font-extrabold text-xs uppercase tracking-widest text-gray-400 mb-1">Logistics Trust</h4>
              <h5 className="font-black text-sm mb-1.5 text-white">Insured B2B Shipping & Setup</h5>
              <p className="text-[11px] leading-relaxed text-gray-300 font-semibold">
                We manage bulk transport and split-shipment dispatch to guarantee safe delivery directly to your offices or employee doors nationwide.
              </p>
            </div>
          </aside>

          {/* Right Side: Grid */}
          <div className="lg:col-span-9 space-y-8">
            {isLoading ? (
              <div className="flex h-60 items-center justify-center rounded-2xl border border-[#F5C2C2] bg-white">
                <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-[#5F6752]">
                  <Loader2 className="h-5 w-5 animate-spin text-[#D32F2F]" />
                  Loading items...
                </div>
              </div>
            ) : (
              <div>
                {gridItems.length > 0 ? (
                  <div className="space-y-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                      {paginatedItems.map((item, idx) => {
                        if (item.type === "product") {
                          const p = item.data;
                          return (
                            <ProductCard
                              key={p.title}
                              slug={p.slug}
                              title={p.title}
                              description={p.description}
                              imageUrl={p.images?.[0] || "/images/joiningkit.png"}
                              images={p.images || []}
                              price={p.price ? typeof p.price === "number" ? `Starts from ₹${p.price}` : p.price : "Custom Quote"}
                              index={idx}
                              category={p.category}
                              subcategory={p.subcategory}
                              moq={p.moq}
                              isProduct={true}
                              displayName={p.displayName}
                              overview={p.overview}
                              rawOverview={p.rawOverview}
                              brandingCapabilities={p.brandingCapabilities}
                              showBrandingCapabilities={p.showBrandingCapabilities}
                              className="glass-card hover:shadow-xl hover:shadow-gray-200/40 border-gray-200/60"
                            />
                          );
                        } else {
                          const img = item.data;
                          return (
                            <motion.div
                              key={img.url || idx}
                              whileHover={{ y: -4 }}
                              onClick={() => setLightboxImageUrl(img.url)}
                              className="group relative rounded-3xl overflow-hidden border border-[#F5C2C2] bg-white shadow-sm hover:shadow-md transition-all flex flex-col h-full text-left cursor-pointer"
                            >
                              <div className="aspect-square relative w-full overflow-hidden bg-gray-50 border-b border-gray-100">
                                <Image
                                  src={encodeURI(img.url)}
                                  alt={img.title || "Showcase"}
                                  fill
                                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                              </div>
                              <div className="p-5 flex-grow flex flex-col justify-between">
                                <div>
                                  <span className="text-[10px] font-black uppercase tracking-wider text-[#EF5350] bg-[#FFFDF8] border border-[#F5C2C2] px-2.5 py-0.5 rounded-full inline-block mb-3">
                                    {selectedBudget?.title || "Budget"} Showcase
                                  </span>
                                  <h3 className="text-base font-extrabold text-gray-900 group-hover:text-[#D32F2F] transition-colors leading-tight mb-2">
                                    {img.title || selectedBudget?.description || "Collection Showcase"}
                                  </h3>
                                  {img.description && (
                                    <p className="text-xs text-gray-500 font-semibold line-clamp-2 leading-relaxed">
                                      {img.description}
                                    </p>
                                  )}
                                </div>
                                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                                  <span className="inline-flex items-center gap-1.5 text-xs font-black text-[#D32F2F] uppercase tracking-wider">
                                    Explore Collection <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                                  </span>
                                </div>
                              </div>
                            </motion.div>
                          );
                        }
                      })}
                    </div>

                    {/* Pagination */}
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      totalResults={filteredProducts.length}
                      onPageChange={(pageNum) => {
                        setCurrentPage(pageNum);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    />
                  </div>
                ) : (
                  <div className="text-center py-20 bg-white border border-gray-200 rounded-3xl p-8 max-w-md mx-auto shadow-sm">
                    <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h4 className="text-lg font-bold text-gray-800 mb-2">No items found</h4>
                    <p className="text-gray-500 text-sm">
                      Try updating your search query or selecting a different category block.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Showcase Image Lightbox overlay */}
      <AnimatePresence>
        {lightboxImageUrl && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImageUrl(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          >
            <button 
              onClick={() => setLightboxImageUrl(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer text-xl border-none"
            >
              ✕
            </button>
            <div className="max-w-4xl max-h-[85vh] relative" onClick={(e) => e.stopPropagation()}>
              <img src={encodeURI(lightboxImageUrl)} alt="Expanded showcase" className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function BudgetCollectionPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center font-bold text-gray-400">Loading catalogue page...</div>}>
      <BudgetCollectionContent />
    </Suspense>
  );
}
