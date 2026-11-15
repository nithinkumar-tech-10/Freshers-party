"use client";

import React, { useState } from "react";
import { IntroCurtain } from "@/components/IntroCurtain";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CursorGlow } from "@/components/CursorGlow";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { InvitationPoster } from "@/components/InvitationPoster";
import { About } from "@/components/About";
import { Details } from "@/components/Details";
import { RegisterForm } from "@/components/RegisterForm";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [, setIntroFinished] = useState<boolean>(false);

  return (
    <main className="relative min-h-screen bg-[#060E22] text-[#FFF8E7] overflow-x-hidden selection:bg-[#D4AF37] selection:text-[#060E22]">
      {/* Scroll Progress Bar at very top */}
      <ScrollProgress />

      {/* Desktop Cursor Glow */}
      <CursorGlow />

      {/* Page Load Intro Curtain (runs once per session) */}
      <IntroCurtain onComplete={() => setIntroFinished(true)} />

      {/* Sticky Navbar */}
      <Navbar />

      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Your Invitation Poster Section (Placed right after Hero) */}
      <InvitationPoster />

      {/* 3. About Section */}
      <About />

      {/* 4. Event Details Section */}
      <Details />

      {/* 5. Register Multi-Step Form */}
      <RegisterForm />

      {/* 6. Footer Section */}
      <Footer />
    </main>
  );
}
