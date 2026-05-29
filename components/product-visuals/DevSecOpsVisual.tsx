"use client";

import { motion } from "framer-motion";
import { Code2, ScanLine, GitBranch, ShieldCheck, Rocket, CheckCircle2 } from "lucide-react";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const PRIMARY   = "rgba(0,185,95,1)";
const SECONDARY = "rgba(13,148,136,1)";

const LAYERS = [
  { icon: Code2,       label: "Code",     sub: "IDE + pre-commit hooks",           accent: "rgba(0,185,95,1)",    stat: "0 secrets exposed" },
  { icon: ScanLine,    label: "Scan",     sub: "SAST · DAST · container scan",     accent: "rgba(0,175,115,1)",   stat: "148 checks / commit" },
  { icon: GitBranch,   label: "Pipeline", sub: "Self-service CI/CD orchestration", accent: "rgba(0,164,135,1)",   stat: "3× faster deploys" },
  { icon: ShieldCheck, label: "Policy",   sub: "OPA gates · compliance guardrails", accent: "rgba(13,148,136,1)", stat: "100% policy coverage" },
  { icon: Rocket,      label: "Release",  sub: "Signed artifact · audit trail",    accent: "rgba(14,135,125,1)",  stat: "Evidence auto-generated" },
];

function ConnectorDot({ delay, color }: { delay: number; color: string }) {
  return (
    <motion.div
      className="absolute left-1/2 -translate-x-1/2 rounded-full"
      style={{ width: 6, height: 6, background: color, boxShadow: `0 0 7px ${color}`, top: 0 }}
      animate={{ y: [0, 28], opacity: [0, 1, 0] }}
      transition={{ duration: 0.9, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
}

export default function DevSecOpsVisual() {
  return (
    <div className="flex flex-col gap-0 px-6 py-10 md:px-14 md:py-12">
      {/* Header */}
      <motion.div
        className="mb-6 flex items-center justify-between"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeOutExpo }}
      >
        <div>
          <p className="text-[10px] font-medium uppercase tracking-widest text-white/22">Secure CI/CD Pipeline</p>
          <p className="mt-0.5 text-xs text-white/38">Horizon Relevance DevSecOps Platform</p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.07] px-3 py-1.5">
          <CheckCircle2 className="h-3 w-3 text-emerald-400" strokeWidth={2} />
          <span className="text-[10px] font-semibold text-emerald-400">All Systems Secure</span>
        </div>
      </motion.div>

      {/* Layer stack */}
      {LAYERS.map((layer, i) => (
        <div key={layer.label} className="relative">
          <motion.div
            className="relative flex items-center gap-4 overflow-hidden rounded-xl border border-white/[0.06] px-5 py-3.5"
            style={{
              background: `radial-gradient(ellipse 60% 80% at 0% 50%, ${layer.accent.replace("1)", "0.08)")} 0%, transparent 55%), rgba(6,9,22,0.9)`,
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: easeOutExpo }}
          >
            {/* Left accent bar */}
            <div
              className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full"
              style={{ background: layer.accent }}
            />

            <div
              className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg"
              style={{ background: layer.accent.replace("1)", "0.12)") }}
            >
              <layer.icon className="h-4 w-4" style={{ color: layer.accent }} strokeWidth={1.5} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white/82">{layer.label}</span>
                <span className="hidden text-[10px] text-white/28 sm:block">{layer.sub}</span>
              </div>
            </div>

            <div className="hidden flex-shrink-0 text-right sm:block">
              <span
                className="rounded px-2 py-0.5 text-[9px] font-semibold"
                style={{ background: layer.accent.replace("1)", "0.1)"), color: layer.accent }}
              >
                {layer.stat}
              </span>
            </div>
          </motion.div>

          {/* Animated connector between layers */}
          {i < LAYERS.length - 1 && (
            <div className="relative flex justify-center" style={{ height: 28 }}>
              <div className="absolute top-0 bottom-0 w-px" style={{ background: `linear-gradient(to bottom, ${layer.accent.replace("1)", "0.3)")}, ${LAYERS[i + 1].accent.replace("1)", "0.3)")})` }} />
              <ConnectorDot delay={i * 0.28} color={layer.accent} />
            </div>
          )}
        </div>
      ))}

      {/* Footer metrics */}
      <motion.div
        className="mt-5 grid grid-cols-3 gap-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.65, ease: easeOutExpo }}
      >
        {[
          { metric: "3×", label: "Faster releases" },
          { metric: "75%", label: "Fewer manual reviews" },
          { metric: "100%", label: "Policy coverage" },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-center"
          >
            <p className="font-mono text-lg font-bold" style={{ color: PRIMARY }}>{item.metric}</p>
            <p className="mt-0.5 text-[9px] text-white/25">{item.label}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
