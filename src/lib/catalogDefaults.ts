/**
 * Centralized Catalog Defaults & Runtime Metadata Resolver
 * Single source of truth for Category / Subcategory Product Overviews and Branding Capabilities.
 */

export const GENERIC_DEFAULT_OVERVIEW = `Available Variants
• Executive Grade Standard
• Premium Custom Gift Set
• Custom Packaging Drop

Ideal Applications
• Employee Onboarding & Swag Drops
• Client Appreciation Gifts
• Trade Show & Event Giveaways

Customization Highlights
• High-precision logo branding available
• Eco-conscious enterprise packaging
• Flexible MOQ & nationwide delivery`;

export const GENERIC_DEFAULT_BRANDING = [
  "Screen Printing",
  "Laser Engraving",
  "Embroidery",
  "Blind Embossing",
  "DTF Multi Colour Print"
];

export const CATEGORY_OVERVIEWS: Record<string, string> = {
  // --- Promotional Categories ---
  bags: `Available Variants
• Business Laptop Backpacks
• Premium Duffle & Travel Bags
• Eco-friendly Tote Bags & Slings

Ideal Applications
• Corporate travel & daily office commute
• Employee onboarding swag packs
• Executive client appreciation drops

Customization Highlights
• High-density embroidery & HD Screen Print
• Leatherette patch embossing & metal tag plates
• Padded compartments & water-resistant materials`,

  "t-shirts": `Available Variants
• Premium Cotton Polo T-Shirts
• Performance Dry-Fit Sport Tees
• Corporate Round Neck Event Tees

Ideal Applications
• Corporate offsites & team building events
• Employee uniforms & brand merchandise
• Promotional event drops & giveaways

Customization Highlights
• Breathable 220+ GSM premium fabric
• Multi-color DTF print & chest embroidery
• Custom neck label & sleeve brand badges`,

  drinkware: `Available Variants
• Vacuum Insulated Stainless Steel Bottles
• Double-Wall Ceramic & Travel Mugs
• Temperature Display Smart Tumblers

Ideal Applications
• Desk hydration & daily office utility
• Wellness drops & corporate gifting
• Conference & VIP event giveaways

Customization Highlights
• 360° UV Digital Print & Laser Engraving
• Food-grade 304 stainless steel construction
• Custom sleeve & premium gift box packaging`,

  pens: `Available Variants
• Premium Matte-Finish Brass Metal Pens
• German Ink Rollerball & Ballpoint Pens
• Eco-friendly Bamboo & Stylus Pens

Ideal Applications
• Executive contract signings & desk utility
• Mass promotional event handouts
• Premium corporate gift set inserts

Customization Highlights
• High-precision fiber laser engraving
• Single-color & multi-color pad printing
• Velvet pouch & rigid box presentation`,

  "diaries-notebooks": `Available Variants
• Hardbound PU Leatherette Executive Diaries
• Wire-O Spiral Organizers & Planners
• Eco Kraft Notebooks with Pen Loops

Ideal Applications
• Annual corporate planning & conferences
• Joining kits & training workshops
• Client drops & executive stationery

Customization Highlights
• Elegant blind debossing & gold/silver foil stamping
• Customized inner insert card pages & ribbon bookmarks
• Magnetic flap closure & pen slot integration`,

  caps: `Available Variants
• 6-Panel Cotton Twill Promotional Caps
• Breathable Mesh Sports & Trucker Caps
• Premium Adjustable Executive Caps

Ideal Applications
• Outdoor team events, sports meets & rallies
• Brand ambassador uniforms & promotional drives
• Corporate swag bags & merch packs

Customization Highlights
• 3D Puff embroidery & high-definition screen print
• Durable brass buckle / velcro closure straps
• Custom inner seam taping & brand tags`,

  keychains: `Available Variants
• Genuine PU Leather Loop Keychains
• Die-Cast Metal Alloy Keychains
• Multi-Tool & Acrylic Promo Keychains

Ideal Applications
• Automobile dealer customer handovers
• Real estate closing drops & retail promos
• Everyday carry corporate branding

Customization Highlights
• Laser engraving & die-struck metal finish
• Deep blind debossing on leather surfaces
• Individual gift box presentation`,

  "table-top": `Available Variants
• Multifunction Desk Organizers & Pen Stands
• PU Leather & Wooden Coasters
• Ergonomic Memory Foam Mouse Pads & Desk Mats

Ideal Applications
• Workplace desk setups & onboarding kits
• Executive workspace enhancements
• Corporate milestone drops

Customization Highlights
• Laser engraved wood & embossed leatherette
• Non-slip bases & durable stitching
• Custom co-branded packaging cards`,

  "paper-weight": `Available Variants
• Crystal Glass 3D Sub-Surface Paper Weights
• Polished Brass & Alloy Executive Weights
• Eco Wooden & Marble Table Weights

Ideal Applications
• Executive desk decor & milestone awards
• Corporate souvenir drops & honorifics
• Premium office desk accessories

Customization Highlights
• 3D internal laser engraving & surface etching
• Velvet-lined luxury gift presentation box
• High-gloss scratch-resistant clear coating`,

  "household-utilities": `Available Variants
• Aroma Diffusers & Scented Candle Sets
• Premium Metal Coasters & Serving Trays
• Utility Desk Clocks & Home Accent Pieces

Ideal Applications
• Festive hampers & home office drops
• Employee wellness & lifestyle gifting
• VIP client thank-you hampers

Customization Highlights
• Custom branded sleeves & metallic foils
• Premium food-safe & non-toxic materials
• Curated luxury gift box styling`,

  candles: `Available Variants
• Hand-poured Soy Wax Aromatherapy Candles
• Glass Jar Scented Candles with Wooden Lids
• Luxury Metallic Tin Candle Sets

Ideal Applications
• Festive Diwali & New Year corporate gifting
• Employee wellness & relaxation drop kits
• VIP client appreciation hampers

Customization Highlights
• Custom printed jar labels & top box stickers
• Premium essential oil fragrances (Lavender, Vanilla, Amber)
• Eco-friendly wooden wicks & cotton wicks`,

  watches: `Available Variants
• Executive Wooden & Metal Wall Clocks
• Digital Desk Clocks with Temp & Alarm
• Premium Chronograph Wristwatches

Ideal Applications
• Long-service awards & retirement drops
• Corporate office decor & reception displays
• Premium incentive & achievement rewards

Customization Highlights
• Full-dial custom printed logo placement
• Precision laser engraving on back case & bezel
• Velvet-cushioned premium presentation box`,

  badges: `Available Variants
• Magnetic Die-Struck Metal Lapel Pins
• Brushed Aluminum Name Badges
• Enamel & Epoxy Coated Event Badges

Ideal Applications
• Corporate identity, conferences & expos
• Employee recognition & designation pins
• VIP delegate welcome accessories

Customization Highlights
• Hard & soft enamel color filling
• Strong neodymium magnetic backings
• Metallic gold, silver, & gunmetal plating`,

  "trolley-bags": `Available Variants
• Hard-Shell Polycarbonate Cabin Trolleys
• Soft Canvas Travel Suitcases
• Expandable Overnight Business Rollers

Ideal Applications
• Executive travel & international business drops
• Sales team incentive rewards & milestone gifts
• High-value partner appreciation packages

Customization Highlights
• Customized metal logo plate engraving
• TSA-approved combination lock integration
• Silent 360° spinner wheels & padded interior`,

  // --- Corporate Kit Categories ---
  "joining-kits": `Available Variants
• Standard Onboarding Starter Pack
• Executive Day-One Swag Box
• Tech-Enabled Remote Employee Kit

Ideal Applications
• New hire onboarding & team welcome
• Employer branding & HR orientation drops
• Remote employee first-day delight

Customization Highlights
• Custom outer rigid welcome box with magnetic flap
• Co-branded notebook, pen, bottle, hoodie & tech items
• Personalized welcome letter & insert card`,

  "welcome-kits": `Available Variants
• Essential Corporate Welcome Box
• Luxury Executive Welcome Drop
• Eco-Friendly Green Onboarding Kit

Ideal Applications
• Client onboarding & project kickoffs
• New employee welcome swag
• Partner & delegate welcomes

Customization Highlights
• Seamless full-cover box branding
• High-utility item curation tailored to budget
• Personalization card inserts included`,

  "employee-kits": `Available Variants
• Employee Performance Recognition Kit
• Annual Appreciation Swag Pack
• Work-From-Home Wellness Kit

Ideal Applications
• Annual rewards & recognition drops
• Festival & milestone company celebrations
• Team appreciation initiatives

Customization Highlights
• Unified corporate color coordination
• Durable premium items built for daily utility
• Branded mailer boxes with custom inserts`,

  "doctor-kits": `Available Variants
• Medical Professional Diagnostic Drop
• Doctor Conference & Symposium Pack
• Pharma Rep Product Launch Kit

Ideal Applications
• Medical conferences, CMEs, & doctor drops
• Pharma brand awareness campaigns
• Hospital & clinic partner appreciation

Customization Highlights
• Clinical-grade utility items (prescription pads, pens, organizers)
• Subtle, professional brand logo engraving
• Premium presentation sleeves & gift packaging`,

  "architect-kits": `Available Variants
• Architect Precision Drafting Pack
• Design Studio Executive Drop
• Creative Professional Welcome Kit

Ideal Applications
• Building material & interior brand showcases
• Architect partner loyalty programs
• Design firm collaboration drops

Customization Highlights
• Premium laser-etched scale rulers, metal pens & journals
• Sleek minimalist black/silver aesthetic
• Custom branded heavy-duty mailer box`,

  "builder-kits": `Available Variants
• On-Site Construction Executive Pack
• Builder Partner Reward Kit
• Project Safety & Utility Kit

Ideal Applications
• Real estate developer & builder partner programs
• Heavy equipment & material brand campaigns
• Infrastructure milestone gifting

Customization Highlights
• Heavy-duty durable gear (flasks, toolkits, safety accessories)
• High-visibility screen printing & embossing
• Rugged protective outer packaging`,

  "dealer-kits": `Available Variants
• Dealer Network Growth Pack
• Annual Dealer Convention Gift Set
• Trade Partner Incentive Box

Ideal Applications
• Annual dealer meets & distributor reward programs
• New product launch channel pushes
• B2B trade partner appreciation

Customization Highlights
• High-perceived-value executive items
• Metallic foil box branding & achievement certificates
• Secure bulk fulfillment packaging`,

  "retailer-kits": `Available Variants
• Retail Partner Onboarding Kit
• Point-of-Sale Utility Pack
• Retail Channel Reward Box

Ideal Applications
• Retail merchant onboarding & trade drops
• FMCG & consumer brand channel promotion
• Merchant loyalty reward schemes

Customization Highlights
• High-utility daily items for counter use
• Durable screen printing & pad printing
• Compact shipping-friendly box design`,

  "mason-kits": `Available Variants
• Tradesman Daily Utility Kit
• Contractor & Mason Appreciation Pack
• Field Worker Durable Gift Set

Ideal Applications
• Cement, paint, & building material loyalty schemes
• Contractor & mason meet giveaways
• On-site trade appreciation campaigns

Customization Highlights
• Ultra-durable weather-resistant gear
• High-contrast bold logo screen printing
• Reinforced utility bags & containers`,

  "contractor-kits": `Available Variants
• Prime Contractor Executive Kit
• Trade Partner Onboarding Box
• Infrastructure Project Reward Pack

Ideal Applications
• Construction & EPC contractor engagement
• Building material brand reward programs
• Trade partner milestone drops

Customization Highlights
• Industrial-grade tools, thermoware, & organizers
• Metal tag plate engraving & embroidery
• Heavy-duty branded mailer box`,

  "electrician-kits": `Available Variants
• Electrician Utility & Safety Pack
• Trade Specialist Reward Kit
• Wire & Cable Brand Promo Drop

Ideal Applications
• Electrical brand contractor engagement
• Trade loyalty & points redemption gifts
• Specialist workshop giveaways

Customization Highlights
• Insulated utility tools & rugged organizers
• Bold screen printing & custom badge plates
• Compact tool pouch or gift box`,

  "painter-kits": `Available Variants
• Painter Tradesman Utility Kit
• Coating & Paint Brand Promo Drop
• Trade Specialist Recognition Box

Ideal Applications
• Paint brand contractor meets & loyalty programs
• Tradesman incentive drops
• Counter redemption reward kits

Customization Highlights
• Easy-clean durable materials
• High-impact brand logo printing
• Value-packed multi-item kit curation`,

  "pharma-kits": `Available Variants
• Pharma Field Force Utility Kit
• Medical Conference Delegate Box
• Product Launch Doctor Drop

Ideal Applications
• Pharmaceutical sales force tools & drops
• Medical symposium giveaways
• Healthcare partner engagement

Customization Highlights
• Compliant, professional branding
• High-utility stationery, flasks, & organizers
• Custom printed sleeve & inserts`,

  "hospital-kits": `Available Variants
• Healthcare Staff Appreciation Kit
• Hospital Admin Executive Pack
• Patient Care Welcome Drop

Ideal Applications
• Hospital employee recognition & nurse appreciation
• Healthcare admin milestone drops
• Wellness & health program giveaways

Customization Highlights
• Hygienic easy-clean materials
• Soft pastel & professional corporate colors
• Custom thank-you greeting card insert`,

  "sales-kits": `Available Variants
• Sales Champ Performance Kit
• Field Rep Daily Enablement Pack
• Commercial Deal Closer Drop

Ideal Applications
• Sales team onboarding & target rewards
• Annual sales kickoff (SKO) giveaways
• Business development team enablement

Customization Highlights
• High-mobility tech & stationery items
• Inspirational brand messaging & foil accents
• Compact premium presentation packaging`,

  "partner-kits": `Available Variants
• Strategic Alliance Partner Kit
• B2B Ecosystem Executive Box
• Advisory Board Gift Set

Ideal Applications
• B2B partner appreciation & alliance drops
• Franchisee & distributor onboarding
• High-value executive gifting

Customization Highlights
• Ultra-premium luxury item selection
• Blind debossing & metallic foil accents
• Velvet-lined rigid gift box packaging`,

  "startup-kits": `Available Variants
• Founder & Team Onboarding Box
• Tech Startup Launch Pack
• Accelerator & Incubator Swag Drop

Ideal Applications
• Early-stage team welcome swag
• Incubator cohort onboarding
• Venture drop & launch celebrations

Customization Highlights
• Vibrant, modern tech-focused merchandise
• Multi-color DTF print & custom stickers
• Eco-friendly custom mailer box`,

  "training-kits": `Available Variants
• Workshop Participant Welcome Pack
• Executive Learning & Development Kit
• Skill Seminar Stationery Drop

Ideal Applications
• Corporate L&D workshops & seminars
• Management trainee onboarding
• Technical certification courses

Customization Highlights
• High-utility notebooks, pens, bags & bottles
• Clear event logo & course title printing
• Eco-friendly presentation folders & pouches`
};

export const CATEGORY_BRANDING_CAPABILITIES: Record<string, string[]> = {
  // --- Promotional Categories ---
  bags: [
    "Screen Printing",
    "Embroidery",
    "DTF Multi Colour Print",
    "Laser Engraved Metal Plate",
    "Blind Embossing"
  ],
  "t-shirts": [
    "DTF Multi Colour Print",
    "Screen Printing",
    "Chest Embroidery",
    "Sleeve Branding",
    "Custom Neck Label"
  ],
  drinkware: [
    "360° UV Digital Print",
    "Laser Engraving",
    "Screen Printing",
    "Sublimation",
    "Pad Printing"
  ],
  pens: [
    "Laser Engraving",
    "Screen Printing",
    "Pad Printing",
    "UV Sticker",
    "Clip Branding"
  ],
  "diaries-notebooks": [
    "Blind Debossing",
    "Gold / Silver Foil Stamping",
    "Screen Printing",
    "Custom Insert Card",
    "UV Logo Print"
  ],
  caps: [
    "3D Puff Embroidery",
    "Screen Printing",
    "Flat Embroidery",
    "Woven Patch",
    "Visor Printing"
  ],
  keychains: [
    "Laser Engraving",
    "Blind Embossing",
    "Die-Struck Metal",
    "UV Print",
    "Epoxy Coating"
  ],
  "table-top": [
    "Laser Engraving",
    "UV Digital Print",
    "Blind Debossing",
    "Screen Printing",
    "Metal Plate Inlay"
  ],
  "paper-weight": [
    "3D Sub-Surface Laser Engraving",
    "Surface Etching",
    "UV Digital Print",
    "Metal Base Engraving",
    "Foil Box Stamping"
  ],
  "household-utilities": [
    "Laser Engraving",
    "UV Digital Print",
    "Screen Printing",
    "Foil Box Stamping",
    "Custom Sleeve"
  ],
  candles: [
    "Custom Jar Label",
    "UV Digital Print",
    "Wooden Lid Laser Etching",
    "Foil Stamped Packaging",
    "Sleeve Branding"
  ],
  watches: [
    "Custom Dial Printing",
    "Laser Back Case Engraving",
    "Screen Printing",
    "Metal Badge Plate",
    "Foil Box Stamping"
  ],
  badges: [
    "Hard Enamel Filling",
    "Soft Enamel",
    "Die-Struck Plating",
    "UV Digital Print",
    "Epoxy Coating"
  ],
  "trolley-bags": [
    "Metal Plate Laser Engraving",
    "Screen Printing",
    "Embroidery Patch",
    "Custom Zipper Pulls",
    "Luggage Tag Debossing"
  ],

  // --- Corporate Kit Categories ---
  "joining-kits": [
    "Rigid Box Foil Stamping",
    "Screen Printing",
    "Laser Engraving",
    "Embroidery",
    "Custom Insert Cards"
  ],
  "welcome-kits": [
    "Custom Sleeves",
    "Rigid Box Foil Stamping",
    "Laser Engraving",
    "Screen Printing",
    "DTF Print"
  ],
  "employee-kits": [
    "Screen Printing",
    "Laser Engraving",
    "Embroidery",
    "Blind Debossing",
    "Custom Insert Card"
  ],
  "doctor-kits": [
    "Laser Engraving",
    "Blind Debossing",
    "UV Digital Print",
    "Foil Stamped Box",
    "Custom Sleeve Card"
  ],
  "architect-kits": [
    "Precision Laser Engraving",
    "Blind Debossing",
    "Screen Printing",
    "Metallic Foil Stamping",
    "Custom Sleeve"
  ],
  "builder-kits": [
    "Screen Printing",
    "Metal Plate Laser Engraving",
    "High-Density Printing",
    "Embroidery",
    "Box Branding"
  ],
  "dealer-kits": [
    "Rigid Box Foil Stamping",
    "Laser Engraving",
    "Blind Debossing",
    "Screen Printing",
    "Certificate Insert"
  ],
  "retailer-kits": [
    "Screen Printing",
    "Laser Engraving",
    "Pad Printing",
    "DTF Print",
    "Custom Sleeve"
  ],
  "mason-kits": [
    "Heavy-Duty Screen Print",
    "Laser Engraved Metal Tag",
    "High-Vis Badge",
    "Durability Coating",
    "Box Sticker"
  ],
  "contractor-kits": [
    "Laser Engraving",
    "Screen Printing",
    "Embroidery Patch",
    "Metal Badge Inlay",
    "Custom Box Print"
  ],
  "electrician-kits": [
    "Laser Engraving",
    "Screen Printing",
    "Insulated Pad Print",
    "Metal Tag",
    "Box Branding"
  ],
  "painter-kits": [
    "Screen Printing",
    "DTF Multi Colour Print",
    "Pad Printing",
    "Sticker Label",
    "Box Sleeve"
  ],
  "pharma-kits": [
    "Laser Engraving",
    "Blind Debossing",
    "Screen Printing",
    "Custom Insert Card",
    "Foil Box Stamping"
  ],
  "hospital-kits": [
    "Laser Engraving",
    "Screen Printing",
    "Embroidery",
    "Pastel UV Print",
    "Greeting Insert Card"
  ],
  "sales-kits": [
    "Gold / Silver Foil Stamping",
    "Laser Engraving",
    "Screen Printing",
    "DTF Print",
    "Custom Box Sleeve"
  ],
  "partner-kits": [
    "Luxury Foil Box Stamping",
    "Blind Debossing",
    "Precision Laser Engraving",
    "Silk Screen Print",
    "VIP Greeting Card"
  ],
  "startup-kits": [
    "DTF Multi Colour Print",
    "3D Puff Embroidery",
    "Screen Printing",
    "Custom Die-Cut Stickers",
    "Mailer Box Print"
  ],
  "training-kits": [
    "Screen Printing",
    "Laser Engraving",
    "Blind Debossing",
    "Custom Pen & Notebook Branding",
    "Certificate Folder Print"
  ]
};

/**
 * Returns category default overview text for a category and optional subcategory.
 */
export function getCategoryDefaultOverview(category?: string, subcategory?: string): string {
  const normSub = (subcategory || "").toLowerCase().trim();
  const normCat = (category || "").toLowerCase().trim();

  if (normSub && CATEGORY_OVERVIEWS[normSub]) {
    return CATEGORY_OVERVIEWS[normSub];
  }
  if (normCat && CATEGORY_OVERVIEWS[normCat]) {
    return CATEGORY_OVERVIEWS[normCat];
  }

  // Alias lookup checks
  for (const [key, overview] of Object.entries(CATEGORY_OVERVIEWS)) {
    if (normSub && (normSub.includes(key) || key.includes(normSub))) {
      return overview;
    }
    if (normCat && (normCat.includes(key) || key.includes(normCat))) {
      return overview;
    }
  }

  return GENERIC_DEFAULT_OVERVIEW;
}

/**
 * Returns category default branding capabilities array for a category and optional subcategory.
 */
export function getCategoryDefaultBranding(category?: string, subcategory?: string): string[] {
  const normSub = (subcategory || "").toLowerCase().trim();
  const normCat = (category || "").toLowerCase().trim();

  if (normSub && CATEGORY_BRANDING_CAPABILITIES[normSub]) {
    return CATEGORY_BRANDING_CAPABILITIES[normSub];
  }
  if (normCat && CATEGORY_BRANDING_CAPABILITIES[normCat]) {
    return CATEGORY_BRANDING_CAPABILITIES[normCat];
  }

  // Alias lookup checks
  for (const [key, branding] of Object.entries(CATEGORY_BRANDING_CAPABILITIES)) {
    if (normSub && (normSub.includes(key) || key.includes(normSub))) {
      return branding;
    }
    if (normCat && (normCat.includes(key) || key.includes(normCat))) {
      return branding;
    }
  }

  return GENERIC_DEFAULT_BRANDING;
}

/**
 * Dynamically resolves product overview at runtime.
 * Priority: Admin Custom Value -> Category/Subcategory Default -> Generic Fallback
 */
export function resolveProductOverview(product?: { overview?: string; category?: string; subcategory?: string; description?: string } | null): string {
  if (!product) return GENERIC_DEFAULT_OVERVIEW;

  if (product.overview && typeof product.overview === "string" && product.overview.trim().length > 0) {
    return product.overview.trim();
  }

  return getCategoryDefaultOverview(product.category, product.subcategory);
}

/**
 * Dynamically resolves branding capabilities at runtime.
 * Priority: showBrandingCapabilities == false -> [] -> Admin Custom Value -> Category/Subcategory Default -> Generic Fallback
 */
export function resolveProductBranding(product?: { brandingCapabilities?: string[]; showBrandingCapabilities?: boolean; category?: string; subcategory?: string; features?: string[] } | null): string[] {
  if (!product) return GENERIC_DEFAULT_BRANDING;

  if (product.showBrandingCapabilities === false) {
    return [];
  }

  if (Array.isArray(product.brandingCapabilities) && product.brandingCapabilities.length > 0) {
    const valid = product.brandingCapabilities.filter((b) => typeof b === "string" && b.trim().length > 0);
    if (valid.length > 0) {
      return valid;
    }
  }

  return getCategoryDefaultBranding(product.category, product.subcategory);
}
