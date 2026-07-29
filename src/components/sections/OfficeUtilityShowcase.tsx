"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Bookmark, ShieldCheck, ShoppingBag, Eye } from "lucide-react";
import { Button } from "../ui/Button";
import { useShortlist } from "@/context/ShortlistContext";
import { SafeImage } from "../ui/SafeImage";
import { resolveProductImage } from "@/lib/imageResolver";
import { buildEnquiryUrl } from "@/lib/enquiryHelper";

export function OfficeUtilityShowcase() {
  const { addToShortlist, removeFromShortlist, isInShortlist } = useShortlist();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    fetch("/api/catalog/products")
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          const allProducts = res.data || [];

          // 1. Deduplicate products by ID, slug, and title
          const seen = new Set<string>();
          const uniqueProducts: any[] = [];
          for (const p of allProducts) {
            const idKey = p.id || p._id || "";
            const slugKey = p.slug || "";
            const titleKey = p.title?.toLowerCase() || "";
            if (seen.has(idKey) || seen.has(slugKey) || seen.has(titleKey)) {
              continue;
            }
            seen.add(idKey);
            seen.add(slugKey);
            seen.add(titleKey);
            uniqueProducts.push(p);
          }
          
          // 2. Group unique products by subcategory (or category if subcategory is empty)
          // focus on workspace-essentials & table-top sibling subcategories
          const subcatGroups: Record<string, any[]> = {};
          for (const p of uniqueProducts) {
            const isWorkspaceOrTableTop = 
              p.category === "workspace-essentials" || 
              p.subcategory === "workspace-essentials" ||
              p.category === "table-top" || 
              ["desk-organiser", "mouse-pad", "table-mats", "paper-weight"].includes(p.category) ||
              ["desk-organiser", "mouse-pad", "table-mats", "paper-weight"].includes(p.subcategory);
              
            if (isWorkspaceOrTableTop) {
              const subKey = p.subcategory || p.category || "workspace-essentials";
              if (!subcatGroups[subKey]) {
                subcatGroups[subKey] = [];
              }
              subcatGroups[subKey].push(p);
            }
          }

          // 3. Take one from each subcategory group in a loop (round-robin) to maximize variety
          const selected: any[] = [];
          const keys = Object.keys(subcatGroups);
          let index = 0;
          while (selected.length < 4 && keys.length > 0) {
            const key = keys[index % keys.length];
            const group = subcatGroups[key];
            if (group && group.length > 0) {
              selected.push(group.shift());
            } else {
              // Remove empty group
              keys.splice(index % keys.length, 1);
              continue;
            }
            index++;
          }
          
          // 4. Pad remaining slots with other general promotional products if we still have less than 4
          if (selected.length < 4) {
            for (const p of uniqueProducts) {
              if (selected.length >= 4) break;
              const isPromo = !["corporate-kits", "festive-hampers", "packaging"].includes(p.category);
              if (isPromo && !selected.some((item: any) => item.slug === p.slug)) {
                selected.push(p);
              }
            }
          }

          const mapped = selected
            .slice(0, 4)
            .map((p: any) => ({
              key: p.slug,
              title: p.title,
              category: p.category,
              subcategory: p.subcategory || "",
              brand: p.brand || "",
              imageUrl: resolveProductImage(p) || "/images/joiningkit.png",
              moq: p.moq || 50,
              description: p.description || p.shortDescription || "",
              basePrice: p.price || 450,
              customizations: p.features?.length ? p.features : ["Logo branding", "Custom packaging"],
              specs: Object.entries(p.specifications || {}).map(([label, value]) => ({ label, value: String(value) }))
            }));
          setProducts(mapped);
        }
        setLoading(false);
      })
      .catch(() => {
        setProducts([]);
        setLoading(false);
      });
  }, []);

  const handleToggleShortlist = (title: string, image: string, basePrice: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInShortlist(title)) {
      removeFromShortlist(title);
    } else {
      addToShortlist({ title, imageUrl: image, price: `₹${basePrice} (B2B Quote)` });
    }
  };

  if (loading) {
    return (
      <section className="py-24 bg-[#FAF9F6] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-[460px] rounded-2xl bg-[#F8F7F3] animate-pulse border border-[#F5C2C2]" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-[#FAF9F6] relative overflow-hidden">
      {/* Decorative warm blur */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#D32F2F]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl text-left">
            <span className="text-[#EF5350] text-xs font-bold tracking-widest uppercase mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 fill-[#EF5350]" /> Executive Desk Accessories
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-[#1F1F1F] mb-4 tracking-tight">
              Premium <span className="text-[#D32F2F]">Workspace Essentials</span>
            </h2>
            <p className="text-[#555555] text-sm sm:text-base leading-relaxed font-semibold">
              Transform standard office desks into premium branding canvases. Custom logo integration on high-end leather, wood, and aluminum utilities.
            </p>
          </div>
          <Button variant="outline" className="hidden md:inline-flex rounded-xl font-bold" asChild>
            <Link href="/products?category=workspace-essentials">Explore Workspace Catalogue</Link>
          </Button>
        </div>

        {/* Editorial Product Cards Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((prod, idx) => {
            const isShortlisted = mounted && isInShortlist(prod.title);
            const mainImg = prod.imageUrl;

            return (
              <motion.div
                key={prod.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                onClick={() => router.push(buildEnquiryUrl({ category: prod.category, subcategory: prod.subcategory, brand: prod.brand, moq: prod.moq }))}
                className="group bg-white border border-[#F5C2C2] rounded-2xl overflow-hidden hover:border-[#D32F2F]/25 hover:shadow-xl transition-all duration-300 flex flex-col h-[460px] text-left relative cursor-pointer"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] w-full bg-[#FAF9F6] overflow-hidden border-b border-[#F5C2C2]">
                  <SafeImage
                    src={mainImg}
                    alt={prod.title}
                    category={prod.category}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                  />
                  
                  {/* Quick Specs Overlay on Hover */}
                  <AnimatePresence>
                    {hoveredIndex === idx && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 bg-[#1F1F1F]/65 backdrop-blur-xs flex flex-col justify-end p-5 text-white z-10"
                      >
                        <div className="space-y-2 mb-2">
                          <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#EF5350] block border-b border-white/10 pb-1">Tech Specs:</span>
                          {prod.specs.slice(0, 3).map((sp: any) => (
                            <div key={sp.label} className="flex justify-between text-[10px] font-semibold text-gray-200">
                              <span className="text-gray-400 font-bold uppercase tracking-wider">{sp.label}:</span>
                              <span>{sp.value}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Bookmark Button */}
                  <button
                    onClick={(e) => handleToggleShortlist(prod.title, mainImg, prod.basePrice, e)}
                    className="absolute top-4 right-4 p-2.5 rounded-xl bg-white/90 backdrop-blur-md border border-[#F5C2C2] shadow-sm text-[#555555] hover:bg-[#D32F2F] hover:text-white transition-colors z-20"
                    title="Shortlist Item"
                  >
                    <Bookmark className={`w-4 h-4 ${isShortlisted ? "fill-[#D32F2F] text-[#D32F2F]" : ""}`} />
                  </button>

                  <span className="absolute bottom-4 left-4 text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 bg-[#1F1F1F] text-white rounded-md z-20">
                    MOQ: {prod.moq} Units
                  </span>
                </div>

                {/* Content Container */}
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div className="space-y-3 flex flex-col flex-grow text-left">
                    {/* Category / Subcategory */}
                    <div className="text-xs font-bold text-[#D32F2F] uppercase tracking-wider">
                      {[prod.category, prod.subcategory].filter(Boolean).map(s => s.replace(/-/g, ' ')).join(" / ")}
                    </div>

                    {/* Brand Badge */}
                    <div className="flex flex-wrap gap-2 items-center">
                      {prod.brand && (
                        <span className="rounded-md border border-[#F5C2C2] bg-[#FAF9F6] px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-[#555555]">
                          {prod.brand}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Customization Bullet List */}
                  <div className="py-3 border-y border-[#F5C2C2] flex flex-wrap gap-2">
                    {prod.customizations.slice(0, 2).map((custom: string) => (
                      <span 
                        key={custom} 
                        className="text-[9px] font-extrabold text-[#555555] uppercase tracking-wider bg-[#FAF9F6] border border-[#F5C2C2] px-2 py-0.5 rounded"
                      >
                        {custom}
                      </span>
                    ))}
                  </div>

                  {/* Bottom pricing & view details link */}
                  <div className="flex items-center justify-between pt-4 mt-auto">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#555555] block">Starting At</span>
                      <span className="text-sm font-black text-[#1F1F1F]">₹{prod.basePrice}</span>
                      <span className="text-[10px] text-[#555555] font-bold ml-0.5">/unit</span>
                    </div>

                    <Link
                      href={buildEnquiryUrl({ category: prod.category, subcategory: prod.subcategory, brand: prod.brand, moq: prod.moq })}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#D32F2F] hover:text-[#C62828] transition-colors uppercase tracking-widest"
                    >
                      Get Quote <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile View All button */}
        <div className="mt-8 md:hidden text-center">
          <Button variant="outline" className="w-full rounded-xl font-bold py-4" asChild>
            <Link href="/products?category=workspace-essentials">View Workspace Catalogue</Link>
          </Button>
        </div>

      </div>
    </section>
  );
}
