"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/Button";
import { resolveProductImage } from "@/lib/imageResolver";
import { useProductPreview } from "@/context/ProductPreviewContext";

interface ShowcaseProduct {
  id: string;
  category: string;
  title: string;
  image: string;
  rawProduct?: any;
}

export function ProductShowcase() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [products, setProducts] = useState<ShowcaseProduct[]>([]);
  const { openPreview } = useProductPreview();

  // Frontend-only: subcategory slugs to hide from public showcase
  const HIDDEN_SUBCATEGORY_SLUGS = new Set(["travel-bags", "travel-backpacks", "travel-mugs"]);

  useEffect(() => {
    let active = true;

    fetch("/api/catalog/products")
      .then((response) => response.json())
      .then((result) => {
        if (!active) return;
        const seen = new Set();
        const unique: ShowcaseProduct[] = [];
        (result.data ?? []).forEach((product: any) => {
          // Frontend-only: skip hidden subcategories
          if (HIDDEN_SUBCATEGORY_SLUGS.has(product.subcategory)) return;
          if (!seen.has(product.title) && product.images?.[0]) {
            seen.add(product.title);
            unique.push({
              id: product.id,
              category: product.category,
              title: product.title,
              image: resolveProductImage(product),
              rawProduct: product
            });
          }
        });
        setProducts(unique.slice(0, 12));
      })
      .catch(() => setProducts([]));

    return () => {
      active = false;
    };
  }, []);

  const formatCategoryLabel = (cat: string) => {
    if (!cat) return "";
    const lower = cat.toLowerCase();
    if (lower === "drinkware" || lower === "drink-ware") {
      return "Drink Ware";
    }
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  };

  const categories = useMemo(() => ["All", ...Array.from(new Set(products.map((product) => product.category))).slice(0, 4)], [products]);

  const filteredProducts = products.filter((product) => activeFilter === "All" || product.category === activeFilter).slice(0, 4);

  const handleProductClick = (prod: ShowcaseProduct) => {
    openPreview({
      title: prod.title,
      description: prod.rawProduct?.description || "",
      imageUrl: prod.image,
      moq: prod.rawProduct?.moq || 0,
      category: prod.rawProduct?.category,
      subcategory: prod.rawProduct?.subcategory,
      brand: prod.rawProduct?.brand || "",
      images: prod.rawProduct?.images || [prod.image],
      features: prod.rawProduct?.features || []
    });
  };

  return (
    <section className="py-24 bg-[#F8F7F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
          <div className="text-left">
            <h2 className="text-4xl font-bold text-[#2B2B2B] mb-4">Curated Gifts</h2>
            <p className="text-lg text-[#6B6B63]">Explore our premium catalogue of best-selling corporate kits.</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${
                  activeFilter === cat
                    ? "bg-[#D32F2F] text-white"
                    : "bg-white text-[#6B6B63] hover:bg-[#FAF9F6] border border-[#F5C2C2]"
                }`}
              >
                {formatCategoryLabel(cat)}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={product.id}
                onClick={() => handleProductClick(product)}
                className="group bg-white rounded-2xl overflow-hidden border border-[#F5C2C2] shadow-sm hover:shadow-xl hover:shadow-[#F5C2C2]/50 transition-all flex flex-col h-full cursor-pointer"
              >
                <div className="relative h-64 overflow-hidden flex-shrink-0">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                    style={{ backgroundImage: `url(${product.image})` }}
                  />
                  <div className="absolute inset-0 bg-[#2B2B2B]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button 
                      variant="default" 
                      onClick={(e) => { e.stopPropagation(); handleProductClick(product); }}
                      className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300 bg-white text-[#2B2B2B] hover:bg-[#FAF9F6] border-none shadow-xl"
                    >
                      Request Quote
                    </Button>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow text-center justify-between">
                  <h3 className="text-xl font-semibold text-[#D32F2F] leading-tight line-clamp-2 min-h-[56px] flex items-center justify-center px-1 text-center mt-4 mb-6">{product.title}</h3>
                  <p className="text-[#2B2B2B] font-semibold mt-auto">Custom Quote</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
