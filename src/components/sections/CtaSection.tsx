"use client";

import React from "react";
import Link from "next/link";
import { Button } from "../ui/Button";
import { MessageCircle, Mail, HelpCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { COMPANY_INFO } from "@/data/siteConfig";
import { scaleIn, staggerContainerSlow, staggerItem, EASE_SMOOTH } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function CtaSection() {
  const prefersReduced = useReducedMotion();
  return (
    <section className="py-24 bg-[#F8F7F3] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={prefersReduced ? false : { opacity: 0, scale: 0.97, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: EASE_SMOOTH }}
          className="luxury-gradient rounded-3xl p-10 md:p-20 text-center relative overflow-hidden border border-white/5 shadow-2xl"
        >
          {/* Background glowing spheres */}
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#D32F2F]/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-[#EF5350]/10 rounded-full blur-[80px] pointer-events-none" />

          <motion.div
            variants={prefersReduced ? undefined : staggerContainerSlow}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative z-10 max-w-3xl mx-auto space-y-6"
          >
            <motion.span variants={prefersReduced ? undefined : staggerItem} className="text-[#EF5350] text-xs font-bold tracking-widest uppercase block">Ready to Partner?</motion.span>
            
            <motion.h2 variants={prefersReduced ? undefined : staggerItem} className="text-3xl md:text-5xl font-black text-white leading-tight">
              Let&apos;s Design Your Custom <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EF5350] via-[#e8c68a] to-[#EF5350]">Gifting Experience</span>
            </motion.h2>
            
            <motion.p variants={prefersReduced ? undefined : staggerItem} className="text-sm sm:text-base md:text-lg text-gray-300 max-w-xl mx-auto leading-relaxed font-medium">
              Contact our corporate gifting style consultants. Get free catalogue samples, structural diework designs, and custom branding proposals.
            </motion.p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
              <Button size="lg" className="rounded-xl text-sm px-10 h-13 flex items-center justify-center gap-2 group" asChild>
                <Link href="/enquiry">
                  Request Custom Proposal
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-xl text-sm px-10 h-13 flex items-center justify-center gap-2 border-white/10 text-white bg-white/5 hover:bg-white/10 transition-all font-bold" asChild>
                <a href={COMPANY_INFO.whatsapp} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 text-[#EF5350]" />
                  Direct WhatsApp Help
                </a>
              </Button>
            </div>

            <div className="flex justify-center gap-6 pt-10 text-xs text-gray-400 border-t border-white/10 mt-10">
              <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-[#EF5350]" /> {COMPANY_INFO.email}</span>
              <span className="flex items-center gap-1.5"><HelpCircle className="w-3.5 h-3.5 text-[#EF5350]" /> Response: Under 2 Hours</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

