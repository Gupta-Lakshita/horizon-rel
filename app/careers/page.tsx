"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;
const ease        = [0.25, 0.46, 0.45, 0.94] as const;

const PRIMARY   = "rgba(251,146,60,0.9)";
const SECONDARY = "rgba(245,158,11,0.85)";

function alpha(color: string, a: number) {
  return color.replace(/[\d.]+\)$/, `${a})`);
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const ROLES = [
  {
    title: "Full Stack Developer",
    location: "Delhi · Remote",
    responsibilities: [
      "Build and maintain web applications end-to-end",
      "Write clean, testable, production-ready code",
      "Integrate APIs and optimize performance",
    ],
  },
  {
    title: "Cloud & DevOps Engineer",
    location: "Delhi · Remote",
    responsibilities: [
      "Design and manage scalable cloud infrastructure across providers",
      "Automate CI/CD pipelines and infrastructure provisioning",
      "Monitor, troubleshoot, and improve multi-cloud reliability",
    ],
  },
  {
    title: "DB Administrator",
    location: "Delhi · Remote",
    responsibilities: [
      "Manage database performance, backups, and recovery",
      "Design and optimize schemas and queries",
      "Ensure security, availability, and integrity",
    ],
  },
] as const;

const POSITION_OPTIONS = [
  "Full Stack Developer",
  "Cloud & DevOps Engineer",
  "DB Administrator",
  "General Application",
] as const;

const CULTURE_TAGS = ["Remote-first", "Delhi HQ", "High-growth", "Engineering-led"] as const;

// ─── JobCard ──────────────────────────────────────────────────────────────────

function JobCard({
  role,
  index,
  onApply,
}: {
  role: (typeof ROLES)[number];
  index: number;
  onApply: (title: string) => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative flex flex-col overflow-hidden rounded-2xl p-px"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: easeOutExpo }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{ y: hovered ? -4 : 0 }}
    >
      {/* 1px gradient border */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-400"
        style={{
          background: `linear-gradient(135deg, ${alpha(PRIMARY, hovered ? 0.45 : 0.18)} 0%, rgba(255,255,255,0.04) 100%)`,
        }}
      />

      <div
        className="relative flex flex-1 flex-col rounded-[calc(1rem-1px)] p-7"
        style={{
          background: `radial-gradient(ellipse 70% 55% at 8% 0%, ${alpha(PRIMARY, hovered ? 0.1 : 0.06)} 0%, transparent 55%), rgba(7,10,24,1)`,
        }}
      >
        {/* Role title */}
        <h3 className="mb-1.5 text-lg font-bold tracking-tight text-white/92">
          {role.title}
        </h3>

        {/* Location */}
        <div
          className="mb-5 flex items-center gap-1.5 text-[11px] font-medium"
          style={{ color: alpha(PRIMARY, 0.8) }}
        >
          <MapPin className="h-3 w-3" strokeWidth={2} />
          {role.location}
        </div>

        {/* Responsibilities */}
        <ul className="mb-7 flex flex-1 flex-col gap-2.5">
          {role.responsibilities.map((resp) => (
            <li key={resp} className="flex items-start gap-2.5">
              <span
                className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: alpha(PRIMARY, 0.7) }}
              />
              <span className="text-[13px] leading-relaxed text-white/52">{resp}</span>
            </li>
          ))}
        </ul>

        {/* Apply Now */}
        <motion.button
          onClick={() => onApply(role.title)}
          className="relative w-full overflow-hidden rounded-full py-2.5 text-sm font-semibold text-white"
          style={{
            background: `linear-gradient(135deg, ${alpha(PRIMARY, 0.9)} 0%, ${alpha(SECONDARY, 0.85)} 100%)`,
            boxShadow: `0 4px 18px ${alpha(PRIMARY, 0.28)}`,
          }}
          whileHover={{ scale: 1.02, boxShadow: `0 6px 28px ${alpha(PRIMARY, 0.44)}` }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.2, ease }}
        >
          <motion.span
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.16] to-transparent"
            initial={{ x: "-120%" }}
            whileHover={{ x: "140%" }}
            transition={{ duration: 0.5, ease }}
          />
          <span className="relative z-10">Apply Now</span>
        </motion.button>

        <p className="mt-3 text-center text-[10px] text-white/22">
          Or send your resume to{" "}
          <a
            href="mailto:careers@horizonrelevence.com"
            className="text-white/32 underline-offset-2 hover:underline"
          >
            careers@horizonrelevence.com
          </a>
        </p>
      </div>
    </motion.div>
  );
}

// ─── FormField ────────────────────────────────────────────────────────────────

function FormField({
  label,
  required,
  htmlFor,
  children,
}: {
  label: string;
  required?: boolean;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-[11px] font-semibold uppercase tracking-widest text-white/38">
        {label}
        {required && <span style={{ color: alpha(PRIMARY, 0.8) }}> *</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-3 text-sm text-white/85 placeholder-white/22 backdrop-blur-sm transition-colors duration-200 focus:border-orange-400/30 focus:outline-none focus:bg-white/[0.06]";

// ─── CareersPage ──────────────────────────────────────────────────────────────

export default function CareersPage() {
  const formRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({ name: "", email: "", position: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const scrollToApply = (roleName: string) => {
    setForm((prev) => ({ ...prev, position: roleName }));
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  const set = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.position) return;
    setSubmitted(true);
  };

  return (
    <div
      className="min-h-screen overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 160% 60% at 15% 0%, rgba(251,146,60,0.11) 0%, #060b1e 45%, #04060f 100%)",
      }}
    >
      {/* Bloom — primary amber top-left */}
      <motion.div
        className="pointer-events-none fixed"
        style={{
          left: "-8%", top: "-12%",
          width: "68vw", height: "64vh",
          background: `radial-gradient(ellipse 52% 58% at 40% 40%, ${alpha(PRIMARY, 0.22)} 0%, transparent 65%)`,
          filter: "blur(110px)",
          zIndex: 0,
        }}
        animate={{ x: [0, 24, 0], opacity: [0.65, 0.9, 0.65] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Bloom — amber-yellow right */}
      <motion.div
        className="pointer-events-none fixed"
        style={{
          right: "-6%", top: "15%",
          width: "52vw", height: "55vh",
          background: `radial-gradient(ellipse 52% 52% at 54% 45%, ${alpha(SECONDARY, 0.14)} 0%, transparent 65%)`,
          filter: "blur(95px)",
          zIndex: 0,
        }}
        animate={{ x: [0, -20, 0], opacity: [0.5, 0.78, 0.5] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />

      {/* ── Back nav ── */}
      <div className="relative z-10 px-6 pt-28 sm:px-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-xs font-medium text-white/40 transition-colors duration-200 hover:text-white/70"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Home
        </Link>
      </div>

      {/* ── Hero ── */}
      <section className="relative z-10 px-6 pb-0 pt-10 sm:px-10 sm:pt-14">
        <div className="mx-auto max-w-6xl">

          {/* Pill */}
          <motion.div
            className="mb-6 flex"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
          >
            <div
              className="inline-flex items-center gap-2.5 rounded-full border px-4 py-2 text-[11px] font-medium uppercase tracking-widest backdrop-blur-sm"
              style={{
                borderColor: alpha(PRIMARY, 0.32),
                background: alpha(PRIMARY, 0.07),
                color: alpha(PRIMARY, 0.88),
              }}
            >
              <motion.span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: PRIMARY, boxShadow: `0 0 7px ${PRIMARY}` }}
                animate={{ opacity: [1, 0.35, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              />
              We&apos;re Hiring
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="mb-5 font-bold leading-[1.08] tracking-tight"
            style={{
              fontSize: "clamp(2.4rem,5vw,4.2rem)",
              backgroundImage: `linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.72) 55%, ${alpha(PRIMARY, 0.9)} 100%)`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: easeOutExpo }}
          >
            Build the Future of<br />Cloud Engineering
          </motion.h1>

          <motion.p
            className="mb-8 max-w-xl text-base leading-relaxed text-white/42"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.18, ease: easeOutExpo }}
          >
            Join a team reimagining how engineering teams operate — shipping faster,
            staying secure, and staying in control.
          </motion.p>

          {/* Culture tags */}
          <motion.div
            className="flex flex-wrap gap-2.5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28, ease: easeOutExpo }}
          >
            {CULTURE_TAGS.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/[0.09] bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-white/45"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Open Roles ── */}
      <section className="relative z-10 px-6 pt-20 sm:px-10 sm:pt-28">
        <div className="mx-auto max-w-6xl">

          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: easeOutExpo }}
          >
            <div
              className="mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-medium uppercase tracking-widest"
              style={{ borderColor: alpha(PRIMARY, 0.26), color: alpha(PRIMARY, 0.72) }}
            >
              Open Positions
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white/90 sm:text-4xl">
              Where you fit in
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ROLES.map((role, i) => (
              <JobCard key={role.title} role={role} index={i} onApply={scrollToApply} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Application Form ── */}
      <section
        className="relative z-10 px-6 pb-24 pt-24 sm:px-10 sm:pt-28"
        ref={formRef}
        id="apply"
      >
        <div className="mx-auto max-w-2xl">

          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: easeOutExpo }}
          >
            <div
              className="mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-medium uppercase tracking-widest"
              style={{ borderColor: alpha(PRIMARY, 0.26), color: alpha(PRIMARY, 0.72) }}
            >
              Apply
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white/90 sm:text-4xl">
              Ready to join us?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/35">
              Fill in your details and we&apos;ll get back to you. Typical response within 3–5 business days.
            </p>
          </motion.div>

          {/* Glass card */}
          <motion.div
            className="relative overflow-hidden rounded-2xl p-px"
            style={{
              background: `linear-gradient(135deg, ${alpha(PRIMARY, 0.38)} 0%, rgba(255,255,255,0.04) 100%)`,
            }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: easeOutExpo }}
          >
            <div
              className="relative rounded-[calc(1rem-1px)] px-5 py-8 sm:px-8 sm:py-10"
              style={{
                background: `radial-gradient(ellipse 70% 55% at 5% 0%, ${alpha(PRIMARY, 0.08)} 0%, transparent 55%), rgba(7,10,24,1)`,
              }}
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    className="flex flex-col items-center gap-4 py-12 text-center"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: easeOutExpo }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.1, ease: easeOutExpo }}
                    >
                      <CheckCircle2
                        className="h-12 w-12"
                        style={{ color: PRIMARY }}
                        strokeWidth={1.5}
                      />
                    </motion.div>
                    <h3 className="text-xl font-bold text-white/90">Application received</h3>
                    <p className="max-w-xs text-sm text-white/38">
                      Thanks for reaching out. We&apos;ll review your application and be in touch within 3–5 business days.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Name */}
                    <FormField label="Full Name" required htmlFor="careers-name">
                      <input
                        id="careers-name"
                        type="text"
                        required
                        placeholder="Your full name"
                        value={form.name}
                        onChange={set("name")}
                        className={inputClass}
                      />
                    </FormField>

                    {/* Email */}
                    <FormField label="Email Address" required htmlFor="careers-email">
                      <input
                        id="careers-email"
                        type="email"
                        required
                        placeholder="you@company.com"
                        value={form.email}
                        onChange={set("email")}
                        className={inputClass}
                      />
                    </FormField>

                    {/* Position */}
                    <FormField label="Position Interested In" required>
                      <div className="flex flex-wrap gap-2 pt-0.5" role="group" aria-label="Select position">
                        {POSITION_OPTIONS.map((opt) => {
                          const isSelected = form.position === opt;
                          return (
                            <button
                              key={opt}
                              type="button"
                              aria-pressed={isSelected}
                              onClick={() => setForm((prev) => ({ ...prev, position: opt }))}
                              className="rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200"
                              style={{
                                borderColor: isSelected ? alpha(PRIMARY, 0.55) : "rgba(255,255,255,0.08)",
                                background: isSelected ? alpha(PRIMARY, 0.12) : "rgba(255,255,255,0.03)",
                                color: isSelected ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.38)",
                                boxShadow: isSelected ? `0 0 16px ${alpha(PRIMARY, 0.22)}` : "none",
                              }}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </FormField>

                    {/* Message */}
                    <FormField label="Cover Note" htmlFor="careers-message">
                      <textarea
                        id="careers-message"
                        rows={4}
                        placeholder="Tell us a bit about yourself and why you'd like to join... (optional)"
                        value={form.message}
                        onChange={set("message")}
                        className={`${inputClass} resize-none`}
                      />
                    </FormField>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      className="relative mt-1 flex w-full items-center justify-center gap-2 overflow-hidden rounded-full py-3.5 text-sm font-semibold text-white"
                      style={{
                        background: `linear-gradient(135deg, ${alpha(PRIMARY, 0.92)} 0%, ${alpha(SECONDARY, 0.88)} 100%)`,
                        boxShadow: `0 4px 20px ${alpha(PRIMARY, 0.3)}`,
                      }}
                      whileHover={{ scale: 1.02, boxShadow: `0 6px 32px ${alpha(PRIMARY, 0.46)}` }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ duration: 0.22, ease }}
                    >
                      <motion.span
                        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.16] to-transparent"
                        initial={{ x: "-120%" }}
                        whileHover={{ x: "140%" }}
                        transition={{ duration: 0.52, ease }}
                      />
                      <span className="relative z-10">Submit Application</span>
                      <ArrowRight className="relative z-10 h-4 w-4" />
                    </motion.button>

                    <p className="text-center text-[11px] text-white/22">
                      Prefer email? Reach us at{" "}
                      <a
                        href="mailto:careers@horizonrelevence.com"
                        className="text-white/35 underline-offset-2 hover:underline"
                      >
                        careers@horizonrelevence.com
                      </a>
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
