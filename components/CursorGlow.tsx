"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CursorGlow() {
  const [enabled, setEnabled] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const smoothX = useSpring(mouseX, { damping: 28, stiffness: 220 });
  const smoothY = useSpring(mouseY, { damping: 28, stiffness: 220 });

  useEffect(() => {
    // Only enable on desktop pointer devices, not touch screens
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      !window.matchMedia("(pointer: fine)").matches;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isTouch || reducedMotion) {
      return;
    }

    setEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 160);
      mouseY.set(e.clientY - 160);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (!enabled) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-80 h-80 rounded-full pointer-events-none z-30"
      style={{
        x: smoothX,
        y: smoothY,
        background:
          "radial-gradient(circle, rgba(212, 175, 55, 0.16) 0%, rgba(245, 225, 154, 0.05) 45%, transparent 70%)",
      }}
    />
  );
}

