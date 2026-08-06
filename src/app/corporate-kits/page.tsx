"use client";

import React, { Suspense, useEffect, useState, useMemo } from "react";
import { DEFAULT_KIT_IMAGE, corporateKitImageOrFallback, corporateKitImage } from "@/lib/kitImageMap";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/ui/ProductCard";
import { BackgroundGradient } from "@/components/layout/BackgroundGradient";
import { Briefcase, HardHat, Gift, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { getCanonicalKitSlug, getSubcategorySlugAliases } from "@/lib/slugResolver";
import { resolveProductImage, resolveSubcategoryImage } from "@/lib/imageResolver";
import { buildEnquiryUrl } from "@/lib/enquiryHelper";
import { PRODUCT_HIERARCHY } from "@/data/siteConfig";
import { toDisplayName } from "@/lib/displayNames";
import { clientCache } from "@/lib/clientCache";
import { useNavigationCache } from "@/context/NavigationCacheContext";

type ActiveTab = "corporate" | "industry" | "festive";

const INDUSTRY_SLUGS = new Set(["doctor-kits", "engineer-kits", "dealer-kits", "retailer-kits"]);

const FESTIVE_HAMPER_COLLECTIONS = [
  {
    name: "Diwali Hampers",
    slug: "diwali-hampers",
    description: "Traditional diyas, dry fruits, premium chocolates, and customized greeting items for Diwali gifting.",
    images: [
      "/images/Diwali Hampers/1.jpg",
      "/images/Diwali Hampers/2.jpg",
      "/images/Diwali Hampers/3.jpg",
    ],
  },
  {
    name: "Holi Hampers",
    slug: "holi-hampers",
    description: "Organic gulal, gourmet thandai mixes, traditional sweets, and branding options for corporate Holi gifting.",
    images: [
      "/images/Holi Hampers/1.jpg",
      "/images/Holi Hampers/2.jpg",
      "/images/Holi Hampers/3.jpg",
    ],
  },
  {
    name: "Eid Hampers",
    slug: "eid-kits",
    description: "Curated gourmet hampers with exotic dry fruits, dates, premium attar, and custom brand cards for Eid celebration.",
    images: [
      "/images/Eid Hampers/1.jpg",
    ],
  },
  {
    name: "Christmas Hampers",
    slug: "christmas-kits",
    description: "Festive plum cake, artisanal cookies, ornaments, customized mugs, and hot chocolate mixes.",
    images: [
      "/images/Christmas Hampers/1.jpg",
    ],
  },
  {
    name: "New Year Hampers",
    slug: "new-year-hampers",
    description: "Premium corporate diaries, desk organizers, calendars, and curated goodies to kickstart the New Year.",
    images: [
      "/images/New Year Hampers/1.jpg",
      "/images/New Year Hampers/2.jpg",
      "/images/New Year Hampers/3.jpg",
    ],
  },
  {
    name: "Festive Hampers",
    slug: "festive-hampers",
    description: "Premium assorted festive hampers for company milestones, holiday gifting, and client appreciation.",
    images: [
      "/images/Festive Hampers/1.jpg",
      "/images/Festive Hampers/2.jpg",
      "/images/Festive Hampers/3.jpg",
    ],
  },
] as const;

const fallbackFestiveCards = (slug?: string) =>
  FESTIVE_HAMPER_COLLECTIONS
    .filter((collection) => !slug || collection.slug === slug)
    .flatMap((collection) =>
      collection.images.map((imageUrl, index) => {
        const title = collection.images.length === 1 ? collection.name : `${collection.name} ${index + 1}`;
        return {
          title,
          description: collection.description,
          imageUrl,
          price: "Custom Quote",
          slug: `${collection.slug}-${index + 1}`,
          category: "festive-hampers",
          subcategory: title,
          brand: undefined,
          moq: undefined,
          href: buildEnquiryUrl({ category: "festive-hampers", subcategory: title }),
        };
      })
    );

const fallbackCorporateCards = (items: Subcategory[]) =>
  items.map((item) => ({
    title: item.name,
    description: item.description || "Curated premium corporate kit with custom branding and bulk fulfillment support.",
    imageUrl: resolveSubcategoryImage(item) || corporateKitImage(item.name) || corporateKitImage(item.slug) || "",
    price: "Custom Quote",
    slug: item.slug,
    category: item.category,
    subcategory: item.name,
    brand: undefined,
    moq: undefined,
    href: buildEnquiryUrl({ category: item.category, subcategory: item.name }),
  }));
interface Subcategory {
  id: string;
  name: string;
  slug: string;
  category: string;
  parentGroup: string;
  description?: string;
  image?: string;
  order?: number;
}

interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  subcategory: string;
  featuredImage?: string;
  images: string[];
  price?: number;
  brand?: string;
  moq?: number;
  features?: string[];
  overview?: string;
  rawOverview?: string;
  brandingCapabilities?: string[];
  rawBrandingCapabilities?: string[];
  showBrandingCapabilities?: boolean;
}

function CorporateKitsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { getScrollPosition, setScrollPosition } = useNavigationCache();
  const selectedKit = searchParams?.get("kit") || "";

  const cacheKey = useMemo(() => {
    const paramsStr = searchParams?.toString();
    return pathname + (paramsStr ? `?${paramsStr}` : "");
  }, [pathname, searchParams]);

  // Instantly hydrate subcategories and products from clientCache
  const [subcategories, setSubcategories] = useState<Subcategory[]>(() => {
    if (typeof window !== "undefined") {
      const cached = clientCache.get<Subcategory[]>("/api/catalog/subcategories-corporate");
      return cached ?? [];
    }
    return [];
  });

  const [products, setProducts] = useState<Product[]>(() => {
    if (typeof window !== "undefined") {
      const cached = clientCache.get<Product[]>("/api/catalog/products-corporate");
      return cached ?? [];
    }
    return [];
  });

  const [loading, setLoading] = useState(() => {
    if (typeof window !== "undefined") {
      return !clientCache.has("/api/catalog/products-corporate");
    }
    return true;
  });

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
    if (!loading) {
      const savedScroll = getScrollPosition(cacheKey);
      if (savedScroll > 0) {
        const timer = setTimeout(() => {
          window.scrollTo({ top: savedScroll, behavior: "instant" });
        }, 80);
        return () => clearTimeout(timer);
      }
    }
  }, [cacheKey, loading, getScrollPosition]);

  useEffect(() => {
    let active = true;

    async function loadData() {
      const hasCached = clientCache.has("/api/catalog/products-corporate");
      if (!hasCached) {
        setLoading(true);
      }

      try {
        // Fetch fresh data in the background (stale-while-revalidate)
        const [, subRes, prodRes] = await Promise.all([
          clientCache.fetchWithCache<any>("/api/catalog/categories", undefined, true),
          clientCache.fetchWithCache<any>("/api/catalog/subcategories", undefined, true),
          clientCache.fetchWithCache<any>("/api/catalog/products", undefined, true)
        ]);

        if (!active) return;

        if (subRes.success && subRes.data) {
          let apiSubs = subRes.data || [];
          
          // Merge dealer-kits and retailer-kits at the subcategory level
          const hasDealer = apiSubs.some((s: any) => s.slug === "dealer-kits");
          const hasRetailer = apiSubs.some((s: any) => s.slug === "retailer-kits");
          
          if (hasDealer || hasRetailer) {
            apiSubs = apiSubs.filter((s: any) => s.slug !== "retailer-kits");
            const target = apiSubs.find((s: any) => s.slug === "dealer-kits");
            if (target) {
              target.name = "Dealer / Retailer Kit";
              target.description = "Dealer and retailer kits with sales tools, branding panels, and onboarding packages.";
            } else {
              const retailerObj = subRes.data.find((s: any) => s.slug === "retailer-kits");
              if (retailerObj) {
                retailerObj.name = "Dealer / Retailer Kit";
                retailerObj.slug = "dealer-kits";
                apiSubs.push(retailerObj);
              }
            }
          }
          
          const apiSubsData = apiSubs;
          const virtualSubs: any[] = [];
          const kitsGroup = PRODUCT_HIERARCHY.find(g => g.slug === "kits-hampers");
          if (kitsGroup) {
            kitsGroup.categories.forEach(cat => {
              if (["grooming-kits", "executive-kits"].includes(cat.slug)) {
                cat.subcategories.forEach(sub => {
                  virtualSubs.push({
                    id: `virtual_${sub.slug}`,
                    name: sub.name,
                    slug: sub.slug,
                    category: cat.slug,
                    parentGroup: "Corporate Kits",
                    description: `Premium bespoke B2B ${sub.name.toLowerCase()} gift set customized with corporate branding.`,
                    image: ""
                  });
                });
              }
            });
          }
          const mergedSubs = [...apiSubsData];
          virtualSubs.forEach(vs => {
            if (!mergedSubs.some(s => s.slug === vs.slug)) {
              mergedSubs.push(vs);
            }
          });

          if (JSON.stringify(mergedSubs) !== JSON.stringify(subcategories)) {
            setSubcategories(mergedSubs);
            clientCache.set("/api/catalog/subcategories-corporate", mergedSubs);
          }
        }
        
        if (prodRes.success && prodRes.data) {
          const freshProds = prodRes.data;
          if (JSON.stringify(freshProds) !== JSON.stringify(products)) {
            setProducts(freshProds);
            clientCache.set("/api/catalog/products-corporate", freshProds);
          }
        }
      } catch (err) {
        console.error("Failed to load corporate kits data in background:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
    return () => {
      active = false;
    };
  }, []);

  const corporateOptions = useMemo(() => {
    return subcategories.filter(
      (sub) => sub.category === "corporate-kits" || sub.parentGroup === "Corporate Kits"
    );
  }, [subcategories]);

  const festiveOptions = useMemo(() => {
    const databaseOptions = subcategories.filter(
      (sub) => sub.category === "festive-hampers" || sub.parentGroup === "Festive Hampers"
    );
    const existingSlugs = new Set(databaseOptions.map((sub) => sub.slug));
    const localOptions = FESTIVE_HAMPER_COLLECTIONS
      .filter((collection) => !existingSlugs.has(collection.slug))
      .map((collection, index) => ({
        id: `local_${collection.slug}`,
        name: collection.name,
        slug: collection.slug,
        category: "festive-hampers",
        parentGroup: "Festive Hampers",
        description: collection.description,
        image: collection.images[0],
        order: 100 + index,
      }));

    return [...databaseOptions, ...localOptions];
  }, [subcategories]);

  const selectedSubcategory = useMemo(() => {
    if (!selectedKit) return undefined;
    const canonical = getCanonicalKitSlug(selectedKit);
    return subcategories.find((sub) => sub.slug === canonical || sub.slug === selectedKit || sub.slug.replace(/-kits$|-hampers$|-gifts$|-kit$/g, "") === selectedKit)
      || festiveOptions.find((sub) => sub.slug === canonical || sub.slug === selectedKit || sub.slug.replace(/-kits$|-hampers$|-gifts$|-kit$/g, "") === selectedKit);
  }, [festiveOptions, subcategories, selectedKit]);

  const activeTab: ActiveTab = useMemo(() => {
    if (selectedSubcategory) {
      if (selectedSubcategory.category === "festive-hampers") return "festive";
      if (INDUSTRY_SLUGS.has(selectedSubcategory.slug)) return "industry";
      return "corporate";
    }
    return "corporate";
  }, [selectedSubcategory]);

  const currentOptions = activeTab === "festive"
    ? festiveOptions
    : activeTab === "industry"
      ? corporateOptions.filter((s) => INDUSTRY_SLUGS.has(s.slug))
      : corporateOptions.filter((s) => !INDUSTRY_SLUGS.has(s.slug));

  const visibleItems = useMemo(() => {
    if (selectedKit) {
      if (!selectedSubcategory) {
        console.warn(`[Catalog] Missing subcategory for kit slug: ${selectedKit}`);
        return [];
      }
      
      const subcategoryAliases = new Set(getSubcategorySlugAliases(selectedSubcategory.slug));
      const filtered = products.filter((p) => subcategoryAliases.has(p.subcategory) || p.subcategory === selectedSubcategory.slug);
      return filtered.map((p) => ({
        title: p.title,
        description: p.description,
        imageUrl: resolveProductImage(p) || "",
        price: p.price ? `₹${p.price}` : "Custom Quote",
        slug: p.slug,
        category: p.category,
        subcategory: p.subcategory,
        brand: p.brand || "",
        moq: p.moq || 0,
        href: undefined,
        images: p.images || [],
        features: p.features || [],
        overview: p.overview,
        rawOverview: p.rawOverview,
        brandingCapabilities: p.brandingCapabilities,
        showBrandingCapabilities: p.showBrandingCapabilities,
      }));
    }

    // Landing page (no kit specified)
    const activeOptions = 
      activeTab === "festive"
        ? festiveOptions
        : activeTab === "industry"
          ? corporateOptions.filter((s) => INDUSTRY_SLUGS.has(s.slug))
          : corporateOptions.filter((s) => !INDUSTRY_SLUGS.has(s.slug));
    const activeSlugs = new Set(activeOptions.flatMap((s) => getSubcategorySlugAliases(s.slug)));
    const filtered = products.filter((p) => activeSlugs.has(p.subcategory));

    const mapped = filtered.map((p) => ({
      title: p.title,
      description: p.description,
      imageUrl: resolveProductImage(p) || "",
      price: p.price ? `₹${p.price}` : "Custom Quote",
      slug: p.slug,
      category: p.category,
      subcategory: p.subcategory,
      brand: p.brand || "",
      moq: p.moq || 0,
      href: undefined,
      images: p.images || [],
      features: p.features || [],
      overview: p.overview,
      rawOverview: p.rawOverview,
      brandingCapabilities: p.brandingCapabilities,
      showBrandingCapabilities: p.showBrandingCapabilities,
    }));

    if (mapped.length > 0) return mapped;
    if (activeTab === "festive") return fallbackFestiveCards();
    return fallbackCorporateCards(currentOptions);
  }, [activeTab, corporateOptions, currentOptions, festiveOptions, products, selectedSubcategory, selectedKit]);

  const selectedLabel = toDisplayName(selectedSubcategory?.name) || "Corporate Kits";
  const selectedDescription = selectedSubcategory?.description || 
    "Explore premium, custom-branded onboarding kits, specialized field employee kits, and luxury festive hampers curated to elevate your brand perception.";

  const tabItems = [
    { id: "corporate", label: "Employee & Joining Kits", icon: <Briefcase className="w-4 h-4" />, href: "/corporate-kits" },
    { id: "industry", label: "Field & Industry Kits", icon: <HardHat className="w-4 h-4" />, href: "/corporate-kits?kit=doctor-kits" },
    { id: "festive", label: "Festive & Occasion Hampers", icon: <Gift className="w-4 h-4" />, href: "/corporate-kits?kit=diwali-hampers" },
  ] as const;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6]">
        <motion.div
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-44 h-12"
        >
          <Image
            src="/pacmyproductlogo1.png"
            alt="Loading..."
            fill
            priority
            className="object-contain"
          />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 relative min-h-screen bg-[#FAF9F6] overflow-hidden max-w-full">
      <BackgroundGradient className="opacity-15 blur-[140px]" />
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-[#F8F7F3]/40 to-transparent pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="px-4 py-1.5 rounded-full bg-[#F8F7F3] text-[#EF5350] text-xs font-bold tracking-widest uppercase mb-4 inline-block border border-[#F5C2C2]">
            Curated Gift Sets
          </span>
          <SectionHeading
            title={<>{selectedSubcategory ? selectedLabel : "Corporate"} <span className="text-[#D32F2F]">{selectedSubcategory ? "" : "Kits & Hampers"}</span></>}
            subtitle={selectedDescription}
            centered
          />
        </div>

        <div className="flex justify-center mb-8 px-4">
          <div className="inline-flex flex-wrap md:flex-nowrap p-1.5 bg-white border border-gray-200/80 rounded-2xl shadow-sm max-w-4xl w-full md:w-auto relative z-10">
            {tabItems.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => router.push(tab.href)}
                  className={`flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 w-full md:w-auto ${
                    isActive
                      ? "bg-[#D32F2F] text-white shadow-md shadow-[#D32F2F]/10"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic DB-driven Pills Selection */}
        <div className="mb-14 rounded-2xl bg-[#FAF9F6] border border-[#F5C2C2] p-5 shadow-sm text-left">
          <div className="text-[10px] font-extrabold uppercase tracking-widest mb-4 text-[#EF5350]">
            {activeTab === "festive" ? "Festive Hamper Collections" : "Corporate Kit Options"}
          </div>
          <div className="flex flex-wrap gap-2">
            {currentOptions.map((item) => {
              const isSelected = selectedSubcategory?.slug === item.slug;
              return (
                <Link
                  key={item.slug}
                  href={`/corporate-kits?kit=${item.slug}`}
                  className={`rounded-xl border px-3.5 py-2 text-xs font-bold transition-all ${
                    isSelected
                      ? "border-[#D32F2F] bg-[#F8F7F3] text-[#D32F2F] shadow-sm"
                      : "border-[#F5C2C2] bg-[#FAF9F6] text-[#6B6B63] hover:border-[#D32F2F]/30 hover:bg-white hover:text-[#2B2B2B]"
                  }`}
                >
                  {toDisplayName(item.name)}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between gap-4 text-left">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#8A6A3B]">
              {selectedSubcategory ? "Selected Collection" : "Featured Collection"}
            </span>
            <h2 className="mt-1 text-2xl md:text-3xl font-black text-gray-950">
              {selectedLabel}
            </h2>
          </div>
          <span className="rounded-full bg-white border border-gray-200 px-4 py-2 text-[10px] font-extrabold uppercase tracking-widest text-gray-500">
            {visibleItems.length} Options
          </span>
        </div>

        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTab}-${selectedKit || "all"}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {visibleItems.length === 0 ? (
                <div className="col-span-full py-20 text-center rounded-2xl bg-white border border-gray-200/50 p-8 shadow-sm">
                  <p className="text-lg font-bold text-gray-800">No products available</p>
                  <p className="text-sm text-gray-500 mt-1">We couldn't find any products in this collection. Please select another collection or contact us for a custom proposal.</p>
                </div>
              ) : (
                visibleItems.map((item, idx) => (
                  <ProductCard
                    key={`${item.slug}-${item.title}`}
                    title={item.title}
                    slug={item.slug}
                    description={item.description}
                    imageUrl={item.imageUrl}
                    price={item.price}
                    index={idx}
                    category={item.category}
                    subcategory={item.subcategory}
                    brand={item.brand}
                    moq={item.moq}
                    href={item.href}
                    isProduct={item.href ? false : true}
                    images={(item as any).images || []}
                    features={(item as any).features || []}
                    overview={(item as any).overview}
                    rawOverview={(item as any).rawOverview}
                    brandingCapabilities={(item as any).brandingCapabilities}
                    showBrandingCapabilities={(item as any).showBrandingCapabilities}
                    className="glass-card hover:shadow-xl hover:shadow-gray-200/40 border-gray-200/60"
                  />
                ))
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 p-8 md:p-16 rounded-3xl bg-gradient-to-br from-[#2B2B2B] via-[#303527] to-[#1E2119] text-white relative overflow-hidden border border-[#EF5350]/20 shadow-2xl shadow-[#C62828]/15"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#EF5350]/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#D32F2F]/20 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-left">
              <span className="text-[10px] font-bold tracking-widest text-[#EF5350] uppercase block mb-3">
                Bespoke Packaging & Gifting
              </span>
              <h3 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-4 text-white leading-tight">
                Want to curate a <span className="text-[#EF5350]">completely custom</span> kit?
              </h3>
              <p className="text-[#F5C2C2] text-sm md:text-base leading-relaxed">
                Tell us your budget, quantity, and product preferences. Our team will prepare custom sample proofs, mockups, and organize pan-India door-to-door delivery.
              </p>
            </div>
            <div className="flex-shrink-0 w-full md:w-auto">
              <Button
                size="lg"
                className="w-full md:w-auto font-bold rounded-xl bg-gradient-to-r from-[#D32F2F] to-[#C62828] hover:from-[#C62828] hover:to-[#C62828] text-white shadow-xl shadow-[#C62828]/25 border border-[#EF5350]/20 flex items-center justify-center gap-2 group py-4 px-8"
                asChild
              >
                <Link href="/enquiry?source=custom-kit">
                  Request Custom Proposal
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function CorporateKitsPage() {
  return (
    <Suspense fallback={<div className="pt-32 pb-24 text-center text-xs font-bold text-gray-400 uppercase tracking-widest animate-pulse">Loading kits...</div>}>
      <CorporateKitsContent />
    </Suspense>
  );
}
