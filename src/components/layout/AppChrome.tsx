"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ShortlistProvider } from "@/context/ShortlistContext";
import { ProductPreviewProvider } from "@/context/ProductPreviewContext";
import { NavigationCacheProvider } from "@/context/NavigationCacheContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { MobileStickyCTA } from "@/components/ui/MobileStickyCTA";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";
import { ProductPreviewModal } from "@/components/ui/ProductPreviewModal";
import { SmartTimedPopup } from "@/components/ui/SmartTimedPopup";

const pageVariants = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] as const } },
  exit:    { opacity: 0, y: 16, transition: { duration: 0.28, ease: [0.4, 0, 1, 1] as const } },
};

export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/87564/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <NavigationCacheProvider>
      <ShortlistProvider>
        <ProductPreviewProvider>
          <ScrollProgressBar />
          <Navbar />
        <main className="flex-1 flex flex-col pt-[80px] lg:pt-[90px] w-full max-w-full min-w-0 overflow-x-clip">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={pathname}
              variants={pageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex-1 flex flex-col w-full max-w-full min-w-0"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
        <FloatingWhatsApp />
        <MobileStickyCTA />
        <ProductPreviewModal />
        <SmartTimedPopup />
        </ProductPreviewProvider>
      </ShortlistProvider>
    </NavigationCacheProvider>
  );
}
