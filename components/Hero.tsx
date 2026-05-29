"use client";

import { useState, useEffect } from "react";
import { useScroll, useTransform, motion, AnimatePresence } from "framer-motion";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;
const ease = [0.25, 0.46, 0.45, 0.94] as const;

// ─── Grain ────────────────────────────────────────────────────────────────────

function Grain() {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[3]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
        backgroundSize: "160px 160px",
        opacity: 0.12,
        mixBlendMode: "screen",
      }}
      animate={{
        backgroundPosition: ["0% 0%", "-6% -11%", "9% 4%", "-7% 13%", "5% -5%", "0% 0%"],
      }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    />
  );
}

// ─── Aurora ───────────────────────────────────────────────────────────────────

function Aurora() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      {/* Primary — rich teal-green, dominant, slow drift */}
      <motion.div
        className="absolute"
        style={{
          left: "-8%",
          top: "-20%",
          width: "72vw",
          height: "120vh",
          background:
            "radial-gradient(ellipse 50% 58% at 42% 36%, rgba(0,210,145,0.34) 0%, rgba(0,165,125,0.14) 44%, transparent 68%)",
          filter: "blur(82px)",
        }}
        animate={{ x: [0, 26, 0], y: [0, -16, 0], opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Secondary — deep violet-purple, right */}
      <motion.div
        className="absolute"
        style={{
          right: "-14%",
          top: "0%",
          width: "58vw",
          height: "88vh",
          background:
            "radial-gradient(ellipse 56% 52% at 52% 44%, rgba(145,75,245,0.28) 0%, rgba(100,55,200,0.11) 46%, transparent 68%)",
          filter: "blur(105px)",
        }}
        animate={{ x: [0, -28, 0], opacity: [0.6, 0.94, 0.6] }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />

      {/* Rose accent — bottom-right, warmth so it doesn't feel cold */}
      <motion.div
        className="absolute"
        style={{
          right: "10%",
          bottom: "5%",
          width: "38vw",
          height: "45vh",
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(240,80,155,0.16) 0%, transparent 65%)",
          filter: "blur(95px)",
        }}
        animate={{ scale: [1, 1.14, 1], opacity: [0.45, 0.78, 0.45] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 6 }}
      />

      {/* Bright teal accent spot — the "aurora core" */}
      <motion.div
        className="absolute"
        style={{
          left: "24%",
          top: "26%",
          width: "28vw",
          height: "30vh",
          background: "radial-gradient(circle, rgba(0,235,162,0.2) 0%, transparent 60%)",
          filter: "blur(68px)",
        }}
        animate={{ scale: [1, 1.22, 1], opacity: [0.5, 0.92, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 5 }}
      />

      {/* Floor warmth */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[50vh]"
        style={{
          background: "linear-gradient(to top, rgba(0,165,105,0.07) 0%, transparent 100%)",
        }}
      />
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const LINES = [
  { text: "Cloud", accent: false },
  { text: "Engineering,", accent: false },
  { text: "Intelligently", accent: true },
] as const;

const CYCLE_WORDS = ["Automated.", "Optimized.", "Secured.", "Monitored.", "Migrated."] as const;

// ─── Hero ─────────────────────────────────────────────────────────────────────

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setWordIndex((n) => (n + 1) % CYCLE_WORDS.length), 3200);
    return () => clearInterval(id);
  }, []);

  const { scrollY } = useScroll();
  const headlineY = useTransform(scrollY, [0, 650], [0, -88]);
  const fadeOut = useTransform(scrollY, [0, 480], [1, 0]);

  return (
    <section
      id="intro"
      className="relative flex min-h-[100dvh] flex-col overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 160% 90% at 18% 0%, #122040 0%, #050b1a 45%, #030812 100%)",
      }}
    >
      <Grain />
      <Aurora />

      <div className="relative z-[4] flex flex-1 flex-col px-6 pb-12 pt-24 sm:px-12 sm:pb-16 sm:pt-28 lg:px-16 xl:pl-44">
        {/* Meta */}
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.18 }}
        >
          <span
            className="font-mono uppercase text-white/22"
            style={{ fontSize: "9px", letterSpacing: "0.22em" }}
          >
            Cloud · AI · DevSecOps
          </span>
          <span
            className="hidden font-mono uppercase text-white/14 sm:block"
            style={{ fontSize: "9px", letterSpacing: "0.2em" }}
          >
            Woodbridge, NJ — Est. 2024
          </span>
        </motion.div>

        {/* ── Headline ── */}
        <motion.div
          className="my-auto flex-1 py-10"
          style={{ y: headlineY, opacity: fadeOut }}
        >
          <h1
            className="font-extrabold"
            style={{ fontSize: "clamp(2.2rem,8vw,7.2rem)", lineHeight: 0.91, letterSpacing: "-0.03em" }}
          >
            {/* Static lines */}
            {LINES.map((line, i) => (
              <div key={i} className="overflow-hidden pb-[0.06em]">
                <motion.div
                  initial={{ y: "108%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 0.92, delay: 0.48 + i * 0.12, ease: easeOutExpo }}
                >
                  {line.accent ? (
                    <motion.span
                      className="block"
                      style={{
                        backgroundImage:
                          "linear-gradient(92deg, rgb(0,218,138) 0%, rgb(0,195,212) 35%, rgb(85,145,255) 65%, rgb(0,218,138) 100%)",
                        backgroundSize: "200% 100%",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        color: "transparent",
                      }}
                      animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.8 }}
                    >
                      {line.text}
                    </motion.span>
                  ) : (
                    <span className="block text-white">{line.text}</span>
                  )}
                </motion.div>
              </div>
            ))}

            {/* Cycling last word — no overflow-hidden so y animation isn't clipped */}
            <div className="pb-[0.06em]">
              <motion.div
                initial={{ y: "108%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.92, delay: 0.48 + LINES.length * 0.12, ease: easeOutExpo }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={CYCLE_WORDS[wordIndex]}
                    className="block text-white"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.38, ease: easeOutExpo }}
                  >
                    {CYCLE_WORDS[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </motion.div>
            </div>
          </h1>
        </motion.div>

        {/* Bottom row */}
        <motion.div
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.88, delay: 1.08, ease: easeOutExpo }}
        >
          <p className="max-w-[280px] leading-relaxed text-white/52" style={{ fontSize: "13px" }}>
            Next-gen cloud solutions to optimize, automate, and scale — powered by AI, built for
            engineering teams.
          </p>
          <div className="flex items-center gap-3">
            <motion.a
              href="#platform"
              className="inline-flex cursor-pointer items-center rounded-full border border-white/[0.12] px-6 py-2.5 text-sm font-medium text-white/62 backdrop-blur-sm"
              whileHover={{
                borderColor: "rgba(0,200,140,0.38)",
                color: "rgba(255,255,255,0.95)",
                backgroundColor: "rgba(0,200,140,0.07)",
              }}
              transition={{ duration: 0.2, ease }}
            >
              Explore Platform
            </motion.a>
            <motion.a
              href="#contact"
              className="inline-flex cursor-pointer items-center rounded-full bg-white px-6 py-2.5 text-sm font-semibold"
              style={{ color: "#050b1a" }}
              whileHover={{ scale: 1.03, backgroundColor: "rgb(210,255,240)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2, ease }}
            >
              Book a Demo
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Scroll pulse */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-[4] -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <motion.div style={{ opacity: fadeOut }}>
          <motion.div
            className="h-10 w-px origin-top"
            style={{ background: "linear-gradient(to bottom, rgba(0,200,130,0.75), rgba(0,200,130,0))" }}
            animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.4 }}
          />
        </motion.div>
      </motion.div>

      {/* Bottom edge — bleeds into Offerings violet */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-36 bg-gradient-to-t from-[#0c0520] to-transparent" />
    </section>
  );
}
