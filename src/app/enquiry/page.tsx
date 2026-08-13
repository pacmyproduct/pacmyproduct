"use client";

import React, { useState, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getShortlistItemDisplayName } from "@/lib/enquiryHelper";
import { getCanonicalCategoryName, getCanonicalSubcategoryName, cleanProductTitle } from "@/lib/slugResolver";
import { toDisplayName } from "@/lib/displayNames";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { BackgroundGradient } from "@/components/layout/BackgroundGradient";
import { 
  CheckCircle2, 
  Loader2, 
  Send, 
  Package, 
  ChevronRight, 
  ChevronLeft, 
  Clock, 
  Building2, 
  User, 
  Mail, 
  Phone, 
  Check, 
  Layers,
  Coins,
  MapPin
} from "lucide-react";
import { useShortlist } from "@/context/ShortlistContext";
import { COMPANY_INFO } from "@/data/siteConfig";
import { sendProductQuoteEmail } from "@/lib/emailjs";

interface FormDataState {
  name: string;
  company: string;
  email: string;
  phone: string;
  quantity: string;
  budget: string;
  deliveryLocation: string;
  deliveryAddress: string;
  message: string;
  packagingChoice: string;
  deliveryTimeline: string;
  customProductsText: string;
}

function EnquiryFormContainer() {
  const searchParams = useSearchParams();
  const singleProduct = searchParams?.get("product");
  const isShortlistSource = searchParams?.get("source") === "shortlist";
  const category = searchParams?.get("category") || "";
  const subcategory = searchParams?.get("subcategory") || "";
  const brand = searchParams?.get("brand") || "";
  const moq = searchParams?.get("moq") || "";
  const { items } = useShortlist();
  
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [stepErrors, setStepErrors] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormDataState>({
    name: "",
    company: "",
    email: "",
    phone: "",
    quantity: "",
    budget: "",
    deliveryLocation: "",
    deliveryAddress: "",
    message: "",
    packagingChoice: "",
    deliveryTimeline: "",
    customProductsText: "",
  });

  useEffect(() => {
    if (moq) {
      const moqNum = parseInt(moq, 10);
      let qtyRange = "";
      if (moqNum >= 2000) qtyRange = "2000+";
      else if (moqNum >= 500) qtyRange = "500 - 2000";
      else if (moqNum >= 100) qtyRange = "100 - 500";
      else if (moqNum >= 50) qtyRange = "50 - 100";
      else qtyRange = "50 - 100";
      
      setFormData(prev => ({
        ...prev,
        quantity: qtyRange
      }));
    }
  }, [moq]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setStepErrors(null);
  };

  const selectOption = (field: keyof FormDataState, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setStepErrors(null);
  };

  const validateStep = (currentStep: number) => {
    if (currentStep === 1) {
      const hasPreselectedItems = (isShortlistSource && items.length > 0) || singleProduct || category || subcategory || brand;
      if (!hasPreselectedItems && !formData.customProductsText.trim()) {
        return "Please specify the products you are interested in.";
      }
    } else if (currentStep === 3) {
      if (!formData.quantity) {
        return "Please select an estimated quantity.";
      }
      if (!formData.deliveryLocation) {
        return "Please select a delivery protocol.";
      }
      if (!formData.deliveryAddress.trim()) {
        return "Please enter your complete delivery address.";
      }
    } else if (currentStep === 4) {
      if (!formData.name.trim()) return "Name is required.";
      if (!formData.company.trim()) return "Company name is required.";
      if (!formData.email.trim()) return "Email is required.";
      if (!/\S+@\S+\.\S+/.test(formData.email)) return "Please enter a valid email address.";
      if (!formData.phone.trim()) return "Phone number is required.";
    }
    return null;
  };

  const nextStep = () => {
    const error = validateStep(step);
    if (error) {
      setStepErrors(error);
      return;
    }
    setStepErrors(null);
    setDirection(1);
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setStepErrors(null);
    setDirection(-1);
    setStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateStep(4);
    if (error) {
      setStepErrors(error);
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    let finalPayload: any = {
      name: formData.name,
      company: formData.company,
      email: formData.email,
      phone: formData.phone,
      quantity: formData.quantity,
      budget: formData.budget || "Not Specified",
      deliveryLocation: formData.deliveryLocation,
      deliveryAddress: formData.deliveryAddress,
      source: "Product Quote",
      shortlist: []
    };

    let productNameString = "";

    if (isShortlistSource && items.length > 0) {
      finalPayload.shortlist = items.map(item => ({
        title: getShortlistItemDisplayName(item),
        price: item.price
      }));
      productNameString = items.map(getShortlistItemDisplayName).join(", ");
    } else if (category || subcategory || brand) {
      const parts = [];
      if (brand) parts.push(`Brand: ${brand}`);
      if (category) {
        const resolved = toDisplayName(getCanonicalCategoryName(category));
        parts.push(`Category: ${resolved}`);
      }
      if (subcategory) {
        const resolved = toDisplayName(getCanonicalSubcategoryName(subcategory));
        parts.push(`Subcategory: ${resolved}`);
      }
      if (moq) parts.push(`MOQ: ${moq}`);
      finalPayload.shortlist = [{ title: parts.join(" | ") }];
      productNameString = parts.join(" | ");
    } else if (singleProduct) {
      finalPayload.shortlist = [{ title: singleProduct }];
      productNameString = singleProduct;
    } else if (formData.customProductsText) {
      finalPayload.shortlist = [{ title: formData.customProductsText }];
      productNameString = formData.customProductsText;
    }

    let customMsg = formData.message || "";
    const extraDetails = [];
    if (formData.packagingChoice) extraDetails.push(`Packaging: ${formData.packagingChoice}`);
    if (formData.deliveryTimeline) extraDetails.push(`Timeline: ${formData.deliveryTimeline}`);
    if (formData.deliveryAddress) extraDetails.push(`Address: ${formData.deliveryAddress}`);
    if (formData.customProductsText && ((isShortlistSource && items.length > 0) || singleProduct)) {
      extraDetails.push(`Additional request details: ${formData.customProductsText}`);
    }

    if (extraDetails.length > 0) {
      finalPayload.message = `--- Custom Specifications ---\n${extraDetails.join("\n")}\n\n--- Customer Note ---\n${customMsg || "No custom message provided."}`;
    } else {
      finalPayload.message = customMsg || "No custom message provided.";
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
        customer_name: formData.name,
        company_name: formData.company,
        customer_email: formData.email,
        phone: formData.phone,
        product_name: productNameString || "Custom quote request",
        category: category ? toDisplayName(getCanonicalCategoryName(category)) : "",
        subcategory: subcategory ? toDisplayName(getCanonicalSubcategoryName(subcategory)) : "",
        quantity: formData.quantity,
        budget: formData.budget || "Not Specified",
        packaging: formData.packagingChoice || "Standard Box",
        delivery_address: formData.deliveryAddress,
        delivery_timeline: formData.deliveryTimeline || "Standard",
        requirements: formData.message || formData.customProductsText || "No custom message provided.",
      });

      if (emailResult.success) {
        setStatus("success");
      } else {
        setErrorMessage(emailResult.message || "Failed to submit enquiry. Please try again.");
        setStatus("error");
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage("Failed to submit enquiry. Please check your connection and try again.");
      setStatus("error");
    }
  };

  const stepsList = [
    { number: 1, label: "Product Selection" },
    { number: 2, label: "Packaging" },
    { number: 3, label: "Quote & Delivery" },
    { number: 4, label: "Contact Details" }
  ];

  const packagingOptions = [
    { id: "Mono Carton", name: "Custom Mono Carton", desc: "Sleek retail card boxes" },
    { id: "Rigid Box", name: "Luxury Rigid Box", desc: "Premium thick cardboard gift cases" },
    { id: "Customized Packaging", name: "Customized Box", desc: "Durable shipping-safe packaging" },
    { id: "Eco Pouch", name: "Cotton / Jute Pouch", desc: "Sustainable drawstring bag style" },
    { id: "Standard Box", name: "Standard Gifting Box", desc: "Classic corporate gifting pack" }
  ];

  return (
    <div className="grid lg:grid-cols-5 gap-0 bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-2xl min-h-[680px]">
      
      {/* LEFT SIDE: Wizard Form */}
      <div className="lg:col-span-3 p-6 md:p-10 flex flex-col justify-between relative bg-white">
        
        {/* Progress Bar & Indicators */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4 overflow-x-auto no-scrollbar pb-2">
            {stepsList.map((s) => (
              <div key={s.number} className="flex items-center flex-shrink-0">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm transition-all duration-300 ${
                  step > s.number 
                    ? "bg-red-650 text-white" 
                    : step === s.number 
                      ? "bg-gray-900 text-white ring-4 ring-gray-900/10" 
                      : "bg-gray-100 text-gray-450"
                }`}>
                  {step > s.number ? <Check className="w-4 h-4" /> : s.number}
                </div>
                <span className={`ml-2 text-xs font-bold whitespace-nowrap ${
                  step === s.number ? "text-gray-905" : "text-gray-400"
                }`}>
                  {s.label}
                </span>
                {s.number < 4 && (
                  <div className={`w-4 sm:w-8 h-0.5 mx-2 transition-colors duration-305 ${
                    step > s.number ? "bg-red-600" : "bg-gray-150"
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
            <motion.div 
              className="bg-red-600 h-full"
              initial={{ width: "25%" }}
              animate={{ width: `${(step / 4) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="flex-grow flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center text-center py-10"
              >
                <div className="w-24 h-24 bg-red-50 text-red-650 rounded-full flex items-center justify-center mb-6 shadow-inner animate-bounce">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-3">Enquiry Submitted!</h3>
                <p className="text-gray-500 text-xs sm:text-sm max-w-md mb-8 leading-relaxed font-semibold">
                  Thank you for sharing your project specifications. Our corporate gifting and packaging curation team will review the details and reach out within 2-4 business hours.
                </p>
                <Button 
                  variant="default" 
                  onClick={() => {
                    setStep(1);
                    setStatus("idle");
                    setFormData({
                      name: "",
                      company: "",
                      email: "",
                      phone: "",
                      quantity: "",
                      budget: "",
                      deliveryLocation: "",
                      deliveryAddress: "",
                      message: "",
                      packagingChoice: "",
                      deliveryTimeline: "",
                      customProductsText: "",
                    });
                  }}
                  className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 border-0 text-white px-8"
                >
                  Request Another Quote
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key={step}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="space-y-6 py-2"
              >
                {/* STEP 1: PRODUCT SELECTION */}
                {step === 1 && (
                  <div className="space-y-6 text-left">
                    <div>
                      <h3 className="text-xl font-black text-gray-900 mb-1 flex items-center gap-2">
                        <Package className="w-5 h-5 text-red-500" />
                        Select Gifting Swag / Box Items
                      </h3>
                      <p className="text-xs text-gray-500 font-semibold">Review preselected items or describe custom items you need produced.</p>
                    </div>

                    {((isShortlistSource && items.length > 0) || singleProduct || category || subcategory || brand) ? (
                      <div className="bg-red-50/40 border border-red-100 rounded-2xl p-5">
                        <div className="flex items-center gap-2 mb-3">
                          <Check className="w-4 h-4 text-red-600" />
                          <span className="text-xs font-bold text-red-700">Preselected Gifting Items:</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {isShortlistSource && items.length > 0 ? (
                            items.map(item => (
                              <span key={item.title} className="bg-white px-3 py-1.5 rounded-lg text-xs font-bold text-gray-800 border border-gray-200 shadow-xs">
                                {getShortlistItemDisplayName(item)}
                              </span>
                            ))
                          ) : (
                            <>
                              {singleProduct && !singleProduct.startsWith("PacMyProduct") && (
                                <span className="bg-white px-3 py-1.5 rounded-lg text-xs font-bold text-gray-800 border border-gray-200 shadow-xs">
                                  {cleanProductTitle(singleProduct)}
                                </span>
                              )}
                              {category && (
                                <span className="bg-white px-3 py-1.5 rounded-lg text-xs font-bold text-gray-800 border border-gray-200 shadow-xs">
                                  Category: {toDisplayName(getCanonicalCategoryName(category))}
                                </span>
                              )}
                              {subcategory && (
                                <span className="bg-white px-3 py-1.5 rounded-lg text-xs font-bold text-gray-800 border border-gray-200 shadow-xs">
                                  Subcategory: {toDisplayName(getCanonicalSubcategoryName(subcategory))}
                                </span>
                              )}
                              {brand && (
                                <span className="bg-white px-3 py-1.5 rounded-lg text-xs font-bold text-gray-800 border border-gray-200 shadow-xs">
                                  Brand: {brand}
                                </span>
                              )}
                              {moq && (
                                <span className="bg-white px-3 py-1.5 rounded-lg text-xs font-bold text-gray-800 border border-gray-200 shadow-xs">
                                  MOQ: {moq} Units
                                </span>
                              )}
                            </>
                          )}
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-700 block uppercase tracking-wider">Add specific requirements or details:</label>
                          <textarea 
                            suppressHydrationWarning
                            name="customProductsText"
                            value={formData.customProductsText}
                            onChange={handleInputChange}
                            rows={3}
                            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all resize-none font-semibold"
                            placeholder="Add sizing requirements, color options, or custom items..."
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-700 block uppercase tracking-wider">Which products are you planning? *</label>
                        <textarea
                          suppressHydrationWarning
                          name="customProductsText"
                          value={formData.customProductsText}
                          onChange={handleInputChange}
                          rows={5}
                          required
                          className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 transition-all resize-none font-medium"
                          placeholder="e.g. 100 Employee Welcome Onboarding Kits featuring diaries, metallic executive pens, bottles, and canvas tote bags."
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* STEP 2: PACKAGING REQUIREMENTS */}
                {step === 2 && (
                  <div className="space-y-6 text-left">
                    <div>
                      <h3 className="text-xl font-black text-gray-900 mb-1 flex items-center gap-2">
                        <Layers className="w-5 h-5 text-red-500" />
                        Packaging Customization
                      </h3>
                      <p className="text-xs text-gray-500 font-semibold">Choose the presentation box style for your custom gifts.</p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-700 block uppercase tracking-wider">Packaging Box Type</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {packagingOptions.map(opt => (
                          <button
                            suppressHydrationWarning
                            key={opt.id}
                            type="button"
                            onClick={() => selectOption("packagingChoice", opt.id)}
                            className={`p-4 text-left border rounded-2xl transition-all cursor-pointer flex flex-col justify-between h-20 ${
                              formData.packagingChoice === opt.id 
                                ? "border-red-600 bg-red-50/20 text-gray-950 ring-1 ring-red-600 shadow-sm" 
                                : "border-gray-200 bg-white hover:bg-gray-50 text-gray-600"
                            }`}
                          >
                            <span className="text-xs font-bold text-gray-900">{opt.name}</span>
                            <span className="text-[10px] text-gray-400 block line-clamp-1">{opt.desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: QUANTITY, BUDGET & DELIVERY ADDRESS */}
                {step === 3 && (
                  <div className="space-y-6 text-left">
                    <div>
                      <h3 className="text-xl font-black text-gray-900 mb-1 flex items-center gap-2">
                        <Coins className="w-5 h-5 text-red-500" />
                        Volume, Budget & Logistics
                      </h3>
                      <p className="text-xs text-gray-500 font-semibold">Define your quantity guidelines, budget ranges, and delivery destination.</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-700 block uppercase tracking-wider">Estimated Quantity *</label>
                        <select 
                          suppressHydrationWarning
                          name="quantity"
                          value={formData.quantity}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 transition-all cursor-pointer font-semibold"
                        >
                          <option value="">Select Quantity Range</option>
                          <option value="50 - 100">50 - 100 units</option>
                          <option value="100 - 500">100 - 500 units</option>
                          <option value="500 - 2000">500 - 2000 units</option>
                          <option value="2000+">2000+ units</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-700 block uppercase tracking-wider">Budget Per Gift (Box)</label>
                        <select 
                          suppressHydrationWarning
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 transition-all cursor-pointer font-semibold"
                        >
                          <option value="">Select Budget Target</option>
                          <option value="Under ₹500">Under ₹500</option>
                          <option value="₹500 - ₹1000">₹500 - ₹1,000</option>
                          <option value="₹1000 - ₹2500">₹1,005 - ₹2,500</option>
                          <option value="Premium (₹2500+) font-semibold">Premium (₹2,500+)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-700 block uppercase tracking-wider">Delivery protocol *</label>
                        <select 
                          suppressHydrationWarning
                          name="deliveryLocation"
                          value={formData.deliveryLocation}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 transition-all cursor-pointer font-semibold"
                        >
                          <option value="">Select Delivery Method</option>
                          <option value="Single Location">Single Office Location (Bulk)</option>
                          <option value="Multiple Locations">Multiple Branches (Split shipment)</option>
                          <option value="Direct to Employee Home">Direct to Employee Homes (Individual Dispatch)</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-700 block uppercase tracking-wider">Required Delivery Timeline</label>
                        <select 
                          suppressHydrationWarning
                          name="deliveryTimeline"
                          value={formData.deliveryTimeline}
                          onChange={handleInputChange}
                          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 transition-all cursor-pointer font-semibold"
                        >
                          <option value="">Select Timeline Target</option>
                          <option value="Urgent">Urgent (under 7 business days)</option>
                          <option value="Standard">Standard (10 - 15 business days)</option>
                          <option value="Flexible">Flexible (3+ weeks)</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-700 block uppercase tracking-wider">Delivery Address *</label>
                      <textarea 
                        suppressHydrationWarning
                        name="deliveryAddress"
                        value={formData.deliveryAddress}
                        onChange={handleInputChange}
                        required
                        rows={3}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 transition-all resize-none font-medium"
                        placeholder="Enter your complete delivery address, city, state and PIN code"
                      />
                      <p className="text-[11px] text-gray-400 font-medium">e.g. OF-653, 6th Floor, Satya The Hive, Sector 102, Dwarka Expressway, Gurugram, Haryana - 122006</p>
                    </div>
                  </div>
                )}

                {/* STEP 4: CONTACT DETAILS */}
                {step === 4 && (
                  <div className="space-y-5 text-left">
                    <div>
                      <h3 className="text-xl font-black text-gray-900 mb-1 flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-red-500" />
                        Company & Contact Details
                      </h3>
                      <p className="text-xs text-gray-500 font-semibold">Enter your work details to finalize custom quote sheets.</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 block uppercase tracking-wider">Contact Name *</label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                          <input 
                            suppressHydrationWarning
                            required 
                            name="name" 
                            type="text" 
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 transition-all font-medium" 
                            placeholder="Your Name" 
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 block uppercase tracking-wider">Company Name *</label>
                        <div className="relative">
                          <Building2 className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                          <input 
                            suppressHydrationWarning
                            required 
                            name="company" 
                            type="text" 
                            value={formData.company}
                            onChange={handleInputChange}
                            className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 transition-all font-medium" 
                            placeholder="Company Name" 
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 block uppercase tracking-wider">Work Email *</label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                          <input 
                            suppressHydrationWarning
                            required 
                            name="email" 
                            type="email" 
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 transition-all font-medium" 
                            placeholder="email@company.com" 
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 block uppercase tracking-wider">Phone / Mobile *</label>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                          <input 
                            suppressHydrationWarning
                            required 
                            name="phone" 
                            type="tel" 
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 transition-all font-medium" 
                            placeholder="+91 00000 00000" 
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 block uppercase tracking-wider font-semibold">Special Requests / Gifting Brief</label>
                      <textarea 
                        suppressHydrationWarning
                        name="message" 
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={3} 
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 transition-all resize-none font-medium" 
                        placeholder="Tell us about the gifting event, packaging preferences, or other instructions..." 
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Buttons */}
        {status !== "success" && (
          <div className="mt-8 border-t border-gray-150 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              {stepErrors && (
                <p className="text-xs text-red-650 font-bold flex items-center gap-1.5 bg-red-50 px-3 py-1.5 rounded-lg border border-red-100 mb-2 sm:mb-0">
                  <span>⚠</span> {stepErrors}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3 ml-auto">
              {step > 1 && (
                <button
                  suppressHydrationWarning
                  type="button"
                  onClick={prevStep}
                  className="px-5 py-3 border border-gray-200 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-50 flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
              )}

              {step < 4 ? (
                <button
                  suppressHydrationWarning
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-gray-800 flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  Continue <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <Button
                  variant="default"
                  onClick={handleSubmit}
                  disabled={status === "submitting"}
                  className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white px-7 py-3 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg hover:shadow-red-600/20 border-0"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Quote Request <Send className="w-4.5 h-4.5 ml-1" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* RIGHT SIDE: Real-Time Dynamic Summary Panel */}
      <div className="lg:col-span-2 p-8 md:p-10 text-white flex flex-col justify-between relative luxury-gradient border-l border-white/10">
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-black mb-1 tracking-wide uppercase text-red-500">Live Quote Summary</h3>
            <p className="text-xs text-gray-400">Review your customized requirements as they are selected.</p>
          </div>

          <div className="space-y-4 border-y border-white/10 py-6 text-left">
            {/* Products Row */}
            <div className="flex items-start gap-3">
              <Package className="w-5 h-5 text-red-550 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-bold text-gray-400 block uppercase tracking-wider">Gifts / Kits Requested</span>
                {((isShortlistSource && items.length > 0) || singleProduct || category || subcategory || brand) ? (
                  <span className="text-sm font-semibold text-white">
                    {isShortlistSource && items.length > 0 
                      ? `${items.length} item(s) selected from shortlist` 
                      : singleProduct
                        ? singleProduct
                        : [
                            brand,
                            subcategory 
                              ? toDisplayName(getCanonicalSubcategoryName(subcategory) === subcategory ? subcategory.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : getCanonicalSubcategoryName(subcategory))
                              : category 
                                ? toDisplayName(getCanonicalCategoryName(category) === category ? category.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : getCanonicalCategoryName(category))
                                : ""
                          ].filter(Boolean).join(" ")
                    }
                  </span>
                ) : (
                  <span className="text-sm text-gray-300 italic font-semibold">
                    {formData.customProductsText ? formData.customProductsText : "None selected yet"}
                  </span>
                )}
              </div>
            </div>

            {/* Scope Row */}
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-red-555 flex-shrink-0" />
              <div>
                <span className="text-[10px] font-bold text-gray-400 block uppercase tracking-wider">Volume & Target Budget</span>
                <span className="text-sm font-semibold text-white">
                  {formData.quantity ? `${formData.quantity} units` : "Quantity not set"} 
                  {formData.budget ? ` | Budget: ${formData.budget}` : ""}
                </span>
              </div>
            </div>

            {/* Packaging Row */}
            <div className="flex items-center gap-3">
              <Layers className="w-5 h-5 text-red-555 flex-shrink-0" />
              <div>
                <span className="text-[10px] font-bold text-gray-400 block uppercase tracking-wider">Box Presentation Style</span>
                <span className="text-sm font-semibold text-white">
                  {formData.packagingChoice ? formData.packagingChoice : "Standard gifting box packaging"}
                </span>
              </div>
            </div>

            {/* Delivery Address Row */}
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-red-555 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-bold text-gray-400 block uppercase tracking-wider">Delivery Address</span>
                <span className="text-sm font-semibold text-white whitespace-pre-line">
                  {formData.deliveryAddress.trim() ? formData.deliveryAddress : "Delivery address not provided"}
                </span>
              </div>
            </div>
          </div>

          {/* Quick FAQ / trust notes */}
          <div className="space-y-4 pt-2 text-left">
            <div className="flex gap-3">
              <div className="text-[#EF5350] mt-1"><CheckCircle2 className="w-4 h-4"/></div>
              <div>
                <h4 className="font-bold text-white text-xs tracking-wider uppercase">Free Sample Dispatches</h4>
                <p className="text-gray-400 text-[10px] leading-relaxed">Corporate accounts qualify for physical proofing sample approvals before batch production.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="text-[#EF5350] mt-1"><CheckCircle2 className="w-4 h-4"/></div>
              <div>
                <h4 className="font-bold text-white text-xs tracking-wider uppercase">Enterprise Tax Invoicing</h4>
                <p className="text-gray-400 text-[10px] leading-relaxed">All bulk invoices are provided with active GST input credit processing details.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 space-y-2 text-xs">
          <div className="flex items-center justify-between text-gray-450">
            <span>Direct Hotline:</span>
            <span className="font-bold text-white">{COMPANY_INFO.phone}</span>
          </div>
          <div className="flex items-center justify-between text-gray-450">
            <span>Email Inquiry:</span>
            <span className="font-bold text-white break-all">{COMPANY_INFO.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EnquiryPage() {
  return (
    <div className="pt-28 pb-24 bg-gray-50 min-h-screen overflow-hidden max-w-full relative">
      <BackgroundGradient />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-10">
          <SectionHeading 
            title="Premium Request Curation"
            subtitle="Describe your occasion, packaging standards, and quantity guidelines. Our packaging and gifting specialists will compile custom mockups and quote sheets." 
            centered 
            className="mb-0"
          />
        </div>

        <Suspense fallback={
          <div className="p-12 bg-white rounded-2xl border border-gray-250 shadow-xl flex items-center justify-center min-h-[600px]">
            <div className="text-center space-y-4">
              <Loader2 className="w-12 h-12 animate-spin text-red-600 mx-auto" />
              <p className="text-gray-500 text-sm font-bold animate-pulse">Initializing Premium Wizard...</p>
            </div>
          </div>
        }>
          <EnquiryFormContainer />
        </Suspense>

      </div>
    </div>
  );
}
