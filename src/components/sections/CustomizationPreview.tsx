"use client";

import React from "react";
import { motion } from "framer-motion";
import { Upload, Palette, CheckCircle2 } from "lucide-react";

export function CustomizationPreview() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-[#2B2B2B] mb-6">See Your Brand Come to Life</h2>
            <p className="text-lg text-[#6B6B63] mb-8">
              We offer comprehensive customization options from elegant UV printing to subtle screen debossing. Simply upload your logo and our team will prepare high-fidelity mockups for your approval.
            </p>
            
            <div className="space-y-6">
              {[
                { icon: <Upload />, title: "Upload Logo", desc: "Share your brand assets in hi-res format." },
                { icon: <Palette />, title: "Visual Mockups", desc: "Review how your brand looks on selected products." },
                { icon: <CheckCircle2 />, title: "Production", desc: "Once approved, bulk branding commences immediately." },
              ].map((step, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="bg-[#F8F7F3] p-3 rounded-lg text-[#D32F2F] border border-[#F5C2C2] shadow-sm">
                    {step.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#D32F2F]">{step.title}</h4>
                    <p className="text-[#6B6B63] font-medium">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            {/* Abstract UI Mockup */}
            <div className="relative w-full max-w-md bg-[#FAF9F6] rounded-3xl p-6 border border-[#F5C2C2] shadow-2xl flex flex-col items-center">
              {/* Fake Browser/App Header */}
              <div className="w-full flex justify-between items-center mb-8 border-b border-[#F5C2C2] pb-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#F5C2C2]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#F8F7F3]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#FAF9F6]"></div>
                </div>
                <div className="text-xs font-semibold text-[#6B6B63]">Branding Preview</div>
              </div>

              {/* Upload Dropzone UI */}
              <div className="w-full border-2 border-dashed border-[#F5C2C2] bg-white rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#FAF9F6] transition-colors mb-6">
                <Upload className="w-10 h-10 text-[#6B6B63] mb-4" />
                <p className="font-semibold text-[#2B2B2B]">Drop Your Logo Here</p>
                <p className="text-xs text-[#6B6B63] mt-1">PNG, SVG or AI up to 10MB</p>
              </div>

              {/* Fake Product Preview */}
              <div className="w-full bg-white rounded-xl shadow-sm p-4 border border-[#F5C2C2] flex items-center gap-4">
                <div className="w-16 h-16 bg-[#F8F7F3] rounded-lg flex items-center justify-center">
                  <Package className="w-8 h-8 text-[#F5C2C2]" />
                </div>
                <div className="flex-1">
                  <div className="h-4 bg-[#F8F7F3] rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-[#FAF9F6] rounded w-1/2"></div>
                </div>
                <div className="bg-[#D32F2F] text-white text-xs px-2 py-1 rounded font-bold">READY</div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

const Package = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="21 8 21 21 3 21 3 8" />
    <rect x="1" y="3" width="22" height="5" />
    <line x1="10" y1="12" x2="14" y2="12" />
  </svg>
)
