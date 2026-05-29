"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export type Capability = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type Outcome = {
  metric: string;
  industry: string;
  result: string;
};

export type ProductPageData = {
  name: string;
  tagline: string;
  hook: string;
  pill: string;
  primaryColor: string;
  secondaryColor: string;
  problem: string;
  capabilities: Capability[];
  outcomes: Outcome[];
  cta: string;
  visual: React.ReactNode;
};

function alpha(color: string, a: number) {
  return color.replace(/[\d.]+\)$/, `${a})`);
}

export default function ProductPageTemplate({ data }: { data: ProductPageData }) {
  const { name, tagline, hook, pill, primaryColor, secondaryColor, problem, capabilities, outcomes, cta, visual } = data;

  return (
    <div
      className="min-h-screen overflow-hidden"
      style={{
        background: `radial-gradient(ellipse 160% 60% at 15% 0%, ${alpha(primaryColor, 0.14)} 0%, #060b1e 45%, #04060f 100%)`,
      }}
    >
      {/* Back nav */}
      <div className="relative z-10 px-6 pt-28 sm:px-10">
        <Link
          href="/#products"
          className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-xs font-medium text-white/40 transition-colors duration-200 hover:text-white/70"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Products
        </Link>
      </div>

      {/* ── Hero ── */}
      <section className="relative px-6 pb-0 pt-10 sm:px-10 sm:pt-14">
        <motion.div
          className="pointer-events-none absolute"
          style={{
            left: "-8%", top: "-10%",
            width: "72vw", height: "65vh",
            background: `radial-gradient(ellipse 52% 58% at 40% 40%, ${alpha(primaryColor, 0.3)} 0%, transparent 65%)`,
            filter: "blur(105px)",
          }}
          animate={{ x: [0, 28, 0], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="pointer-events-none absolute"
          style={{
            right: "-4%", top: "5%",
            width: "58vw", height: "55vh",
            background: `radial-gradient(ellipse 52% 52% at 52% 45%, ${alpha(secondaryColor, 0.22)} 0%, transparent 65%)`,
            filter: "blur(90px)",
          }}
          animate={{ x: [0, -20, 0], opacity: [0.55, 0.88, 0.55] }}
          transition={{ duration: 17, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />

        <div className="relative mx-auto max-w-6xl">
          <motion.div
            className="mb-6 flex"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
          >
            <div
              className="inline-flex items-center gap-2.5 rounded-full border px-4 py-2 text-[11px] font-medium uppercase tracking-widest backdrop-blur-sm"
              style={{
                borderColor: alpha(primaryColor, 0.32),
                background: alpha(primaryColor, 0.07),
                color: alpha(primaryColor, 0.88),
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: primaryColor, boxShadow: `0 0 7px ${primaryColor}` }}
              />
              {pill}
            </div>
          </motion.div>

          <motion.h1
            className="mb-5 font-bold leading-[1.08] tracking-tight"
            style={{
              fontSize: "clamp(2.6rem,5.2vw,4.4rem)",
              backgroundImage: `linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.72) 55%, ${alpha(primaryColor, 0.9)} 100%)`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: easeOutExpo }}
          >
            {name}
          </motion.h1>

          <motion.p
            className="mb-4 max-w-2xl font-medium text-white/50"
            style={{ fontSize: "clamp(1rem,1.6vw,1.22rem)" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15, ease: easeOutExpo }}
          >
            {tagline}
          </motion.p>

          <motion.p
            className="max-w-xl text-sm leading-relaxed text-white/28"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22, ease: easeOutExpo }}
          >
            {hook}
          </motion.p>
        </div>
      </section>

      {/* ── Visual Panel ── */}
      <section className="relative px-6 pt-14 sm:px-10 sm:pt-16">
        <motion.div
          className="mx-auto max-w-6xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: easeOutExpo }}
        >
          <div
            className="relative overflow-hidden rounded-3xl p-px"
            style={{
              background: `linear-gradient(135deg, ${alpha(primaryColor, 0.52)} 0%, ${alpha(secondaryColor, 0.32)} 50%, rgba(255,255,255,0.05) 100%)`,
            }}
          >
            <div
              className="relative overflow-hidden rounded-[calc(1.5rem-1px)]"
              style={{
                background: `radial-gradient(ellipse 60% 55% at 10% 0%, ${alpha(primaryColor, 0.1)} 0%, transparent 55%), rgba(6,9,22,1)`,
                minHeight: "clamp(260px,45vw,420px)",
              }}
            >
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background: `radial-gradient(ellipse 75% 65% at 85% 90%, ${alpha(secondaryColor, 0.08)} 0%, transparent 60%)`,
                }}
              />
              {visual}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Problem ── */}
      <section className="relative px-6 pt-24 sm:px-10 sm:pt-28">
        <motion.div
          className="mx-auto max-w-6xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: easeOutExpo }}
        >
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.7fr] lg:items-center">
            <div>
              <div
                className="mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-medium uppercase tracking-widest"
                style={{ borderColor: alpha(primaryColor, 0.26), color: alpha(primaryColor, 0.72) }}
              >
                The Problem
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-white/90 sm:text-4xl">
                Why teams choose us
              </h2>
            </div>
            <div
              className="relative overflow-hidden rounded-2xl p-px"
              style={{
                background: `linear-gradient(135deg, ${alpha(primaryColor, 0.38)} 0%, rgba(255,255,255,0.04) 100%)`,
              }}
            >
              <div
                className="rounded-[calc(1rem-1px)] px-5 py-6 sm:px-8 sm:py-8"
                style={{
                  background: `radial-gradient(ellipse 70% 60% at 5% 0%, ${alpha(primaryColor, 0.09)} 0%, transparent 60%), rgba(8,11,28,1)`,
                }}
              >
                <p className="text-base leading-relaxed text-white/52">{problem}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Capabilities ── */}
      <section className="relative px-6 pt-24 sm:px-10 sm:pt-28">
        <div className="mx-auto max-w-6xl">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: easeOutExpo }}
          >
            <div
              className="mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-medium uppercase tracking-widest"
              style={{ borderColor: alpha(primaryColor, 0.22), color: alpha(primaryColor, 0.65) }}
            >
              Capabilities
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              What&apos;s inside
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {capabilities.map((cap, i) => {
              const accent = i % 2 === 0 ? primaryColor : secondaryColor;
              const num = String(i + 1).padStart(2, "0");
              return (
                <motion.div
                  key={cap.title}
                  className="relative overflow-hidden rounded-2xl border border-white/[0.06]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.55, delay: i * 0.07, ease: easeOutExpo }}
                  style={{
                    background: `radial-gradient(ellipse 65% 55% at 5% 0%, ${alpha(accent, 0.08)} 0%, transparent 60%), rgba(7,10,24,1)`,
                  }}
                >
                  {/* Watermark number */}
                  <span
                    className="pointer-events-none absolute right-5 top-3 select-none font-mono font-black leading-none text-white/[0.045]"
                    style={{ fontSize: "clamp(52px,6vw,76px)" }}
                  >
                    {num}
                  </span>

                  <div className="relative p-7">
                    {/* Small number label + icon row */}
                    <div className="mb-5 flex items-center gap-3">
                      <span
                        className="font-mono text-[10px] font-bold tabular-nums"
                        style={{ color: alpha(accent, 0.65) }}
                      >
                        {num}
                      </span>
                      <div
                        className="h-px flex-1"
                        style={{ background: `linear-gradient(to right, ${alpha(accent, 0.3)}, transparent)` }}
                      />
                      <div
                        className="flex items-center justify-center rounded-lg p-2"
                        style={{ background: alpha(accent, 0.11) }}
                      >
                        <cap.icon className="h-4 w-4" style={{ color: accent }} strokeWidth={1.5} />
                      </div>
                    </div>

                    <h3 className="mb-2.5 text-[0.95rem] font-semibold leading-snug text-white/85">{cap.title}</h3>
                    <p className="text-[13px] leading-relaxed text-white/38">{cap.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Outcomes ── */}
      <section className="relative px-6 pt-24 sm:px-10 sm:pt-28">
        <div className="mx-auto max-w-6xl">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: easeOutExpo }}
          >
            <div
              className="mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-medium uppercase tracking-widest"
              style={{ borderColor: alpha(secondaryColor, 0.22), color: alpha(secondaryColor, 0.65) }}
            >
              Proven Outcomes
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Real results
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {outcomes.map((outcome, i) => {
              const accent = i % 2 === 0 ? primaryColor : secondaryColor;
              return (
                <motion.div
                  key={outcome.industry}
                  className="relative overflow-hidden rounded-2xl p-px"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.1, ease: easeOutExpo }}
                  style={{
                    background: `linear-gradient(135deg, ${alpha(accent, 0.4)} 0%, rgba(255,255,255,0.03) 100%)`,
                  }}
                >
                  <div
                    className="relative overflow-hidden rounded-[calc(1rem-1px)] px-8 py-8"
                    style={{
                      background: `radial-gradient(ellipse 70% 60% at 5% 0%, ${alpha(accent, 0.1)} 0%, transparent 60%), rgba(6,9,22,1)`,
                    }}
                  >
                    <span
                      className="mb-3 inline-block rounded-md px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest"
                      style={{ background: alpha(accent, 0.14), color: accent }}
                    >
                      {outcome.industry}
                    </span>
                    <p
                      className="mb-2 font-mono font-bold leading-none"
                      style={{
                        fontSize: "clamp(1.3rem,2vw,1.75rem)",
                        backgroundImage: `linear-gradient(135deg, rgba(255,255,255,0.92) 0%, ${accent} 100%)`,
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        color: "transparent",
                      }}
                    >
                      {outcome.metric}
                    </p>
                    <p className="text-sm text-white/48">{outcome.result}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 pb-20 pt-16 sm:px-10 sm:pt-20">
        <motion.div
          className="mx-auto max-w-xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: easeOutExpo }}
        >
          <h2 className="mb-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Ready to{" "}
            <span
              style={{
                backgroundImage: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
              }}
            >
              get started?
            </span>
          </h2>
          <p className="mb-7 text-sm text-white/32">
            Talk to an expert and see how {name} fits your stack.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <motion.a
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white"
              style={{
                background: `linear-gradient(135deg, ${alpha(primaryColor, 0.9)} 0%, ${alpha(secondaryColor, 0.72)} 100%)`,
                boxShadow: `0 4px 20px ${alpha(primaryColor, 0.28)}`,
              }}
              whileHover={{ scale: 1.03, boxShadow: `0 6px 32px ${alpha(primaryColor, 0.44)}` }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.22 }}
            >
              Book a Demo
              <ArrowRight className="h-3.5 w-3.5" />
            </motion.a>
            <Link
              href="/#products"
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.03] px-6 py-3 text-sm font-medium text-white/45 transition-colors duration-200 hover:text-white/75"
            >
              View all products
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
