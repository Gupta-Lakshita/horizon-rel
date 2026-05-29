"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useAnimationFrame,
  AnimatePresence,
} from "framer-motion";
import { Activity, TrendingUp, Shield, Building2, ShoppingBag, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

type Industry = {
  icon: LucideIcon;
  name: string;
  metric: string;
  metricLabel: string;
  iconClass: string;
  iconBg: string;
  borderGlow: string;
};

const INDUSTRIES: Industry[] = [
  {
    icon: Activity,
    name: "Healthcare",
    metric: "65%",
    metricLabel: "faster incident response",
    iconClass: "text-emerald-400",
    iconBg: "from-emerald-500/[0.22] to-green-600/[0.08]",
    borderGlow: "rgba(0,210,110,0.55)",
  },
  {
    icon: TrendingUp,
    name: "FinTech",
    metric: "37%",
    metricLabel: "avg. AWS cost reduction",
    iconClass: "text-lime-400",
    iconBg: "from-lime-500/[0.22] to-yellow-600/[0.08]",
    borderGlow: "rgba(190,215,40,0.52)",
  },
  {
    icon: Shield,
    name: "Finance",
    metric: "99.99%",
    metricLabel: "SLA uptime achieved",
    iconClass: "text-teal-400",
    iconBg: "from-teal-500/[0.22] to-cyan-600/[0.08]",
    borderGlow: "rgba(0,195,175,0.52)",
  },
  {
    icon: Building2,
    name: "Enterprise",
    metric: "72×",
    metricLabel: "faster cloud onboarding",
    iconClass: "text-cyan-400",
    iconBg: "from-cyan-500/[0.22] to-blue-600/[0.08]",
    borderGlow: "rgba(0,195,220,0.52)",
  },
  {
    icon: ShoppingBag,
    name: "Retail",
    metric: "2M+",
    metricLabel: "Lambda invocations",
    iconClass: "text-green-400",
    iconBg: "from-green-500/[0.22] to-teal-600/[0.08]",
    borderGlow: "rgba(0,180,145,0.52)",
  },
  {
    icon: Rocket,
    name: "Startups",
    metric: "Day 1",
    metricLabel: "to production-ready",
    iconClass: "text-lime-300",
    iconBg: "from-lime-400/[0.22] to-green-600/[0.08]",
    borderGlow: "rgba(145,220,55,0.48)",
  },
];

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

// ─── OrbitNode ────────────────────────────────────────────────────────────────

function OrbitNode({
  industry,
  isHovered,
  onHover,
  onLeave,
}: {
  industry: Industry;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const { icon: Icon, name, metric, metricLabel, iconClass, iconBg, borderGlow } = industry;
  const glow = borderGlow.replace(/[\d.]+\)$/, "0.35)");

  return (
    <div
      className="relative flex flex-col items-center"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Icon pill */}
      <motion.div
        className="relative flex h-[72px] w-[72px] cursor-pointer items-center justify-center rounded-2xl"
        animate={{
          scale: isHovered ? 1.14 : 1,
          filter: isHovered ? `drop-shadow(0 0 18px ${glow})` : "drop-shadow(0 0 0px transparent)",
        }}
        transition={{ duration: 0.3, ease: easeOutExpo }}
      >
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${iconBg}`} />
        <div
          className="absolute inset-0 rounded-2xl transition-opacity duration-300"
          style={{
            background: `linear-gradient(145deg, ${borderGlow} 0%, transparent 55%)`,
            opacity: isHovered ? 0.9 : 0.55,
          }}
        />
        <div
          className="absolute inset-[1px] flex items-center justify-center rounded-[calc(1rem-1px)]"
          style={{ background: "rgba(6,8,22,0.88)" }}
        >
          <Icon className={`h-7 w-7 ${iconClass}`} strokeWidth={1.5} />
        </div>
      </motion.div>

      {/* Info card — pops up on hover, stays in upright space */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute top-full mt-3 flex w-[148px] flex-col items-center gap-1.5 text-center"
            initial={{ opacity: 0, y: -8, scale: 0.86 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.86 }}
            transition={{ duration: 0.22, ease: easeOutExpo }}
          >
            <span className="text-[13px] font-semibold tracking-tight text-white/82">
              {name}
            </span>
            <span
              className="font-mono text-[22px] font-bold leading-none"
              style={{
                backgroundImage: `linear-gradient(135deg, rgba(255,255,255,0.94) 0%, ${borderGlow} 100%)`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {metric}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-white/30">
              {metricLabel}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── MobileCard ───────────────────────────────────────────────────────────────

function MobileCard({ industry, delay }: { industry: Industry; delay: number }) {
  const { icon: Icon, name, metric, metricLabel, iconClass, iconBg, borderGlow } = industry;
  return (
    <motion.div
      className="flex flex-col items-center gap-3 rounded-2xl p-5 text-center"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.018) 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: easeOutExpo }}
    >
      <div className="relative flex h-14 w-14 items-center justify-center rounded-xl">
        <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${iconBg}`} />
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            background: `linear-gradient(145deg, ${borderGlow} 0%, transparent 55%)`,
            opacity: 0.55,
          }}
        />
        <div
          className="absolute inset-[1px] flex items-center justify-center rounded-[calc(0.75rem-1px)]"
          style={{ background: "rgba(6,8,22,0.88)" }}
        >
          <Icon className={`h-5 w-5 ${iconClass}`} strokeWidth={1.5} />
        </div>
      </div>
      <div>
        <div className="mb-0.5 text-[12px] font-semibold text-white/70">{name}</div>
        <div
          className="font-mono text-[16px] font-bold leading-tight"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(255,255,255,0.9) 0%, ${borderGlow} 100%)`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {metric}
        </div>
        <div className="mt-0.5 text-[9px] uppercase tracking-wider text-white/25">
          {metricLabel}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Industries ───────────────────────────────────────────────────────────────

export default function Industries() {
  const orbitRotation = useMotionValue(0);
  const isPausedRef = useRef(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [radius, setRadius] = useState(210);

  useEffect(() => {
    const update = () => {
      setRadius(Math.min(210, Math.max(160, window.innerWidth * 0.155)));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Drive orbit rotation; pausable via ref to avoid stale closure
  useAnimationFrame((_, delta) => {
    if (!isPausedRef.current) {
      orbitRotation.set((orbitRotation.get() + (delta / 80000) * 360) % 360);
    }
  });

  // Counter-rotation keeps every icon upright as the orbit ring turns
  const counterRotation = useTransform(orbitRotation, (r) => -r);

  return (
    <section
      id="industries"
      className="relative overflow-hidden pt-20 pb-10 sm:pt-24 sm:pb-12"
      style={{
        background:
          "radial-gradient(ellipse 140% 80% at 12% 5%, #0c1238 0%, #060816 45%, #030610 100%)",
      }}
    >
      {/* Grain */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
          backgroundSize: "160px 160px",
          opacity: 0.08,
          mixBlendMode: "screen",
        }}
        animate={{ backgroundPosition: ["0% 0%", "-6% -8%", "7% 5%", "0% 0%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* Sapphire bloom — left */}
      <motion.div
        className="pointer-events-none absolute z-[0]"
        style={{
          left: "-5%", top: "5%", width: "62vw", height: "82vh",
          background:
            "radial-gradient(ellipse at 42% 40%, rgba(60,85,245,0.26) 0%, rgba(40,65,210,0.1) 46%, transparent 68%)",
          filter: "blur(110px)",
        }}
        animate={{ x: [0, 26, 0], y: [0, -14, 0], opacity: [0.72, 1, 0.72] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute z-[0]"
        style={{
          right: "-8%", top: "25%", width: "50vw", height: "68vh",
          background:
            "radial-gradient(ellipse at 55% 45%, rgba(30,65,220,0.2) 0%, rgba(20,50,190,0.08) 50%, transparent 68%)",
          filter: "blur(95px)",
        }}
        animate={{ x: [0, -22, 0], opacity: [0.58, 0.9, 0.58] }}
        transition={{ duration: 19, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />
      <motion.div
        className="pointer-events-none absolute z-[0]"
        style={{
          left: "28%", bottom: "10%", width: "36vw", height: "40vh",
          background: "radial-gradient(circle, rgba(90,45,215,0.15) 0%, transparent 62%)",
          filter: "blur(85px)",
        }}
        animate={{ scale: [1, 1.18, 1], opacity: [0.44, 0.76, 0.44] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 7 }}
      />

      {/* Section fades */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[10] h-36 bg-gradient-to-b from-[#060816] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[10] h-36 bg-gradient-to-t from-[#080412] to-transparent" />

      <div className="relative z-[3] mx-auto max-w-6xl px-6">

        {/* Header */}
        <motion.div
          className="mb-16 text-center sm:mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, ease: easeOutExpo }}
        >
          <div className="mb-5 flex justify-center">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-[11px] font-medium uppercase tracking-widest text-white/45 backdrop-blur-sm">
              <span
                className="h-1.5 w-1.5 rounded-full bg-blue-400"
                style={{ boxShadow: "0 0 6px rgba(96,165,250,0.9)" }}
              />
              Who We Serve
            </div>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Built for Every{" "}
            <motion.span
              className="inline-block bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-400 bg-clip-text text-transparent"
              style={{ backgroundSize: "200% 100%" }}
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              Industry
            </motion.span>
          </h2>
          <motion.p
            className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/34"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.12, ease: easeOutExpo }}
          >
            Real outcomes across every vertical — measured in speed, cost, and uptime.
          </motion.p>
        </motion.div>

        {/* ── Mobile: 2-col grid ── */}
        <div className="grid grid-cols-2 gap-4 lg:hidden">
          {INDUSTRIES.map((ind, i) => (
            <MobileCard key={ind.name} industry={ind} delay={i * 0.07} />
          ))}
        </div>

        {/* ── Desktop: Radial orbit ── */}
        <div
          className="relative hidden lg:block"
          style={{ height: 580 }}
          onMouseEnter={() => { isPausedRef.current = true; }}
          onMouseLeave={() => { isPausedRef.current = false; setHoveredIndex(null); }}
        >
          {/* Orbit path ring */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: radius * 2 + 80,
              height: radius * 2 + 80,
              border: "1px solid rgba(255,255,255,0.05)",
              boxShadow: "inset 0 0 0 1px rgba(96,165,250,0.03)",
            }}
          />

          {/* Inner glow ring */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: radius * 2 - 24,
              height: radius * 2 - 24,
              border: "1px solid rgba(96,165,250,0.06)",
            }}
          />

          {/* Center */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3 z-10">
            <div
              className="h-2.5 w-2.5 rounded-full bg-blue-400/55"
              style={{ boxShadow: "0 0 22px rgba(96,165,250,0.55), 0 0 6px rgba(96,165,250,0.9)" }}
            />
            <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-white/20">
              Who We Serve
            </span>
          </div>

          {/* Rotating orbit container */}
          <motion.div
            className="absolute inset-0"
            style={{ rotate: orbitRotation }}
          >
            {INDUSTRIES.map((industry, i) => {
              const angle = (i / INDUSTRIES.length) * 360 - 90; // start at top
              const rad = (angle * Math.PI) / 180;
              const x = Math.cos(rad) * radius;
              const y = Math.sin(rad) * radius;

              return (
                <motion.div
                  key={industry.name}
                  className="absolute"
                  style={{
                    left: "50%",
                    top: "50%",
                    x: x - 36,
                    y: y - 36,
                    zIndex: hoveredIndex === i ? 30 : 20,
                  }}
                >
                  {/* Counter-rotate to keep icon upright */}
                  <motion.div style={{ rotate: counterRotation }}>
                    <OrbitNode
                      industry={industry}
                      isHovered={hoveredIndex === i}
                      onHover={() => setHoveredIndex(i)}
                      onLeave={() => setHoveredIndex(null)}
                    />
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
