"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "../ui/Button";
import { 
  Sparkles, Award, Compass, Workflow, Truck, CheckCircle2 
} from "lucide-react";
import { fadeLeft, fadeRight, staggerContainerSlow, staggerItemLeft, EASE_SMOOTH } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const TIMELINE_SERVICES = [
  {
    step: "01",
    title: "Premium Curation",
    description: "Our corporate styling experts curate items custom-tailored to your brand aesthetic.",
    icon: <Compass className="w-4 h-4 text-[#D32F2F]" />
  },
  {
    step: "02",
    title: "Global Sourcing",
    description: "We source authentic products directly from certified co-branded manufacturers.",
    icon: <Workflow className="w-4 h-4 text-[#D32F2F]" />
  },
  {
    step: "03",
    title: "Bespoke Customization",
    description: "Logo embossing, hot foil stamping, screen print & precision laser engraving.",
    icon: <Sparkles className="w-4 h-4 text-[#D32F2F]" />
  },
  {
    step: "04",
    title: "End-to-End Fulfillment",
    description: "White-glove quality assurance and direct pan-India individual employee shipping.",
    icon: <Truck className="w-4 h-4 text-[#D32F2F]" />
  }
];

export function AboutPreview() {
  const prefersReduced = useReducedMotion();
  return (
    <section className="py-24 bg-[#FAF9F6] overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Title & Timeline */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.75, ease: EASE_SMOOTH }}
            className="lg:col-span-6 space-y-8 text-left"
          >
            <div>
              <span className="text-[#EF5350] text-xs font-bold tracking-widest uppercase mb-3 block">How We Deliver Excellence</span>
              <h2 className="text-3xl md:text-4xl font-black text-[#2B2B2B] leading-tight">
                Your End-to-End Strategic <br />
                <span className="text-[#D32F2F]">Corporate Gifting Partner</span>
              </h2>
              <p className="text-sm sm:text-base text-[#6B6B63] mt-4 leading-relaxed max-w-xl font-medium">
                We handle the complete corporate merchandising lifecycle. From product curation to doorstep delivery, we ensure brand consistency and premium B2B execution.
              </p>
            </div>

            {/* Timeline */}
            <div className="relative border-l border-[#F5C2C2] ml-3.5 pl-8 space-y-8">
              {TIMELINE_SERVICES.map((serv, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative group text-left"
                >
                  {/* Timeline Dot Indicator */}
                  <span className="absolute -left-[45px] top-1 bg-white border-2 border-[#D32F2F] w-8 h-8 rounded-full flex items-center justify-center shadow-sm group-hover:bg-[#D32F2F] transition-colors duration-300">
                    <span className="text-[10px] font-extrabold text-[#2B2B2B] group-hover:text-white transition-colors">
                      {serv.step}
                    </span>
                  </span>

                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#2B2B2B] flex items-center gap-2 group-hover:text-[#D32F2F] transition-colors">
                      {serv.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6B6B63] mt-1 leading-relaxed max-w-lg">
                      {serv.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Button size="lg" className="rounded-xl px-8 h-12" asChild>
                <Link href="/about">Learn More About Us</Link>
              </Button>
              <div className="flex items-center gap-2 text-[10px] sm:text-xs text-[#6B6B63] font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-[#D32F2F]" /> SLA: 100% Quality Guarantee
              </div>
            </div>
          </motion.div>

          {/* Right Column: Animated collage */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.75, ease: EASE_SMOOTH, delay: 0.1 }}
            className="lg:col-span-6 relative h-[450px] sm:h-[550px] flex items-center justify-center"
          >
            
            {/* Background Base Hamper Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="absolute left-4 top-4 w-[280px] h-[340px] sm:w-[345px] sm:h-[425px] rounded-3xl overflow-hidden shadow-xl border-4 border-white"
            >
              <img 
                src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop" 
                alt="Corporate Hamper Box" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B2B2B]/55 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white text-left">
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#EF5350]">Festive curations</span>
                <h4 className="text-sm font-bold mt-0.5">Luxury Gift Curation</h4>
              </div>
            </motion.div>

            {/* Overlapping Card 1: Custom Leather Journals */}
            <motion.div
              initial={{ opacity: 0, y: 30, x: 20 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="absolute right-4 bottom-4 w-[180px] h-[220px] sm:w-[225px] sm:h-[285px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white group"
            >
              <img 
                src="https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=600&auto=format&fit=crop" 
                alt="Corporate Diary Customization" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B2B2B]/55 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white text-left">
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#EF5350]">Premium Branding</span>
                <h4 className="text-xs font-bold mt-0.5">Leather Journals</h4>
              </div>
            </motion.div>

            {/* Overlapping Card 2: Floating Custom badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute right-12 top-16 bg-white p-5 rounded-2xl shadow-xl flex flex-col items-center justify-center text-center border border-[#F5C2C2] z-10 hover:scale-105 transition-transform"
            >
              <div className="w-12 h-12 rounded-xl bg-[#F8F7F3] flex items-center justify-center text-[#D32F2F] mb-2">
                <Award className="w-6 h-6" />
              </div>
              <div className="text-lg font-black text-[#2B2B2B]">15+ Years</div>
              <div className="text-[9px] font-extrabold text-[#6B6B63] uppercase tracking-widest mt-0.5">Industry Trust</div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}

