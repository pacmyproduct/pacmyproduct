"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { COMPANY_INFO } from "@/data/siteConfig";

export function FloatingWhatsApp() {
  return (
    <motion.div 
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5, type: "spring" }}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50"
    >
      <a 
        href={COMPANY_INFO.whatsapp} 
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-[#25D366] text-white font-semibold p-3.5 sm:p-4 rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.4)] hover:scale-105 transition-transform duration-300 group"
      >
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out px-0 group-hover:px-2 text-xs sm:text-sm">
          Chat with us
        </span>
      </a>
    </motion.div>
  );
}
