import React from "react";
import { cn } from "@/lib/utils";

export function BackgroundGradient({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute inset-0 z-[-1] pointer-events-none w-full max-w-full min-w-0 overflow-hidden opacity-30 blur-2xl sm:blur-[120px]",
        className
      )}
    >
      <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-[#D32F2F] rounded-full mix-blend-multiply opacity-20" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-[#EF5350] rounded-full mix-blend-multiply opacity-15" />
    </div>
  );
}
