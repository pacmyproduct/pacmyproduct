"use client";

import React from "react";
import { motion } from "framer-motion";

export default function PackagingSolutionsPage() {
  return (
    <div className="pt-2 sm:pt-4 pb-12 sm:pb-20 bg-[#FAF9F6] min-h-screen">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-xl sm:max-w-2xl lg:max-w-3xl overflow-hidden rounded-xl sm:rounded-3xl shadow-lg sm:shadow-2xl border border-gray-200/60 bg-white mx-auto"
        >
          <img
            src="/packagepic.jpeg"
            alt="Packaging Artwork"
            className="w-full h-auto object-contain block mx-auto"
          />
        </motion.div>
      </div>
    </div>
  );
}
