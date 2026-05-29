"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { Cloud, ShieldCheck, BrainCircuit, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;
const ease = [0.25, 0.46, 0.45, 0.94] as const;

// ─── Data ─────────────────────────────────────────────────────────────────────

type Offering = {
  number: string;
  icon: LucideIcon;
  label: string;
  description: string;
  iconClass: string;
  iconBg: string;
  glowColor: string;
  borderGlow: string;
  tags: string[];
  metric: string;
  metricLabel: string;
};

const OFFERINGS: Offering[] = [
  {
    number: "01",
    icon: Cloud,
    label: "Cloud Cost Optimization",
    description:
      "Reduce cloud expenses and maximize efficiency with intelligent analysis, automated rightsizing, and real-time cost visibility across all your environments.",
    iconClass: "text-cyan-400",
    iconBg: "from-cyan-500/[0.2] to-blue-600/[0.08]",
    glowColor: "rgba(6,182,212,0.13)",
    borderGlow: "rgba(6,182,212,0.55)",
    tags: ["Auto-rightsizing", "Real-time visibility", "Multi-cloud"],
    metric: "↓ 47%",
    metricLabel: "avg. cost reduction",
  },
  {
    number: "02",
    icon: ShieldCheck,
    label: "DevSecOps as a Service",
    description:
      "Integrate security into your DevOps pipelines — shift left, automate compliance, and ship with confidence.",
    iconClass: "text-fuchsia-400",
    iconBg: "from-fuchsia-500/[0.2] to-purple-600/[0.08]",
    glowColor: "rgba(232,72,212,0.13)",
    borderGlow: "rgba(232,72,212,0.55)",
    tags: ["Shift-left security", "Compliance automation", "Zero-trust"],
    metric: "100%",
    metricLabel: "policy coverage",
  },
  {
    number: "03",
    icon: BrainCircuit,
    label: "AI-Driven Monitoring & Incident Response",
    description:
      "Proactively detect and resolve issues with AI-powered insights before they impact your users.",
    iconClass: "text-violet-400",
    iconBg: "from-violet-500/[0.2] to-indigo-600/[0.08]",
    glowColor: "rgba(139,92,246,0.13)",
    borderGlow: "rgba(139,92,246,0.55)",
    tags: ["Predictive alerting", "Auto-remediation", "AIOps"],
    metric: "< 2 min",
    metricLabel: "mean time to detect",
  },
  {
    number: "04",
    icon: Zap,
    label: "Serverless Application Framework",
    description:
      "Build and deploy scalable serverless applications with zero infrastructure overhead, automatic scaling, and global edge distribution.",
    iconClass: "text-pink-300",
    iconBg: "from-pink-500/[0.2] to-rose-600/[0.08]",
    glowColor: "rgba(244,114,182,0.13)",
    borderGlow: "rgba(244,114,182,0.55)",
    tags: ["Auto-scaling", "Edge distribution", "Zero overhead"],
    metric: "∞",
    metricLabel: "scale on demand",
  },
];

const STICKY_TOP = 88;

// ─── Scene background (sticky, stays behind cards) ────────────────────────────

function SceneBackground() {
  return (
    <div
      className="sticky top-0 z-[2] h-[100vh] overflow-hidden"
      style={{ marginBottom: "-100vh" }}
    >
      {/* Grain */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[10]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
          backgroundSize: "160px 160px",
          opacity: 0.08,
          mixBlendMode: "screen",
        }}
        animate={{ backgroundPosition: ["0% 0%", "-5% -9%", "8% 5%", "-6% 11%", "4% -4%", "0% 0%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* Violet bloom — dominant, left-center */}
      <motion.div
        className="absolute"
        style={{
          left: "-10%",
          top: "5%",
          width: "75vw",
          height: "95vh",
          background:
            "radial-gradient(ellipse 48% 55% at 42% 40%, rgba(155,50,255,0.32) 0%, rgba(110,30,210,0.14) 45%, transparent 68%)",
          filter: "blur(115px)",
        }}
        animate={{ x: [0, 32, 0], y: [0, -18, 0], opacity: [0.72, 1, 0.72] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Magenta bloom — right, warm contrast */}
      <motion.div
        className="absolute"
        style={{
          right: "-8%",
          top: "10%",
          width: "55vw",
          height: "75vh",
          background:
            "radial-gradient(ellipse 54% 50% at 52% 45%, rgba(230,60,185,0.24) 0%, rgba(185,40,145,0.1) 48%, transparent 70%)",
          filter: "blur(100px)",
        }}
        animate={{ x: [0, -26, 0], opacity: [0.6, 0.92, 0.6] }}
        transition={{ duration: 19, repeat: Infinity, ease: "easeInOut", delay: 3.5 }}
      />

      {/* Teal contrast — bottom, cold accent */}
      <motion.div
        className="absolute"
        style={{
          left: "15%",
          bottom: "8%",
          width: "40vw",
          height: "40vh",
          background: "radial-gradient(circle, rgba(0,185,175,0.18) 0%, transparent 62%)",
          filter: "blur(88px)",
        }}
        animate={{ scale: [1, 1.18, 1], opacity: [0.48, 0.82, 0.48] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 7 }}
      />

      {/* Soft base gradient so the dark areas aren't dead black */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 140% 100% at 20% 5%, #220950 0%, #0d0520 50%, #080318 100%)",
          opacity: 0.6,
        }}
      />
    </div>
  );
}

// ─── OfferingPanel ────────────────────────────────────────────────────────────

function OfferingPanel({
  offering,
  index,
  total,
  progress,
}: {
  offering: Offering;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const { icon: Icon, label, description, iconClass, iconBg, glowColor, borderGlow, number, tags, metric, metricLabel } = offering;
  const isLast = index === total - 1;

  const scaleTarget = isLast ? 1 : 1 - (total - 1 - index) * 0.045;
  const scale = useTransform(progress, [index / total, (index + 1) / total], [1, scaleTarget]);

  return (
    <div
      className="sticky flex flex-col justify-start px-6 pt-4"
      style={{ top: `${STICKY_TOP}px`, height: "100vh", zIndex: 10 + index }}
    >
      {/* Card sits at the top — enters viewport immediately, no black space above */}
      <div className="flex justify-center">
        <motion.div
          className="relative w-full max-w-4xl rounded-3xl p-px"
          style={{ scale, transformOrigin: "top center" }}
        >
        {/* 1px gradient border */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl"
          style={{
            background: `linear-gradient(135deg, ${borderGlow} 0%, rgba(255,255,255,0.06) 45%, transparent 100%)`,
          }}
        />

        {/* Glass body — tinted to match the violet scene */}
        <div
          className="relative overflow-hidden rounded-[calc(1.5rem-1px)] px-5 py-8 sm:px-8 sm:py-10 md:px-14 md:py-14"
          style={{
            background: `radial-gradient(ellipse 65% 55% at 10% 0%, ${glowColor} 0%, transparent 52%), rgba(14,5,32,1)`,
            backdropFilter: "blur(12px)",
          }}
        >
          {/* Watermark number */}
          <span
            className="pointer-events-none absolute right-4 top-6 select-none font-mono font-black leading-none tracking-tighter text-white/[0.04] sm:right-10 sm:top-8"
            style={{ fontSize: "clamp(40px,8vw,100px)" }}
          >
            {number}
          </span>

          <div className="flex items-start justify-between gap-10">
            {/* Left */}
            <div className="flex-1">
              <div className={`mb-8 inline-flex items-center justify-center rounded-2xl bg-gradient-to-br p-4 ${iconBg}`}>
                <Icon className={`h-6 w-6 ${iconClass}`} strokeWidth={1.5} />
              </div>
              <h3
                className="mb-5 font-bold leading-tight tracking-tight text-white/92"
                style={{ fontSize: "clamp(1.4rem,2.4vw,2.1rem)" }}
              >
                {label}
              </h3>
              <p className="mb-8 max-w-[480px] text-base leading-relaxed text-white/42">
                {description}
              </p>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-white/38"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: metric */}
            <div className="hidden shrink-0 flex-col items-end text-right md:flex">
              <span
                className="font-mono font-bold leading-none tracking-tight"
                style={{
                  fontSize: "clamp(2rem,3.8vw,3.25rem)",
                  backgroundImage: `linear-gradient(145deg, rgba(255,255,255,0.92) 0%, ${borderGlow} 100%)`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                }}
              >
                {metric}
              </span>
              <span className="mt-2.5 max-w-[120px] text-[11px] font-medium uppercase leading-tight tracking-widest text-white/22">
                {metricLabel}
              </span>
            </div>
          </div>

          {/* Bottom accent */}
          <div
            className="absolute bottom-0 left-12 right-12 h-px"
            style={{ background: `linear-gradient(90deg, transparent, ${borderGlow}, transparent)` }}
          />
        </div>
      </motion.div>
    </div>
    <div className="flex-1" style={{ background: "#08031a" }} />
  </div>
  );
}

// ─── Offerings ────────────────────────────────────────────────────────────────

export default function Offerings() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  return (
    <section
      id="platform"
      className="relative"
      style={{
        background: "radial-gradient(ellipse 150% 100% at 20% 5%, #1e0840 0%, #0d0520 45%, #08031a 100%)",
      }}
    >
      {/* Top edge — blends with Hero's bottom */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-50 h-36 bg-gradient-to-b from-[#0c0520] to-transparent" />
      {/* Bottom edge — bleeds into Products */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-50 h-36 bg-gradient-to-t from-[#060b22] to-transparent" />

      {/* Section header */}
      <motion.div
        className="relative z-[10] px-6 pb-6 pt-28 text-center sm:pt-36"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.75, ease: easeOutExpo }}
      >
        <div className="mb-5 flex justify-center">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-[11px] font-medium uppercase tracking-widest text-white/45 backdrop-blur-sm">
            <span
              className="h-1.5 w-1.5 rounded-full bg-fuchsia-400"
              style={{ boxShadow: "0 0 6px rgba(232,72,212,0.9)" }}
            />
            What We Offer
          </div>
        </div>
        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Our Key{" "}
          <motion.span
            className="inline-block bg-gradient-to-r from-fuchsia-400 via-violet-400 to-pink-400 bg-clip-text text-transparent"
            style={{ backgroundSize: "200% 100%" }}
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            Offerings
          </motion.span>
        </h2>
      </motion.div>

      {/* Sticky stack container */}
      <div
        ref={containerRef}
        className="relative"
        style={{ height: `${OFFERINGS.length * 100}vh` }}
      >
        <SceneBackground />

        {OFFERINGS.map((offering, i) => (
          <OfferingPanel
            key={offering.number}
            offering={offering}
            index={i}
            total={OFFERINGS.length}
            progress={scrollYProgress}
          />
        ))}
      </div>

      <div className="h-28" />
    </section>
  );
}
