"use client";

import { motion } from "framer-motion";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const PRIMARY   = "rgba(168,85,247,1)";
const SECONDARY = "rgba(124,58,237,1)";

// Three cloud providers at top
const PROVIDERS = [
  { label: "AWS",   color: "rgba(255,153,0,0.9)",   services: ["EC2", "S3", "RDS"] },
  { label: "GCP",   color: "rgba(66,133,244,0.9)",   services: ["GKE", "BigQuery", "Pub/Sub"] },
  { label: "Azure", color: "rgba(0,120,212,0.9)",    services: ["AKS", "Cosmos", "Blob"] },
];

// Three output pillars below hub
const OUTPUTS = [
  { label: "Visibility",   sub: "Unified cost view",       accent: PRIMARY   },
  { label: "Rightsizing",  sub: "AI resource matching",    accent: "rgba(192,68,248,1)" },
  { label: "Governance",   sub: "Policy enforcement",      accent: SECONDARY },
];

function FlowParticle({ delay, color, fromX, toX }: { delay: number; color: string; fromX: string; toX: string }) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{ width: 5, height: 5, background: color, boxShadow: `0 0 7px ${color}`, top: 0 }}
      animate={{ y: [0, 72], opacity: [0, 0.9, 0.9, 0] }}
      transition={{ duration: 1.6, repeat: Infinity, delay, ease: "easeIn", times: [0, 0.08, 0.88, 1] }}
    />
  );
}

export default function CloudCostVisual() {
  return (
    <div className="flex flex-col items-center gap-0 px-6 py-10 md:px-14 md:py-12">

      {/* Header */}
      <motion.div
        className="mb-8 flex w-full items-center justify-between"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeOutExpo }}
      >
        <div>
          <p className="text-[10px] font-medium uppercase tracking-widest text-white/22">FinOps Intelligence</p>
          <p className="mt-0.5 text-xs text-white/38">Multi-cloud resource governance</p>
        </div>
        <div
          className="flex items-center gap-2 rounded-full border px-3 py-1.5"
          style={{ borderColor: "rgba(168,85,247,0.28)", background: "rgba(168,85,247,0.07)" }}
        >
          <motion.span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: PRIMARY, boxShadow: `0 0 6px ${PRIMARY}` }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
          <span className="text-[10px] font-semibold" style={{ color: PRIMARY }}>Live Analysis</span>
        </div>
      </motion.div>

      {/* Cloud providers row */}
      <div className="flex w-full items-start justify-around gap-4">
        {PROVIDERS.map((provider, pi) => (
          <motion.div
            key={provider.label}
            className="flex flex-1 flex-col items-center gap-2"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: pi * 0.1, ease: easeOutExpo }}
          >
            {/* Provider node */}
            <div
              className="flex h-12 w-full max-w-[88px] items-center justify-center rounded-xl border border-white/[0.08] text-sm font-bold"
              style={{
                background: `radial-gradient(circle, ${provider.color.replace("0.9)", "0.12)")} 0%, rgba(6,9,22,0.96) 100%)`,
                color: provider.color,
                boxShadow: `0 0 14px ${provider.color.replace("0.9)", "0.12)")}`,
              }}
            >
              {provider.label}
            </div>

            {/* Services below */}
            <div className="flex w-full flex-col gap-1">
              {provider.services.map((svc) => (
                <div
                  key={svc}
                  className="w-full rounded-lg border border-white/[0.05] px-2.5 py-1 text-center font-mono text-[9px] text-white/32"
                  style={{ background: "rgba(255,255,255,0.02)" }}
                >
                  {svc}
                </div>
              ))}
            </div>

            {/* Connector line down to hub */}
            <div className="relative h-10 w-px" style={{ background: `linear-gradient(to bottom, ${provider.color.replace("0.9)", "0.4)")}, rgba(168,85,247,0.4))` }}>
              <FlowParticle delay={pi * 0.55} color={provider.color} fromX="0" toX="0" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* FinOps Hub */}
      <motion.div
        className="relative flex flex-col items-center justify-center rounded-2xl border px-8 py-4 text-center"
        style={{
          borderColor: "rgba(168,85,247,0.32)",
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(168,85,247,0.14) 0%, rgba(6,9,22,1) 100%)",
          minWidth: 180,
          boxShadow: "0 0 32px rgba(168,85,247,0.14)",
        }}
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.55, delay: 0.35, ease: easeOutExpo }}
      >
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{ border: "1px solid rgba(168,85,247,0.22)" }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.4, repeat: Infinity }}
        />
        <p className="relative font-semibold text-white/82" style={{ fontSize: 13 }}>FinOps Engine</p>
        <p className="relative mt-0.5 text-[9px] font-medium uppercase tracking-widest" style={{ color: PRIMARY }}>AI-powered</p>
      </motion.div>

      {/* Hub → outputs connector */}
      <div className="relative flex w-full justify-around" style={{ height: 40 }}>
        {OUTPUTS.map((_, i) => (
          <div key={i} className="relative flex justify-center" style={{ flex: 1 }}>
            <div
              className="absolute top-0 h-full w-px"
              style={{ background: `linear-gradient(to bottom, rgba(168,85,247,0.4), ${OUTPUTS[i].accent.replace("1)", "0.35)")})` }}
            />
          </div>
        ))}
      </div>

      {/* Output pillars */}
      <div className="flex w-full gap-3">
        {OUTPUTS.map((output, i) => (
          <motion.div
            key={output.label}
            className="relative flex-1 overflow-hidden rounded-xl border border-white/[0.06] px-3 py-3 text-center"
            style={{
              background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${output.accent.replace("1)", "0.07)")} 0%, transparent 60%), rgba(6,9,22,1)`,
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 + i * 0.1, ease: easeOutExpo }}
          >
            <div
              className="mx-auto mb-2 h-0.5 w-8 rounded-full"
              style={{ background: output.accent }}
            />
            <p className="text-[11px] font-semibold text-white/72">{output.label}</p>
            <p className="mt-0.5 text-[9px] text-white/28">{output.sub}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
