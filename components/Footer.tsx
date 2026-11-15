"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUp, Heart } from "lucide-react";
import { GoldDivider, RoyalCrownIcon } from "./DecorativeDividers";
import { MagneticButton } from "./MagneticButton";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closingWords =
    "“Be there to welcome the freshers into our college family!”".split(" ");

  return (
    <footer className="relative bg-[#040A18] text-[#FFF8E7] pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-t border-[#D4AF37]/30 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-32 bg-[#D4AF37]/10 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Closing Invitation Message with Word-by-Word Reveal */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <RoyalCrownIcon className="w-8 h-8 text-[#D4AF37] mx-auto animate-pulse" />

          <motion.h3
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.08,
                },
              },
            }}
            className="font-serif text-2xl sm:text-4xl font-bold shimmer-text leading-snug flex flex-wrap justify-center gap-x-2"
          >
            {closingWords.map((word, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      type: "spring",
                      stiffness: 280,
                      damping: 18,
                    },
                  },
                }}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-script text-2xl sm:text-3xl text-[#F5E19A]"
          >
            AAGMAN 2K26 &bull; A Grand Welcome to New Beginnings...
          </motion.p>

          <GoldDivider />
        </div>

        {/* Institution & Department Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-b border-[#D4AF37]/15 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-2"
          >
            <span className="text-[10px] uppercase font-serif tracking-[0.25em] text-[#D4AF37] font-semibold">
              Institution
            </span>
            <h4 className="font-serif text-lg font-bold text-[#FFF8E7]">
              G Madegowda Institute of Technology
            </h4>
            <p className="text-xs text-[#FFF8E7]/70 font-sans leading-relaxed">
              Kuvempu Sabhangana, Bharathinagar, KM Doddi, Maddur Taluk, Mandya District, Karnataka - 571422
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-2"
          >
            <span className="text-[10px] uppercase font-serif tracking-[0.25em] text-[#D4AF37] font-semibold">
              Organized By
            </span>
            <h4 className="font-serif text-lg font-bold text-[#FFF8E7]">
              Department of CSE &amp; CSD
            </h4>
            <p className="text-xs text-[#FFF8E7]/70 font-sans leading-relaxed">
              Computer Science &amp; Engineering <br />
              Computer Science &amp; Design <br />
              GMIT Student Cultural &amp; Technical Council
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-2 flex flex-col items-center md:items-start justify-between"
          >
            <div>
              <span className="text-[10px] uppercase font-serif tracking-[0.25em] text-[#D4AF37] font-semibold">
                Event Schedule
              </span>
              <p className="text-sm font-serif font-medium text-[#F5E19A]">
                Tuesday, 17 November 2026
              </p>
              <p className="text-xs text-[#FFF8E7]/70">
                11:00 AM IST &bull; Kuvempu Sabhangana
              </p>
            </div>

            <MagneticButton
              onClick={scrollToTop}
              className="mt-4 px-4 py-2 rounded-full border border-[#D4AF37]/40 bg-[#0B1B3F]/60 text-xs font-serif uppercase tracking-widest text-[#F5E19A] hover:bg-[#D4AF37]/20 transition-all flex items-center gap-2 cursor-pointer shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
            >
              <span>Back To Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </MagneticButton>
          </motion.div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FFF8E7]/60 font-sans">
          <p>
            &copy; 2026 AAGMAN &bull; G Madegowda Institute of Technology. All Rights Reserved.
          </p>
          <div className="flex items-center gap-1.5 text-[#F5E19A]/80">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
            <span>for the Freshers of 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
