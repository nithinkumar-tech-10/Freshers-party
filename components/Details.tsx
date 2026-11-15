"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Plus,
  ExternalLink,
  Download,
  Check,
} from "lucide-react";
import { GoldDivider, FloralCorner } from "./DecorativeDividers";
import { MagneticButton } from "./MagneticButton";

interface DetailCard {
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
  primary: string;
  secondary: string;
  extra: string;
  floatDelay: number;
}

export function Details() {
  const [calendarMenuOpen, setCalendarMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent("AAGMAN 2K26 - GMIT Freshers Party");
    const details = encodeURIComponent(
      "Department of CSE & CSD cordially invites you to AAGMAN 2K26. Let's come together to celebrate new dreams, new friendships and a new chapter of our college life. Venue: Kuvempu Sabhangana, G Madegowda Institute of Technology."
    );
    const location = encodeURIComponent(
      "Kuvempu Sabhangana, G Madegowda Institute of Technology"
    );
    const dates = "20261117T053000Z/20261117T103000Z";
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  };

  const downloadICS = () => {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//AAGMAN 2K26//GMIT Freshers//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      "UID:aagman-2k26-gmit-" + Date.now(),
      "DTSTAMP:20261115T000000Z",
      "DTSTART:20261117T053000Z",
      "DTEND:20261117T103000Z",
      "SUMMARY:AAGMAN 2K26 - GMIT Freshers Party",
      "DESCRIPTION:A Grand Welcome to New Beginnings! Organized by Department of CSE & CSD, GMIT.",
      "LOCATION:Kuvempu Sabhangana, G Madegowda Institute of Technology",
      "STATUS:CONFIRMED",
      "SEQUENCE:0",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", "AAGMAN_2K26_Freshers.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyVenueAddress = () => {
    navigator.clipboard.writeText(
      "Kuvempu Sabhangana, G Madegowda Institute of Technology, Bharathinagar, Maddur Taluk, Mandya"
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const DETAILS_CARDS: DetailCard[] = [
    {
      icon: Calendar,
      tag: "THE DATE",
      primary: "Tuesday",
      secondary: "17 November 2026",
      extra: "Mark your calendar",
      floatDelay: 0,
    },
    {
      icon: Clock,
      tag: "THE TIME",
      primary: "11:00 AM",
      secondary: "Indian Standard Time",
      extra: "Gates open at 10:30 AM",
      floatDelay: 0.5,
    },
    {
      icon: MapPin,
      tag: "THE VENUE",
      primary: "Kuvempu Sabhangana",
      secondary: "G Madegowda Institute of Tech.",
      extra: "Bharathinagar, Mandya",
      floatDelay: 1.0,
    },
  ];

  return (
    <section
      id="details"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#060E22] via-[#091738] to-[#060E22] overflow-hidden"
    >
      <div className="absolute top-1/4 right-1/4 w-[450px] h-[450px] bg-[#D4AF37]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Title with Clip-path wipe */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="font-serif text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
              Essential Itinerary
            </span>
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#FFF8E7] mb-3">
            Event Details
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#FFF8E7]/70 max-w-lg mx-auto">
            Everything you need to know to be part of this unforgettable celebration.
          </p>

          <GoldDivider />
        </motion.div>

        {/* 3 Detail Cards with Staggered Pop-in, Hover Tilt and Gently Floating Icons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {DETAILS_CARDS.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.tag}
                initial={{ opacity: 0, scale: 0.85, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  type: "spring",
                  stiffness: 240,
                  damping: 20,
                  delay: idx * 0.18,
                }}
                whileHover={{
                  scale: 1.03,
                  rotateX: -4,
                  rotateY: 4,
                  transition: { duration: 0.25 },
                }}
                className="relative rounded-2xl p-8 royal-glass royal-glass-hover flex flex-col justify-between text-center overflow-hidden group shadow-[0_10px_35px_rgba(0,0,0,0.6)]"
              >
                <FloralCorner
                  position="top-right"
                  className="opacity-30 group-hover:opacity-75 transition-opacity"
                />

                {/* Floating Icon Container */}
                <div className="mx-auto mb-6 relative">
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 3.5,
                      ease: "easeInOut",
                      delay: card.floatDelay,
                    }}
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1A3673] to-[#0A1735] border border-[#D4AF37]/50 flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.3)] group-hover:shadow-[0_0_35px_rgba(212,175,55,0.6)] group-hover:scale-105 transition-all duration-300"
                  >
                    <Icon className="w-8 h-8 text-[#F5E19A]" />
                  </motion.div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-1.5 rounded-2xl border border-dashed border-[#D4AF37]/30 pointer-events-none"
                  />
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] uppercase font-serif tracking-[0.3em] text-[#D4AF37] font-semibold">
                    {card.tag}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FFF8E7] group-hover:text-[#F5E19A] transition-colors">
                    {card.primary}
                  </h3>
                  <p className="font-sans text-base text-[#FFF8E7]/90 font-medium">
                    {card.secondary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#D4AF37]/20 flex items-center justify-center">
                  <span className="text-xs font-sans text-[#F5E19A]/80 tracking-wide">
                    {card.extra}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Add to Calendar & Venue Actions Bar with Magnetic Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 relative"
        >
          {/* Calendar Trigger */}
          <div className="relative w-full sm:w-auto">
            <MagneticButton
              onClick={() => setCalendarMenuOpen(!calendarMenuOpen)}
              className="gold-btn w-full sm:w-auto px-8 py-3.5 rounded-full font-serif text-xs uppercase tracking-widest flex items-center justify-center gap-2.5 shadow-[0_0_25px_rgba(212,175,55,0.4)] cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#060E22]" />
              <span>Add to Calendar</span>
              <Plus
                className={`w-3.5 h-3.5 text-[#060E22] transition-transform ${
                  calendarMenuOpen ? "rotate-45" : ""
                }`}
              />
            </MagneticButton>

            {calendarMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-64 p-3 rounded-2xl bg-[#091738]/98 border border-[#D4AF37]/50 shadow-[0_15px_40px_rgba(0,0,0,0.8)] backdrop-blur-2xl z-30 space-y-2"
              >
                <a
                  href={getGoogleCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl hover:bg-[#D4AF37]/15 text-[#FFF8E7] text-xs font-serif tracking-wider transition-colors"
                >
                  <span>Google Calendar</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
                </a>

                <button
                  type="button"
                  onClick={downloadICS}
                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl hover:bg-[#D4AF37]/15 text-[#FFF8E7] text-xs font-serif tracking-wider transition-colors cursor-pointer"
                >
                  <span>Apple / iCal (.ics)</span>
                  <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
                </button>
              </motion.div>
            )}
          </div>

          {/* Copy Address Button */}
          <MagneticButton
            onClick={copyVenueAddress}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full font-serif text-xs uppercase tracking-widest text-[#FFF8E7] border border-[#D4AF37]/50 bg-[#0B1B3F]/60 hover:bg-[#D4AF37]/15 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_15px_rgba(0,0,0,0.3)]"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#F5E19A]" />
                <span className="text-[#F5E19A]">Address Copied!</span>
              </>
            ) : (
              <>
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                <span>Copy Venue Address</span>
              </>
            )}
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
