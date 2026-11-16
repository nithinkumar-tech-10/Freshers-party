"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  Share2,
  Maximize2,
  X,
  RotateCcw,
  Sparkles,
  FastForward,
  Check,
  GraduationCap,
} from "lucide-react";
import { fireSuccessConfetti } from "./Confetti";
import { MagneticButton } from "./MagneticButton";

interface PosterRevealSuccessProps {
  userName: string;
  onReset?: () => void;
}

type RevealPhase =
  | "envelope"
  | "seal"
  | "flap"
  | "poster"
  | "celebrate"
  | "complete";

export function PosterRevealSuccess({
  userName,
  onReset,
}: PosterRevealSuccessProps) {
  const [phase, setPhase] = useState<RevealPhase>("envelope");
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [isFinePointer, setIsFinePointer] = useState<boolean>(false);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const posterCardRef = useRef<HTMLDivElement | null>(null);

  // Parse first name in title case
  const cleanFirstName = (() => {
    const raw = userName.trim().split(/\s+/)[0] || "Friend";
    return raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase();
  })();

  // Display full name in title case
  const formattedFullName = (() => {
    if (!userName.trim()) return "Friend";
    return userName
      .trim()
      .split(/\s+/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(" ");
  })();

  const clearAllTimers = () => {
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];
  };

  // Check prefers-reduced-motion and pointer capabilities
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fineQuery = window.matchMedia("(pointer: fine)");

    setReducedMotion(motionQuery.matches);
    setIsFinePointer(fineQuery.matches && !motionQuery.matches);

    if (motionQuery.matches) {
      setPhase("complete");
      return;
    }

    startAnimationSequence();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearAllTimers();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const startAnimationSequence = () => {
    clearAllTimers();
    setPhase("envelope");

    // Phase 1: Seal breaks at 1.8s
    const t1 = setTimeout(() => {
      setPhase("seal");
    }, 1800);

    // Phase 2: Envelope flap opens at 3.0s
    const t2 = setTimeout(() => {
      setPhase("flap");
    }, 3000);

    // Phase 3: Poster slides up and expands at 4.2s
    const t3 = setTimeout(() => {
      setPhase("poster");
    }, 4200);

    // Phase 4: Celebration & Confetti at 6.4s
    const t4 = setTimeout(() => {
      setPhase("celebrate");
      fireSuccessConfetti();
    }, 6400);

    // Phase 5: Final completed state with word reveal at 8.0s
    const t5 = setTimeout(() => {
      setPhase("complete");
    }, 8000);

    timeoutsRef.current = [t1, t2, t3, t4, t5];
  };

  const handleSkip = () => {
    clearAllTimers();
    setPhase("complete");
    fireSuccessConfetti();
  };

  const handleReplay = () => {
    if (reducedMotion) return;
    startAnimationSequence();
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, 2800);
  };

  const handleShare = async () => {
    const shareData = {
      title: "AAGMAN 2K26 - Freshers Party Invitation",
      text: `I'm attending AAGMAN 2K26 at GMIT! Celebrate with us on 17 Nov at Kuvempu Sabhangana.`,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          fallbackCopyLink();
        }
      }
    } else {
      fallbackCopyLink();
    }
  };

  const fallbackCopyLink = () => {
    try {
      navigator.clipboard.writeText(window.location.href);
      showToast("Link copied to clipboard! 📋");
    } catch {
      showToast("Share: " + window.location.href);
    }
  };

  // 3D Mouse Tilt handlers (desktop only)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isFinePointer || !posterCardRef.current || phase !== "complete") return;
    const rect = posterCardRef.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    setTilt({ x: -y * 8, y: x * 8 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const isRevealed = phase === "poster" || phase === "celebrate" || phase === "complete";
  const isFlapOpen = phase === "flap" || isRevealed;

  // Words for staggered reveal
  const closingWords = `Welcome to the GMIT family, ${formattedFullName}. See you on Tuesday, 17 November, 11:00 AM at Kuvempu Sabhangana. 💛`.split(
    " "
  );

  return (
    <div className="relative z-20 w-full flex flex-col items-center justify-center text-center py-4 sm:py-6 overflow-hidden">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-6 z-50 px-4 py-2 rounded-full bg-[#0B1B3F]/95 border border-[#D4AF37] text-[#FFF8E7] text-xs font-serif shadow-[0_10px_25px_rgba(0,0,0,0.8),0_0_20px_rgba(212,175,55,0.4)] flex items-center gap-2"
          >
            <Check className="w-3.5 h-3.5 text-[#F5E19A]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip Button during Sequence */}
      {phase !== "complete" && !reducedMotion && (
        <motion.button
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleSkip}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 z-40 px-3 py-1.5 rounded-full text-[11px] font-serif uppercase tracking-widest text-[#F5E19A] bg-[#060E22]/80 border border-[#D4AF37]/50 hover:bg-[#D4AF37]/20 transition-all flex items-center gap-1.5 cursor-pointer shadow-lg"
          aria-label="Skip animation"
        >
          <span>Skip</span>
          <FastForward className="w-3 h-3 text-[#D4AF37]" />
        </motion.button>
      )}

      {/* Floating Caps on celebration (reused lightweight SVGs) */}
      {(phase === "celebrate" || phase === "complete") && !reducedMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{
                y: -60,
                x: `${15 + i * 24}%`,
                rotate: 0,
                opacity: 0,
              }}
              animate={{
                y: ["0%", "110%"],
                rotate: [0, (i % 2 === 0 ? 1 : -1) * 35, 0],
                opacity: [0, 0.7, 0.7, 0],
              }}
              transition={{
                duration: 5.5 + i * 0.8,
                ease: "easeOut",
                delay: i * 0.35,
              }}
              className="absolute text-[#D4AF37]/60"
            >
              <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8" />
            </motion.div>
          ))}
        </div>
      )}

      {/* Header Announcement */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-4 sm:mb-6"
      >
        <div className="inline-flex items-center gap-2 mb-1.5">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span className="font-serif text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
            Invitation Confirmed
          </span>
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
        </div>

        <h3 className="font-serif text-2xl sm:text-4xl font-extrabold shimmer-text">
          You&apos;re on the list, {cleanFirstName}! 🎉
        </h3>

        <p className="font-script text-xl sm:text-2xl text-[#F5E19A] mt-1">
          {phase === "complete"
            ? "Your royal invitation is ready"
            : "Your invitation has arrived"}
        </p>
      </motion.div>

      {/* Center Stage: Envelope & Emerging Poster */}
      <div className="relative w-full max-w-sm sm:max-w-md mx-auto flex items-center justify-center min-h-[300px] sm:min-h-[380px] my-1">
        {/* Envelope Structure (fades out in 'celebrate' & 'complete') */}
        <AnimatePresence>
          {phase !== "complete" && (
            <motion.div
              initial={{ y: 140, opacity: 0, scale: 0.85 }}
              animate={
                phase === "celebrate"
                  ? { y: 20, opacity: 0, scale: 0.95 }
                  : { y: 0, opacity: 1, scale: 1 }
              }
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 20,
              }}
              className="absolute w-[290px] sm:w-[350px] h-[190px] sm:h-[230px] rounded-2xl bg-gradient-to-b from-[#142852] to-[#060E22] border-2 border-[#D4AF37] shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_35px_rgba(212,175,55,0.35)] z-10 flex flex-col justify-end overflow-visible pointer-events-none"
            >
              {/* Gold Sparkles Around Envelope */}
              {(phase === "envelope" || phase === "seal") && (
                <div className="absolute inset-0 pointer-events-none">
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <motion.div
                      key={i}
                      animate={{
                        scale: [0.6, 1.2, 0.6],
                        opacity: [0.3, 1, 0.3],
                        y: [0, -10, 0],
                      }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        delay: i * 0.28,
                      }}
                      className="absolute w-2 h-2 rounded-full bg-[#F5E19A] shadow-[0_0_8px_#D4AF37]"
                      style={{
                        top: `${15 + (i * 25) % 80}%`,
                        left: `${5 + (i * 35) % 90}%`,
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Envelope Flap (3D Open) */}
              <div
                className="absolute -top-[1px] left-0 right-0 h-[100px] sm:h-[120px] origin-top z-20"
                style={{ perspective: "1000px" }}
              >
                <motion.div
                  initial={{ rotateX: 0 }}
                  animate={{ rotateX: isFlapOpen ? -180 : 0 }}
                  transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                  style={{
                    transformOrigin: "top",
                    transformStyle: "preserve-3d",
                  }}
                  className="w-full h-full relative"
                >
                  {/* Flap Triangle */}
                  <svg
                    viewBox="0 0 350 120"
                    className="w-full h-full drop-shadow-[0_4px_10px_rgba(0,0,0,0.7)]"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M 0 0 L 175 120 L 350 0 Z"
                      fill="url(#flapGrad)"
                      stroke="#D4AF37"
                      strokeWidth="2"
                    />
                    <defs>
                      <linearGradient id="flapGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#1E3E85" />
                        <stop offset="100%" stopColor="#0B1B3F" />
                      </linearGradient>
                    </defs>
                  </svg>
                </motion.div>
              </div>

              {/* Wax Seal with "A" Monogram */}
              <div className="absolute top-[80px] sm:top-[98px] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
                <AnimatePresence>
                  {phase === "envelope" && (
                    <motion.div
                      key="wax-seal"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: [1, 1.15, 1], opacity: 1 }}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#991B1B] via-[#B91C1C] to-[#D4AF37] border-2 border-[#F5E19A] flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.7)]"
                    >
                      <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full border border-[#F5E19A]/60 flex items-center justify-center bg-[#7F1D1D]/90">
                        <span className="font-serif text-xl sm:text-2xl font-bold text-[#F5E19A] tracking-wider drop-shadow">
                          A
                        </span>
                      </div>
                    </motion.div>
                  )}

                  {/* Cracked Wax Pieces that shatter away */}
                  {phase === "seal" && (
                    <div className="relative w-16 h-16">
                      {/* Top Left Piece */}
                      <motion.div
                        initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                        animate={{ x: -28, y: 35, rotate: -45, opacity: 0 }}
                        transition={{ duration: 0.9, ease: "easeIn" }}
                        className="absolute top-0 left-0 w-8 h-8 rounded-tl-full bg-[#B91C1C] border border-[#F5E19A]"
                      />
                      {/* Top Right Piece */}
                      <motion.div
                        initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                        animate={{ x: 28, y: 35, rotate: 45, opacity: 0 }}
                        transition={{ duration: 0.9, ease: "easeIn" }}
                        className="absolute top-0 right-0 w-8 h-8 rounded-tr-full bg-[#B91C1C] border border-[#F5E19A]"
                      />
                      {/* Bottom Left Piece */}
                      <motion.div
                        initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                        animate={{ x: -35, y: 55, rotate: -65, opacity: 0 }}
                        transition={{ duration: 1.0, ease: "easeIn" }}
                        className="absolute bottom-0 left-0 w-8 h-8 rounded-bl-full bg-[#7F1D1D] border border-[#F5E19A]"
                      />
                      {/* Bottom Right Piece */}
                      <motion.div
                        initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                        animate={{ x: 35, y: 55, rotate: 65, opacity: 0 }}
                        transition={{ duration: 1.0, ease: "easeIn" }}
                        className="absolute bottom-0 right-0 w-8 h-8 rounded-br-full bg-[#7F1D1D] border border-[#F5E19A]"
                      />
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {/* Golden Rays and Light behind flap */}
              {isFlapOpen && (
                <div className="absolute inset-x-0 -top-10 h-32 flex items-center justify-center pointer-events-none z-10 overflow-visible">
                  <motion.div
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: [0.8, 1.4], opacity: [0, 0.9, 0.5] }}
                    transition={{ duration: 1.4 }}
                    className="w-48 h-48 rounded-full bg-gradient-to-tr from-[#D4AF37]/50 via-[#F5E19A]/80 to-transparent blur-2xl"
                  />
                  {/* Spinning sun rays */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                    className="absolute w-60 h-60 opacity-40 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#F5E19A] via-transparent to-transparent"
                  />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* The Invitation Poster (Rises up from envelope, settles in full glory) */}
        <AnimatePresence>
          {isRevealed && (
            <motion.div
              ref={posterCardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              initial={
                reducedMotion
                  ? { opacity: 0 }
                  : {
                      y: 70,
                      scale: 0.75,
                      opacity: 0,
                      rotateZ: -3,
                      rotateY: 8,
                    }
              }
              animate={
                reducedMotion
                  ? { opacity: 1 }
                  : {
                      y: 0,
                      scale: 1,
                      opacity: 1,
                      rotateZ: 0,
                      rotateY: 0,
                    }
              }
              transition={{
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                transform:
                  isFinePointer && phase === "complete"
                    ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
                    : undefined,
                transition:
                  isFinePointer && phase === "complete"
                    ? "transform 0.15s ease-out"
                    : undefined,
              }}
              className="relative z-30 max-w-[88vw] sm:max-w-md mx-auto rounded-2xl p-2 sm:p-3 bg-gradient-to-b from-[#142852]/90 via-[#0B1B3F]/90 to-[#060E22] border-2 border-[#D4AF37] group cursor-pointer overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
              onClick={() => setLightboxOpen(true)}
            >
              {/* Soft Pulsing Gold Glow Border in Complete Phase */}
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 15px rgba(212,175,55,0.3)",
                    "0 0 35px rgba(245,225,154,0.7)",
                    "0 0 15px rgba(212,175,55,0.3)",
                  ],
                }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-2xl pointer-events-none"
              />

              {/* One-time Gold Shimmer Sweep across the Poster */}
              {!reducedMotion && (
                <motion.div
                  initial={{ x: "-120%" }}
                  animate={{ x: "220%" }}
                  transition={{ duration: 1.4, delay: 0.5, ease: "easeInOut" }}
                  className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-[#F5E19A]/50 to-transparent skew-x-12 pointer-events-none z-30"
                />
              )}

              {/* Poster Image (object-contain, guaranteed fit within viewport) */}
              <div className="relative rounded-xl overflow-hidden bg-[#060E22] flex items-center justify-center">
                <Image
                  src="/poster.png"
                  alt="AAGMAN 2K26 Official Invitation Poster"
                  width={750}
                  height={1000}
                  priority
                  className="w-auto max-h-[46vh] sm:max-h-[52vh] max-w-full object-contain rounded-xl transition-transform duration-500 group-hover:scale-[1.015]"
                />

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-[#060E22]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-3 py-1.5 rounded-full bg-[#060E22]/80 border border-[#D4AF37] text-[11px] font-serif uppercase tracking-widest text-[#F5E19A] flex items-center gap-1.5 shadow-xl">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Tap to Zoom</span>
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Word-by-Word Reveal Text */}
      <AnimatePresence>
        {phase === "complete" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-4 sm:mt-5 max-w-lg mx-auto px-2"
          >
            <p className="font-serif text-xs sm:text-sm text-[#FFF8E7] leading-relaxed drop-shadow">
              {closingWords.map((word, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.25,
                    delay: idx * 0.05,
                  }}
                  className="inline-block mr-1"
                >
                  {word}
                </motion.span>
              ))}
            </p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              {/* Download Invitation */}
              <a
                href="/poster.png"
                download="AAGMAN-2K26-Invitation.png"
                className="w-full sm:w-auto"
              >
                <MagneticButton className="gold-btn w-full sm:w-auto px-6 py-3 rounded-full text-xs font-serif uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                  <Download className="w-4 h-4 text-[#060E22]" />
                  <span>Download Invitation</span>
                </MagneticButton>
              </a>

              {/* Share with Friends */}
              <MagneticButton
                onClick={handleShare}
                className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-serif uppercase tracking-widest text-[#FFF8E7] bg-[#142852]/80 border border-[#D4AF37]/50 hover:bg-[#D4AF37]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-[#F5E19A]" />
                <span>Share with Friends</span>
              </MagneticButton>
            </motion.div>

            {/* Replay and Secondary Actions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.5 }}
              className="mt-4 flex items-center justify-center gap-4 text-xs font-serif"
            >
              {!reducedMotion && (
                <button
                  type="button"
                  onClick={handleReplay}
                  className="text-[#D4AF37] hover:text-[#F5E19A] transition-colors inline-flex items-center gap-1.5 cursor-pointer underline-offset-4 hover:underline"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Replay animation</span>
                </button>
              )}

              {onReset && (
                <>
                  <span className="text-[#D4AF37]/40">•</span>
                  <button
                    type="button"
                    onClick={onReset}
                    className="text-[#FFF8E7]/70 hover:text-[#FFF8E7] transition-colors cursor-pointer hover:underline"
                  >
                    Register Another Guest
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-Screen Zoom Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setLightboxOpen(false)}
            className="fixed inset-0 z-50 bg-[#060E22]/95 backdrop-blur-xl flex flex-col items-center justify-center p-3 sm:p-6"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 z-50 p-3 rounded-full bg-[#142852]/80 border border-[#D4AF37]/50 text-[#F5E19A] hover:bg-[#D4AF37] hover:text-[#060E22] transition-colors cursor-pointer shadow-2xl"
              aria-label="Close zoomed view"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Lightbox Image Container */}
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl max-h-[88vh] rounded-2xl p-2 sm:p-3 bg-gradient-to-b from-[#142852] to-[#060E22] border-2 border-[#D4AF37] shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_50px_rgba(212,175,55,0.4)] overflow-hidden"
            >
              <Image
                src="/poster.png"
                alt="AAGMAN 2K26 Full Resolution Invitation"
                width={900}
                height={1200}
                className="w-auto max-h-[82vh] object-contain rounded-xl mx-auto"
                priority
              />

              <div className="mt-2.5 flex items-center justify-between px-2 text-xs font-serif text-[#F5E19A]">
                <span>AAGMAN 2K26 Official Invitation</span>
                <a
                  href="/poster.png"
                  download="AAGMAN-2K26-Invitation.png"
                  className="hover:underline flex items-center gap-1 text-[#FFF8E7]"
                >
                  <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Download</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
