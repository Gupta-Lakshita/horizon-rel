"use client";

import { motion } from "framer-motion";
import { CloudUpload, GitMerge, BarChart3, Bot, Zap, FileCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;
const ease = [0.25, 0.46, 0.45, 0.94] as const;

// ─── Data ─────────────────────────────────────────────────────────────────────

type Service = {
  number: string;
  icon: LucideIcon;
  label: string;
  description: string;
  accent: string;
  glow: string;
  iconClass: string;
  iconBg: string;
};

const SERVICES: Service[] = [
  {
    number: "01",
    icon: CloudUpload,
    label: "Cloud Strategy & Migration",
    description:
      "Cloud readiness assessments, migration roadmaps, and multi-cloud architecture design — built around your team's velocity.",
    accent: "rgba(244,63,94,0.55)",
    glow: "rgba(244,63,94,0.13)",
    iconClass: "text-rose-400",
    iconBg: "from-rose-500/[0.2] to-pink-700/[0.08]",
  },
  {
    number: "02",
    icon: GitMerge,
    label: "DevSecOps as a Service",
    description:
      "Automated CI/CD pipelines with integrated security tools, policy gates, and compliance checks at every merge.",
    accent: "rgba(232,72,212,0.55)",
    glow: "rgba(232,72,212,0.13)",
    iconClass: "text-fuchsia-400",
    iconBg: "from-fuchsia-500/[0.2] to-purple-700/[0.08]",
  },
  {
    number: "03",
    icon: BarChart3,
    label: "AI & Data Science Consulting",
    description:
      "Data pipeline design, feature engineering, and predictive analytics using LLMs and cloud-native ML infrastructure.",
    accent: "rgba(167,139,250,0.55)",
    glow: "rgba(167,139,250,0.13)",
    iconClass: "text-violet-400",
    iconBg: "from-violet-500/[0.2] to-indigo-600/[0.08]",
  },
  {
    number: "04",
    icon: Bot,
    label: "Generative AI Enablement",
    description:
      "RAG pipelines, LLM-based automation, and AI-powered workflows that plug directly into your existing product stack.",
    accent: "rgba(236,72,153,0.55)",
    glow: "rgba(236,72,153,0.13)",
    iconClass: "text-pink-400",
    iconBg: "from-pink-500/[0.2] to-fuchsia-700/[0.08]",
  },
  {
    number: "05",
    icon: Zap,
    label: "Serverless Application Framework",
    description:
      "Build and deploy event-driven applications with AWS Lambda and Step Functions — zero infrastructure overhead.",
    accent: "rgba(192,38,211,0.55)",
    glow: "rgba(192,38,211,0.13)",
    iconClass: "text-purple-400",
    iconBg: "from-purple-500/[0.2] to-violet-700/[0.08]",
  },
  {
    number: "06",
    icon: FileCheck,
    label: "Cloud Governance & Cost Compliance",
    description:
      "Budgets, guardrails, tagging policies, and cost control dashboards across every cloud environment you run.",
    accent: "rgba(217,70,239,0.55)",
    glow: "rgba(217,70,239,0.13)",
    iconClass: "text-fuchsia-300",
    iconBg: "from-fuchsia-400/[0.2] to-rose-600/[0.08]",
  },
];

// ─── ServiceCard ──────────────────────────────────────────────────────────────

function ServiceCard({ service, delay }: { service: Service; delay: number }) {
  const { number, icon: Icon, label, description, accent, glow, iconClass, iconBg } = service;

  // Vibrant version of accent for the comet arc
  const vibrant = accent.replace(/[\d.]+\)$/, "0.88)");
  const traceGradient = `conic-gradient(from 0deg, transparent 0deg, ${vibrant} 40deg, rgba(255,255,255,0.5) 60deg, ${vibrant} 80deg, transparent 130deg)`;

  return (
    <motion.div
      className="group relative overflow-hidden rounded-3xl p-px"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.78, delay, ease: easeOutExpo }}
      whileHover={{ y: -5, transition: { duration: 0.24, ease } }}
    >
      {/* Static gradient border — dims out on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-30 transition-opacity duration-500 group-hover:opacity-0"
        style={{
          background: `linear-gradient(135deg, ${accent} 0%, rgba(255,255,255,0.05) 50%, transparent 100%)`,
        }}
      />

      {/* Rotating comet trace — fades in on hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <motion.div
          className="absolute inset-0"
          style={{ background: traceGradient }}
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Card body */}
      <div
        className="relative h-full overflow-hidden rounded-[calc(1.5rem-1px)] p-7"
        style={{
          background: `radial-gradient(ellipse 80% 55% at 12% 0%, ${glow} 0%, transparent 52%), rgba(20,8,1,0.97)`,
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Inner hover glow */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[calc(1.5rem-1px)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(ellipse 60% 50% at 18% 8%, ${glow.replace(/[\d.]+\)$/, "0.2)")} 0%, transparent 65%)`,
          }}
        />

        {/* Service number — brightens on hover */}
        <span
          className="pointer-events-none absolute right-6 top-5 select-none font-mono font-black leading-none tracking-tighter text-white/[0.035] transition-colors duration-500 group-hover:text-white/[0.09]"
          style={{ fontSize: "clamp(44px,7vw,72px)" }}
        >
          {number}
        </span>

        {/* Icon — scales on hover */}
        <div
          className={`mb-6 inline-flex items-center justify-center rounded-xl bg-gradient-to-br p-3 transition-transform duration-200 group-hover:scale-110 ${iconBg}`}
        >
          <Icon className={`h-5 w-5 ${iconClass}`} strokeWidth={1.5} />
        </div>

        <h3 className="mb-3 text-[1.05rem] font-bold leading-snug tracking-tight text-white/90">
          {label}
        </h3>
        <p className="text-[13px] leading-relaxed text-white/40">{description}</p>

        {/* Bottom glow line */}
        <div
          className="absolute bottom-0 left-7 right-7 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
        />
      </div>
    </motion.div>
  );
}

// ─── Solutions ────────────────────────────────────────────────────────────────

export default function Solutions() {
  return (
    <section
      id="services"
      className="relative overflow-hidden py-28 sm:py-36"
      style={{
        background:
          "radial-gradient(ellipse 150% 80% at 78% 0%, #2d0535 0%, #1a0228 48%, #0d0118 100%)",
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

      {/* Rose bloom — right-top dominant */}
      <motion.div
        className="pointer-events-none absolute z-[0]"
        style={{
          right: "-6%", top: "-8%", width: "70vw", height: "90vh",
          background: "radial-gradient(ellipse 54% 55% at 56% 40%, rgba(244,63,94,0.26) 0%, rgba(190,40,80,0.1) 46%, transparent 68%)",
          filter: "blur(115px)",
        }}
        animate={{ x: [0, -26, 0], y: [0, 18, 0], opacity: [0.72, 1, 0.72] }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Violet — left-center */}
      <motion.div
        className="pointer-events-none absolute z-[0]"
        style={{
          left: "-5%", top: "20%", width: "54vw", height: "70vh",
          background: "radial-gradient(ellipse 52% 48% at 44% 44%, rgba(167,139,250,0.2) 0%, rgba(120,90,220,0.08) 52%, transparent 70%)",
          filter: "blur(100px)",
        }}
        animate={{ x: [0, 20, 0], opacity: [0.55, 0.88, 0.55] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />

      {/* Fuchsia accent — bottom */}
      <motion.div
        className="pointer-events-none absolute z-[0]"
        style={{
          left: "28%", bottom: "8%", width: "38vw", height: "42vh",
          background: "radial-gradient(circle, rgba(192,38,211,0.16) 0%, transparent 62%)",
          filter: "blur(88px)",
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.42, 0.74, 0.42] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 8 }}
      />

      {/* Top edge — from Products dark navy */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-36 bg-gradient-to-b from-[#05081a] to-transparent" />
      {/* Bottom edge — into Industries sapphire */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-36 bg-gradient-to-t from-[#060816] to-transparent" />

      <div className="relative z-[3] mx-auto max-w-6xl px-6">

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
                className="h-1.5 w-1.5 rounded-full bg-rose-400"
                style={{ boxShadow: "0 0 6px rgba(244,63,94,0.9)" }}
              />
              What We Do
            </div>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Our{" "}
            <motion.span
              className="inline-block bg-gradient-to-r from-rose-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent"
              style={{ backgroundSize: "200% 100%" }}
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              Services
            </motion.span>
          </h2>
          <motion.p
            className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/34"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.12, ease: easeOutExpo }}
          >
            Six core service lines — each purpose-built for teams that can't afford to slow down
            while they modernize.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <ServiceCard
              key={service.number}
              service={service}
              delay={(i % 3) * 0.09 + Math.floor(i / 3) * 0.05}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
