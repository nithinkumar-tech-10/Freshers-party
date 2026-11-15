"use client";

import React from "react";
import { motion } from "framer-motion";

interface GoldDividerProps {
  className?: string;
  label?: string;
}

export function GoldDivider({ className = "", label = "" }: GoldDividerProps) {
  return (
    <div className={`flex items-center justify-center gap-3 my-6 ${className}`}>
      {/* Left line with drawing animation */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="h-[1px] flex-1 max-w-[120px] sm:max-w-[200px] origin-right bg-gradient-to-r from-transparent via-[#D4AF37] to-[#F5E19A]"
      />

      {/* Central Diamond Ornament */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex items-center gap-1.5"
      >
        <span className="w-1 h-1 rounded-full bg-[#D4AF37]/60" />
        <div className="w-2.5 h-2.5 rotate-45 border border-[#D4AF37] bg-[#F5E19A] shadow-[0_0_8px_#D4AF37]" />
        {label && (
          <span className="font-serif text-xs uppercase tracking-[0.25em] text-[#D4AF37] px-2">
            {label}
          </span>
        )}
        <div className="w-2.5 h-2.5 rotate-45 border border-[#D4AF37] bg-[#F5E19A] shadow-[0_0_8px_#D4AF37]" />
        <span className="w-1 h-1 rounded-full bg-[#D4AF37]/60" />
      </motion.div>

      {/* Right line with drawing animation */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="h-[1px] flex-1 max-w-[120px] sm:max-w-[200px] origin-left bg-gradient-to-l from-transparent via-[#D4AF37] to-[#F5E19A]"
      />
    </div>
  );
}

interface FloralCornerProps {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
}

export function FloralCorner({
  position = "top-left",
  className = "",
}: FloralCornerProps) {
  const getRotationClass = () => {
    switch (position) {
      case "top-right":
        return "rotate-90 top-3 right-3";
      case "bottom-right":
        return "rotate-180 bottom-3 right-3";
      case "bottom-left":
        return "-rotate-90 bottom-3 left-3";
      default:
        return "top-3 left-3";
    }
  };

  return (
    <svg
      viewBox="0 0 80 80"
      className={`absolute w-10 h-10 sm:w-14 sm:h-14 pointer-events-none text-[#D4AF37] opacity-60 ${getRotationClass()} ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    >
      <path
        d="M4 35 V8 A4 4 0 0 1 8 4 H35"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M12 28 V14 A2 2 0 0 1 14 12 H28"
        stroke="#F5E19A"
        strokeWidth="1"
        strokeDasharray="2 2"
      />
      <path
        d="M6 6 Q25 15, 30 35 C28 26, 20 20, 6 6"
        fill="currentColor"
        fillOpacity="0.25"
      />
      <circle cx="30" cy="35" r="2" fill="#F5E19A" />
      <path
        d="M16 16 Q35 25, 35 30 Q25 35, 16 16"
        fill="currentColor"
        fillOpacity="0.3"
      />
      <circle cx="8" cy="8" r="1.5" fill="#D4AF37" />
    </svg>
  );
}

export function GraduationCapIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${className} text-[#D4AF37]`}
    >
      <path
        d="M22 10v6M2 10l10-5 10 5-10 5z"
        fill="currentColor"
        fillOpacity="0.2"
      />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

export function RoyalCrownIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`${className} text-[#D4AF37]`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.5 19H21.5C21.78 19 22 18.78 22 18.5V17C22 16.45 21.55 16 21 16H3C2.45 16 2 16.45 2 17V18.5C2 18.78 2.22 19 2.5 19Z"
        opacity="0.9"
      />
      <path d="M3.45 14.5L5.78 7.52C5.97 6.95 6.7 6.8 7.1 7.25L10.3 10.85C10.66 11.25 11.3 11.23 11.63 10.81L16.92 4.02C17.29 3.55 18.06 3.73 18.18 4.31L20.55 14.5H3.45Z" />
      <circle cx="12" cy="3" r="1.5" fill="#FFFDF9" />
      <circle cx="5" cy="6" r="1.2" fill="#FFFDF9" />
      <circle cx="19" cy="4" r="1.2" fill="#FFFDF9" />
    </svg>
  );
}
