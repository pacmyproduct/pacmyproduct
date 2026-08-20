"use client";

import React, { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { EASE_SMOOTH } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface SectionHeadingProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title: ReactNode;
  subtitle?: ReactNode;
  centered?: boolean;
}

export function SectionHeading({
  title,
  subtitle,
  centered = false,
  className,
  ...props
}: SectionHeadingProps) {
  const prefersReduced = useReducedMotion();
  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.65, ease: EASE_SMOOTH }}
      className={cn("mb-12 sm:mb-16 w-full max-w-full min-w-0", centered && "text-center", className)}
      {...(props as any)}
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#2B2B2B] break-words [overflow-wrap:anywhere] max-w-full min-w-0">
        {title}
      </h2>

      {/* Gold underline — grows from left on viewport entry */}
      <motion.div
        initial={prefersReduced ? false : { scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: 0.3, ease: EASE_SMOOTH }}
        style={{ originX: centered ? 0.5 : 0 }}
        className={cn(
          "mt-4 h-1 rounded-full bg-[#EF5350]",
          centered ? "mx-auto w-12" : "w-12"
        )}
      />

      {subtitle && (
        <motion.p
          initial={prefersReduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.55, delay: 0.2, ease: EASE_SMOOTH }}
          className={cn(
            "text-[#6B6B63] text-xs sm:text-base md:text-lg mt-3 sm:mt-5 leading-relaxed break-words [overflow-wrap:anywhere] w-full min-w-0",
            centered && "mx-auto max-w-2xl"
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}