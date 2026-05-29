"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export default function NotFound() {
  return (
    <main
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
      style={{
        background:
          "radial-gradient(ellipse 150% 70% at 60% 0%, #130a24 0%, #080518 48%, #040310 100%)",
      }}
    >
      {/* Grain */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
          backgroundSize: "160px 160px",
          opacity: 0.055,
          mixBlendMode: "screen",
        }}
        animate={{ backgroundPosition: ["0% 0%", "-5% -8%", "6% 4%", "0% 0%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      {/* Violet bloom */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed z-0"
        style={{
          left: "50%",
          top: "20%",
          translateX: "-50%",
          width: "60vw",
          height: "60vh",
          background:
            "radial-gradient(ellipse 55% 55% at 50% 50%, rgba(139,92,246,0.2) 0%, transparent 68%)",
          filter: "blur(100px)",
        }}
        animate={{ opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Logo tile */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
        >
          <svg width="40" height="40" viewBox="0 0 100 100" aria-hidden>
            <rect width="100" height="100" rx="22" fill="rgba(7,3,20,0.8)" />
            <path d="M28 54 A22 22 0 0 1 72 54 Z" fill="oklch(0.66 0.18 290)" />
            <rect x="14" y="60" width="72" height="7" rx="3.5" fill="rgba(255,255,255,0.88)" />
          </svg>
        </motion.div>

        {/* Label */}
        <motion.p
          className="mb-3 font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-white/25"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Error 404
        </motion.p>

        {/* Number */}
        <motion.h1
          className="mb-5 font-black tracking-tight"
          style={{
            fontSize: "clamp(5rem,18vw,10rem)",
            lineHeight: 1,
            letterSpacing: "-0.04em",
            backgroundImage:
              "linear-gradient(135deg, rgba(255,255,255,0.88) 0%, rgba(139,92,246,0.75) 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: easeOutExpo }}
        >
          404
        </motion.h1>

        <motion.p
          className="mb-2 text-lg font-semibold text-white/70"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22, ease: easeOutExpo }}
        >
          Page not found
        </motion.p>

        <motion.p
          className="mb-10 max-w-xs text-sm leading-relaxed text-white/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          This page doesn&apos;t exist or was moved. Let&apos;s get you back on track.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.38, ease: easeOutExpo }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.05] px-6 py-3 text-sm font-medium text-white/65 backdrop-blur-sm transition-colors duration-200 hover:border-violet-400/40 hover:bg-violet-400/[0.09] hover:text-white/90"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
