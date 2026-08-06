"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BackgroundGradient } from "@/components/layout/BackgroundGradient";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowRight, Eye } from "lucide-react";
import { SafeImage } from "@/components/ui/SafeImage";

const GALLERY_CATEGORIES = [
  { id: "all", label: "All Projects" },
  { id: "kits", label: "Welcome Kits" },
  { id: "packaging", label: "Luxury Boxes & Packaging" },
  { id: "merch", label: "Custom Swag & Merchandise" },
] as const;

const PORTFOLIO_ITEMS = [
  {
    title: "Executive Onboarding Kit",
    category: "kits",
    img: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop",
    desc: "Rigid luxury welcome box containing premium leather diary, steel bottle, metal pen, and keychains.",
  },
  {
    title: "Custom Rigid Slide Box",
    category: "packaging",
    img: "https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=800&auto=format&fit=crop",
    desc: "Premium greyboard giftbox with metallic foil hot-stamping and custom EVA foam card layout slot.",
  },
  {
    title: "Eco Kraft Shipping Carton",
    category: "packaging",
    img: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop",
    desc: "Corrugated e-commerce subscription box printed with organic soy-based inks.",
  },
  {
    title: "Laser Engraved Tech Gear",
    category: "merch",
    img: "https://images.unsplash.com/photo-1593642532744-d377ab507dc8?q=80&w=800&auto=format&fit=crop",
    desc: "High-definition custom logo branding on premium power banks, charging hubs, and mouse pads.",
  },
  {
    title: "Embossed Leather Diaries",
    category: "merch",
    img: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=800&auto=format&fit=crop",
    desc: "Handcrafted textured PU leatherette notebooks with customized steel nameplate inserts.",
  },
  {
    title: "Festive Diwali Gift Hamper",
    category: "kits",
    img: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop",
    desc: "Luxury festival boxes carrying dry fruit jars, floating brass diyas, and greeting cards.",
  },
];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredItems = activeFilter === "all"
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((item) => item.category === activeFilter);

  return (
    <div className="pt-32 pb-24 relative min-h-screen bg-[#fafafa] overflow-hidden max-w-full">
      <BackgroundGradient className="opacity-15 blur-[140px]" />
      
      {/* Soft overlay */}
      <div className="absolute top-0 left-0 right-0 h-[450px] bg-gradient-to-b from-red-50/30 to-transparent pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Page Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-4 py-1.5 rounded-full bg-red-50 text-red-600 text-xs font-bold tracking-widest uppercase mb-4 inline-block border border-red-100">
            Portfolio
          </span>
          <SectionHeading 
            title={<>Our Past <span className="text-red-600">Creations</span></>}
            subtitle="Take a look at the product details, craftsmanship, and branding quality of some premium bespoke kits and custom boxes we have executed." 
            centered 
          />
        </div>

        {/* Categories Tab Navigation */}
        <div className="flex justify-center mb-16 px-4">
          <div className="inline-flex flex-wrap p-1 bg-white border border-gray-200/85 rounded-2xl shadow-sm gap-1 w-full sm:w-auto">
            {GALLERY_CATEGORIES.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`flex items-center justify-center px-6 py-3 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 w-full sm:w-auto ${
                    isActive
                      ? "bg-gray-900 text-white shadow-md shadow-gray-900/10"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="relative min-h-[400px]">
          <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, idx) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  key={item.title}
                  className="group relative overflow-hidden rounded-2xl shadow-sm border border-gray-250/70 bg-white cursor-pointer"
                >
                  {/* Image wrapper */}
                  <div className="aspect-[4/3] w-full overflow-hidden bg-gray-50 relative">
                    <div className="absolute inset-0 bg-black/10 z-10 group-hover:bg-black/0 transition-colors duration-500" />
                    <SafeImage 
                      src={item.img} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      alt={item.title}
                      category={item.category}
                    />
                    
                    {/* Hover eye icon */}
                    <div className="absolute inset-0 bg-gray-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                      <span className="p-3.5 rounded-full bg-white text-gray-900 shadow-md transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <Eye className="w-5 h-5" />
                      </span>
                    </div>
                  </div>

                  {/* Content panel */}
                  <div className="p-6 text-left border-t border-gray-100">
                    <span className="text-[10px] font-bold tracking-widest text-red-600 uppercase mb-1 block">
                      {item.category === "kits" ? "Welcome Kit Set" : item.category === "packaging" ? "Bespoke Packaging" : "Custom Swag"}
                    </span>
                    <h4 className="text-base font-bold text-gray-900 mb-1 group-hover:text-red-600 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-gray-500 text-xs leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 p-8 md:p-16 rounded-3xl bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white relative overflow-hidden border border-white/5 shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-4xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-left">
              <span className="text-[10px] font-bold tracking-widest text-red-500 uppercase block mb-3">
                Request Custom Sample Runs
              </span>
              <h3 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-4 text-white leading-tight">
                Want to see our physical <span className="text-red-500">sample quality</span>?
              </h3>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                Connect with our advisors to order a pre-printed sample box with different paper finishes, foil textures, and board qualities sent straight to your office.
              </p>
            </div>
            <div className="flex-shrink-0 w-full md:w-auto">
              <Button
                size="lg"
                className="w-full md:w-auto font-bold rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white shadow-xl shadow-red-900/20 border-0 flex items-center justify-center gap-2 group py-4 px-8"
                asChild
              >
                <Link href="/enquiry?source=gallery-sample-request">
                  Order Sample Kit
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
