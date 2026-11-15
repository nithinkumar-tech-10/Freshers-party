"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, Calendar, ArrowRight, Eye } from "lucide-react";
import { Countdown } from "./Countdown";
import { Particles } from "./Particles";
import { CrowdSilhouette } from "./CrowdSilhouette";
import { RoyalCrownIcon } from "./DecorativeDividers";
import { MagneticButton } from "./MagneticButton";

export function Hero() {
  const containerRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  const titleLetters = "AAGMAN 2K26".split("");

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      if (id === "register") {
        window.dispatchEvent(new CustomEvent("pulse-register-form"));
      }
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen pt-28 pb-0 flex flex-col justify-between items-center overflow-hidden bg-gradient-to-b from-[#060E22] via-[#0B1B3F] to-[#060E22]"
    >
      {/* Background Decorative Parallax Layer */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 pointer-events-none z-0"
      >
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[550px] md:w-[750px] h-[320px] sm:h-[550px] md:h-[750px] rounded-full bg-gradient-to-br from-[#D4AF37]/15 via-[#142852]/30 to-transparent blur-3xl" />
        <div className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]" />
      </motion.div>

      {/* Floating Particles & Graduation Caps with Mouse Parallax */}
      <Particles count={42} showCaps={true} />

      {/* Main Hero Content */}
      <motion.div
        style={{ opacity: opacityHero }}
        className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center justify-center my-auto w-full"
      >
        {/* College & Department Royal Crest */}
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center mb-3"
        >
          <div className="flex items-center gap-2 mb-2">
            <RoyalCrownIcon className="w-5 h-5 text-[#D4AF37] animate-pulse" />
            <span className="font-serif text-[11px] sm:text-xs md:text-sm tracking-[0.25em] text-[#F5E19A] uppercase font-semibold">
              G Madegowda Institute of Technology
            </span>
            <RoyalCrownIcon className="w-5 h-5 text-[#D4AF37] animate-pulse" />
          </div>

          <p className="text-[10px] sm:text-xs tracking-wider text-[#FFF8E7]/70 font-sans max-w-md">
            Department of Computer Science & Engineering <br className="hidden sm:inline" />
            and Computer Science & Design
          </p>
        </motion.div>

        {/* Invitation Line */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="my-3 flex items-center justify-center gap-2"
        >
          <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <p className="font-serif text-xs sm:text-sm uppercase tracking-[0.35em] text-[#D4AF37] font-medium">
            You are cordially invited to
          </p>
          <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </motion.div>

        {/* Main Title: AAGMAN 2K26 (Letter-by-letter spring drop-in + continuous shimmer) */}
        <h1 className="text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-black tracking-tight sm:tracking-normal my-2 select-none flex flex-wrap justify-center items-center">
          {titleLetters.map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: -65, scale: 0.6 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 14,
                delay: 0.45 + index * 0.05,
              }}
              className={`inline-block ${
                char === " "
                  ? "w-3 sm:w-6"
                  : "shimmer-text drop-shadow-[0_4px_18px_rgba(212,175,55,0.45)]"
              }`}
            >
              {char}
            </motion.span>
          ))}
        </h1>

        {/* Gold Ribbon Badge: "FRESHERS PARTY" */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 18,
            delay: 1.05,
          }}
          className="relative inline-flex items-center justify-center my-4"
        >
          <div className="relative px-6 sm:px-10 py-1.5 sm:py-2 bg-gradient-to-r from-[#D4AF37] via-[#F5E19A] to-[#D4AF37] text-[#060E22] rounded-md shadow-[0_0_25px_rgba(212,175,55,0.5)] border-t border-b border-white/60 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#060E22]" />
            <span className="font-serif font-black text-xs sm:text-sm md:text-base tracking-[0.25em] uppercase">
              Freshers Party
            </span>
            <Sparkles className="w-4 h-4 text-[#060E22]" />
          </div>
        </motion.div>

        {/* Script Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.25 }}
          className="font-script text-2xl sm:text-3xl md:text-4xl text-[#F5E19A] font-normal my-3 drop-shadow-md"
        >
          &ldquo;A Grand Welcome to New Beginnings...&rdquo;
        </motion.p>

        {/* Live Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.45 }}
          className="w-full max-w-xl my-6"
        >
          <Countdown />
        </motion.div>

        {/* Action Buttons with Magnetic hover */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.65 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-2 mb-8 w-full sm:w-auto"
        >
          <MagneticButton
            onClick={() => scrollToSection("register")}
            className="gold-btn w-full sm:w-auto px-8 py-3.5 rounded-full font-serif text-sm uppercase tracking-widest flex items-center justify-center gap-2.5 shadow-[0_0_30px_rgba(212,175,55,0.45)] group cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#060E22] group-hover:rotate-45 transition-transform" />
            <span>Register Now</span>
            <ArrowRight className="w-4 h-4 text-[#060E22] group-hover:translate-x-1 transition-transform" />
          </MagneticButton>

          <MagneticButton
            onClick={() => scrollToSection("invitation")}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full font-serif text-sm uppercase tracking-widest text-[#FFF8E7] border border-[#D4AF37]/50 bg-[#0B1B3F]/50 backdrop-blur-md hover:bg-[#D4AF37]/15 hover:border-[#F5E19A] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_15px_rgba(0,0,0,0.3)]"
          >
            <Eye className="w-4 h-4 text-[#D4AF37]" />
            <span>View Invitation</span>
          </MagneticButton>

          <MagneticButton
            onClick={() => scrollToSection("details")}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full font-serif text-sm uppercase tracking-widest text-[#FFF8E7]/80 border border-[#D4AF37]/30 bg-[#060E22]/60 hover:text-[#FFF8E7] hover:border-[#F5E19A] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_15px_rgba(0,0,0,0.3)]"
          >
            <Calendar className="w-4 h-4 text-[#D4AF37]" />
            <span>Details</span>
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Bottom Crowd Silhouette */}
      <div className="w-full mt-auto">
        <CrowdSilhouette />
      </div>
    </section>
  );
}
