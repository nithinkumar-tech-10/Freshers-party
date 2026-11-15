"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroCurtainProps {
  onComplete?: () => void;
}

export function IntroCurtain({ onComplete }: IntroCurtainProps) {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Safe sessionStorage check: only show once per visit
    try {
      const alreadyShown = sessionStorage.getItem("aagman_intro_shown");
      if (alreadyShown) {
        if (onComplete) onComplete();
        return;
      }
    } catch (e) {
      console.warn("sessionStorage not accessible", e);
    }

    setVisible(true);

    const timer = setTimeout(() => {
      handleComplete();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const handleComplete = () => {
    try {
      sessionStorage.setItem("aagman_intro_shown", "true");
    } catch (e) {
      console.warn("sessionStorage not accessible", e);
    }
    setVisible(false);
    if (onComplete) onComplete();
  };

  if (!mounted || !visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="curtain"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#060E22]"
        >
          {/* Left Gold-trimmed Navy Panel */}
          <motion.div
            initial={{ x: "0%" }}
            exit={{ x: "-100%" }}
            transition={{
              duration: 1.2,
              ease: [0.77, 0, 0.175, 1],
              delay: 0.15,
            }}
            className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#060E22] via-[#0B1B3F] to-[#12244F] border-r-2 border-[#D4AF37]/50 shadow-[10px_0_30px_rgba(0,0,0,0.8)]"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#D4AF37]/10 to-transparent" />
          </motion.div>

          {/* Right Gold-trimmed Navy Panel */}
          <motion.div
            initial={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{
              duration: 1.2,
              ease: [0.77, 0, 0.175, 1],
              delay: 0.15,
            }}
            className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-[#060E22] via-[#0B1B3F] to-[#12244F] border-l-2 border-[#D4AF37]/50 shadow-[-10px_0_30px_rgba(0,0,0,0.8)]"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#D4AF37]/10 to-transparent" />
          </motion.div>

          {/* Center Logo Draw-in & Reveal */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 1.15, opacity: 0, transition: { duration: 0.5 } }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 text-center px-6 max-w-lg flex flex-col items-center select-none"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-dashed border-[#D4AF37] p-2 flex items-center justify-center mb-6 shadow-[0_0_35px_rgba(212,175,55,0.4)]"
            >
              <div className="w-full h-full rounded-full border border-[#F5E19A]/80 flex items-center justify-center bg-[#0B1B3F]/80 backdrop-blur-md">
                <span className="font-serif text-3xl sm:text-4xl font-bold shimmer-text">
                  A
                </span>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-xs sm:text-sm tracking-[0.35em] text-[#D4AF37] uppercase font-serif mb-2"
            >
              G Madegowda Institute of Technology
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 15, letterSpacing: "0.05em" }}
              animate={{ opacity: 1, y: 0, letterSpacing: "0.15em" }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="font-serif text-4xl sm:text-5xl font-extrabold uppercase shimmer-text mb-2"
            >
              AAGMAN 2K26
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="font-script text-2xl sm:text-3xl text-[#F5E19A]"
            >
              Freshers Party
            </motion.p>

            <motion.button
              type="button"
              onClick={handleComplete}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.65 }}
              whileHover={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="mt-8 text-xs tracking-widest text-[#FFF8E7]/70 hover:text-[#D4AF37] uppercase underline underline-offset-4 cursor-pointer"
            >
              Click anywhere to Enter
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
