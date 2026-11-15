"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#D4AF37] via-[#F5E19A] to-[#D4AF37] origin-left z-50 shadow-[0_0_12px_rgba(212,175,55,0.7)] pointer-events-none"
    />
  );
}

