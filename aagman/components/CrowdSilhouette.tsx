"use client";

import React from "react";
import { motion } from "framer-motion";

export function CrowdSilhouette() {
  const tossedCaps = [
    { x: "15%", delay: 0.2, duration: 6, rot: 25 },
    { x: "32%", delay: 1.4, duration: 7, rot: -35 },
    { x: "50%", delay: 0.8, duration: 5.5, rot: 40 },
    { x: "68%", delay: 2.1, duration: 6.5, rot: -20 },
    { x: "85%", delay: 1.0, duration: 7.2, rot: 30 },
    { x: "25%", delay: 3.0, duration: 6.8, rot: 45 },
    { x: "75%", delay: 2.7, duration: 5.9, rot: -40 },
  ];

  return (
    <div className="relative w-full overflow-hidden pointer-events-none select-none z-10">
      {/* Floating tossed graduation caps */}
      <div className="absolute inset-0">
        {tossedCaps.map((cap, i) => (
          <motion.div
            key={i}
            className="absolute bottom-16 sm:bottom-24"
            style={{ left: cap.x }}
            initial={{ y: 20, opacity: 0, rotate: 0 }}
            animate={{
              y: [-10, -70, -10],
              opacity: [0.3, 0.85, 0.3],
              rotate: [0, cap.rot, 0],
            }}
            transition={{
              duration: cap.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: cap.delay,
            }}
          >
            <svg
              className="w-6 h-6 sm:w-8 sm:h-8 text-[#D4AF37] drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]"
              viewBox="0 0 48 48"
              fill="currentColor"
            >
              <polygon points="24,8 44,18 24,28 4,18" />
              <path
                d="M12,23 v10 c0,5 5.5,9 12,9 s12,-4 12,-9 v-10"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              />
              <path
                d="M42,20 v12"
                stroke="#F5E19A"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="42" cy="33" r="2" fill="#F5E19A" />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* SVG Silhouette of Celebrating Crowd with Arms Raised and Tossed Caps */}
      <svg
        viewBox="0 0 1440 220"
        className="w-full h-28 sm:h-40 md:h-52 block"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="crowdGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0B1B3F" stopOpacity="0.3" />
            <stop offset="40%" stopColor="#07122A" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#060E22" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="rimLight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0" />
            <stop offset="30%" stopColor="#F5E19A" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#F5E19A" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Back Row Silhouette */}
        <path
          d="M0,220 L0,140 Q60,110 120,135 Q180,95 240,130 Q310,85 380,125 Q450,100 520,128 Q600,75 680,125 Q750,90 820,132 Q900,80 980,120 Q1060,95 1140,135 Q1220,90 1300,125 Q1370,105 1440,135 L1440,220 Z"
          fill="#081735"
          opacity="0.6"
        />

        {/* Front Row Crowd Silhouette */}
        <path
          d="M0,220 
             L0,170 
             C30,165 45,145 60,150 
             C70,125 80,125 90,150 
             C110,135 125,110 140,155 
             C165,130 185,120 205,160 
             C230,145 245,100 260,150 
             C285,120 300,135 320,162 
             C345,130 360,115 380,150 
             C400,110 420,95 440,155 
             C470,135 490,125 515,165 
             C540,115 565,110 590,155 
             C620,130 640,105 665,150 
             C695,120 715,90 735,145 
             C760,115 780,130 805,160 
             C835,110 855,95 880,152 
             C905,125 925,135 945,165 
             C975,105 995,115 1020,150 
             C1045,130 1065,120 1090,160 
             C1120,95 1140,110 1165,150 
             C1190,130 1210,135 1235,162 
             C1265,115 1285,105 1310,155 
             C1340,125 1360,135 1385,160 
             C1410,140 1425,145 1440,165 
             L1440,220 Z"
          fill="url(#crowdGrad)"
        />

        {/* Golden Rim Lighting */}
        <path
          d="M0,170 
             C30,165 45,145 60,150 
             C70,125 80,125 90,150 
             C110,135 125,110 140,155 
             C165,130 185,120 205,160 
             C230,145 245,100 260,150 
             C285,120 300,135 320,162 
             C345,130 360,115 380,150 
             C400,110 420,95 440,155 
             C470,135 490,125 515,165 
             C540,115 565,110 590,155 
             C620,130 640,105 665,150 
             C695,120 715,90 735,145 
             C760,115 780,130 805,160 
             C835,110 855,95 880,152 
             C905,125 925,135 945,165 
             C975,105 995,115 1020,150 
             C1045,130 1065,120 1090,160 
             C1120,95 1140,110 1165,150 
             C1190,130 1210,135 1235,162 
             C1265,115 1285,105 1310,155 
             C1340,125 1360,135 1385,160 
             C1410,140 1425,145 1440,165"
          stroke="url(#rimLight)"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
    </div>
  );
}

