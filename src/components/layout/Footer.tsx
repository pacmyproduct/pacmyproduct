"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Check, 
  ArrowRight,
  ShieldCheck,
  Clock,
} from "lucide-react";
import { 
  COMPANY_INFO, 
  CORPORATE_GIFTS, 
  OCCASION_HAMPERS
} from "@/data/siteConfig";

// Inline SVGs for Brand Icons
const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2500/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
);

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
      setEmail("");
    }, 1000);
  };

  return (
    <footer className="bg-[#2B2B2B] text-white border-t border-[#F5C2C2]/10 pt-20 pb-10 relative overflow-hidden">
      
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 -translate-y-1/2 w-80 h-80 bg-[#D32F2F]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 -translate-y-1/2 w-80 h-80 bg-[#EF5350]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Newsletter & Brand Info row */}
        <div className="grid lg:grid-cols-12 gap-8 pb-16 border-b border-[#F5C2C2]/10">
          <div className="lg:col-span-5 space-y-5">
            <Link href="/" className="inline-block">
              <div className="flex items-center">
                <Image
                  src="/pacmyproductlogo1.png"
                  alt="PacMyProduct Logo"
                  width={44}
                  height={56}
                  priority={false}
                  className="w-11 h-auto object-contain select-none"
                />
              </div>
            </Link>
            <p className="text-[rgba(255,255,255,0.88)] text-sm leading-relaxed max-w-md font-medium">
              Bespoke B2B packaging and luxury corporate gifting solutions. Crafting premium onboarding kits, custom merchandise, and rigid custom cartons to elevate your enterprise brand presence.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-4 pt-2">
              {[
                { icon: <LinkedinIcon className="w-4 h-4" />, href: "#", name: "LinkedIn" },
                { icon: <InstagramIcon className="w-4 h-4" />, href: "#", name: "Instagram" },
                { icon: <FacebookIcon className="w-4 h-4" />, href: "#", name: "Facebook" },
                { icon: <TwitterIcon className="w-4 h-4" />, href: "#", name: "Twitter" }
              ].map((soc) => (
                <a
                  key={soc.name}
                  href={soc.href}
                  aria-label={soc.name}
                  className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:text-[#D32F2F] hover:border-[#D32F2F]/40 hover:bg-[#D32F2F]/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  {soc.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center space-y-4">
            <h4 className="text-white text-sm font-extrabold uppercase tracking-wider">
              Subscribe to Gifting Insights &amp; Catalogues
            </h4>
            <p className="text-xs text-[rgba(255,255,255,0.88)] max-w-lg">
              Receive quarterly showcases of new gifting collections, packaging design trends, and priority sample dispatch programs.
            </p>
            
            <form onSubmit={handleSubscribe} className="relative max-w-md w-full">
              {subscribed ? (
                <div className="flex items-center gap-2 text-[#EF5350] text-sm font-bold bg-[#FDECEC]/10 border border-[#F5C2C2]/30 p-3.5 rounded-xl">
                  <Check className="w-4 h-4 text-[#EF5350]" />
                  Successfully subscribed to catalogue updates!
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter corporate email..."
                    className="flex-grow bg-white/10 border border-white/25 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#D32F2F] focus:border-[#D32F2F] transition-all placeholder:text-white/50 font-medium"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#D32F2F] hover:bg-[#C62828] text-white rounded-xl px-5 py-3 text-sm font-bold flex items-center justify-center gap-2 transition-all hover:shadow-lg active:scale-95 cursor-pointer min-w-[120px] border-0"
                  >
                    {loading ? (
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        Subscribe <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Structured Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 py-16">
          
          {/* COLUMN 1: Gifting Products */}
          <div className="space-y-4">
            <h3 className="font-extrabold text-white uppercase tracking-wider text-xs border-b border-[#F5C2C2]/10 pb-2">
              Corporate Gifts
            </h3>
            <ul className="space-y-2.5">
              {CORPORATE_GIFTS.slice(0, 5).map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[rgba(255,255,255,0.90)] hover:text-[#D32F2F] hover:pl-1.5 transition-all text-xs font-semibold flex items-center gap-1 group"
                  >
                    <ArrowRight className="w-3 h-3 text-[#D32F2F] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 2: Corporate Kits */}
          <div className="space-y-4">
            <h3 className="font-extrabold text-white uppercase tracking-wider text-xs border-b border-[#F5C2C2]/10 pb-2">
              Kits &amp; Hampers
            </h3>
            <ul className="space-y-2.5">
              {OCCASION_HAMPERS.slice(0, 5).map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[rgba(255,255,255,0.90)] hover:text-[#D32F2F] hover:pl-1.5 transition-all text-xs font-semibold flex items-center gap-1 group"
                  >
                    <ArrowRight className="w-3 h-3 text-[#D32F2F] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>



          {/* COLUMN 4: Contact Details */}
          <div className="space-y-4">
            <h3 className="font-extrabold text-white uppercase tracking-wider text-xs border-b border-[#F5C2C2]/10 pb-2">
              Enterprise Office
            </h3>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-2.5 text-xs text-[rgba(255,255,255,0.88)] leading-relaxed group">
                <MapPin className="w-4 h-4 text-white hover:text-[#D32F2F] transition-colors mt-0.5 flex-shrink-0" />
                <span>
                  {COMPANY_INFO.address}
                </span>
              </li>
              <li className="flex items-center gap-2.5 text-xs text-[rgba(255,255,255,0.88)] group">
                <Phone className="w-4 h-4 text-white hover:text-[#D32F2F] transition-colors flex-shrink-0" />
                <span className="font-bold text-white">{COMPANY_INFO.phone}</span>
              </li>
              <li className="flex items-center gap-2.5 text-xs text-[rgba(255,255,255,0.88)] group">
                <Mail className="w-4 h-4 text-white hover:text-[#D32F2F] transition-colors flex-shrink-0" />
                <span className="break-all font-bold text-white">{COMPANY_INFO.email}</span>
              </li>
              <li className="flex items-center gap-2.5 text-xs text-[rgba(255,255,255,0.88)] group">
                <Clock className="w-4 h-4 text-white hover:text-[#D32F2F] transition-colors flex-shrink-0" />
                <span className="text-[10px] text-[rgba(255,255,255,0.72)] font-bold uppercase">{COMPANY_INFO.timings}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & legal row */}
        <div className="border-t border-[#F5C2C2]/10 pt-8 mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[rgba(255,255,255,0.72)] text-xs flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D32F2F]/60" />
            © {new Date().getFullYear()} PACMYPRODUCT — Premium Enterprise B2B Gifting &amp; Custom Packaging. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-[rgba(255,255,255,0.72)]">
            <Link href="#" className="hover:text-[#D32F2F] transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-[#D32F2F] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
