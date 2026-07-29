"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useInView, animate } from "framer-motion";
import { ArrowRight, ChevronRight, CheckCircle2 } from "lucide-react";
import { Button } from "../ui/Button";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  EASE_OUT,
  SPRING_SOFT,
} from "@/lib/animations";

// ─── Animated Counter (viewport-triggered) ────────────────────────────────────
function CountUpNumber({
  end,
  suffix = "",
  duration = 2.0,
  start = false,
}: {
  end: number;
  suffix?: string;
  duration?: number;
  start?: boolean;
}) {
  const [count, setCount] = useState(0);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!start || prefersReduced) return;

    const controls = animate(0, end, {
      duration,
      ease: "easeOut",
      onUpdate(v) { setCount(Math.floor(v)); },
    });
    return controls.stop;
  }, [end, duration, start, prefersReduced]);

  const displayCount = prefersReduced ? end : count;

  return <span>{displayCount.toLocaleString()}{suffix}</span>;
}

// ─── Stat Card (individual spring reveal + counter) ───────────────────────────
function StatCard({
  value,
  label,
  delay,
  mobile = false,
}: {
  value: number;
  suffix?: string;
  label: string;
  delay: number;
  mobile?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const prefersReduced = useReducedMotion();

  const suffix = label === "Gifts Delivered" ? "k+" : "+";
  const displayEnd = label === "Gifts Delivered" ? 100 : value;

  return (
    <motion.div
      ref={ref}
      initial={prefersReduced ? false : { opacity: 0, y: 28, scale: 0.92 }}
      animate={prefersReduced ? undefined : { opacity: 1, y: 0, scale: 1 }}
      transition={{ ...SPRING_SOFT, delay }}
      className={
        mobile
          ? "rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm px-2 py-2 text-center"
          : ""
      }
    >
      <div className={mobile ? "text-lg font-black text-white leading-none" : "text-xl sm:text-2xl font-black text-white"}>
        <CountUpNumber end={displayEnd} suffix={suffix} start={inView} />
      </div>
      <div className={mobile ? "text-[9px] font-bold text-white/70 uppercase tracking-widest mt-1" : "text-[8px] sm:text-[9px] font-bold text-white/60 uppercase tracking-widest mt-1"}>
        {label}
      </div>
    </motion.div>
  );
}

// ─── Feature Chip ─────────────────────────────────────────────────────────────
const controlRevealStyle = (delay: number): React.CSSProperties => ({
  animationName: "hero-word-enter",
  animationDuration: "0.64s",
  animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
  animationFillMode: "both",
  animationDelay: `${delay}s`,
  opacity: 0,
  willChange: "opacity, transform, filter",
});

function FeatureChip({ tag, delay, small = false }: { tag: string; delay: number; small?: boolean }) {
  return (
    <span
      className={
        small
          ? "hero-control-reveal text-[9px] font-bold px-2.5 py-1 rounded-lg bg-white/15 border border-white/20 text-white shadow-sm flex items-center gap-1"
          : "hero-control-reveal text-[10px] font-bold px-3 py-1 rounded-lg bg-white/10 border border-white/20 text-white shadow-sm flex items-center gap-1"
      }
      style={controlRevealStyle(delay)}
    >
      <CheckCircle2 className="w-2.5 h-2.5 text-[#EF5350]" />
      {tag}
    </span>
  );
}
function AnimatedWords({
  text,
  className = "",
  wordClassName = "",
  delay = 0,
  step = 0.12,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  step?: number;
}) {
  const words = text.split(" ");

  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden="true"
          className={`hero-word-reveal inline-block ${wordClassName}`}
          style={{
            animationName: "hero-word-enter",
            animationDuration: "0.78s",
            animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            animationFillMode: "both",
            animationDelay: `${delay + i * step}s`,
            opacity: 0,
            willChange: "opacity, transform, filter",
          }}
        >
          {word}
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </span>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
export function HeroSection() {
  const prefersReduced = useReducedMotion();

  // Base delay config — everything is offset from 0
  const d = prefersReduced ? 0 : 1; // multiply by 0 to collapse all delays
  const t = (base: number) => base * d;

  const desktopChips = [
    "Welcome Kits",
    "Corporate Gifting",
    "Premium Giveaways",
    "Branded Merchandise",
    "Executive Gift Sets",
  ];

  return (
    <section className="relative min-h-[100svh] lg:min-h-[70vh] pt-[72px] pb-5 sm:pt-[88px] sm:pb-8 lg:pt-28 lg:pb-16 flex items-center overflow-hidden">

      {/* ── Background Video ── */}
      <motion.div
        className="absolute inset-0 w-full h-full overflow-hidden z-0 select-none pointer-events-none"
        initial={prefersReduced ? false : { scale: 1.08, opacity: 0.7 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: EASE_OUT }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/gifting.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* ── Overlays — fade in after bg ── */}
      <motion.div
        className="absolute inset-0 bg-[#2B2B2B]/40 z-[1] select-none pointer-events-none"
        initial={prefersReduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: t(0.2) }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-[#2B2B2B]/10 via-[#2B2B2B]/30 to-[#2B2B2B]/65 z-[1] select-none pointer-events-none"
        initial={prefersReduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: t(0.3) }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#2B2B2B]/50 via-transparent to-transparent z-[1] select-none pointer-events-none" />

      {/* ══════════════════════════════════════════════════════════════════════
          MOBILE HERO
         ══════════════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:hidden">
        <div className="mx-auto flex min-h-[calc(100svh-92px)] max-w-md flex-col justify-start">

          {/* Heading */}
          <motion.h1
            initial={false}
            className="pt-8 text-[36px] min-[375px]:text-[40px] sm:text-[44px] font-black tracking-tight text-white leading-[1]"
          >
            <AnimatedWords text="Elevating Corporate" delay={t(0.5)} />
            <AnimatedWords
              text="Gifting Experiences"
              delay={t(1.0)}
              className="block"
              wordClassName="text-[#EF4444]"
            />
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={false}
            className="mt-6 max-w-sm text-[15px] leading-[1.55] text-white/90 font-semibold"
          >
            <AnimatedWords
              text="Thoughtfully Curated. Beautifully Packaged. Meaningful Delivery."
              delay={t(1.45)}
              step={0.055}
            />
          </motion.p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col gap-3">
            <Link
              href="/corporate-kits"
              className="w-full inline-flex items-center justify-center h-12 rounded-2xl bg-gradient-to-r from-[#EF4444] to-[#DC2626] text-white text-xs font-black uppercase tracking-wider shadow-lg hover:shadow-xl transition-all"
            >
              Explore Corporate Kits
            </Link>
            <Link
              href="/promotional-merchandise"
              className="w-full inline-flex items-center justify-center h-12 rounded-2xl bg-white/10 text-white border border-white/20 text-xs font-black uppercase tracking-wider backdrop-blur-md hover:bg-white/20 transition-all"
            >
              Browse Catalogue
            </Link>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          DESKTOP HERO
         ══════════════════════════════════════════════════════════════════════ */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 hidden lg:block">
        <div className="max-w-xl space-y-4 sm:space-y-5 text-left">

          {/* Heading container to prevent overlap with background graphics */}
          <div className="max-w-[480px] space-y-1">
            {/* Heading line 1 */}
            <div className="text-2xl sm:text-4xl lg:text-[44px] xl:text-[50px] font-black tracking-tight text-white leading-[1.1] sm:leading-[1.05]">
              <AnimatedWords text="Elevating Corporate" delay={t(0.6)} />
            </div>

            {/* Heading line 2 */}
            <div className="-mt-1 text-2xl sm:text-4xl lg:text-[44px] xl:text-[50px] font-black tracking-tight leading-[1.1] sm:leading-[1.05]">
              <AnimatedWords
                text="Gifting Experiences"
                delay={t(0.83)}
                wordClassName="text-[#D32F2F]"
               
              />
            </div>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={false}
            className="text-white/85 text-xs sm:text-sm md:text-base max-w-xl leading-relaxed font-medium"
          >
            <AnimatedWords
              text="Bespoke Employee Welcome Kits, Premium Giveaways, and Executive Gift Sets curated to elevate your brand perception, delight clients, and build team unity."
              delay={t(1.02)}
              step={0.025}
             
            />
          </motion.p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-2.5 pt-2 sm:gap-4 sm:pt-3">
            <div className="hero-control-reveal" style={controlRevealStyle(t(1.75))}>
              <Button
                variant="default"
                className="h-10 sm:h-11 w-full sm:w-auto px-4 sm:px-6 rounded-2xl font-bold bg-[#D32F2F] hover:bg-[#C62828] text-white flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(211,47,47,0.25)] hover:shadow-[0_0_30px_rgba(211,47,47,0.35)] hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200 border-0 cursor-pointer text-xs sm:text-sm"
                asChild
              >
                <Link href="/promotional-merchandise">
                  Explore Products
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>

            <div className="hero-control-reveal" style={controlRevealStyle(t(1.9))}>
              <Button
                variant="outline"
                className="h-10 sm:h-11 w-full sm:w-auto px-4 sm:px-6 rounded-2xl font-bold border border-white/30 text-white bg-white/10 hover:bg-white/20 backdrop-blur-md hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.97] flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer text-xs sm:text-sm shadow-md"
                asChild
              >
                <Link href="/enquiry">
                  Get Custom Quote <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Feature Chips — one by one */}
          <div className="flex flex-wrap gap-2 pt-1">
            {desktopChips.map((tag, i) => (
              <FeatureChip key={tag} tag={tag} delay={t(1.3 + i * 0.12)} />
            ))}
          </div>

          {/* Stats — one by one, spring physics, counters start when visible */}
          <div className="grid grid-cols-3 gap-4 pt-6 sm:gap-6 sm:pt-8 border-t border-white/20 max-w-lg">
            <StatCard value={500} label="Corporate Clients"  delay={t(1.75)} />
            <StatCard value={100} label="Gifts Delivered"    delay={t(1.9)} />
            <StatCard value={15}  label="Years Experience"   delay={t(2.05)} />
          </div>
        </div>
      </div>

    </section>
  );
}
