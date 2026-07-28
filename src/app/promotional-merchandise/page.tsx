"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BackgroundGradient } from "@/components/layout/BackgroundGradient";
import { GiftsByBudget } from "@/components/sections/GiftsByBudget";
import { ArrowUpRight, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SafeImage } from "@/components/ui/SafeImage";
import { resolveProductImage, resolveCategoryImage } from "@/lib/imageResolver";
import { buildEnquiryUrl } from "@/lib/enquiryHelper";
import { getCanonicalCategoryName, getCanonicalSubcategoryName } from "@/lib/slugResolver";
import { toDisplayName } from "@/lib/displayNames";
import { resolveProductBranding } from "@/lib/catalogDefaults";

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentGroup?: string;
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
  features?: string[];
  brand?: string;
  moq?: number;
}

export default function PromoMerchPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Frontend-only: category slugs to hide from all public promotional pages
  const HIDDEN_CATEGORY_SLUGS = new Set(["travel-bags", "travel-mugs"]);
  const HIDDEN_SUBCATEGORY_SLUGS = new Set(["travel-bags", "travel-backpacks", "travel-mugs"]);

  useEffect(() => {
    Promise.all([
      fetch("/api/catalog/categories").then((res) => res.json()),
      fetch("/api/catalog/products").then((res) => res.json()),
    ])
      .then(([catRes, prodRes]) => {
        if (catRes.success && catRes.data) {
          const promoCats = catRes.data.map((c: Category) => {
            if (c.slug === "electronics" || c.slug === "clocks") {
              return { ...c, parentGroup: "Promotional Products" };
            }
            return c;
          }).filter(
            (c: Category) =>
              c.parentGroup === "Promotional Products" &&
              !HIDDEN_CATEGORY_SLUGS.has(c.slug)
          );
          setCategories(promoCats);
        }
        if (prodRes.success && prodRes.data) {
          const filtered = prodRes.data.filter(
            (p: Product) => !HIDDEN_SUBCATEGORY_SLUGS.has(p.subcategory)
          );
          setProducts(filtered);
        }
        setLoading(false);
      })
      .catch(() => {
        setCategories([]);
        setProducts([]);
        setLoading(false);
      });
  }, []);

  const getSpotlights = (catSlug: string) => {
    return products
      .filter((p) => p.category === catSlug)
      .slice(0, 3)
      .map((p) => {
        const subName = p.subcategory ? toDisplayName(getCanonicalSubcategoryName(p.subcategory)) : "";
        const catName = toDisplayName(getCanonicalCategoryName(p.category));
        const resolved = subName || catName;
        const titleText = resolved === p.subcategory || resolved === p.category 
          ? (resolved || "Corporate Gift").replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
          : (resolved || "Corporate Gift");
        return {
          title: titleText,
          description: p.description,
          imageUrl: resolveProductImage(p) || "/images/joiningkit.png",
          cta: "Get Quote",
          brandingOptions: resolveProductBranding(p).slice(0, 3),
          href: buildEnquiryUrl({
            category: p.category,
            subcategory: p.subcategory,
            brand: p.brand,
            moq: p.moq,
          }),
        };
      });
  };

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
    <div className="relative isolate pt-32 pb-0 bg-[#FAF9F6] overflow-hidden max-w-full">
      <BackgroundGradient className="opacity-15 blur-[140px]" />
      
      {/* Soft overlay */}
      <div className="absolute top-0 left-0 right-0 h-[450px] bg-gradient-to-b from-[#F8F7F3]/40 to-transparent pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Page Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-4 py-1.5 rounded-full bg-[#F8F7F3] text-[#EF5350] text-xs font-bold tracking-widest uppercase mb-4 inline-block border border-[#F5C2C2]">
            Promotional Giveaways
          </span>
          <SectionHeading 
            title={<>Promotional <span className="text-[#D32F2F]">Products</span></>}
            subtitle="Explore corporate gifts and premium giveaways curated for brand launches, employee welcome kits, channel partners, and high-impact event merchandise."
            centered 
          />
        </div>

        {/* Categories Grid */}
        <div className="space-y-20 mb-24">
          <section className="text-left">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
              <div>
                <span className="text-[10px] font-extrabold text-[#EF5350] uppercase tracking-widest">Promotional Products</span>
                <h2 className="text-2xl md:text-3xl font-black text-[#2B2B2B] mt-2">All Promotional Categories</h2>
                <p className="text-sm text-[#6B6B63] font-medium max-w-2xl mt-2">
                  Select a category to browse customized merchandise options for your teams and marketing campaigns.
                </p>
              </div>
              <Link href="/products" className="text-xs font-extrabold text-[#D32F2F] uppercase tracking-widest inline-flex items-center gap-1.5 hover:text-[#C62828]">
                View Product Catalog <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {categories.map((cat, i) => {
                const href = `/products?category=${cat.slug}`;
                const matchedImg = resolveCategoryImage(cat, "/images/joiningkit.png");
                return (
                  <motion.div
                    key={cat.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ delay: (i % 4) * 0.05, duration: 0.5 }}
                    whileHover={{ y: -6 }}
                    className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-[#F5C2C2] shadow-sm hover:shadow-xl hover:border-[#D32F2F]/30 transition-all cursor-pointer relative"
                  >
                    <Link href={href} className="flex flex-col h-full">
                      <div className="relative w-full h-[180px] overflow-hidden bg-[#F8F7F3] flex-shrink-0">
                        <div className="absolute inset-0 bg-black/10 z-10 group-hover:bg-black/0 transition-colors duration-500" />
                        <SafeImage
                          src={matchedImg}
                          alt={toDisplayName(cat.name)}
                          category={cat.slug}
                          className="w-full h-full object-cover transition-transform duration-700 ease-[0.16, 1, 0.3, 1] group-hover:scale-105"
                        />
                        <div className="absolute bottom-3 right-3 z-20">
                          <span className="p-2 rounded-xl bg-white/90 backdrop-blur-sm text-[#2B2B2B] shadow-sm border border-[#F5C2C2] inline-block transition-transform duration-300 group-hover:rotate-45 group-hover:bg-[#D32F2F] group-hover:text-white">
                            <ArrowUpRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>

                      <div className="p-6 flex flex-col flex-grow text-left">
                        <h3 className="text-lg font-bold text-[#2B2B2B] group-hover:text-[#D32F2F] transition-colors mb-2 leading-tight">
                          {toDisplayName(cat.name)}
                        </h3>
                        <p className="text-[#6B6B63] text-xs leading-relaxed line-clamp-3 mb-6 flex-grow font-medium">
                          {cat.description || `Custom corporate branding and bespoke finishes on premium ${toDisplayName(cat.name).toLowerCase()} options.`}
                        </p>
                        <div className="pt-4 border-t border-[#F5C2C2] flex items-center justify-between text-xs font-bold text-[#D32F2F]">
                          <span>Explore Products</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Spotlight section for major categories */}
            <div className="mt-16 space-y-12">
              {categories
                .map((cat) => ({ cat, spotlights: getSpotlights(cat.slug) }))
                .filter(({ spotlights }) => spotlights.length > 0)
                .map(({ cat, spotlights }) => (
                  <div key={cat.slug} className="rounded-2xl bg-white border border-[#F5C2C2] p-5 sm:p-6 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6 text-left">
                      <div>
                        <span className="text-[10px] font-extrabold text-[#EF5350] uppercase tracking-widest">
                          {cat.name} Spotlight
                        </span>
                        <h3 className="text-xl md:text-2xl font-black text-[#2B2B2B] mt-1">
                          Featured {cat.name}
                        </h3>
                      </div>
                      <Link href={`/products?category=${cat.slug}`} className="text-xs font-extrabold text-[#D32F2F] uppercase tracking-widest inline-flex items-center gap-1.5 hover:text-[#C62828]">
                        View All <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {spotlights.map((spotlight, index) => (
                        <motion.div
                          key={spotlight.title}
                          initial={{ opacity: 0, y: 18 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-20px" }}
                          transition={{ delay: (index % 3) * 0.04, duration: 0.45 }}
                          className="group bg-white rounded-xl overflow-hidden border border-[#F5C2C2] shadow-sm hover:shadow-lg transition-all"
                        >
                          <Link href={spotlight.href} className="block h-full text-left">
                            <div className="relative h-40 bg-[#F8F7F3] overflow-hidden">
                              <SafeImage
                                src={spotlight.imageUrl}
                                alt={spotlight.title}
                                category={cat.slug}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                            </div>
                            <div className="p-5">
                              <h4 className="text-base font-black text-[#2B2B2B] group-hover:text-[#D32F2F] transition-colors">{spotlight.title}</h4>
                              <p className="text-xs text-[#6B6B63] leading-relaxed font-medium mt-2 line-clamp-2">{spotlight.description}</p>
                              {spotlight.brandingOptions && (
                                <div className="flex flex-wrap gap-1.5 mt-4">
                                  {spotlight.brandingOptions.map((option) => (
                                    <span key={option} className="text-[9px] font-extrabold uppercase tracking-wider text-[#6B6B63] bg-[#FAF9F6] border border-[#F5C2C2] rounded-md px-2 py-1">
                                      {option}
                                    </span>
                                  ))}
                                </div>
                              )}
                              <div className="mt-5 pt-4 border-t border-[#F5C2C2] flex items-center justify-between text-xs font-bold text-[#D32F2F]">
                                <span>{spotlight.cta}</span>
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </section>
        </div>

        {/* CTA Panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-8 md:p-16 rounded-3xl bg-[#2B2B2B] text-white relative overflow-hidden border border-white/5 shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#D32F2F]/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#EF5350]/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-4xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-left">
              <span className="text-[10px] font-bold tracking-widest text-[#EF5350] uppercase block mb-3">
                Bulk Branding Capabilities
              </span>
              <h3 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-4 text-white leading-tight">
                Curating merchandise for a <span className="text-[#EF5350]">large corporate event</span>?
              </h3>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                Connect with our account managers. We provide volume wholesale discounts, print sample runs, and offer warehouse consolidation with doorstep distribution.
              </p>
            </div>
            <div className="flex-shrink-0 w-full md:w-auto">
              <Button
                size="lg"
                className="w-full md:w-auto font-bold rounded-xl flex items-center justify-center gap-2 group py-4 px-8"
                asChild
              >
                <Link href="/enquiry?source=promo-merchandise-bulk">
                  Get Wholesale Rates
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>

      </div>

      <GiftsByBudget />
    </div>
  );
}
