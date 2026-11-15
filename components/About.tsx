"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Compass, Users, BookOpen } from "lucide-react";
import { FloralCorner, GoldDivider } from "./DecorativeDividers";

interface StatHighlight {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  desc: string;
  slideDirection: number;
}

const STAT_HIGHLIGHTS: StatHighlight[] = [
  {
    icon: Compass,
    title: "New Dreams",
    subtitle: "Endless Horizons",
    desc: "Embark on an inspiring engineering journey where bold ideas transform into reality.",
    slideDirection: -30,
  },
  {
    icon: Users,
    title: "New Friendships",
    subtitle: "Lifelong Bonds",
    desc: "Connect with like-minded peers, mentors, and seniors who will walk with you side-by-side.",
    slideDirection: 0,
  },
  {
    icon: BookOpen,
    title: "New Chapter",
    subtitle: "Campus Odyssey",
    desc: "Step into an exhilarating four years loaded with technical triumphs, cultural fests, and memories.",
    slideDirection: 30,
  },
];

export function About() {
  return (
    <section
      id="about"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#060E22] via-[#0B1B3F]/90 to-[#060E22] overflow-hidden"
    >
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#142852]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header with Scale & Fade */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="font-serif text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
              The Grand Gathering
            </span>
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#FFF8E7] mb-4">
            A Royal Welcome Awaits
          </h2>

          <GoldDivider />

          {/* Invitation Style Parchment Card with Clip-Path entrance */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.85, delay: 0.2 }}
            className="relative mt-8 max-w-3xl mx-auto p-6 sm:p-10 rounded-2xl bg-gradient-to-b from-[#0F224D]/80 to-[#081531]/90 border border-[#D4AF37]/35 shadow-[0_15px_45px_rgba(0,0,0,0.5),0_0_25px_rgba(212,175,55,0.12)] backdrop-blur-xl"
          >
            <FloralCorner position="top-left" />
            <FloralCorner position="top-right" />
            <FloralCorner position="bottom-left" />
            <FloralCorner position="bottom-right" />

            <div className="relative z-10 text-center space-y-5 px-2 sm:px-8 py-2">
              <p className="font-script text-3xl sm:text-4xl text-[#F5E19A] leading-relaxed">
                Dear Freshers,
              </p>

              <p className="font-sans text-base sm:text-lg text-[#FFF8E7]/90 leading-relaxed font-normal">
                &ldquo;Let&apos;s come together to celebrate new dreams, new friendships and a new chapter of our college life. Your presence will make the occasion more special.&rdquo;
              </p>

              <div className="pt-2">
                <p className="font-serif text-sm tracking-widest text-[#D4AF37] uppercase font-semibold">
                  Organized with Pride By
                </p>
                <p className="font-sans text-xs sm:text-sm text-[#FFF8E7]/80 mt-1">
                  Department of Computer Science &amp; Engineering <br />
                  &amp; Computer Science and Design
                </p>
                <p className="font-serif text-xs text-[#F5E19A] mt-1 font-medium">
                  G Madegowda Institute of Technology
                </p>
              </div>

              <div className="pt-4 flex items-center justify-center gap-3">
                <div className="h-[1px] w-12 bg-[#D4AF37]/50" />
                <span className="font-script text-xl sm:text-2xl text-[#F5E19A]">
                  Aagman Celebrations
                </span>
                <div className="h-[1px] w-12 bg-[#D4AF37]/50" />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* 3 Animated Stat-Style Highlight Cards with Lateral Staggered slides */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-12">
          {STAT_HIGHLIGHTS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: item.slideDirection, y: 30 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.75, delay: index * 0.18 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="group relative p-6 sm:p-8 rounded-2xl royal-glass royal-glass-hover text-center flex flex-col items-center justify-between"
              >
                <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-70 group-hover:opacity-100 transition-all duration-500" />

                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1E3E85] to-[#0B1B3F] border border-[#D4AF37]/50 flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.25)] group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all mb-5">
                  <Icon className="w-7 h-7 text-[#F5E19A] group-hover:text-white transition-colors" />
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-serif tracking-[0.25em] text-[#D4AF37] font-semibold">
                    {item.subtitle}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#FFF8E7] group-hover:text-[#F5E19A] transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-sans text-sm text-[#FFF8E7]/70 leading-relaxed pt-1">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                  <div className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
