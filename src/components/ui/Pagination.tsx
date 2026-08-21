"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalResults?: number;
  itemsPerPage?: number;
}

export function getPaginationPages(currentPage: number, totalPages: number): (number | "...")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | "...")[] = [];
  pages.push(1);

  if (currentPage > 3) {
    pages.push("...");
  }

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  for (let i = start; i <= end; i++) {
    if (i > 1 && i < totalPages) {
      pages.push(i);
    }
  }

  if (currentPage < totalPages - 2) {
    pages.push("...");
  }

  pages.push(totalPages);

  return pages;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalResults,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getPaginationPages(currentPage, totalPages);

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="mt-10 pt-6 border-t border-gray-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
      {/* Page Info */}
      <div className="text-xs font-semibold text-[#6B6B63] flex items-center gap-1.5 order-2 sm:order-1">
        <span>Showing Page</span>
        <span className="font-extrabold text-[#2B2B2B] bg-[#FAF9F6] border border-[#F5C2C2] px-2 py-0.5 rounded-md">
          {currentPage}
        </span>
        <span>of</span>
        <span className="font-extrabold text-[#2B2B2B]">{totalPages}</span>
        {typeof totalResults === "number" && (
          <span className="hidden md:inline-block text-gray-400">
            ({totalResults} {totalResults === 1 ? "product" : "products"})
          </span>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="inline-flex items-center gap-1.5 p-1 bg-white border border-[#F5C2C2] rounded-2xl shadow-sm order-1 sm:order-2">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold text-gray-700 hover:text-[#D32F2F] hover:bg-[#FAF9F6] transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
          aria-label="Previous Page"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Prev</span>
        </button>

        <div className="flex items-center gap-1 px-1">
          {pages.map((page, idx) => {
            if (page === "...") {
              return (
                <span
                  key={`ellipsis-${idx}`}
                  className="w-8 h-8 flex items-center justify-center text-xs font-bold text-gray-400 cursor-default select-none"
                >
                  ...
                </span>
              );
            }

            const isCurrent = page === currentPage;

            return (
              <motion.button
                key={`page-${page}`}
                whileHover={{ scale: isCurrent ? 1.05 : 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onPageChange(page)}
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl text-xs font-black transition-all flex items-center justify-center cursor-pointer ${
                  isCurrent
                    ? "bg-[#D32F2F] text-white shadow-md shadow-[#D32F2F]/20"
                    : "bg-transparent text-gray-700 hover:text-[#D32F2F] hover:bg-[#FAF9F6]"
                }`}
                aria-label={`Page ${page}`}
                aria-current={isCurrent ? "page" : undefined}
              >
                {page}
              </motion.button>
            );
          })}
        </div>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold text-gray-700 hover:text-[#D32F2F] hover:bg-[#FAF9F6] transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
          aria-label="Next Page"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
