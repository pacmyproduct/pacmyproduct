"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { cn } from "@/lib/utils";
import { Bookmark } from "lucide-react";
import { useShortlist } from "@/context/ShortlistContext";
import { useProductPreview } from "@/context/ProductPreviewContext";
import { useRouter } from "next/navigation";
import { localCatalogImage } from "@/lib/localCatalogImages";
import { SafeImage } from "./SafeImage";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { resolveProductImage } from "@/lib/imageResolver";
import { cleanProductTitle, resolveDisplayName } from "@/lib/slugResolver";
import { buildEnquiryUrl } from "@/lib/enquiryHelper";
import { toDisplayName } from "@/lib/displayNames";

interface ProductCardProps {
  title: string;
  description?: string;
  imageUrl: string;
  price?: string;
  moq?: number;
  brandingOptions?: string[];
  className?: string;
  index?: number;
  category?: string;
  subcategory?: string;
  brand?: string;
  href?: string;
  slug?: string;
  isProduct?: boolean;
  images?: string[];
  features?: string[];
  displayName?: string;
  overview?: string;
  brandingCapabilities?: string[];
  showBrandingCapabilities?: boolean;
}

export function ProductCard({ 
  title, 
  description, 
  imageUrl, 
  price, 
  moq, 
  brandingOptions = [], 
  className, 
  index = 0, 
  category, 
  subcategory,
  brand,
  href, 
  slug,
  isProduct = true,
  images = [],
  features = [],
  displayName,
  overview,
  brandingCapabilities,
  showBrandingCapabilities
}: ProductCardProps) {
  const { addToShortlist, removeFromShortlist, isInShortlist } = useShortlist();
  const { openPreview } = useProductPreview();
  const router = useRouter();
  const prefersReduced = useReducedMotion();
  
  const isSelected = isInShortlist(title);
  const displayImage = resolveProductImage({ title, imageUrl, category, slug }) || "";

  const getCardDisplayName = () => {
    const rawName = resolveDisplayName({ title, category, subcategory, displayName });
    return isProduct ? rawName : toDisplayName(rawName);
  };

  const handleToggleShortlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSelected) {
      removeFromShortlist(title);
    } else {
      addToShortlist({ title, imageUrl: displayImage, price, category, subcategory, brand });
    }
  };

  const handleRequestQuote = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isProduct) {
      openPreview({
        title,
        description: description || "",
        imageUrl: displayImage,
        price,
        moq,
        category,
        subcategory,
        brand,
        images: images.length > 0 ? images : [displayImage],
        features: features.length > 0 ? features : brandingOptions,
        displayName,
        overview,
        brandingCapabilities,
        showBrandingCapabilities
      });
      return;
    }
    const targetUrl = buildEnquiryUrl({ category, subcategory, brand, moq });
    router.push(targetUrl);
  };

  const handleCardClick = () => {
    if (isProduct) {
      openPreview({
        title,
        description: description || "",
        imageUrl: displayImage,
        price,
        moq,
        category,
        subcategory,
        brand,
        images: images.length > 0 ? images : [displayImage],
        features: features.length > 0 ? features : brandingOptions,
        displayName,
        overview,
        brandingCapabilities,
        showBrandingCapabilities
      });
      return;
    }
    if (href) {
      router.push(href);
      return;
    }
  };

  return (
    <motion.div 
      initial={prefersReduced ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 15, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ 
        duration: 0.55, 
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.07
      }}
      whileHover={prefersReduced ? undefined : { y: -10, scale: 1.01 }}
      whileTap={prefersReduced ? undefined : { scale: 0.97 }}
      onClick={handleCardClick}
      className={cn(
        "group flex flex-col h-full relative overflow-hidden rounded-[20px] bg-white shadow-[0_4px_20px_rgba(43,43,43,0.06)] border border-[#F5C2C2] transition-all hover:shadow-[0_16px_40px_rgba(43,43,43,0.12)] hover:border-[#EF5350]/40 cursor-pointer", 
        className
      )}
    >
      <div className="relative w-full h-[250px] overflow-hidden bg-[#FAF9F6] flex-shrink-0">
        <SafeImage 
          src={displayImage} 
          alt={cleanProductTitle(title)}
          category={category}
          useNextImage={true}
          nextImageProps={{
            fill: true,
            sizes: "(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          }}
          className="absolute inset-0 h-full w-full object-cover"
        />
        
        {/* Subtle shimmer sweep on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-all duration-700 ease-in-out pointer-events-none" />

        {!isProduct && (
          <div className="absolute top-3 right-3 z-10">
             <motion.button
              whileHover={prefersReduced ? undefined : { scale: 1.1 }}
              whileTap={prefersReduced ? undefined : { scale: 0.9 }}
              onClick={handleToggleShortlist}
              className="p-2.5 rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white transition-all focus:outline-none"
              aria-label="Save for quote"
            >
              <Bookmark className={cn("w-4 h-4 transition-colors", isSelected ? "fill-[#D32F2F] text-[#D32F2F]" : "text-[#6B6B63] hover:text-[#2B2B2B]")} />
            </motion.button>
          </div>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-grow justify-between items-center h-full">
        {isProduct ? (
          // Product Card Layout: Display Name and Get Quote button
          <div className="w-full flex flex-col justify-between flex-grow text-center h-full">
            <div className="text-center flex flex-col justify-center items-center flex-grow">
              <h3 className="text-xl font-semibold text-[#D32F2F] leading-tight line-clamp-2 min-h-[56px] flex items-center justify-center px-1 text-center mt-4 mb-6">
                {getCardDisplayName()}
              </h3>
            </div>
            <motion.div
              className="w-full text-center"
              initial={prefersReduced ? false : { y: 4, opacity: 0.8 }}
              whileHover={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Button 
                variant="outline" 
                size="default" 
                onClick={handleRequestQuote}
                className="w-full text-[13px] font-bold h-10 border-[#EF5350] text-[#D32F2F] hover:bg-[#D32F2F] hover:text-white transition-all duration-200 rounded-xl"
              >
                Get Quote
              </Button>
            </motion.div>
          </div>
        ) : (
          // Category / Subcategory / Collection Card Layout (Keeps Name and Description)
          <div className="flex flex-col w-full h-full justify-between flex-grow text-left">
            <div className="flex flex-col flex-grow">
              <div className="mb-3 min-h-[44px]">
                <h3 className="text-[17px] font-bold text-[#D32F2F] leading-tight line-clamp-2 transition-colors group-hover:text-[#C62828]">{getCardDisplayName()}</h3>
              </div>
              
              <div className="min-h-[40px] mb-4">
                {description ? (
                  <p className="text-[#6B6B63] text-[13px] line-clamp-2 leading-relaxed">{description}</p>
                ) : (
                  <p className="text-[#6B6B63] text-[13px] line-clamp-2 leading-relaxed">&nbsp;</p>
                )}
              </div>
            </div>
            
            <div className="mt-auto pt-4 border-t border-[#F5C2C2] flex items-center justify-between w-full">
              {price ? (
                <span className="font-bold text-[#2B2B2B] text-sm">{price}</span>
              ) : (
                <span className="text-[11px] font-bold text-[#6B6B63] uppercase tracking-wider">Contact for Price</span>
              )}
              <motion.div
                initial={prefersReduced ? false : { y: 8, opacity: 0.7 }}
                whileHover={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.25 }}
              >
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleRequestQuote}
                  className="text-[12px] h-8 px-3 hover:scale-[1.04] hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200"
                >
                  Get Quote
                </Button>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
