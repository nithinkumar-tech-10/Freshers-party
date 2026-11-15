"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Menu, X, ArrowUpRight } from "lucide-react";
import { MagneticButton } from "./MagneticButton";

interface NavLink {
  name: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { name: "Home", href: "#hero" },
  { name: "Invitation", href: "#invitation" },
  { name: "About", href: "#about" },
  { name: "Details", href: "#details" },
  { name: "Register", href: "#register" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Track active section for highlight
      const sections = NAV_LINKS.map((link) => link.href.substring(1));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(`#${sections[i]}`);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleRegisterClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.getElementById("register");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      // Trigger register section glow pulse
      window.dispatchEvent(new CustomEvent("pulse-register-form"));
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#060E22]/90 backdrop-blur-md border-b border-[#D4AF37]/25 shadow-[0_10px_30px_rgba(0,0,0,0.5)] py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#hero"
          onClick={(e) => handleLinkClick(e, "#hero")}
          className="group flex items-center gap-2.5 focus:outline-none"
        >
          <div className="w-9 h-9 rounded-lg border border-[#D4AF37] flex items-center justify-center bg-[#0B1B3F]/70 shadow-[0_0_12px_rgba(212,175,55,0.3)] group-hover:scale-105 group-hover:border-[#F5E19A] transition-all">
            <Sparkles className="w-5 h-5 text-[#D4AF37] group-hover:text-[#F5E19A] transition-colors" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-lg sm:text-xl tracking-wider shimmer-text">
              AAGMAN 2K26
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#F5E19A]/80 font-sans -mt-1 hidden sm:block">
              GMIT Freshers
            </span>
          </div>
        </a>

        {/* Desktop Navigation with Active Indicator */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`text-sm font-medium transition-colors relative py-1 ${
                  isActive ? "text-[#F5E19A]" : "text-[#FFF8E7]/75 hover:text-[#D4AF37]"
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#D4AF37] to-[#F5E19A] shadow-[0_0_8px_#D4AF37]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Desktop Magnetic CTA Button */}
        <div className="hidden md:block">
          <MagneticButton
            onClick={handleRegisterClick}
            className="gold-btn px-5 py-2.5 rounded-full text-xs font-serif uppercase tracking-widest flex items-center gap-1.5 shadow-[0_0_15px_rgba(212,175,55,0.4)] cursor-pointer"
          >
            <span>Register Now</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </MagneticButton>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
          className="md:hidden p-2 rounded-lg border border-[#D4AF37]/40 bg-[#0B1B3F]/60 text-[#F5E19A] hover:text-white transition-colors"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#060E22]/98 backdrop-blur-xl border-b border-[#D4AF37]/30 px-6 pt-4 pb-6 space-y-4"
          >
            <div className="flex flex-col space-y-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`text-base font-serif py-2 border-b border-[#D4AF37]/10 ${
                    activeSection === link.href ? "text-[#F5E19A]" : "text-[#FFF8E7] hover:text-[#D4AF37]"
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>

            <button
              type="button"
              onClick={handleRegisterClick}
              className="gold-btn w-full block text-center py-3 rounded-full text-sm font-serif uppercase tracking-wider cursor-pointer"
            >
              Register Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
