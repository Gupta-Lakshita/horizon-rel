"use client";

import { motion } from "framer-motion";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

function alpha(color: string, a: number) {
  return color.replace(/[\d.]+\)$/, `${a})`);
}

const ROWS = [
  {
    tag: "Deployment Bottlenecks",
    before: "Manual pipelines ",
    keyword: "slow every release",
    after: " cycle.",
    response: "Self-service CI/CD. Pipelines that build, scan, and release themselves.",
    color: "rgba(99,102,241,0.9)",
    num: "01",
  },
  {
    tag: "Security Blind Spots",
    before: "Vulnerabilities surface ",
    keyword: "too late",
    after: " — and cost too much.",
    response: "Security embedded at every commit. Not bolted on at the end.",
    color: "rgba(232,72,212,0.9)",
    num: "02",
  },
  {
    tag: "Alert Noise",
    before: "Too many alerts, ",
    keyword: "not enough signal",
    after: " to act on.",
    response: "AI correlation finds the root cause. Before users notice.",
    color: "rgba(16,185,129,0.9)",
    num: "03",
  },
  {
    tag: "Rising Cloud Costs",
    before: "Cloud spend scales ",
    keyword: "faster than value",
    after: " does.",
    response: "Waste identified. Workloads rightsized. Automatically, continuously.",
    color: "rgba(168,85,247,0.9)",
    num: "04",
  },
  {
    tag: "Cloud Complexity",
    before: "Modern cloud ops need a team most companies ",
    keyword: "can't hire",
    after: ".",
    response: "Enterprise governance, automation, dashboards. Without the headcount.",
    color: "rgba(251,113,133,0.9)",
    num: "05",
  },
] as const;

const HOW_WE_WORK = [
  { num: "01", title: "Connect to existing tools",    detail: "Git, Jenkins, AWS, Kubernetes — no rip and replace." },
  { num: "02", title: "Automate repetitive workflows", detail: "Pipelines, provisioning, scanning, cost checks." },
  { num: "03", title: "Layer in AI intelligence",      detail: "Risk explanations, fix recommendations, anomaly detection." },
  { num: "04", title: "Apply governance and control",  detail: "Approval gates, RBAC, audit trails, compliance evidence." },
  { num: "05", title: "Ship faster with less burden",  detail: "Enterprise-grade DevOps without a large platform team." },
] as const;

export default function WhyUs() {
  return (
    <section
      id="why-us"
      className="relative overflow-hidden py-24 sm:py-32"
      style={{
        background:
          "radial-gradient(ellipse 140% 80% at 62% 35%, #0e0522 0%, #07091b 50%, #050a12 100%)",
      }}
    >
      {/* Grain */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
          backgroundSize: "160px 160px",
          opacity: 0.07,
          mixBlendMode: "screen",
        }}
        animate={{ backgroundPosition: ["0% 0%", "-5% -8%", "6% 4%", "0% 0%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* Indigo bloom — top-left */}
      <motion.div
        className="pointer-events-none absolute z-[0]"
        style={{
          left: "-5%", top: "8%",
          width: "52vw", height: "72vh",
          background:
            "radial-gradient(ellipse 50% 55% at 44% 44%, rgba(99,102,241,0.15) 0%, transparent 68%)",
          filter: "blur(110px)",
        }}
        animate={{ x: [0, 22, 0], opacity: [0.6, 0.88, 0.6] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Rose bloom — bottom-right */}
      <motion.div
        className="pointer-events-none absolute z-[0]"
        style={{
          right: "-6%", bottom: "12%",
          width: "44vw", height: "54vh",
          background:
            "radial-gradient(ellipse 52% 50% at 54% 46%, rgba(251,113,133,0.11) 0%, transparent 68%)",
          filter: "blur(90px)",
        }}
        animate={{ x: [0, -18, 0], opacity: [0.45, 0.72, 0.45] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 5 }}
      />

      {/* Edge blends */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-36 bg-gradient-to-b from-[#060816] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-36 bg-gradient-to-t from-[#060816] to-transparent" />

      <div className="relative z-[3] mx-auto max-w-6xl px-6">

        {/* Section header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: easeOutExpo }}
        >
          <div className="mb-5 flex">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.1] bg-white/[0.03] px-4 py-2 text-[11px] font-medium uppercase tracking-widest text-white/38 backdrop-blur-sm">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  background: "rgba(168,85,247,0.9)",
                  boxShadow: "0 0 6px rgba(168,85,247,0.7)",
                }}
              />
              Problems We Solve
            </div>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-white/90 sm:text-5xl">
            Where teams get stuck.
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-white/28">
            Five gaps that slow engineering teams down — and how we close each one.
          </p>
        </motion.div>

        {/* Problem / Response rows */}
        <div className="divide-y divide-white/[0.05]">
          {ROWS.map((row, i) => (
            <div
              key={row.tag}
              className="grid grid-cols-1 gap-5 py-9 md:grid-cols-2 md:gap-12 lg:gap-16 lg:py-10"
            >
              {/* Left — Problem */}
              <motion.div
                initial={{ opacity: 0, x: -22 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.62, delay: i * 0.08, ease: easeOutExpo }}
              >
                {/* Tag */}
                <div
                  className="mb-3 inline-flex items-center gap-1 font-mono text-[10px] font-medium uppercase tracking-widest"
                  style={{ color: alpha(row.color, 0.52) }}
                >
                  <span style={{ color: alpha(row.color, 0.28) }}>[</span>
                  {row.tag}
                  <span style={{ color: alpha(row.color, 0.28) }}>]</span>
                </div>

                {/* Problem text */}
                <p
                  className="font-semibold leading-snug"
                  style={{ fontSize: "clamp(0.88rem, 1.2vw, 1.05rem)" }}
                >
                  <span className="text-white/32">{row.before}</span>
                  <span
                    style={{
                      color: "rgba(255,255,255,0.68)",
                      textShadow: `0 0 28px ${alpha(row.color, 0.65)}, 0 0 12px ${alpha(row.color, 0.3)}`,
                    }}
                  >
                    {row.keyword}
                  </span>
                  <span className="text-white/32">{row.after}</span>
                </p>
              </motion.div>

              {/* Right — Response */}
              <motion.div
                className="flex flex-col justify-center"
                initial={{ opacity: 0, x: 22 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.62, delay: i * 0.08 + 0.14, ease: easeOutExpo }}
              >
                {/* Number badge */}
                <div
                  className="mb-3 inline-flex w-fit items-center justify-center rounded-full px-2.5 py-0.5 font-mono text-[11px] font-bold tabular-nums"
                  style={{
                    color: row.color,
                    background: alpha(row.color, 0.1),
                    border: `1px solid ${alpha(row.color, 0.25)}`,
                    boxShadow: `0 0 14px ${alpha(row.color, 0.2)}`,
                  }}
                >
                  {row.num}
                </div>

                {/* Response */}
                <p
                  className="font-semibold leading-snug text-white/78"
                  style={{ fontSize: "clamp(0.88rem, 1.2vw, 1.05rem)" }}
                >
                  {row.response}
                </p>
              </motion.div>
            </div>
          ))}
        </div>

        {/* ── How We Work ── */}
        <motion.div
          className="mt-16 border-t border-white/[0.05] pt-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, ease: easeOutExpo }}
        >
          <div className="mb-8 flex items-center gap-3">
            <span className="font-mono text-[10px] font-medium uppercase tracking-widest text-white/40">
              How We Work
            </span>
            <div
              className="h-px flex-1"
              style={{
                background:
                  "linear-gradient(to right, rgba(255,255,255,0.1), transparent)",
              }}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {HOW_WE_WORK.map((step, i) => (
              <motion.div
                key={step.num}
                className="flex gap-3"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: easeOutExpo }}
              >
                <span
                  className="mt-0.5 shrink-0 font-mono text-[11px] font-bold tabular-nums"
                  style={{ color: "rgba(139,92,246,0.72)" }}
                >
                  {step.num}
                </span>
                <div>
                  <p className="text-[13px] font-semibold leading-tight text-white/62">
                    {step.title}
                  </p>
                  <p className="mt-1 text-[12px] leading-relaxed text-white/38">
                    {step.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
