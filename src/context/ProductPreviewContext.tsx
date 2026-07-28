"use client";

import React, { createContext, useContext, useState } from "react";

export interface PreviewProduct {
  title: string;
  description: string;
  imageUrl: string;
  price?: string;
  moq?: number;
  category?: string;
  subcategory?: string;
  brand?: string;
  images?: string[];
  features?: string[];
  overview?: string;
  brandingCapabilities?: string[];
  showBrandingCapabilities?: boolean;
  name?: string;
  displayName?: string;
  budget?: string;
}

interface ProductPreviewContextType {
  isOpen: boolean;
  product: PreviewProduct | null;
  openPreview: (product: PreviewProduct) => void;
  closePreview: () => void;
}

const ProductPreviewContext = createContext<ProductPreviewContextType | undefined>(undefined);

export function ProductPreviewProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState<PreviewProduct | null>(null);

  const openPreview = (p: PreviewProduct) => {
    setProduct(p);
    setIsOpen(true);
  };

  const closePreview = () => {
    setIsOpen(false);
  };

  return (
    <ProductPreviewContext.Provider value={{ isOpen, product, openPreview, closePreview }}>
      {children}
    </ProductPreviewContext.Provider>
  );
}

export function useProductPreview() {
  const context = useContext(ProductPreviewContext);
  if (!context) {
    throw new Error("useProductPreview must be used within a ProductPreviewProvider");
  }
  return context;
}
