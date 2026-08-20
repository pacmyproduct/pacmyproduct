"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./Button";
import { motion, AnimatePresence } from "framer-motion";

export function MobileStickyCTA() {
  const [show, setShow] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero section (approx 500px)
      if (window.scrollY > 500) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname === "/enquiry") return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t border-[#D9D1C3] z-40 md:hidden flex justify-center shadow-[0_-10px_20px_rgba(78,88,63,0.10)]"
        >
          <Button variant="default" size="lg" className="w-full h-14 bg-[#D32F2F] hover:bg-[#C62828] text-white font-bold rounded-xl text-lg relative" asChild>
            <Link href="/enquiry">
              Request a Quote
            </Link>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
