"use client";

import React, { Suspense, useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BackgroundGradient } from "@/components/layout/BackgroundGradient";
import { getBudgetsConfig, getBudgetCardImageAction } from "@/app/87564/admin/budgets/actions";
import type { BudgetConfigItem } from "@/services/admin/budgetCollectionService";
import { BUDGETS } from "@/data/siteConfig";
import { Wallet, PiggyBank, Coins, Briefcase, Gem, Crown, ChevronRight, Loader2 } from "lucide-react";

// Helper to assign icons to budget ranges
const getBudgetIcon = (index: number) => {
  const icons = [
    <Wallet key="1" className="w-4 h-4" />,
    <PiggyBank key="2" className="w-4 h-4" />,
    <Coins key="3" className="w-4 h-4" />,
    <Briefcase key="4" className="w-4 h-4" />,
    <Gem key="5" className="w-4 h-4" />,
    <Crown key="6" className="w-4 h-4" />,
  ];
  return icons[index] || <Coins key="default" className="w-4 h-4" />;
};

const DEFAULT_IDS = ["0-250", "250-500", "500-1000", "1000-2500", "2500-5000", "5000"];
const initialBudgets: BudgetConfigItem[] = BUDGETS.map((b, idx) => ({
  id: DEFAULT_IDS[idx] || String(idx),
  title: b.name,
  value: b.value,
  description: "Perfect curated gifting solutions",
  image: "",
  displayOrder: idx + 1,
  active: true,
}));

export function normalizeBudgetRange(val: string | null | undefined): string {
  if (!val) return "";
  const clean = val
    .toLowerCase()
    .replace(/[₹\s,]/g, "")
    .replace(/[–—]/g, "-")
    .trim();

  if (clean === "under250" || clean === "0-250" || clean === "under-250") {
    return "0-250";
  }
  if (clean === "250-500") {
    return "250-500";
  }
  if (clean === "500-1000") {
    return "500-1000";
  }
  if (clean === "1000-2500") {
    return "1000-2500";
  }
  if (clean === "2500-5000") {
    return "2500-5000";
  }
  if (clean === "5000" || clean === "5000+" || clean === "above5000" || clean === "above-5000") {
    return "5000+";
  }
  if (clean === "2500+") {
    return "2500+";
  }
  return clean;
}

export function budgetsMatch(prodBudget: string, targetRange: string): boolean {
  const normProd = normalizeBudgetRange(prodBudget);
  const normTarget = normalizeBudgetRange(targetRange);

  if (normProd === normTarget) return true;

  if (normTarget === "2500-5000") {
    return normProd === "2500-5000" || normProd === "2500+";
  }
  if (normTarget === "5000+") {
    return normProd === "5000+" || normProd === "2500+";
  }
  return false;
}

export function getBudgetCardImage(item: BudgetConfigItem): string {
  return item.image || item.bannerImage || "/default-budget.jpg";
}

const BUDGET_ID_TO_SLUG: Record<string, string> = {
  "0-250": "under-250",
  "250-500": "250-500",
  "500-1000": "500-1000",
  "1000-2500": "1000-2500",
  "2500-5000": "2500-5000",
  "5000": "5000-plus",
};

function GiftsByBudgetContent() {
  const router = useRouter();
  const [budgets, setBudgets] = useState<BudgetConfigItem[]>(initialBudgets);
  const [dbProducts, setDbProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [configData, productsRes] = await Promise.all([
          getBudgetsConfig(),
          fetch("/api/catalog/products?limit=1000").then((res) => res.json())
        ]);

        // Resolve budget image fallbacks from their specific folders dynamically on mount
        const resolvedBudgets = await Promise.all(
          configData.map(async (item) => {
            let resolvedImage = item.bannerImage || item.image || "";
            // If no custom image is configured, scan the folder server-side
            if (!resolvedImage) {
              resolvedImage = await getBudgetCardImageAction(item.id || item.title || item.value);
            }
            return {
              ...item,
              image: resolvedImage,
              bannerImage: resolvedImage
            };
          })
        );

        setBudgets(resolvedBudgets.filter((b) => b.active).sort((a, b) => a.displayOrder - b.displayOrder));
        if (productsRes.success && productsRes.data) {
          setDbProducts(productsRes.data);
        }
      } catch (err) {
        console.error("Failed to load dynamic budget catalog:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const allProducts = useMemo(() => {
    if (dbProducts.length > 0) {
      return dbProducts.map((p) => ({
        budgetRange: p.budget || p.specifications?.budget || "",
      }));
    }
    return [];
  }, [dbProducts]);

  const getAssignedProductsCount = (value: string) => {
    return allProducts.filter((p) => budgetsMatch(p.budgetRange, value)).length;
  };

  return (
    <div className="pt-32 pb-24 relative min-h-screen bg-[#FAF9F6] overflow-hidden max-w-full">
      <BackgroundGradient className="opacity-15 blur-[140px]" />
      
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 left-0 right-0 h-[400px] bg-gradient-to-b from-[#F8F7F3]/40 to-transparent pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Page Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-4 py-1.5 rounded-full bg-[#F8F7F3] text-[#EF5350] text-xs font-bold tracking-widest uppercase mb-4 inline-block border border-[#F5C2C2]">
            Smart Budgets
          </span>
          <SectionHeading 
            title={<>Corporate Gifts <span className="text-[#D32F2F]">by Budget</span></>}
            subtitle="Explore our curated catalogue segments structured dynamically to match your cost constraints without compromising on visual elegance." 
            centered 
          />
        </div>

        {/* Top Budget Category Navigation Cards */}
        <div className="mb-16">
          {loading ? (
            <div className="flex h-60 items-center justify-center rounded-2xl border border-[#F5C2C2] bg-white">
              <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-[#5F6752]">
                <Loader2 className="h-5 w-5 animate-spin text-[#D32F2F]" />
                Initializing smart budgets...
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {budgets.map((item, idx) => {
                const liveCount = getAssignedProductsCount(item.value);
                const resolvedImage = getBudgetCardImage(item);
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      const slug = BUDGET_ID_TO_SLUG[item.id] || item.id;
                      router.push(`/gifts-by-budget/${slug}`);
                    }}
                    className="group flex flex-col bg-white border border-[#F5C2C2] hover:border-[#D32F2F]/60 rounded-3xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer h-full text-left"
                  >
                    {/* Card Cover Image */}
                    {resolvedImage ? (
                      <div className="aspect-video w-full overflow-hidden bg-gray-50 border-b border-[#F5C2C2] relative">
                        <Image
                          src={encodeURI(resolvedImage)}
                          alt={item.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <div className="aspect-video w-full rounded-2xl bg-[#FFFDF8] flex flex-col items-center justify-center mb-4 border border-dashed border-[#F5C2C2] text-[#D32F2F] hover:bg-[#FAF9F6]">
                        {getBudgetIcon(idx)}
                        <span className="text-xs font-bold text-gray-400 mt-2">No cover image</span>
                      </div>
                    )}
                    <div className="p-6 flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-black text-gray-950 group-hover:text-[#D32F2F] transition-colors leading-tight">
                          {item.title}
                        </h3>
                        {item.description && (
                          <p className="text-sm text-gray-500 font-semibold mt-2 line-clamp-2 leading-relaxed">
                            {item.description}
                          </p>
                        )}
                      </div>
                      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 text-xs font-black text-[#D32F2F] uppercase tracking-wider">
                          {item.buttonText || "Explore Collection"} <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </span>
                        <span className="text-xs font-bold text-gray-500 bg-gray-50 px-2.5 py-0.5 rounded-full border border-gray-200">
                          {liveCount} Products
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default function GiftsByBudgetPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center font-bold text-gray-400">Loading budget catalogue...</div>}>
      <GiftsByBudgetContent />
    </Suspense>
  );
}
