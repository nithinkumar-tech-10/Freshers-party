"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Maximize2, X, Sparkles } from "lucide-react";
import { GoldDivider, FloralCorner } from "./DecorativeDividers";
import { MagneticButton } from "./MagneticButton";

export function InvitationPoster() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    setIsFinePointer(
      window.matchMedia("(pointer: fine)").matches &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isFinePointer || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    // Subtle 3D tilt: rotateX is inverted relative to y
    setRotate({ x: -y * 8, y: x * 8 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <section
      id="invitation"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#060E22] via-[#0A1838] to-[#060E22] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Section Heading with Gold Script Font */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
          className="mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="font-serif text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
              Official Card
            </span>
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          </div>

          <h2 className="font-script text-4xl sm:text-6xl md:text-7xl text-[#F5E19A] drop-shadow-md">
            Your Invitation
          </h2>

          <p className="font-sans text-xs sm:text-sm text-[#FFF8E7]/70 max-w-md mx-auto mt-2">
            Tap the royal invitation card to view in full resolution or download your copy.
          </p>

          <GoldDivider />
        </motion.div>

        {/* Framed Poster Card with Entrance Animation & 3D Tilt */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          initial={{ opacity: 0, y: 60, rotateZ: -3 }}
          whileInView={{ opacity: 1, y: 0, rotateZ: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            transform: isFinePointer
              ? `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`
              : undefined,
            transition: isFinePointer ? "transform 0.15s ease-out" : undefined,
          }}
          className="relative max-w-md mx-auto rounded-3xl p-3 sm:p-5 bg-gradient-to-b from-[#142852]/80 via-[#0B1B3F]/90 to-[#060E22] border border-[#D4AF37]/50 shadow-[0_15px_45px_rgba(0,0,0,0.8),0_0_35px_rgba(212,175,55,0.25)] group cursor-pointer overflow-hidden"
          onClick={() => setLightboxOpen(true)}
        >
          {/* Floral Corner Accents */}
          <FloralCorner position="top-left" className="opacity-70 group-hover:opacity-100 transition-opacity" />
          <FloralCorner position="top-right" className="opacity-70 group-hover:opacity-100 transition-opacity" />
          <FloralCorner position="bottom-left" className="opacity-70 group-hover:opacity-100 transition-opacity" />
          <FloralCorner position="bottom-right" className="opacity-70 group-hover:opacity-100 transition-opacity" />

          {/* Shimmer sweep animation across the poster once on view */}
          <motion.div
            initial={{ x: "-100%" }}
            whileInView={{ x: "200%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.4, ease: "easeInOut" }}
            className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
          />

          {/* Poster Image Container */}
          <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden border border-[#D4AF37]/30 bg-[#060E22]">
            <Image
              src="/poster.png"
              alt="AAGMAN 2K26 Official Invitation Poster"
              fill
              className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
            />

            {/* Hover overlay hint */}
            <div className="absolute inset-0 bg-[#0B1B3F]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
              <div className="px-4 py-2 rounded-full bg-[#060E22]/90 border border-[#D4AF37] text-xs font-serif uppercase tracking-widest text-[#F5E19A] flex items-center gap-2 shadow-[0_0_15px_#D4AF37]">
                <Maximize2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>View Fullscreen</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Download Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex justify-center"
        >
          <a
            href="/poster.png"
            download="AAGMAN_2K26_Invitation.png"
            className="gold-btn px-7 py-3.5 rounded-full text-xs font-serif uppercase tracking-widest flex items-center justify-center gap-2.5 shadow-[0_0_25px_rgba(212,175,55,0.45)] group cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#060E22] group-hover:translate-y-0.5 transition-transform" />
            <span>Download Invitation</span>
          </a>
        </motion.div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setLightboxOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-3 rounded-full bg-[#0B1B3F]/90 border border-[#D4AF37] text-[#F5E19A] hover:text-white hover:scale-110 transition-all z-60 cursor-pointer shadow-[0_0_20px_rgba(212,175,55,0.5)]"
              aria-label="Close fullscreen invitation"
            >
              <X className="w-6 h-6 text-[#F5E19A]" />
            </button>

            {/* Poster in Lightbox with zoom-in spring */}
            <motion.div
              initial={{ scale: 0.75, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.75, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 260 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full max-h-[85vh] aspect-[3/4] sm:aspect-[4/5] rounded-3xl overflow-hidden border-2 border-[#D4AF37] shadow-[0_0_50px_rgba(212,175,55,0.4)]"
            >
              <Image
                src="/poster.png"
                alt="AAGMAN 2K26 Official Invitation Poster Fullscreen"
                fill
                className="object-contain bg-[#060E22]"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

