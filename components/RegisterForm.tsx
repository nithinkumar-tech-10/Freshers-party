"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Hash,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Salad,
  Beef,
  GraduationCap,
  Laptop,
  Palette,
} from "lucide-react";
import { submitRegistration, type RegistrationData } from "@/lib/submit";
import { fireSuccessConfetti } from "./Confetti";
import { FloralCorner, GoldDivider, RoyalCrownIcon } from "./DecorativeDividers";
import { MagneticButton } from "./MagneticButton";

const TOTAL_STEPS = 4;

interface FormState {
  name: string;
  regNo: string;
  department: "CSE" | "CSD" | "";
  year: "1st Year";
  food: "Veg" | "Non-Veg";
}

const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -50 : 50,
    opacity: 0,
  }),
};

export function RegisterForm() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [direction, setDirection] = useState<number>(1);
  const [formData, setFormData] = useState<FormState>({
    name: "",
    regNo: "",
    department: "",
    year: "1st Year",
    food: "Veg",
  });
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [registrationId, setRegistrationId] = useState<string>("");
  const [isPulsing, setIsPulsing] = useState<boolean>(false);

  useEffect(() => {
    const handlePulse = () => {
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 1600);
    };

    window.addEventListener("pulse-register-form", handlePulse);
    return () => window.removeEventListener("pulse-register-form", handlePulse);
  }, []);

  const updateField = <K extends keyof FormState>(
    field: K,
    value: FormState[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!formData.name.trim() || formData.name.trim().length < 2) {
        setError("Please enter your full name (minimum 2 characters).");
        return;
      }
    } else if (currentStep === 2) {
      if (!formData.regNo.trim() || formData.regNo.trim().length < 3) {
        setError("Please enter your valid College/University Registration No. (USN).");
        return;
      }
    } else if (currentStep === 3) {
      if (!formData.department) {
        setError("Department is required. Please select CSE or CSD to continue.");
        return;
      }
    }

    setError("");
    if (currentStep < TOTAL_STEPS) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    setError("");
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!formData.department) {
      setError("Department is required. Please select CSE or CSD.");
      return;
    }

    setIsSubmitting(true);
    setError("");
    try {
      const payload: RegistrationData = {
        name: formData.name.trim(),
        regNo: formData.regNo.trim().toUpperCase(),
        department: formData.department,
        year: "1st Year",
        food: formData.food,
      };

      const response = await submitRegistration(payload);
      setIsSubmitting(false);
      setIsSubmitted(true);
      setRegistrationId(response.id);
      fireSuccessConfetti();
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
      setError("Something went wrong while submitting. Please try again.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !isSubmitting && !isSubmitted) {
      e.preventDefault();
      handleNext();
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      regNo: "",
      department: "",
      year: "1st Year",
      food: "Veg",
    });
    setDirection(1);
    setCurrentStep(1);
    setIsSubmitted(false);
  };

  const progressPercentage = (currentStep / TOTAL_STEPS) * 100;

  return (
    <section
      id="register"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#060E22] via-[#0B1B3F] to-[#040A18] overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#D4AF37]/10 via-[#1E3E85]/20 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="font-serif text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
              Official Entry Pass
            </span>
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#FFF8E7] mb-3">
            Secure Your Spot
          </h2>

          <p className="font-sans text-xs sm:text-sm text-[#FFF8E7]/70">
            Join the celebration at Kuvempu Sabhangana on 17 Nov 2026.
          </p>

          <GoldDivider />
        </motion.div>

        {/* Multi-step Registration Card with Glow Pulse on "Register Now" */}
        <motion.div
          animate={
            isPulsing
              ? {
                  scale: [1, 1.025, 1],
                  boxShadow: [
                    "0 20px 50px rgba(0,0,0,0.7), 0 0 20px rgba(212,175,55,0.2)",
                    "0 25px 60px rgba(0,0,0,0.8), 0 0 50px rgba(212,175,55,0.85)",
                    "0 20px 50px rgba(0,0,0,0.7), 0 0 20px rgba(212,175,55,0.2)",
                  ],
                }
              : {}
          }
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className={`relative rounded-3xl p-6 sm:p-10 royal-glass shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-2xl border transition-colors duration-500 overflow-hidden ${
            isPulsing ? "border-[#F5E19A]" : "border-[#D4AF37]/35"
          }`}
        >
          <FloralCorner position="top-left" />
          <FloralCorner position="top-right" />

          {/* Loading State Overlay */}
          <AnimatePresence>
            {isSubmitting && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-30 bg-[#060E22]/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-4"
              >
                <div className="relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 rounded-full border-2 border-t-[#D4AF37] border-r-[#F5E19A] border-b-transparent border-l-transparent shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                  />
                  <RoyalCrownIcon className="w-6 h-6 text-[#D4AF37] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold shimmer-text">
                  Securing your spot...
                </h3>
                <p className="text-xs sm:text-sm text-[#FFF8E7]/70 font-sans max-w-xs">
                  Reserving your VIP seat and meal pass for AAGMAN 2K26.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success Screen */}
          {isSubmitted ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative z-20 text-center py-6 sm:py-8 space-y-6"
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#F5E19A] p-0.5 flex items-center justify-center shadow-[0_0_35px_rgba(212,175,55,0.6)]">
                <div className="w-full h-full bg-[#060E22] rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-[#F5E19A]" />
                </div>
              </div>

              <div>
                <span className="font-serif text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
                  Invitation Confirmed
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl font-extrabold shimmer-text mt-1">
                  You&apos;re on the list!
                </h3>
                <p className="font-script text-2xl text-[#F5E19A] mt-2">
                  Welcome to the college family, {formData.name}!
                </p>
              </div>

              {/* VIP Royal Pass */}
              <div className="max-w-md mx-auto p-5 rounded-2xl bg-gradient-to-b from-[#142852]/80 to-[#071228]/90 border border-[#D4AF37]/50 shadow-inner text-left space-y-3">
                <div className="flex justify-between items-center border-b border-[#D4AF37]/20 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-serif tracking-widest text-[#D4AF37]">
                      Pass ID
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-serif uppercase tracking-widest bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#F5E19A]">
                      1st Year Freshers
                    </span>
                  </div>
                  <span className="font-mono text-sm font-bold text-[#F5E19A]">
                    {registrationId}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] text-[#FFF8E7]/50 uppercase">Name</span>
                    <p className="font-medium text-[#FFF8E7] truncate">{formData.name}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#FFF8E7]/50 uppercase">Regd No.</span>
                    <p className="font-medium text-[#FFF8E7] uppercase truncate">
                      {formData.regNo}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#FFF8E7]/50 uppercase">Department</span>
                    <p className="font-medium text-[#F5E19A] font-serif">
                      {formData.department} (
                      {formData.department === "CSE"
                        ? "Computer Science & Engg."
                        : "Computer Science & Design"}
                      )
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#FFF8E7]/50 uppercase">Meal Pass</span>
                    <p className="font-medium text-[#F5E19A] flex items-center gap-1.5">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          formData.food === "Veg" ? "bg-[#4ADE80]" : "bg-[#FB7185]"
                        }`}
                      />
                      {formData.food}
                    </p>
                  </div>
                  <div className="col-span-2 border-t border-[#D4AF37]/20 pt-2 flex items-center justify-between text-[11px]">
                    <span className="text-[#FFF8E7]/50">Date & Venue</span>
                    <span className="text-[#FFF8E7] font-medium">17 Nov 2026, 11:00 AM • Kuvempu Sabhangana</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <MagneticButton
                  onClick={() => fireSuccessConfetti()}
                  className="gold-btn w-full sm:w-auto px-6 py-3 rounded-full text-xs font-serif uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#060E22]" />
                  <span>Celebrate Again</span>
                </MagneticButton>

                <MagneticButton
                  onClick={resetForm}
                  className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-serif uppercase tracking-widest text-[#FFF8E7] border border-[#D4AF37]/40 hover:bg-[#D4AF37]/15 transition-all cursor-pointer"
                >
                  Register Another Guest
                </MagneticButton>
              </div>
            </motion.div>
          ) : (
            <div className="relative z-20" onKeyDown={handleKeyDown}>
              {/* Header Badge & Step Counter & Smooth Animated Progress Bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between gap-2 text-xs font-serif uppercase tracking-widest text-[#D4AF37] mb-2 font-medium">
                  <div className="flex items-center gap-2">
                    <span>
                      Step {currentStep} of {TOTAL_STEPS}
                    </span>
                    {/* Fixed 1st Year Freshers gold badge */}
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-serif uppercase tracking-wider bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#F5E19A] shadow-[0_0_10px_rgba(212,175,55,0.2)]">
                      <GraduationCap className="w-3 h-3 text-[#D4AF37]" />
                      1st Year Freshers
                    </span>
                  </div>
                  <span>{Math.round(progressPercentage)}% Completed</span>
                </div>

                <div className="w-full h-1.5 bg-[#060E22] rounded-full overflow-hidden border border-[#D4AF37]/20">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#D4AF37] via-[#F5E19A] to-[#D4AF37]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                </div>
              </div>

              {/* Step Screens with Directional Slide */}
              <AnimatePresence mode="wait" custom={direction}>
                {/* STEP 1: Name */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    custom={direction}
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.32, ease: "easeInOut" }}
                    className="space-y-5"
                  >
                    <div>
                      <span className="font-serif text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                        Guest Identity
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FFF8E7] mt-1">
                        What should we call you?
                      </h3>
                      <p className="text-xs sm:text-sm text-[#FFF8E7]/70 font-sans mt-1">
                        Please enter your full name as you would like it on your party pass.
                      </p>
                    </div>

                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#D4AF37]">
                        <User className="w-5 h-5" />
                      </div>
                      <input
                        type="text"
                        autoFocus
                        value={formData.name}
                        onChange={(e) => updateField("name", e.target.value)}
                        placeholder="e.g. Aryan Sharma"
                        className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#060E22]/80 border border-[#D4AF37]/40 text-[#FFF8E7] placeholder-[#FFF8E7]/30 text-base sm:text-lg focus:outline-none focus:border-[#F5E19A] focus:ring-2 focus:ring-[#D4AF37]/30 transition-all font-sans"
                        aria-label="Your full name"
                      />
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: Registration Number */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    custom={direction}
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.32, ease: "easeInOut" }}
                    className="space-y-5"
                  >
                    <div>
                      <span className="font-serif text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                        Academic Credentials
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FFF8E7] mt-1">
                        Your Regd No.?
                      </h3>
                      <p className="text-xs sm:text-sm text-[#FFF8E7]/70 font-sans mt-1">
                        Enter your GMIT University Seat Number (USN) or College Roll No.
                      </p>
                    </div>

                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#D4AF37]">
                        <Hash className="w-5 h-5" />
                      </div>
                      <input
                        type="text"
                        autoFocus
                        value={formData.regNo}
                        onChange={(e) => updateField("regNo", e.target.value)}
                        placeholder="e.g. 4GM26CS001"
                        className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#060E22]/80 border border-[#D4AF37]/40 text-[#FFF8E7] placeholder-[#FFF8E7]/30 text-base sm:text-lg focus:outline-none focus:border-[#F5E19A] focus:ring-2 focus:ring-[#D4AF37]/30 transition-all font-mono uppercase"
                        aria-label="Your registration number or USN"
                      />
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: Department (CSE / CSD Cards) */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    custom={direction}
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.32, ease: "easeInOut" }}
                    className="space-y-5"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                          Department Selection
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10px] font-serif text-[#F5E19A] uppercase tracking-wider bg-[#D4AF37]/15 border border-[#D4AF37]/40 px-2.5 py-0.5 rounded-full">
                          1st Year Freshers
                        </span>
                      </div>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FFF8E7] mt-1">
                        Select Your Department
                      </h3>
                      <p className="text-xs sm:text-sm text-[#FFF8E7]/70 font-sans mt-1">
                        Choose your branch. Exclusive to 1st year CSE and CSD students.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                      {/* CSE Card */}
                      <button
                        type="button"
                        onClick={() => updateField("department", "CSE")}
                        className={`p-6 rounded-2xl border text-left transition-all duration-300 relative flex flex-col justify-between cursor-pointer group ${
                          formData.department === "CSE"
                            ? "bg-[#142852]/80 border-[#F5E19A] shadow-[0_0_30px_rgba(212,175,55,0.45)] scale-[1.03]"
                            : "bg-[#060E22]/70 border-[#D4AF37]/30 hover:border-[#F5E19A]/60 opacity-85 hover:opacity-100 hover:scale-[1.01]"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                              formData.department === "CSE"
                                ? "bg-[#D4AF37]/25 border border-[#F5E19A] text-[#F5E19A]"
                                : "bg-[#0B1B3F] border border-[#D4AF37]/30 text-[#D4AF37]"
                            }`}
                          >
                            <Laptop className="w-6 h-6" />
                          </div>

                          {formData.department === "CSE" ? (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#F5E19A] text-[#060E22] flex items-center justify-center text-xs font-bold shadow-[0_0_12px_rgba(212,175,55,0.7)]"
                            >
                              ✓
                            </motion.span>
                          ) : (
                            <span className="w-6 h-6 rounded-full border border-[#D4AF37]/30 group-hover:border-[#F5E19A]/60 transition-colors" />
                          )}
                        </div>

                        <div>
                          <div className="flex items-baseline gap-2">
                            <h4 className="font-serif text-2xl font-bold text-[#FFF8E7]">
                              CSE
                            </h4>
                            <span className="text-[11px] font-serif uppercase tracking-wider text-[#D4AF37]">
                              Engineering
                            </span>
                          </div>
                          <p className="text-xs text-[#FFF8E7]/70 mt-1 font-sans leading-relaxed">
                            Computer Science and Engineering
                          </p>
                        </div>
                      </button>

                      {/* CSD Card */}
                      <button
                        type="button"
                        onClick={() => updateField("department", "CSD")}
                        className={`p-6 rounded-2xl border text-left transition-all duration-300 relative flex flex-col justify-between cursor-pointer group ${
                          formData.department === "CSD"
                            ? "bg-[#142852]/80 border-[#F5E19A] shadow-[0_0_30px_rgba(212,175,55,0.45)] scale-[1.03]"
                            : "bg-[#060E22]/70 border-[#D4AF37]/30 hover:border-[#F5E19A]/60 opacity-85 hover:opacity-100 hover:scale-[1.01]"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                              formData.department === "CSD"
                                ? "bg-[#D4AF37]/25 border border-[#F5E19A] text-[#F5E19A]"
                                : "bg-[#0B1B3F] border border-[#D4AF37]/30 text-[#D4AF37]"
                            }`}
                          >
                            <Palette className="w-6 h-6" />
                          </div>

                          {formData.department === "CSD" ? (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#F5E19A] text-[#060E22] flex items-center justify-center text-xs font-bold shadow-[0_0_12px_rgba(212,175,55,0.7)]"
                            >
                              ✓
                            </motion.span>
                          ) : (
                            <span className="w-6 h-6 rounded-full border border-[#D4AF37]/30 group-hover:border-[#F5E19A]/60 transition-colors" />
                          )}
                        </div>

                        <div>
                          <div className="flex items-baseline gap-2">
                            <h4 className="font-serif text-2xl font-bold text-[#FFF8E7]">
                              CSD
                            </h4>
                            <span className="text-[11px] font-serif uppercase tracking-wider text-[#D4AF37]">
                              Design
                            </span>
                          </div>
                          <p className="text-xs text-[#FFF8E7]/70 mt-1 font-sans leading-relaxed">
                            Computer Science and Design
                          </p>
                        </div>
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: Food Preference Cards */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    custom={direction}
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.32, ease: "easeInOut" }}
                    className="space-y-5"
                  >
                    <div>
                      <span className="font-serif text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                        Banquet Preference
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FFF8E7] mt-1">
                        Select Your Meal
                      </h3>
                      <p className="text-xs sm:text-sm text-[#FFF8E7]/70 font-sans mt-1">
                        Complimentary grand banquet arranged for all freshers.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                      {/* Veg */}
                      <button
                        type="button"
                        onClick={() => updateField("food", "Veg")}
                        className={`p-5 rounded-2xl border text-left transition-all relative flex flex-col justify-between cursor-pointer ${
                          formData.food === "Veg"
                            ? "bg-[#102B19]/70 border-[#4ADE80] shadow-[0_0_25px_rgba(74,222,128,0.3)] scale-[1.02]"
                            : "bg-[#060E22]/70 border-[#D4AF37]/30 hover:border-[#F5E19A]/60 opacity-80 hover:opacity-100"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 rounded-xl bg-[#166534]/50 border border-[#4ADE80]/50 flex items-center justify-center">
                            <Salad className="w-6 h-6 text-[#4ADE80]" />
                          </div>
                          {formData.food === "Veg" && (
                            <span className="w-6 h-6 rounded-full bg-[#4ADE80] text-[#060E22] flex items-center justify-center text-xs font-bold">
                              ✓
                            </span>
                          )}
                        </div>
                        <div>
                          <h4 className="font-serif text-lg font-bold text-[#FFF8E7]">
                            Veg
                          </h4>
                          <p className="text-xs text-[#FFF8E7]/70 mt-1">
                            Delicious royal vegetarian cuisine & traditional delicacies.
                          </p>
                        </div>
                      </button>

                      {/* Non-Veg */}
                      <button
                        type="button"
                        onClick={() => updateField("food", "Non-Veg")}
                        className={`p-5 rounded-2xl border text-left transition-all relative flex flex-col justify-between cursor-pointer ${
                          formData.food === "Non-Veg"
                            ? "bg-[#331114]/70 border-[#FB7185] shadow-[0_0_25px_rgba(251,113,133,0.3)] scale-[1.02]"
                            : "bg-[#060E22]/70 border-[#D4AF37]/30 hover:border-[#F5E19A]/60 opacity-80 hover:opacity-100"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 rounded-xl bg-[#881337]/50 border border-[#FB7185]/50 flex items-center justify-center">
                            <Beef className="w-6 h-6 text-[#FB7185]" />
                          </div>
                          {formData.food === "Non-Veg" && (
                            <span className="w-6 h-6 rounded-full bg-[#FB7185] text-[#060E22] flex items-center justify-center text-xs font-bold">
                              ✓
                            </span>
                          )}
                        </div>
                        <div>
                          <h4 className="font-serif text-lg font-bold text-[#FFF8E7]">
                            Non-Veg
                          </h4>
                          <p className="text-xs text-[#FFF8E7]/70 mt-1">
                            Savory chicken biryani and chef-crafted non-veg feast.
                          </p>
                        </div>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 text-xs font-medium text-[#F87171] bg-[#7F1D1D]/30 border border-[#DC2626]/40 px-3 py-2 rounded-lg"
                >
                  {error}
                </motion.p>
              )}

              {/* Navigation Controls with Magnetic Button */}
              <div className="mt-8 pt-4 border-t border-[#D4AF37]/20 flex items-center justify-between gap-3">
                {currentStep > 1 ? (
                  <MagneticButton
                    onClick={handleBack}
                    className="px-5 py-3 rounded-full text-xs font-serif uppercase tracking-widest text-[#FFF8E7]/80 hover:text-[#FFF8E7] border border-[#D4AF37]/30 hover:bg-[#D4AF37]/10 transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </MagneticButton>
                ) : (
                  <div />
                )}

                <MagneticButton
                  onClick={handleNext}
                  className="gold-btn px-7 py-3 rounded-full text-xs font-serif uppercase tracking-widest flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                >
                  <span>{currentStep === TOTAL_STEPS ? "Confirm RSVP" : "Next"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </MagneticButton>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}