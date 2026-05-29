"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Mail, Send, CheckCircle2, ChevronDown } from "lucide-react";
import Link from "next/link";
import type { FormEvent } from "react";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;
const ease = [0.25, 0.46, 0.45, 0.94] as const;

const EMERALD = "rgba(0,185,95,0.55)";
const EMERALD_GLOW = "rgba(0,185,95,0.13)";

function IconLinkedIn({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
function IconX({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function IconGitHub({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/horizonrelevance/", Icon: IconLinkedIn },
  { label: "X / Twitter", href: "#", Icon: IconX },
  { label: "GitHub", href: "#", Icon: IconGitHub },
] as const;

// ─── ContactForm ───────────────────────────────────────────────────────────────

const DEMO_PRODUCTS = [
  "AI-Powered Secure SDLC",
  "AI DevSecOps Platform",
  "AI Monitoring & Incident Response",
  "Cloud Cost Optimization",
  "Cloud Migration & Modernization",
] as const;

// ─── DemoDropdown ──────────────────────────────────────────────────────────────

function DemoDropdown({ value, onChange, "aria-labelledby": labelledBy }: { value: string; onChange: (v: string) => void; "aria-labelledby"?: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const selected = DEMO_PRODUCTS.find((p) => p === value) ?? null;

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={labelledBy}
        className="flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-[14px] outline-none transition-all duration-200"
        style={{
          borderColor: open ? "rgba(0,185,95,0.42)" : "rgba(255,255,255,0.08)",
          background: open ? "rgba(0,185,95,0.04)" : "rgba(255,255,255,0.03)",
          boxShadow: open ? "0 0 0 3px rgba(0,185,95,0.08)" : "none",
        }}
      >
        <span style={{ color: selected ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,0.22)" }}>
          {selected ?? "Select a product"}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <ChevronDown className="h-4 w-4 text-white/25" />
        </motion.span>
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute z-50 mt-1.5 w-full overflow-hidden rounded-xl border border-white/[0.07]"
            style={{
              background: "rgba(3,14,7,0.98)",
              backdropFilter: "blur(16px)",
              boxShadow: "0 16px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(0,185,95,0.1)",
            }}
            initial={{ opacity: 0, y: -8, scaleY: 0.94 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -4, scaleY: 0.94 }}
            transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {DEMO_PRODUCTS.map((p, i) => {
              const isSelected = value === p;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => { onChange(p); setOpen(false); }}
                  className="group flex w-full items-center gap-3 px-4 py-3 text-left text-[13px] transition-colors duration-150"
                  style={{
                    borderBottom: i < DEMO_PRODUCTS.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                    background: isSelected ? "rgba(0,185,95,0.07)" : "transparent",
                    color: isSelected ? "rgba(52,211,153,0.92)" : "rgba(255,255,255,0.5)",
                  }}
                  onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = isSelected ? "rgba(52,211,153,0.92)" : "rgba(255,255,255,0.78)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = isSelected ? "rgba(0,185,95,0.07)" : "transparent"; e.currentTarget.style.color = isSelected ? "rgba(52,211,153,0.92)" : "rgba(255,255,255,0.5)"; }}
                >
                  <span
                    className="h-1.5 w-1.5 flex-shrink-0 rounded-full transition-all duration-150"
                    style={{ background: isSelected ? "rgba(52,211,153,1)" : "rgba(255,255,255,0.1)", boxShadow: isSelected ? "0 0 6px rgba(52,211,153,0.8)" : "none" }}
                  />
                  {p}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [fields, setFields] = useState({ name: "", email: "", company: "", message: "", demo: "" });

  function set(k: keyof typeof fields) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setFields((f) => ({ ...f, [k]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    setSent(true);
  }

  const inputBase =
    "w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-[14px] text-white/82 placeholder:text-white/22 outline-none transition-all duration-200 focus:border-emerald-500/40 focus:bg-white/[0.05] focus:ring-0";

  return (
    <motion.div
      className="relative rounded-3xl p-px"
      initial={{ opacity: 0, x: 28 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.85, delay: 0.12, ease: easeOutExpo }}
    >
      <div
        className="absolute inset-0 rounded-3xl"
        style={{
          background: `linear-gradient(135deg, ${EMERALD} 0%, rgba(255,255,255,0.05) 45%, transparent 100%)`,
          opacity: 0.45,
        }}
      />
      <div
        className="relative overflow-hidden rounded-[calc(1.5rem-1px)] px-5 py-8 sm:px-8 sm:py-10"
        style={{
          background: `radial-gradient(ellipse 70% 50% at 8% 0%, ${EMERALD_GLOW} 0%, transparent 55%), rgba(2,18,8,0.97)`,
          backdropFilter: "blur(12px)",
        }}
      >
        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="success"
              className="flex flex-col items-center justify-center gap-5 py-12 text-center"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, ease: easeOutExpo }}
            >
              <div
                className="flex h-16 w-16 items-center justify-center rounded-full"
                style={{ background: "rgba(0,185,95,0.15)", border: "1px solid rgba(0,185,95,0.35)" }}
              >
                <CheckCircle2 className="h-7 w-7 text-emerald-400" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-lg font-semibold text-white/90">Message received.</p>
                <p className="mt-1.5 text-[13px] text-white/38">
                  We'll be in touch at {fields.email || "your inbox"} within 24 hours.
                </p>
              </div>
              <button
                onClick={() => { setSent(false); setFields({ name: "", email: "", company: "", message: "", demo: "" }); }}
                className="mt-2 text-[12px] font-medium text-emerald-400/60 underline underline-offset-4 hover:text-emerald-400"
              >
                Send another
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="flex flex-col gap-4"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="mb-1.5 block text-[11px] font-medium uppercase tracking-widest text-white/30">
                    Name *
                  </label>
                  <input
                    id="contact-name"
                    required
                    type="text"
                    placeholder="Your name"
                    value={fields.name}
                    onChange={set("name")}
                    className={inputBase}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-1.5 block text-[11px] font-medium uppercase tracking-widest text-white/30">
                    Email *
                  </label>
                  <input
                    id="contact-email"
                    required
                    type="email"
                    placeholder="you@company.com"
                    value={fields.email}
                    onChange={set("email")}
                    className={inputBase}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="contact-company" className="mb-1.5 block text-[11px] font-medium uppercase tracking-widest text-white/30">
                  Company
                </label>
                <input
                  id="contact-company"
                  type="text"
                  placeholder="Optional"
                  value={fields.company}
                  onChange={set("company")}
                  className={inputBase}
                />
              </div>
              <div>
                <label id="contact-demo-label" className="mb-1.5 block text-[11px] font-medium uppercase tracking-widest text-white/30">
                  Book a Demo
                  <span className="ml-1.5 normal-case text-white/18">(optional)</span>
                </label>
                <DemoDropdown
                  value={fields.demo}
                  onChange={(v) => setFields((f) => ({ ...f, demo: v }))}
                  aria-labelledby="contact-demo-label"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="mb-1.5 block text-[11px] font-medium uppercase tracking-widest text-white/30">
                  Message
                  <span className="ml-1.5 normal-case text-white/18">(optional)</span>
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  placeholder="Tell us what you're building — or what's breaking."
                  value={fields.message}
                  onChange={set("message")}
                  className={`${inputBase} resize-none`}
                />
              </div>
              <motion.button
                type="submit"
                disabled={sending}
                className="mt-1 flex items-center justify-center gap-2.5 rounded-2xl py-3.5 text-sm font-semibold text-white transition-opacity disabled:opacity-60"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0,175,85,0.92) 0%, rgba(0,145,115,0.88) 100%)",
                  boxShadow: "0 0 24px rgba(0,185,95,0.22), inset 0 1px 0 rgba(255,255,255,0.1)",
                }}
                whileHover={{ scale: 1.02, boxShadow: "0 0 36px rgba(0,185,95,0.35), inset 0 1px 0 rgba(255,255,255,0.12)" }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.18, ease }}
              >
                {sending ? (
                  <>
                    <motion.div
                      className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
                    />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" strokeWidth={1.8} />
                    Send Message
                  </>
                )}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden pb-0 pt-20 sm:pt-36"
      style={{
        background:
          "radial-gradient(ellipse 150% 85% at 12% 0%, #082818 0%, #031a09 50%, #01080400 100%)",
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
        animate={{ backgroundPosition: ["0% 0%", "-5% -9%", "7% 5%", "0% 0%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* Emerald bloom — left-top dominant */}
      <motion.div
        className="pointer-events-none absolute z-[0]"
        style={{
          left: "-8%", top: "-5%", width: "68vw", height: "90vh",
          background: "radial-gradient(ellipse 52% 55% at 42% 38%, rgba(0,195,90,0.26) 0%, rgba(0,155,75,0.1) 46%, transparent 68%)",
          filter: "blur(115px)",
        }}
        animate={{ x: [0, 28, 0], y: [0, -16, 0], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Teal — right */}
      <motion.div
        className="pointer-events-none absolute z-[0]"
        style={{
          right: "-10%", top: "12%", width: "56vw", height: "76vh",
          background: "radial-gradient(ellipse 56% 50% at 52% 44%, rgba(0,175,145,0.2) 0%, rgba(0,140,120,0.08) 50%, transparent 70%)",
          filter: "blur(100px)",
        }}
        animate={{ x: [0, -22, 0], opacity: [0.55, 0.9, 0.55] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />

      {/* Lime accent — center-bottom */}
      <motion.div
        className="pointer-events-none absolute z-[0]"
        style={{
          left: "28%", bottom: "15%", width: "36vw", height: "44vh",
          background: "radial-gradient(circle, rgba(120,220,50,0.13) 0%, transparent 62%)",
          filter: "blur(90px)",
        }}
        animate={{ scale: [1, 1.22, 1], opacity: [0.4, 0.72, 0.4] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 7 }}
      />

      {/* Top edge — from Company amber */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-36 bg-gradient-to-b from-[#0e0414] to-transparent" />

      <div className="relative z-[3] mx-auto max-w-6xl px-6">

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12 lg:gap-20">

          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.85, ease: easeOutExpo }}
          >
            <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-[11px] font-medium uppercase tracking-widest text-white/45 backdrop-blur-sm">
              <span
                className="h-1.5 w-1.5 rounded-full bg-emerald-400"
                style={{ boxShadow: "0 0 6px rgba(52,211,153,0.9)" }}
              />
              Get in Touch
            </div>

            <h2 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Let&apos;s Build{" "}
              <br className="hidden sm:block" />
              <motion.span
                className="inline-block bg-gradient-to-r from-emerald-400 via-teal-300 to-green-400 bg-clip-text text-transparent"
                style={{ backgroundSize: "200% 100%" }}
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              >
                Something Remarkable.
              </motion.span>
            </h2>

            <p className="mb-10 max-w-sm text-[14px] leading-relaxed text-white/38">
              Whether you're scaling fast, cutting cloud costs, or hardening your security posture
              — we'd love to hear about it.
            </p>

            <div
              className="mb-8 h-px w-12"
              style={{ background: "linear-gradient(90deg, rgba(0,185,95,0.7), transparent)" }}
            />

            <div className="mb-8 flex flex-col gap-4">
              <a
                href="mailto:info@horizonrelevance.com"
                className="group flex items-center gap-3 text-[14px] text-white/50 transition-colors duration-200 hover:text-white/88"
              >
                <div
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl transition-colors duration-200"
                  style={{ background: "rgba(0,185,95,0.1)", border: "1px solid rgba(0,185,95,0.2)" }}
                >
                  <Mail className="h-4 w-4 text-emerald-400" strokeWidth={1.5} />
                </div>
                info@horizonrelevance.com
              </a>

              <div>
                <div className="mb-3 flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-emerald-400/70" strokeWidth={1.5} />
                  <span className="text-[10px] font-medium uppercase tracking-widest text-white/30">Locations</span>
                </div>
                <div className="flex flex-col gap-3">
                  <div
                    className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3"
                  >
                    <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-widest text-emerald-400/70">USA</p>
                    <p className="text-[13px] text-white/55">16 Homes Park Avenue</p>
                    <p className="text-[11px] text-white/25">Iselin, NJ 08830</p>
                  </div>
                  <div
                    className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3"
                  >
                    <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-widest text-emerald-400/70">India</p>
                    <p className="text-[13px] text-white/55">New Delhi</p>
                    <p className="text-[11px] text-white/25">India</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {SOCIALS.map(({ label, href, Icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-white/38 transition-colors duration-200 hover:border-emerald-500/30 hover:bg-emerald-500/10 hover:text-emerald-300"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.18, ease }}
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <ContactForm />
        </div>

        {/* ── Footer ── */}
        <footer
          className="mt-16 border-t pt-8 pb-6"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 sm:gap-x-8">

            {/* Logo column */}
            <div className="col-span-2 sm:col-span-1">
              <Link href="/" className="mb-2 flex items-center gap-2">
                <svg width="22" height="22" viewBox="0 0 100 100" aria-hidden>
                  <rect width="100" height="100" rx="20" fill="rgba(7,3,20,0.8)" />
                  <path d="M28 54 A22 22 0 0 1 72 54 Z" fill="oklch(0.66 0.18 290)" />
                  <rect x="14" y="60" width="72" height="7" rx="3.5" fill="rgba(255,255,255,0.88)" />
                </svg>
                <span
                  className="text-[14px] leading-none tracking-tight text-white/75"
                  style={{ fontFamily: "var(--font-plus-jakarta)", fontWeight: 800 }}
                >
                  Horizon
                  <span style={{ color: "oklch(0.66 0.18 290)" }}>Relevance</span>
                </span>
              </Link>
              <p className="text-[10px] text-white/20">
                AI · Cloud · DevSecOps
              </p>
            </div>

            {/* Navigate */}
            <div>
              <p className="mb-3 text-[9px] font-semibold uppercase tracking-widest text-white/25">
                Navigate
              </p>
              <ul className="space-y-2">
                {[
                  { label: "Home",       href: "/#intro"      },
                  { label: "Platform",   href: "/#platform"   },
                  { label: "Products",   href: "/#products"   },
                  { label: "Services",   href: "/#services"   },
                  { label: "Why Us",     href: "/#why-us"     },
                  { label: "Industries", href: "/#industries" },
                  { label: "Company",    href: "/#company"    },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-[12px] text-white/35 transition-colors duration-150 hover:text-white/68"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <p className="mb-3 text-[9px] font-semibold uppercase tracking-widest text-white/25">
                Company
              </p>
              <ul className="space-y-2">
                {[
                  { label: "Team",    href: "/team"    },
                  { label: "Blog",    href: "/blog"    },
                  { label: "Careers", href: "/careers" },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-[12px] text-white/35 transition-colors duration-150 hover:text-white/68"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div>
              <p className="mb-3 text-[9px] font-semibold uppercase tracking-widest text-white/25">
                Connect
              </p>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/#contact"
                    className="text-[12px] text-white/35 transition-colors duration-150 hover:text-white/68"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/company/horizonrelevance/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[12px] text-white/35 transition-colors duration-150 hover:text-white/68"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@horizonrelevance.com"
                    className="text-[12px] text-white/35 transition-colors duration-150 hover:text-white/68"
                  >
                    info@horizonrelevance.com
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom rule + copyright */}
          <div
            className="mt-7 border-t pt-5"
            style={{ borderColor: "rgba(255,255,255,0.04)" }}
          >
            <p className="text-[11px] text-white/16">
              © Horizon Relevance LLC · Built for engineering teams.
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
}
