"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/Button";
import { Send, CheckCircle2, Loader2, AlertCircle, Package } from "lucide-react";
import { useShortlist } from "@/context/ShortlistContext";
import { getShortlistItemDisplayName } from "@/lib/enquiryHelper";

import { sendProductQuoteEmail } from "@/lib/emailjs";

export function BulkEnquiryForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const { items } = useShortlist();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    let finalPayload: any = { ...data, source: "Product Quote" };
    if (items.length > 0) {
      finalPayload.shortlist = items.map(item => ({
        title: getShortlistItemDisplayName(item),
        price: item.price
      }));
    }

    try {
      // 1. Save to MongoDB
      await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalPayload),
      });

      // 2. Send via EmailJS
      const emailResult = await sendProductQuoteEmail({
        customer_name: (data.name as string) || (data.customerName as string) || "",
        company_name: (data.company as string) || "",
        customer_email: (data.email as string) || "",
        phone: (data.phone as string) || "",
        product_name: items.length > 0 ? items.map(getShortlistItemDisplayName).join(", ") : (data.product as string) || "Bulk Enquiry",
        quantity: (data.quantity as string) || "",
        budget: (data.budget as string) || "",
        delivery_address: (data.deliveryAddress as string) || (data.address as string) || "",
        requirements: (data.message as string) || (data.requirements as string) || "",
      });

      if (emailResult.success) {
        setStatus("success");
      } else {
        setErrorMessage(emailResult.message || "Failed to send enquiry. Please try again.");
        setStatus("error");
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage("Failed to send enquiry. Please try again.");
      setStatus("error");
    }
  };

  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-red-600">Get a Custom Quote</h2>
            <p className="text-gray-600 text-lg mb-10 leading-relaxed font-medium">
              Planning a bulk requirement? Share your details below. Our corporate gifting experts will get back to you within 2-4 business hours with custom curations and pricing.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-gray-700">
                <span className="w-10 h-10 rounded-full bg-gray-100 text-gray-900 flex items-center justify-center font-bold">1</span>
                <span className="font-semibold text-lg">Tell us your requirements</span>
              </div>
              <div className="flex items-center gap-4 text-gray-700">
                <span className="w-10 h-10 rounded-full bg-gray-100 text-gray-900 flex items-center justify-center font-bold">2</span>
                <span className="font-semibold text-lg">Get a curated proposal</span>
              </div>
              <div className="flex items-center gap-4 text-gray-700">
                <span className="w-10 h-10 rounded-full bg-gray-100 text-gray-900 flex items-center justify-center font-bold">3</span>
                <span className="font-semibold text-lg">Approve and track your order</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gray-50 rounded-3xl p-8 md:p-10 border border-gray-200 shadow-sm relative min-h-[600px] flex flex-col justify-center"
          >
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="flex flex-col items-center justify-center h-full text-center py-12"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                    className="w-28 h-28 bg-[#FDECEC] rounded-full flex items-center justify-center mb-8"
                  >
                    <CheckCircle2 className="w-16 h-16 text-[#D32F2F]" />
                  </motion.div>
                  <motion.h3 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl font-bold mb-4 text-gray-900 tracking-tight"
                  >
                    Submission Successful!
                  </motion.h3>
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-600 mb-10 max-w-md mx-auto text-lg font-medium"
                  >
                    Our team will contact you shortly to discuss your custom curation and pricing.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Button 
                      variant="outline" 
                      onClick={() => setStatus("idle")}
                      className="px-8"
                    >
                      Submit Another Enquiry
                    </Button>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full"
                >
                  {items.length > 0 && (
                    <div className="mb-6 bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <Package className="w-4 h-4 text-gray-900" />
                        <span className="text-sm font-bold text-gray-800">Your shortlist contains {items.length} item(s):</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {items.map((item, idx) => (
                          <span key={idx} className="bg-gray-50 px-2 py-1 rounded-md text-xs font-semibold text-gray-700 border border-gray-200">
                            {item.title}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-bold text-gray-700">Full Name *</label>
                        <input suppressHydrationWarning required type="text" id="name" name="name" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900 transition-all font-medium text-gray-900" placeholder="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="company" className="text-sm font-bold text-gray-700">Company Name *</label>
                        <input suppressHydrationWarning required type="text" id="company" name="company" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900 transition-all font-medium text-gray-900" placeholder="Acme Corp" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-bold text-gray-700">Work Email *</label>
                        <input suppressHydrationWarning required type="email" id="email" name="email" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900 transition-all font-medium text-gray-900" placeholder="john@acmecorp.com" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-bold text-gray-750">Phone Number *</label>
                        <input suppressHydrationWarning required type="tel" id="phone" name="phone" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900 transition-all font-medium text-gray-900" placeholder="+91 98765 43210" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div className="space-y-2 col-span-1">
                        <label htmlFor="quantity" className="text-sm font-bold text-gray-700">Units *</label>
                        <select suppressHydrationWarning required id="quantity" name="quantity" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900 transition-all appearance-none cursor-pointer font-medium text-gray-900">
                          <option value="">Select</option>
                          <option value="50-100">50 - 100</option>
                          <option value="101-500">101 - 500</option>
                          <option value="501-1000">501 - 1000</option>
                          <option value="1000+">1000+</option>
                        </select>
                      </div>
                      <div className="space-y-2 col-span-1">
                        <label htmlFor="budget" className="text-sm font-bold text-gray-700">Per Kit Budget</label>
                        <select suppressHydrationWarning id="budget" name="budget" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900 transition-all appearance-none cursor-pointer font-medium text-gray-900">
                          <option value="">Select</option>
                          <option value="Under ₹1000">Under ₹1000</option>
                          <option value="₹1000-₹2500">₹1000-₹2500</option>
                          <option value="₹2500+">₹2500+</option>
                        </select>
                      </div>
                      <div className="space-y-2 col-span-1">
                        <label htmlFor="timeline" className="text-sm font-bold text-gray-700">Delivery Timeline</label>
                        <select suppressHydrationWarning id="timeline" name="timeline" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all appearance-none cursor-pointer font-medium text-gray-900">
                          <option value="">Select</option>
                          <option value="Urgent (< 1 week)">Urgent (&lt; 1 week)</option>
                          <option value="1-2 weeks">1-2 weeks</option>
                          <option value="2-4 weeks">2-4 weeks</option>
                          <option value="Flexible">Flexible</option>
                        </select>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full py-7 rounded-2xl text-lg font-bold group flex items-center justify-center gap-3 transition-all"
                      disabled={status === "submitting"}
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 className="w-6 h-6 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Send className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          Send Quote Request
                        </>
                      )}
                    </Button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
