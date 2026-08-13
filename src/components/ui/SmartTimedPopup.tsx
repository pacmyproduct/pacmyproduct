"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, Loader2, CheckCircle2, Send, Building2, User, Mail, 
  Phone, ShoppingBag, HelpCircle, Gift, Sparkles, ShieldCheck, Clock
} from "lucide-react";
import { useProductPreview } from "@/context/ProductPreviewContext";
import { sendCorporateQuoteEmail } from "@/lib/emailjs";

export function SmartTimedPopup() {
  const pathname = usePathname();
  const { isOpen: isPreviewOpen } = useProductPreview();

  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    quantity: "",
    requirements: ""
  });

  // Searchable Select States for Quantity selection
  const [showQtyDropdown, setShowQtyDropdown] = useState(false);
  const [qtySearch, setQtySearch] = useState("");
  const qtyDropdownRef = useRef<HTMLDivElement>(null);

  const qtyOptions = useMemo(() => ["50 - 100 units", "100 - 500 units", "500 - 2000 units", "2000+ units"], []);
  
  const filteredQtyOptions = useMemo(() => {
    return qtyOptions.filter((opt) => opt.toLowerCase().includes(qtySearch.toLowerCase()));
  }, [qtyOptions, qtySearch]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Must NOT show on Admin routes
    if (pathname?.startsWith("/87564/admin")) return;

    const popupShown = sessionStorage.getItem("popupShown");
    const popupDismissed = sessionStorage.getItem("popupDismissed");
    const enquirySubmitted = sessionStorage.getItem("enquirySubmitted");

    if (popupShown === "true" || popupDismissed === "true" || enquirySubmitted === "true") {
      return;
    }

    // Set 40-second timer
    const timer = setTimeout(() => {
      if (isPreviewOpen) {
        return;
      }
      setIsOpen(true);
      sessionStorage.setItem("popupShown", "true");
    }, 40000);

    return () => clearTimeout(timer);
  }, [pathname, isPreviewOpen]);

  // Auto-hide the widget if Product Preview opens while popup is active
  useEffect(() => {
    if (isPreviewOpen && isOpen) {
      setIsOpen(false);
      sessionStorage.setItem("popupDismissed", "true");
    }
  }, [isPreviewOpen, isOpen]);

  // Handle ESC close key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen && e.key === "Escape") {
        handleDismiss();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Non-blocking Click Outside handler
  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        handleDismiss();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  // Click outside listener for the custom quantity dropdown
  useEffect(() => {
    if (!showQtyDropdown) return;
    const clickOutsideDropdown = (e: MouseEvent) => {
      if (qtyDropdownRef.current && !qtyDropdownRef.current.contains(e.target as Node)) {
        setShowQtyDropdown(false);
      }
    };
    document.addEventListener("mousedown", clickOutsideDropdown);
    return () => document.removeEventListener("mousedown", clickOutsideDropdown);
  }, [showQtyDropdown]);

  // Focus trapping for Accessibility
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;
    const focusableElements = modalRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusableElements.length) return;
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    document.addEventListener("keydown", handleTabKey);
    return () => document.removeEventListener("keydown", handleTabKey);
  }, [isOpen]);

  const handleDismiss = useCallback(() => {
    setIsOpen(false);
    sessionStorage.setItem("popupDismissed", "true");
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleTextareaChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(Math.max(textarea.scrollHeight, 110), 190)}px`;
    handleChange(e);
  }, [handleChange]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.company.trim() || !form.email.trim() || !form.phone.trim() || !form.quantity) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    const payload = {
      name: form.name,
      company: form.company,
      email: form.email,
      phone: form.phone,
      quantity: form.quantity,
      budget: "Not Specified",
      source: "Corporate Quote Popup",
      message: `--- Corporate Gifting Requirements ---\n${form.requirements || "No specifications detailed."}`
    };

    try {
      // 1. Save to MongoDB
      await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      // 2. Send via EmailJS
      const emailResult = await sendCorporateQuoteEmail({
        customer_name: form.name,
        company_name: form.company,
        customer_email: form.email,
        phone: form.phone,
        quantity: form.quantity,
        requirements: form.requirements || "",
      });

      if (emailResult.success) {
        setStatus("success");
        sessionStorage.setItem("enquirySubmitted", "true");
        setForm({
          name: "",
          company: "",
          email: "",
          phone: "",
          quantity: "",
          requirements: "",
        });
        setTimeout(() => {
          setIsOpen(false);
        }, 2500);
      } else {
        setErrorMsg(emailResult.message || "Failed to submit request. Please try again.");
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          ref={modalRef}
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed z-50 bg-white/95 text-slate-900 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] border border-slate-200/80 rounded-[32px] text-left flex flex-col overflow-hidden bottom-6 left-6 md:left-10 w-full max-w-[480px] max-h-[88vh] max-sm:bottom-0 max-sm:left-0 max-sm:right-0 max-sm:w-full max-sm:rounded-t-[32px] max-sm:rounded-b-none backdrop-blur-xl"
        >
          
          {/* Close Button */}
          <button 
            onClick={handleDismiss}
            className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-slate-100 hover:bg-red-50 text-slate-400 hover:text-red-600 border border-slate-200/60 transition-all duration-200 hover:scale-105 cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>

          {status === "success" ? (
            <div className="py-16 px-8 flex flex-col items-center justify-center text-center space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 220, damping: 15 }}
                className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-inner border border-emerald-200"
              >
                <CheckCircle2 className="w-10 h-10" />
              </motion.div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Proposal Request Sent</h3>
              <p className="text-sm text-slate-600 font-medium max-w-xs leading-relaxed">
                Thank you! Our corporate gifting experts will prepare your customized proposal and contact you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col h-full max-h-[88vh] p-6 sm:p-7 space-y-4 overflow-y-auto scrollbar-thin">
              
              {/* Header */}
              <div className="space-y-2 pr-6">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-xl bg-red-50 text-red-600 border border-red-100">
                    <Gift className="w-5 h-5" />
                  </span>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight leading-tight">
                    Get Your Corporate Gifting Quote
                  </h3>
                </div>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Tell us about your gifting requirements and our experts will prepare a customized proposal tailored to your business.
                </p>

                {/* Trust Badge */}
                <div className="pt-1 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80 shadow-2xs">
                    <Clock className="w-3.5 h-3.5 text-emerald-600" /> ✔ Response within 24 Hours
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700">
                    <ShieldCheck className="w-3.5 h-3.5 text-slate-500" /> Enterprise Direct
                  </span>
                </div>
              </div>

              <div className="space-y-3.5 pt-2">
                {/* Name */}
                <label className="block text-[11px] font-extrabold text-slate-700 uppercase tracking-wider">
                  Your Name <span className="text-red-500">*</span>
                  <div className="relative mt-1 group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-red-600 transition-colors" />
                    <input 
                      required
                      type="text" 
                      name="name" 
                      value={form.name} 
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 pl-11 pr-4 h-[52px] text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all font-medium hover:border-slate-300"
                      placeholder="e.g. Rahul Sharma"
                    />
                  </div>
                </label>

                {/* Company Name */}
                <label className="block text-[11px] font-extrabold text-slate-700 uppercase tracking-wider">
                  Company Name <span className="text-red-500">*</span>
                  <div className="relative mt-1 group">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-red-600 transition-colors" />
                    <input 
                      required
                      type="text" 
                      name="company" 
                      value={form.company} 
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 pl-11 pr-4 h-[52px] text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all font-medium hover:border-slate-300"
                      placeholder="e.g. Acme Corporation"
                    />
                  </div>
                </label>

                {/* Company Email */}
                <label className="block text-[11px] font-extrabold text-slate-700 uppercase tracking-wider">
                  Company Email <span className="text-red-500">*</span>
                  <div className="relative mt-1 group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-red-600 transition-colors" />
                    <input 
                      required
                      type="email" 
                      name="email" 
                      value={form.email} 
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 pl-11 pr-4 h-[52px] text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all font-medium hover:border-slate-300"
                      placeholder="e.g. corporate@company.com"
                    />
                  </div>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Phone */}
                  <label className="block text-[11px] font-extrabold text-slate-700 uppercase tracking-wider">
                    Mobile Number <span className="text-red-500">*</span>
                    <div className="relative mt-1 group">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-red-600 transition-colors" />
                      <input 
                        required
                        type="tel" 
                        name="phone" 
                        value={form.phone} 
                        onChange={handleChange}
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 pl-11 pr-4 h-[52px] text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all font-medium hover:border-slate-300"
                        placeholder="10-digit number"
                      />
                    </div>
                  </label>

                  {/* Searchable Quantity Selection */}
                  <div className="block text-[11px] font-extrabold text-slate-700 uppercase tracking-wider relative" ref={qtyDropdownRef}>
                    Estimated Quantity <span className="text-red-500">*</span>
                    <div className="relative mt-1 group cursor-pointer" onClick={() => setShowQtyDropdown(!showQtyDropdown)}>
                      <ShoppingBag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-red-600 transition-colors" />
                      <input 
                        required
                        readOnly
                        type="text"
                        name="quantity"
                        value={form.quantity}
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 pl-11 pr-8 h-[52px] text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all font-medium hover:border-slate-300 cursor-pointer"
                        placeholder="Select Quantity"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs">▼</span>
                    </div>

                    {showQtyDropdown && (
                      <div className="absolute left-0 right-0 bottom-full mb-2 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden max-h-52 flex flex-col p-2">
                        <input
                          type="text"
                          value={qtySearch}
                          onChange={(e) => setQtySearch(e.target.value)}
                          placeholder="Filter quantity..."
                          className="w-full rounded-xl border border-slate-200 px-3 py-2 mb-2 text-xs focus:outline-none text-slate-900 bg-slate-50"
                        />
                        <div className="overflow-y-auto flex-1 space-y-1 scrollbar-thin">
                          {filteredQtyOptions.length > 0 ? (
                            filteredQtyOptions.map((opt) => (
                              <button
                                type="button"
                                key={opt}
                                onClick={() => {
                                  setForm((prev) => ({ ...prev, quantity: opt }));
                                  setShowQtyDropdown(false);
                                  setQtySearch("");
                                }}
                                className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
                              >
                                {opt}
                              </button>
                            ))
                          ) : (
                            <div className="text-center text-xs text-slate-400 py-2">No options match</div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Requirements Textarea */}
                <label className="block text-[11px] font-extrabold text-slate-700 uppercase tracking-wider">
                  Gifting Requirements & Branding Details
                  <div className="relative mt-1 group">
                    <HelpCircle className="absolute left-4 top-4 w-4 h-4 text-slate-400 group-focus-within:text-red-600 transition-colors" />
                    <textarea 
                      name="requirements"
                      value={form.requirements}
                      onChange={handleTextareaChange}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 pl-11 pr-4 py-3.5 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all font-medium hover:border-slate-300"
                      style={{ minHeight: "110px", maxHeight: "190px" }}
                      placeholder="Tell us about your gifting requirements, branding preferences, estimated quantity, occasion, budget and delivery location."
                    />
                  </div>
                </label>
              </div>

              {errorMsg && (
                <div className="text-xs font-bold text-red-700 bg-red-50 p-3 border border-red-200 rounded-xl">
                  {errorMsg}
                </div>
              )}

              {/* Form Buttons */}
              <div className="flex gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={handleDismiss}
                  className="flex-1 rounded-2xl border border-slate-200 bg-slate-100/80 hover:bg-slate-200 text-xs font-black text-slate-700 py-4 hover:scale-[1.01] active:scale-[0.98] transition-all text-center cursor-pointer uppercase tracking-wider"
                >
                  Maybe Later
                </button>
                <button 
                  type="submit" 
                  disabled={status === "submitting"}
                  className="flex-1 rounded-2xl bg-gradient-to-r from-red-600 via-red-500 to-rose-600 hover:from-red-500 hover:to-red-700 text-xs font-black text-white py-4 hover:scale-[1.01] active:scale-[0.98] transition-all text-center flex items-center justify-center gap-2 uppercase tracking-wider cursor-pointer shadow-lg hover:shadow-xl disabled:opacity-60"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Preparing Request...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Get Custom Quote
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
