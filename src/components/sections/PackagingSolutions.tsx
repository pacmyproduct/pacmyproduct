"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Package, Settings, CheckCircle2, ArrowRight, Box, Layers, HelpCircle
} from "lucide-react";
import { Button } from "../ui/Button";
import { SITE_PACKAGING, PROCESS_STEPS } from "@/data/siteConfig";
import { SafeImage } from "../ui/SafeImage";
import { buildEnquiryUrl } from "@/lib/enquiryHelper";

export function PackagingSolutions() {
  const [activeTab, setActiveTab] = useState("mono");
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  const currentProduct = SITE_PACKAGING.find(p => p.id === activeTab) || SITE_PACKAGING[0];

  const togglingAccordion = (idx: number) => {
    if (openAccordion === idx) {
      setOpenAccordion(null);
    } else {
      setOpenAccordion(idx);
    }
  };

  return (
    <section className="py-24 bg-[#FAF9F6] relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#D32F2F]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#EF5350]/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl text-left">
            <span className="text-[#EF5350] text-xs font-bold tracking-widest uppercase mb-3 flex items-center gap-1.5">
              <Box className="w-4 h-4 text-[#EF5350]" /> In-House Custom Manufacturing
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#2B2B2B] mb-4">
              Premium <span className="text-[#D32F2F]">Packaging Solutions</span>
            </h2>
            <p className="text-base sm:text-lg text-[#6B6B63]">
              We manufacture premium customized packaging solutions designed for safe, attractive, and high-quality product presentation.
            </p>
          </div>
          <Button variant="outline" className="hidden md:inline-flex rounded-xl font-bold" asChild>
            <Link href="/packaging-solutions">Explore Packaging Services</Link>
          </Button>
        </div>

        {/* Interactive Layout Grid */}
        <div className="grid gap-8 xl:grid-cols-12 xl:items-start xl:gap-12 mb-20">
          
          {/* Left Column: Tab Selectors & Specs Accordion */}
          <div className="xl:col-span-4 space-y-5 xl:sticky xl:top-28">
            <div className="rounded-3xl border border-[#F5C2C2] bg-white p-3 shadow-sm">
              <div className="flex items-center justify-between gap-3 px-2 pb-3">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#EF5350]">Packaging Types</span>
                  <p className="mt-1 text-xs font-semibold text-[#6B6B63]">{SITE_PACKAGING.length} options available</p>
                </div>
                <span className="rounded-full bg-[#F8F7F3] px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#6B6B63]">Scroll</span>
              </div>
              <div className="max-h-[360px] space-y-2 overflow-y-auto pr-1 sm:max-h-[430px] xl:max-h-[520px]">
                {SITE_PACKAGING.map((prod) => (
                  <button
                    key={prod.id}
                    onClick={() => setActiveTab(prod.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-3 group ${
                      activeTab === prod.id
                        ? "bg-[#F8F7F3] border-[#D32F2F]/30 shadow-sm text-[#2B2B2B]"
                        : "bg-white border-[#F5C2C2] hover:bg-[#FAF9F6] text-[#6B6B63] hover:text-[#2B2B2B]"
                    }`}
                  >
                    <div className="min-w-0 text-left">
                      <h3 className={`truncate font-bold text-[14px] ${activeTab === prod.id ? "text-[#D32F2F]" : "text-[#2B2B2B] group-hover:text-[#D32F2F] transition-colors"}`}>
                        {prod.title}
                      </h3>
                      <p className="mt-1 truncate text-[9px] text-[#6B6B63] font-bold uppercase tracking-wider">{prod.tagline}</p>
                    </div>
                    <ArrowRight className={`h-4 w-4 flex-shrink-0 transition-all ${
                      activeTab === prod.id ? "translate-x-1 text-[#D32F2F]" : "text-[#F5C2C2] group-hover:text-[#6B6B63] group-hover:translate-x-0.5"
                    }`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Accordion Specifications Panel */}
            <div className="border border-[#F5C2C2] rounded-2xl overflow-hidden bg-[#FAF9F6] p-2 space-y-2">
              <div className="px-4 py-2 text-xs font-bold text-[#6B6B63] uppercase tracking-widest flex items-center gap-1.5">
                <Settings className="w-3.5 h-3.5" /> Technical Standards
              </div>
              
              {[
                { title: "Custom Sizing & Precision Cuts", content: "Our team creates precise packaging templates corresponding to your items. We dispatch physical sample proofs for shape approval before printing." },
                { title: "ECO Board Materials", content: "From recycled FSC kraft paper stocks to double-ply white test liners. Choose between E/B flutes or solid greyboards from 1.5mm to 3mm." },
                { title: "SLA Production Timelines", content: "Production ranges from 5 to 7 days for custom mailers, and up to 14 working days for complex handmade rigid gift chests." }
              ].map((item, idx) => (
                <div key={idx} className="border border-[#F5C2C2] rounded-xl bg-white overflow-hidden shadow-sm text-left">
                  <button
                    onClick={() => togglingAccordion(idx)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left font-bold text-xs sm:text-sm text-[#2B2B2B] hover:bg-[#FAF9F6] transition-colors"
                  >
                    <span>{item.title}</span>
                    <span className="text-[#6B6B63]">{openAccordion === idx ? "−" : "+"}</span>
                  </button>
                  <AnimatePresence>
                    {openAccordion === idx && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-5 pb-4 text-xs text-[#6B6B63] leading-relaxed"
                      >
                        {item.content}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Button className="w-full rounded-xl font-bold h-12 flex items-center justify-center gap-2" asChild>
                <Link href={`/enquiry?source=packaging&type=${activeTab}`}>
                  Request Free Flat Mockup
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Column: Interactive Showcase */}
          <div className="xl:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-12 gap-8 bg-[#F8F7F3] p-6 sm:p-8 rounded-3xl border border-[#F5C2C2] shadow-sm xl:min-h-[520px]"
              >
                {/* Image preview container */}
                <div className="md:col-span-5 relative aspect-square sm:aspect-[4/5] md:aspect-auto md:h-full rounded-2xl overflow-hidden bg-white border border-[#F5C2C2] shadow-sm flex items-center justify-center group/iso min-h-[300px]">
                  <div className="absolute inset-0 z-0">
                    <SafeImage
                      src={currentProduct.img}
                      alt={currentProduct.title}
                      category={currentProduct.id}
                      useNextImage
                      className="object-cover transition-transform duration-700 group-hover/iso:scale-105"
                      nextImageProps={{
                        fill: true,
                        unoptimized: true,
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2B2B2B]/85 via-[#2B2B2B]/10 to-transparent pointer-events-none" />
                  
                  {/* Floating indicators */}
                  <div className="absolute bottom-4 left-4 right-4 text-left">
                    <span className="text-[9px] text-[#EF5350] font-extrabold uppercase tracking-widest block">Lead Time SLA</span>
                    <span className="text-xs text-white font-extrabold flex items-center gap-1.5 mt-0.5">
                      <Settings className="w-3.5 h-3.5 animate-spin" /> {currentProduct.leadTime}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4 z-20 bg-[#2B2B2B]/70 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-xl text-[10px] font-extrabold uppercase tracking-wider text-white flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#EF5350]" /> Custom Board Stock
                  </div>
                </div>

                {/* Details list */}
                <div className="md:col-span-7 flex flex-col justify-between space-y-6 text-left">
                  <div>
                    <h3 className="text-2xl font-black text-[#2B2B2B] leading-tight">
                      {currentProduct.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6B6B63] mt-2 leading-relaxed">
                      {currentProduct.desc}
                    </p>
                  </div>

                  {/* Material checklist */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-[#EF5350] mb-2.5">
                        Material & Board Stock
                      </h4>
                      <div className="grid gap-2">
                        {currentProduct.materials.map((m, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs font-bold text-[#2B2B2B]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#D32F2F] flex-shrink-0" />
                            {m}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-[#EF5350] mb-2.5">
                        Premium Finish Options
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {currentProduct.finishes.map((f, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs font-bold text-[#6B6B63]">
                            <span className="w-1.5 h-1.5 bg-[#F5C2C2] rounded-full flex-shrink-0" />
                            {f}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#F5C2C2] flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#6B6B63]">Custom Shapes & Sizes</span>
                    <Link
                      href={buildEnquiryUrl({ category: "packaging", subcategory: currentProduct.title })}
                      className="text-xs font-bold text-[#D32F2F] hover:text-[#C62828] uppercase tracking-widest inline-flex items-center gap-1"
                    >
                      Configure Specs <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Manufacturing Process Timeline */}
        <div className="border-t border-[#F5C2C2] pt-20">
          <div className="text-center mb-12">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#6B6B63]">Step-by-Step Curation</span>
            <h3 className="text-2xl font-black text-[#2B2B2B] mt-2">
              Our Packaging Customization Process
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((proc, idx) => (
              <div 
                key={idx}
                className="p-6 bg-white border border-[#F5C2C2] rounded-2xl text-left relative group hover:border-[#D32F2F]/30 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-3xl font-black text-[#F8F7F3] group-hover:text-[#F5C2C2] transition-colors mb-4">
                  {proc.step}
                </div>
                <h4 className="font-extrabold text-sm text-[#2B2B2B] mb-2">
                  {proc.name}
                </h4>
                <p className="text-xs leading-relaxed text-[#6B6B63]">
                  {proc.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
