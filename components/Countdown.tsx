"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TARGET_DATE = new Date("2026-11-17T11:00:00+05:30").getTime();

interface FlipDigitProps {
  value: number;
  label: string;
}

function FlipDigit({ value, label }: FlipDigitProps) {
  const formatted = String(value).padStart(2, "0");

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-16 h-20 sm:w-20 sm:h-24 md:w-24 md:h-28 rounded-xl bg-gradient-to-b from-[#142852] to-[#071228] border border-[#D4AF37]/40 shadow-[0_8px_25px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(245,225,154,0.3)] flex items-center justify-center overflow-hidden">
        {/* Horizontal Seam */}
        <div className="absolute inset-x-0 top-1/2 h-[1px] bg-[#060E22]/80 z-20 shadow-[0_1px_0_rgba(212,175,55,0.2)]" />
        <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

        <AnimatePresence mode="popLayout">
          <motion.span
            key={formatted}
            initial={{ y: -24, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl shimmer-text z-10"
          >
            {formatted}
          </motion.span>
        </AnimatePresence>

        <span className="absolute left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#D4AF37]/50" />
        <span className="absolute right-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#D4AF37]/50" />
      </div>

      <span className="mt-2 text-[10px] sm:text-xs uppercase font-serif tracking-[0.2em] text-[#F5E19A]/90 font-medium">
        {label}
      </span>
    </div>
  );
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const calculate = () => {
      const now = new Date().getTime();
      const diff = TARGET_DATE - now;

      if (diff <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
        });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center gap-3 sm:gap-5 py-4">
        {["Days", "Hours", "Minutes", "Seconds"].map((label) => (
          <div
            key={label}
            className="w-16 h-20 sm:w-20 sm:h-24 rounded-xl bg-[#0B1B3F]/50 border border-[#D4AF37]/20 animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex items-center justify-center gap-2.5 sm:gap-4 md:gap-6">
        <FlipDigit value={timeLeft.days} label="Days" />
        <span className="font-serif text-xl sm:text-2xl text-[#D4AF37] font-bold self-center -mt-6 opacity-70">
          :
        </span>
        <FlipDigit value={timeLeft.hours} label="Hours" />
        <span className="font-serif text-xl sm:text-2xl text-[#D4AF37] font-bold self-center -mt-6 opacity-70">
          :
        </span>
        <FlipDigit value={timeLeft.minutes} label="Minutes" />
        <span className="font-serif text-xl sm:text-2xl text-[#D4AF37] font-bold self-center -mt-6 opacity-70">
          :
        </span>
        <FlipDigit value={timeLeft.seconds} label="Seconds" />
      </div>

      {timeLeft.isExpired && (
        <p className="mt-3 font-serif text-sm text-[#F5E19A] tracking-wider animate-bounce">
          The Celebration Has Begun! Welcome Freshers!
        </p>
      )}
    </div>
  );
}

