"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { BackgroundGradient } from "@/components/layout/BackgroundGradient";
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  Clock, 
  CreditCard, 
  CheckCircle2, 
  Loader2, 
  Send,
  ExternalLink 
} from "lucide-react";
import { COMPANY_INFO } from "@/data/siteConfig";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("submitting");
    setErrorMessage("");

    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const company = formData.get("company") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const message = formData.get("message") as string;

    if (!name || !company || !email || !phone) {
      setErrorMessage("Please fill in all required fields.");
      setStatus("error");
      return;
    }

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          company,
          email,
          phone,
          quantity: "Not Specified",
          budget: "Not Specified",
          deliveryLocation: "Single Location",
          message: `--- Quick Contact Form Inquiry ---\n${message || "No message provided."}`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        form.reset();
      } else {
        setErrorMessage(result.message || "Failed to send message. Please try again.");
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("An error occurred while sending your request.");
      setStatus("error");
    }
  };

  return (
    <div className="pt-28 pb-24 bg-[#FAF9F6] overflow-hidden max-w-full relative">
      <BackgroundGradient />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="mb-14">
          <SectionHeading 
            title="Connect with Our Gifting Team" 
            subtitle="Request customized catalogs, arrange physical sample reviews, or speak with an enterprise Account Specialist. Partnering with premium brands for nationwide delivery and logistics execution." 
            centered 
          />
        </div>

        {/* Top Info Cards & Form Grid */}
        <div className="grid lg:grid-cols-5 gap-8 mb-12">
          
          {/* LEFT SIDE: Enterprise Details & Direct CTAs */}
          <div className="lg:col-span-2 space-y-6 flex flex-col justify-between text-left">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-black text-[#2B2B2B] mb-2">Corporate Support</h3>
                <p className="text-sm text-[#6B6B63] leading-relaxed font-medium">
                  Whether you are launching a bulk employee welcome kit program or ordering bespoke rigid luxury packaging boxes, our team is equipped to support you.
                </p>
              </div>

              {/* Direct Floating Actions */}
              <div className="grid gap-3">
                <a 
                  href={COMPANY_INFO.whatsapp} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-between p-4 bg-[#FDECEC] hover:bg-[#FDECEC]/80 border border-[#F5C2C2] rounded-xl transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-[#D32F2F] p-2.5 rounded-lg text-white">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[9px] text-[#C62828] font-extrabold uppercase tracking-wider block">Chat on WhatsApp</span>
                      <span className="text-sm font-bold text-gray-900">{COMPANY_INFO.phone}</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#D32F2F] transition-transform group-hover:translate-x-0.5" />
                </a>

                <a 
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="flex items-center justify-between p-4 bg-[#F8F7F3] hover:bg-[#F5C2C2]/60 border border-[#F5C2C2] rounded-xl transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-[#D32F2F] p-2.5 rounded-lg text-white">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[9px] text-[#C62828] font-extrabold uppercase tracking-wider block">Bulk Order Helpline</span>
                      <span className="text-sm font-bold text-[#2B2B2B]">{COMPANY_INFO.phone}</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#D32F2F] transition-transform group-hover:translate-x-0.5" />
                </a>

                <a 
                  href={`mailto:${COMPANY_INFO.email}?subject=Corporate%20Gifting%20Inquiry`}
                  className="flex items-center justify-between p-4 bg-white hover:bg-[#FAF9F6] border border-[#F5C2C2] rounded-xl transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-[#2B2B2B] p-2.5 rounded-lg text-white">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[9px] text-[#6B6B63] font-extrabold uppercase tracking-wider block">Official Email</span>
                      <span className="text-sm font-bold text-[#2B2B2B] break-all">{COMPANY_INFO.email}</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#2B2B2B] transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>

              {/* Office Details */}
              <div className="grid gap-4">
                <div className="bg-white p-5 rounded-2xl border border-[#F5C2C2] shadow-sm flex items-start gap-4">
                  <div className="text-[#D32F2F] p-2.5 bg-[#F8F7F3] rounded-lg">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-[#2B2B2B] mb-1">Corporate HQ</h4>
                    <p className="text-[#6B6B63] text-xs leading-relaxed font-semibold">
                      {COMPANY_INFO.address}
                    </p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#F5C2C2] shadow-sm flex items-start gap-4">
                  <div className="text-[#D32F2F] p-2.5 bg-[#F8F7F3] rounded-lg">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-[#2B2B2B] mb-1">Operational Hours</h4>
                    <p className="text-[#6B6B63] text-xs leading-relaxed font-semibold">
                      {COMPANY_INFO.timings}
                    </p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#F5C2C2] shadow-sm flex items-start gap-4">
                  <div className="text-[#D32F2F] p-2.5 bg-[#F8F7F3] rounded-lg">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-[#2B2B2B] mb-1">GST & Billing Info</h4>
                    <p className="text-[#6B6B63] text-xs leading-relaxed font-semibold">
                      {COMPANY_INFO.gst}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">
              🛡️ We target a 2-hour response time for standard B2B inquiries.
            </div>
          </div>

          {/* RIGHT SIDE: Interactive Contact Form */}
          <div className="lg:col-span-3">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 md:p-10 rounded-3xl border border-[#F5C2C2] shadow-lg relative text-left"
            >
              <h3 className="text-xl font-black text-[#2B2B2B] mb-1">Send a Message</h3>
              <p className="text-xs text-[#6B6B63] mb-6 font-semibold">Complete this quick form to initiate contact. Our account managers will reach out to you.</p>
              
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center text-center py-10"
                  >
                    <div className="w-20 h-20 bg-[#FDECEC] text-[#D32F2F] rounded-full flex items-center justify-center mb-6 shadow-inner animate-bounce">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent Successfully!</h3>
                    <p className="text-gray-600 text-xs max-w-sm mb-6 leading-relaxed">
                      Thank you. We have received your query and will reply via email or phone shortly.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => setStatus("idle")}
                      className="px-6 text-xs font-bold rounded-xl"
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <form className="space-y-5" onSubmit={handleFormSubmit}>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#6B6B63] uppercase tracking-wider block">Full Name *</label>
                        <input 
                          required 
                          name="name"
                          type="text" 
                          className="w-full bg-white border border-[#F5C2C2] rounded-xl px-4 py-3 text-sm text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/15 focus:border-[#D32F2F] transition-all font-medium" 
                          placeholder="Your Name" 
                        />
                      </div>
                      
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#6B6B63] uppercase tracking-wider block">Company / Organization *</label>
                        <input 
                          required 
                          name="company"
                          type="text" 
                          className="w-full bg-white border border-[#F5C2C2] rounded-xl px-4 py-3 text-sm text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/15 focus:border-[#D32F2F] transition-all font-medium" 
                          placeholder="Company Name" 
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#6B6B63] uppercase tracking-wider block">Work Email Address *</label>
                        <input 
                          required 
                          name="email"
                          type="email" 
                          className="w-full bg-white border border-[#F5C2C2] rounded-xl px-4 py-3 text-sm text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/15 focus:border-[#D32F2F] transition-all font-medium" 
                          placeholder="email@company.com" 
                        />
                      </div>
                      
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#6B6B63] uppercase tracking-wider block">Phone Number *</label>
                        <input 
                          required 
                          name="phone"
                          type="tel" 
                          className="w-full bg-white border border-[#F5C2C2] rounded-xl px-4 py-3 text-sm text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/15 focus:border-[#D32F2F] transition-all font-medium" 
                          placeholder="+91 00000 00000" 
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#6B6B63] uppercase tracking-wider block">Inquiry / Project Details</label>
                      <textarea 
                        name="message"
                        rows={4} 
                        className="w-full bg-white border border-[#F5C2C2] rounded-xl px-4 py-3 text-sm text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/15 focus:border-[#D32F2F] transition-all resize-none font-medium" 
                        placeholder="Please write down your questions or requests..." 
                      />
                    </div>

                    {status === "error" && (
                      <div className="text-rose-700 font-bold text-xs bg-rose-50 p-3 border border-rose-200 rounded-lg">
                        {errorMessage}
                      </div>
                    )}

                    <div className="pt-2">
                      <Button 
                        size="lg" 
                        className="w-full rounded-xl text-sm font-bold py-5 flex items-center justify-center gap-2" 
                        type="submit"
                        disabled={status === "submitting"}
                      >
                        {status === "submitting" ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Sending Message...
                          </>
                        ) : (
                          <>
                            Submit Inquiry <Send className="w-3.5 h-3.5 ml-1" />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* BOTTOM SECTION: Full-width stylized interactive Map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="rounded-3xl overflow-hidden border border-[#F5C2C2] shadow-md bg-white p-2 relative"
        >
          {/* Floating Location Card */}
          <div className="absolute top-6 left-6 z-20 bg-[#2B2B2B]/95 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-[0_15px_50px_rgba(43,43,43,0.4)] max-w-sm hidden md:block text-left">
            <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#EF5350] block mb-2">Enterprise Logistics</span>
            <h4 className="text-sm font-extrabold text-white mb-2">Nationwide B2B Shipments & On-Time Direct Delivery</h4>
            <p className="text-xs text-gray-400 leading-relaxed mb-4 font-medium">
              We manage dedicated fulfillment hubs and shipping networks to guarantee safe transit to corporate offices and residences.
            </p>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-bold text-gray-300">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D32F2F] animate-pulse" /> North Hub
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D32F2F] animate-pulse" /> West Hub
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D32F2F] animate-pulse" /> South Hub
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D32F2F] animate-pulse" /> East Hub
              </div>
              <div className="flex items-center gap-1.5 col-span-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D32F2F] animate-pulse" /> Central Hub
              </div>
            </div>
          </div>

          <div className="h-[450px] w-full rounded-2xl overflow-hidden relative">
            <iframe 
              title="PacMyProduct Corporate Office Map"
              src={COMPANY_INFO.mapsUrl} 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 rounded-2xl"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
