"use client";

import { motion } from "framer-motion";
import { Server, Cloud, CheckCircle2, Loader2, Clock } from "lucide-react";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const PRIMARY   = "rgba(244,63,94,1)";
const SECONDARY = "rgba(217,70,239,1)";

type WaveStatus = "complete" | "active" | "planned";

const WAVES: {
  wave: string;
  label: string;
  services: string[];
  target: string;
  status: WaveStatus;
  progress: number;
}[] = [
  {
    wave: "Wave 1",
    label: "Foundation",
    services: ["Auth", "IAM", "VPC", "DNS"],
    target: "AWS EKS",
    status: "complete",
    progress: 100,
  },
  {
    wave: "Wave 2",
    label: "Core Services",
    services: ["API", "Data", "Cache", "Queue"],
    target: "Azure AKS",
    status: "active",
    progress: 61,
  },
  {
    wave: "Wave 3",
    label: "Analytics",
    services: ["ML", "BI", "Stream", "Archive"],
    target: "Multi-cloud",
    status: "planned",
    progress: 0,
  },
];

const STATUS_CONFIG: Record<WaveStatus, { icon: typeof CheckCircle2; color: string; label: string }> = {
  complete: { icon: CheckCircle2, color: "rgba(52,211,153,1)",  label: "Complete"    },
  active:   { icon: Loader2,      color: "rgba(244,63,94,1)",   label: "In Progress" },
  planned:  { icon: Clock,        color: "rgba(255,255,255,0.25)", label: "Planned"  },
};

export default function MigrationVisual() {
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
          <p className="text-[10px] font-medium uppercase tracking-widest text-white/22">Migration Execution Board</p>
          <p className="mt-0.5 text-xs text-white/38">Wave-based cloud migration · Live tracking</p>
        </div>
        <div
          className="flex items-center gap-2 rounded-full border px-3 py-1.5"
          style={{ borderColor: "rgba(52,211,153,0.3)", background: "rgba(52,211,153,0.07)" }}
        >
          <CheckCircle2 className="h-3 w-3 text-emerald-400" strokeWidth={2} />
          <span className="text-[10px] font-semibold text-emerald-400">Wave 1 Complete</span>
        </div>
      </motion.div>

      {/* Wave rows */}
      <div className="flex flex-col gap-3">
        {WAVES.map((wave, i) => {
          const cfg = STATUS_CONFIG[wave.status];
          const isActive = wave.status === "active";
          const isComplete = wave.status === "complete";

          return (
            <motion.div
              key={wave.wave}
              className="relative overflow-hidden rounded-2xl border p-5"
              style={{
                borderColor: isComplete
                  ? "rgba(52,211,153,0.18)"
                  : isActive
                  ? "rgba(244,63,94,0.22)"
                  : "rgba(255,255,255,0.06)",
                background: isComplete
                  ? "radial-gradient(ellipse 60% 80% at 0% 50%, rgba(52,211,153,0.05) 0%, transparent 60%), rgba(6,9,22,0.95)"
                  : isActive
                  ? "radial-gradient(ellipse 60% 80% at 0% 50%, rgba(244,63,94,0.06) 0%, transparent 60%), rgba(6,9,22,0.95)"
                  : "rgba(6,9,22,0.7)",
              }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.14, ease: easeOutExpo }}
            >
              <div className="flex items-center gap-4">
                {/* Wave label */}
                <div className="w-20 flex-shrink-0">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/45">{wave.wave}</p>
                  <p className="mt-0.5 text-[11px] font-semibold text-white/62">{wave.label}</p>
                </div>

                {/* Services */}
                <div className="hidden flex-1 items-center gap-2 sm:flex">
                  <Server className="h-3.5 w-3.5 flex-shrink-0 text-white/20" strokeWidth={1.5} />
                  <div className="flex gap-1.5">
                    {wave.services.map((svc) => (
                      <span
                        key={svc}
                        className="rounded-md px-2 py-0.5 text-[9px] font-medium text-white/40"
                        style={{ background: "rgba(255,255,255,0.04)" }}
                      >
                        {svc}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                <div className="hidden text-white/15 sm:block">→</div>

                {/* Target cloud */}
                <div className="hidden flex-shrink-0 items-center gap-1.5 sm:flex">
                  <Cloud className="h-3.5 w-3.5 text-white/25" strokeWidth={1.5} />
                  <span className="text-[10px] text-white/35">{wave.target}</span>
                </div>

                {/* Status */}
                <div className="ml-auto flex flex-shrink-0 items-center gap-1.5">
                  {isActive ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
                    >
                      <cfg.icon className="h-3.5 w-3.5" style={{ color: cfg.color }} strokeWidth={2} />
                    </motion.div>
                  ) : (
                    <cfg.icon className="h-3.5 w-3.5" style={{ color: cfg.color }} strokeWidth={2} />
                  )}
                  <span className="text-[10px] font-medium" style={{ color: cfg.color }}>{cfg.label}</span>
                </div>
              </div>

              {/* Progress bar */}
              {wave.progress > 0 && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[9px] text-white/22">Migration progress</span>
                    <span className="font-mono text-[9px] font-bold" style={{ color: isComplete ? "rgba(52,211,153,1)" : PRIMARY }}>
                      {wave.progress}%
                    </span>
                  </div>
                  <div className="h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: isComplete
                          ? "linear-gradient(to right, rgba(52,211,153,0.9), rgba(16,185,129,0.7))"
                          : `linear-gradient(to right, ${PRIMARY.replace("1)", "0.9)")}, ${SECONDARY.replace("1)", "0.7)")})`,
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${wave.progress}%` }}
                      transition={{ duration: 1.2, delay: 0.4 + i * 0.2, ease: easeOutExpo }}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Stats row */}
      <motion.div
        className="mt-5 grid grid-cols-3 gap-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.65, ease: easeOutExpo }}
      >
        {[
          { metric: "3 days", label: "→ 1 hour onboarding" },
          { metric: "Zero",   label: "migration incidents" },
          { metric: "40%",    label: "faster delivery" },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-3 text-center"
          >
            <p className="font-mono text-base font-bold" style={{ color: PRIMARY }}>{item.metric}</p>
            <p className="mt-0.5 text-[9px] text-white/25">{item.label}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
