"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Cloud,
  Layers,
  ShieldCheck,
  BrainCircuit,
  GitBranch,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  TrendingDown,
  Activity,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;
const ease = [0.25, 0.46, 0.45, 0.94] as const;

// ─── Types ────────────────────────────────────────────────────────────────────

type UseCase = { industry: string; result: string };
type Product = {
  number: string;
  icon: LucideIcon;
  name: string;
  tagline: string;
  features: string[];
  useCases: UseCase[];
  idealFor: string[];
  cta: string;
  slug: string;
  glowColor: string;
  borderGlow: string;
  iconClass: string;
  iconBg: string;
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const PRODUCTS: Product[] = [
  {
    number: "01",
    icon: ShieldCheck,
    name: "AI-Powered Secure SDLC",
    tagline: "Scan. Build. Validate. Release — securely, automatically.",
    features: ["Secure automated build pipelines", "DevOps + security integration", "Compliance validation gates", "AI-guided remediation", "Single unified workflow"],
    useCases: [
      { industry: "Healthcare", result: "HIPAA-compliant pipelines live in 3 days" },
      { industry: "Enterprise", result: "Zero audit findings post-release" },
    ],
    idealFor: ["DevSecOps teams", "Engineering orgs", "Compliance-driven teams"],
    cta: "Fortify Every Release",
    slug: "ai-powered-secure-sdlc",
    glowColor: "rgba(0,195,220,0.1)",
    borderGlow: "rgba(0,195,220,0.52)",
    iconClass: "text-cyan-400",
    iconBg: "from-cyan-500/[0.2] to-blue-600/[0.08]",
  },
  {
    number: "02",
    icon: GitBranch,
    name: "AI DevSecOps Platform",
    tagline: "Faster releases. No security trade-offs.",
    features: ["Self-service CI/CD pipelines", "Automated security scanning", "Policy gates & controls", "Vulnerability insights dashboard", "Release evidence & audit trail"],
    useCases: [
      { industry: "FinTech", result: "3× faster developer deployments" },
      { industry: "Enterprise", result: "75% fewer manual security reviews" },
    ],
    idealFor: ["DevOps", "DevSecOps", "Modern engineering teams"],
    cta: "Ship Faster, Stay Secure",
    slug: "ai-devsecops-platform",
    glowColor: "rgba(0,185,95,0.1)",
    borderGlow: "rgba(0,185,95,0.52)",
    iconClass: "text-emerald-400",
    iconBg: "from-emerald-500/[0.2] to-teal-600/[0.08]",
  },
  {
    number: "03",
    icon: BrainCircuit,
    name: "AI Monitoring & Incident Response",
    tagline: "Detect faster. Respond smarter. Resolve before users notice.",
    features: ["Anomaly detection & forecasting", "AI root cause analysis", "Log, metric & alert intelligence", "Proactive incident insights", "AI playbook execution"],
    useCases: [
      { industry: "Healthcare", result: "65% faster incident response" },
      { industry: "Finance", result: "99.99% uptime with AI-powered remediation" },
    ],
    idealFor: ["SREs", "DevOps", "Regulated industries"],
    cta: "Resolve Before Users Notice",
    slug: "ai-monitoring-incident-response",
    glowColor: "rgba(245,158,11,0.1)",
    borderGlow: "rgba(245,158,11,0.52)",
    iconClass: "text-amber-400",
    iconBg: "from-amber-500/[0.2] to-yellow-600/[0.08]",
  },
  {
    number: "04",
    icon: Layers,
    name: "Cloud Migration & Modernization",
    tagline: "Move faster. Land cleaner. Control every step.",
    features: ["Automated migration planning", "Wave-based execution", "Infrastructure templates", "Cost visibility during migration", "Deployment orchestration"],
    useCases: [
      { industry: "Healthcare", result: "EKS + AKS migration, zero friction" },
      { industry: "Enterprise", result: "Cloud onboarding: 3 days → 1 hour" },
    ],
    idealFor: ["Platform Engineering", "SREs", "Cloud migration teams"],
    cta: "Chart Your Migration Path",
    slug: "cloud-migration-modernization",
    glowColor: "rgba(244,63,94,0.09)",
    borderGlow: "rgba(244,63,94,0.48)",
    iconClass: "text-rose-400",
    iconBg: "from-rose-500/[0.2] to-pink-600/[0.08]",
  },
  {
    number: "05",
    icon: Cloud,
    name: "Cloud Cost Optimization",
    tagline: "Spend less. Scale more. Stay in control.",
    features: ["Intelligent cost visibility", "Usage analysis & reporting", "AI rightsizing recommendations", "Governance workflows", "Multi-cloud support"],
    useCases: [
      { industry: "FinTech", result: "Saved 37% on AWS within 2 weeks" },
      { industry: "Healthcare", result: "40% infrastructure waste eliminated" },
    ],
    idealFor: ["FinOps", "Engineering", "Multi-cloud operations"],
    cta: "Reclaim Your Cloud Budget",
    slug: "cloud-cost-optimization",
    glowColor: "rgba(147,51,234,0.1)",
    borderGlow: "rgba(167,139,250,0.52)",
    iconClass: "text-violet-400",
    iconBg: "from-violet-500/[0.2] to-purple-600/[0.08]",
  },
];

// ─── Product Visuals ──────────────────────────────────────────────────────────

function CostVisual({ animKey }: { animKey: number }) {
  const bars = [{ h: 68, p: 92 }, { h: 45, p: 78 }, { h: 82, p: 88 }, { h: 38, p: 70 }, { h: 55, p: 80 }, { h: 72, p: 95 }, { h: 35, p: 62 }];
  return (
    <div className="flex h-full flex-col justify-between p-6">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[10px] font-medium uppercase tracking-widest text-white/25">Monthly Spend</span>
        <div className="flex items-center gap-1.5 rounded-full bg-cyan-400/10 px-2.5 py-1 text-[10px] font-semibold text-cyan-300">
          <TrendingDown className="h-3 w-3" /> ↓ 47%
        </div>
      </div>
      <div className="relative flex flex-1 items-end gap-1.5">
        {bars.map((bar, i) => (
          <div key={i} className="flex flex-1 flex-col items-stretch gap-0.5">
            <motion.div key={`p${i}-${animKey}`} className="w-full rounded-t-sm bg-white/[0.07]" initial={{ height: 0 }} animate={{ height: `${bar.p * 0.65}%` }} transition={{ duration: 0.7, delay: i * 0.06, ease: easeOutExpo }} style={{ maxHeight: 90 }} />
            <motion.div key={`c${i}-${animKey}`} className="absolute bottom-0 w-[calc((100%-48px)/7)] rounded-t-sm bg-gradient-to-t from-cyan-600/80 to-cyan-400/60" initial={{ height: 0 }} animate={{ height: `${bar.h * 0.65}%` }} transition={{ duration: 0.8, delay: i * 0.06 + 0.1, ease: easeOutExpo }} style={{ maxHeight: 60, left: `calc(${i} * (100% + 6px) / 7)` }} />
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-between text-[9px] text-white/20">
        {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"].map((m) => <span key={m}>{m}</span>)}
      </div>
    </div>
  );
}

const LAMBDA_FNS = [
  { name: "handler.py", ms: "28ms", inv: "812K" },
  { name: "process.py", ms: "54ms", inv: "403K" },
  { name: "notify.py", ms: "12ms", inv: "1.1M" },
  { name: "validate.py", ms: "19ms", inv: "622K" },
];

function ServerlessVisual({ animKey }: { animKey: number }) {
  return (
    <div className="flex flex-col gap-2.5 p-5">
      {LAMBDA_FNS.map((fn, i) => (
        <motion.div key={`${fn.name}-${animKey}`} className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45, delay: i * 0.1, ease: easeOutExpo }}>
          <div className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-400" style={{ boxShadow: "0 0 6px rgba(245,158,11,0.9)" }} />
          <span className="flex-1 font-mono text-xs text-white/60">{fn.name}</span>
          <span className="font-mono text-[10px] text-white/30">{fn.ms}</span>
          <span className="font-mono text-[10px] font-semibold text-amber-300/80">{fn.inv}</span>
        </motion.div>
      ))}
      <motion.div key={`total-${animKey}`} className="mt-1 flex items-center justify-between rounded-xl border border-amber-500/[0.18] bg-amber-500/[0.06] px-4 py-2.5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <span className="text-xs text-white/35">Total invocations</span>
        <span className="font-mono text-xs font-bold text-amber-300">2.1M / 0 errors</span>
      </motion.div>
    </div>
  );
}

function MonitorVisual({ animKey }: { animKey: number }) {
  return (
    <div className="flex flex-col gap-3 p-5">
      <motion.div key={`hb-${animKey}`} className="relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
        <span className="mb-2 block text-[9px] uppercase tracking-widest text-white/22">System Health</span>
        <svg viewBox="0 0 220 48" className="h-10 w-full overflow-visible">
          <motion.path key={animKey} d="M0,24 L38,24 L48,4 L58,44 L68,24 L90,24 L100,12 L110,36 L120,24 L148,24 L158,6 L168,42 L178,24 L220,24" fill="none" stroke="rgba(167,139,250,0.75)" strokeWidth="1.5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.4, ease: "easeInOut" }} />
        </svg>
        <div className="absolute right-4 top-4 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" style={{ boxShadow: "0 0 6px rgba(52,211,153,1)" }} />
          <span className="text-[9px] font-semibold text-emerald-400">99.99% uptime</span>
        </div>
      </motion.div>
      {[
        { msg: "Anomaly detected — auto-remediated", time: "2m ago", Icon: Activity, color: "text-yellow-400" },
        { msg: "RCA complete — root cause isolated", time: "5m ago", Icon: CheckCircle2, color: "text-violet-400" },
        { msg: "Incident resolved via AI playbook", time: "11m ago", Icon: CheckCircle2, color: "text-emerald-400" },
      ].map((alert, i) => (
        <motion.div key={`${alert.msg}-${animKey}`} className="flex items-start gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-3" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 + i * 0.12, ease: easeOutExpo }}>
          <alert.Icon className={`mt-0.5 h-3.5 w-3.5 flex-shrink-0 ${alert.color}`} strokeWidth={2} />
          <div>
            <p className="text-xs text-white/65">{alert.msg}</p>
            <p className="mt-0.5 text-[9px] text-white/25">{alert.time}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

const CLOUD_NODES = [
  { label: "AWS", top: "18%", left: "10%", color: "rgba(255,153,0,0.9)" },
  { label: "GCP", top: "8%", left: "50%", color: "rgba(66,133,244,0.9)" },
  { label: "Azure", top: "18%", right: "10%", color: "rgba(0,120,212,0.9)" },
  { label: "K8s", bottom: "22%", left: "22%", color: "rgba(50,170,240,0.9)" },
  { label: "Terraform", bottom: "22%", right: "22%", color: "rgba(95,71,206,0.9)" },
] as const;

function CloudNodesVisual({ animKey }: { animKey: number }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <motion.div key={animKey} className="relative z-10 flex h-16 w-16 flex-col items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-900/20 backdrop-blur-sm" initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
        <motion.div className="absolute h-full w-full rounded-2xl border border-emerald-400/20" animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2.5, repeat: Infinity }} />
        <span className="text-[10px] font-bold text-emerald-300">HRel</span>
        <span className="text-[8px] text-emerald-400/60">Hub</span>
      </motion.div>
      {CLOUD_NODES.map((node, i) => {
        const pos: React.CSSProperties = { top: "top" in node ? node.top : undefined, bottom: "bottom" in node ? node.bottom : undefined, left: "left" in node ? node.left : undefined, right: "right" in node ? node.right : undefined };
        return (
          <motion.div key={`${node.label}-${animKey}`} className="absolute flex flex-col items-center gap-1" style={pos} initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.45, delay: i * 0.1 + 0.2 }}>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-[10px] font-semibold text-white/70" style={{ boxShadow: `0 0 12px ${node.color}40` }}>{node.label}</div>
            <motion.div className="h-1.5 w-1.5 rounded-full" style={{ background: node.color }} animate={{ scale: [1, 2.2, 1], opacity: [0.8, 0, 0.8] }} transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.4 }} />
          </motion.div>
        );
      })}
    </div>
  );
}

const PIPELINE_STAGES = ["Build", "Test", "Scan", "Deploy"] as const;

function PipelineVisual({ animKey }: { animKey: number }) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6">
      <div className="flex w-full items-center justify-between">
        {PIPELINE_STAGES.map((stage, i) => (
          <div key={stage} className="flex flex-1 items-center">
            <div className="flex flex-1 flex-col items-center">
              <motion.div key={`${stage}-${animKey}`} className="flex h-10 w-full max-w-[68px] items-center justify-center rounded-xl border border-rose-500/[0.22] bg-rose-500/[0.08] text-[11px] font-semibold text-rose-300" initial={{ opacity: 0, scale: 0.75 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.15, ease: easeOutExpo }}>{stage}</motion.div>
            </div>
            {i < PIPELINE_STAGES.length - 1 && (
              <motion.div key={`line-${i}-${animKey}`} className="h-px flex-1 bg-gradient-to-r from-rose-500/40 to-rose-400/15" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} style={{ originX: 0 }} transition={{ delay: i * 0.15 + 0.12, duration: 0.35 }} />
            )}
          </div>
        ))}
      </div>
      <div className="grid w-full grid-cols-2 gap-3">
        {[{ value: "3×", label: "faster deployments" }, { value: "75%", label: "fewer manual reviews" }].map((stat) => (
          <motion.div key={`${stat.label}-${animKey}`} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-center" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, ease: easeOutExpo }}>
            <p className="font-mono text-xl font-bold text-rose-300">{stat.value}</p>
            <p className="mt-0.5 text-[10px] text-white/28">{stat.label}</p>
          </motion.div>
        ))}
      </div>
      {["feat: add cost guardrails", "fix: lambda timeout config", "ci: OPA policy updated"].map((commit, i) => (
        <motion.div key={`${commit}-${animKey}`} className="flex w-full items-center gap-2 rounded-lg border border-white/[0.04] bg-white/[0.02] px-3 py-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 + i * 0.1 }}>
          <div className="h-1 w-1 rounded-full bg-rose-400" />
          <span className="font-mono text-[10px] text-white/38">{commit}</span>
        </motion.div>
      ))}
    </div>
  );
}

function ProductVisual({ index, animKey }: { index: number; animKey: number }) {
  if (index === 0) return <CostVisual animKey={animKey} />;
  if (index === 1) return <CloudNodesVisual animKey={animKey} />;
  if (index === 2) return <ServerlessVisual animKey={animKey} />;
  if (index === 3) return <PipelineVisual animKey={animKey} />;
  return <MonitorVisual animKey={animKey} />;
}

// ─── Panel variants ───────────────────────────────────────────────────────────

const panelVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 48 : -48, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.52, ease: easeOutExpo } },
  exit: (dir: number) => ({ x: dir > 0 ? -48 : 48, opacity: 0, transition: { duration: 0.28, ease } }),
};

// ─── Products ─────────────────────────────────────────────────────────────────

export default function Products() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  function goTo(index: number) {
    setDirection(index > active ? 1 : -1);
    setActive(index);
  }

  const product = PRODUCTS[active];

  return (
    <section
      id="products"
      className="relative overflow-hidden py-28 sm:py-36"
      style={{
        background:
          "radial-gradient(ellipse 130% 80% at 80% 5%, #0c1840 0%, #060b22 45%, #040914 100%)",
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
        animate={{ backgroundPosition: ["0% 0%", "-5% -9%", "8% 5%", "0% 0%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* Scene blobs */}
      <motion.div
        className="pointer-events-none absolute z-[0]"
        style={{ right: "-8%", top: "0%", width: "65vw", height: "85vh", background: "radial-gradient(ellipse at 55% 42%, rgba(30,90,255,0.26) 0%, rgba(20,65,210,0.1) 46%, transparent 68%)", filter: "blur(110px)" }}
        animate={{ x: [0, -32, 0], opacity: [0.72, 1, 0.72] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute z-[0]"
        style={{ left: "-6%", top: "30%", width: "48vw", height: "65vh", background: "radial-gradient(ellipse at 45% 50%, rgba(0,195,228,0.22) 0%, rgba(0,160,195,0.08) 50%, transparent 68%)", filter: "blur(95px)" }}
        animate={{ x: [0, 28, 0], y: [0, -14, 0], opacity: [0.6, 0.92, 0.6] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />
      <motion.div
        className="pointer-events-none absolute z-[0]"
        style={{ left: "35%", bottom: "5%", width: "35vw", height: "40vh", background: "radial-gradient(circle, rgba(100,50,210,0.18) 0%, transparent 62%)", filter: "blur(90px)" }}
        animate={{ scale: [1, 1.16, 1], opacity: [0.45, 0.8, 0.45] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 7 }}
      />

      {/* Top edge — from Offerings bottom */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-36 bg-gradient-to-b from-[#060b22] to-transparent" />
      {/* Bottom edge */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-36 bg-gradient-to-t from-[#05081a] to-transparent" />

      <div className="relative z-[3] mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, ease: easeOutExpo }}
        >
          <div className="mb-5 flex justify-center">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-[11px] font-medium uppercase tracking-widest text-white/45 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" style={{ boxShadow: "0 0 6px rgba(96,165,250,0.9)" }} />
              What We Build
            </div>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Our{" "}
            <motion.span
              className="inline-block bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent"
              style={{ backgroundSize: "200% 100%" }}
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              Products
            </motion.span>
          </h2>
        </motion.div>

        {/* Tabs */}
        <motion.div
          className="mb-10 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: easeOutExpo }}
        >
          {PRODUCTS.map((p, i) => {
            const isActive = active === i;
            return (
              <button
                key={p.number}
                onClick={() => goTo(i)}
                className="group relative flex flex-shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-left transition-colors duration-200"
                style={{
                  borderColor: isActive ? p.borderGlow : "rgba(255,255,255,0.07)",
                  background: isActive ? p.glowColor : "transparent",
                }}
              >
                <span className="font-mono text-[9px] tabular-nums transition-colors duration-200" style={{ color: isActive ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.22)" }}>{p.number}</span>
                <span className="text-xs font-medium transition-colors duration-200" style={{ color: isActive ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.32)" }}>{p.name.split(" ").slice(0, 2).join(" ")}</span>
                {isActive && (
                  <motion.div layoutId="tab-indicator" className="absolute inset-0 rounded-full" style={{ boxShadow: `0 0 0 1px ${p.borderGlow}` }} transition={{ duration: 0.35, ease: easeOutExpo }} />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* Panel */}
        <div className="relative overflow-hidden rounded-3xl">
          <div
            className="absolute inset-0 rounded-3xl transition-all duration-500"
            style={{
              background: `radial-gradient(ellipse 55% 50% at 5% 0%, ${product.glowColor} 0%, transparent 55%), rgba(5,8,28,0.96)`,
              border: `1px solid ${product.borderGlow.replace("0.52)", "0.12)")}`,
            }}
          />

          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={active}
              custom={direction}
              variants={panelVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="relative grid grid-cols-1 gap-0 lg:grid-cols-[1fr_380px]"
            >
              {/* Content */}
              <div className="px-5 py-8 sm:px-8 sm:py-10 md:px-14 md:py-14">
                <div className={`mb-8 inline-flex items-center justify-center rounded-2xl bg-gradient-to-br p-4 ${product.iconBg}`}>
                  <product.icon className={`h-6 w-6 ${product.iconClass}`} strokeWidth={1.5} />
                </div>
                <h3 className="mb-3 font-bold leading-tight tracking-tight text-white/92" style={{ fontSize: "clamp(1.4rem,2.3vw,2rem)" }}>{product.name}</h3>
                <p className="mb-8 text-sm font-medium italic text-white/32">{product.tagline}</p>
                <div className="mb-8 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {product.features.map((f) => (
                    <div key={f} className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-[1px] h-3.5 w-3.5 flex-shrink-0 text-white/20" strokeWidth={2} />
                      <span className="text-sm leading-snug text-white/55">{f}</span>
                    </div>
                  ))}
                </div>
                <div className="mb-8 space-y-2">
                  <p className="mb-3 text-[10px] font-medium uppercase tracking-widest text-white/22">Proven outcomes</p>
                  {product.useCases.map((uc) => (
                    <div key={uc.industry} className="flex items-start gap-3 rounded-xl border border-white/[0.05] bg-white/[0.03] px-4 py-3">
                      <span className="mt-0.5 rounded-md px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider" style={{ background: product.glowColor, color: product.borderGlow }}>{uc.industry}</span>
                      <span className="text-sm text-white/55">{uc.result}</span>
                    </div>
                  ))}
                </div>
                <div className="mb-10 flex flex-wrap gap-2">
                  <span className="self-center mr-1 text-[10px] font-medium uppercase tracking-widest text-white/22">Ideal for:</span>
                  {product.idealFor.map((tag) => (
                    <span key={tag} className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-xs font-medium text-white/42">{tag}</span>
                  ))}
                </div>
                <Link href={`/products/${product.slug}`}>
                  <motion.span
                    className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white"
                    style={{ background: `linear-gradient(135deg, ${product.borderGlow.replace("0.52)", "0.72)")} 0%, ${product.borderGlow.replace("0.52)", "0.36)")} 100%)`, boxShadow: `0 2px 20px ${product.glowColor}` }}
                    whileHover={{ scale: 1.03, boxShadow: `0 4px 32px ${product.borderGlow.replace("0.52)", "0.4)")}` }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.22, ease }}
                  >
                    {product.cta}
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </motion.span>
                </Link>
              </div>

              {/* Visual panel */}
              <div className="relative hidden min-h-[420px] overflow-hidden border-l lg:block" style={{ borderColor: product.borderGlow.replace("0.52)", "0.09)") }}>
                <div className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${product.glowColor} 0%, transparent 70%)` }} />
                <ProductVisual index={active} animKey={active} />
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute inset-x-0 bottom-0 h-px transition-all duration-500" style={{ background: `linear-gradient(90deg, transparent 5%, ${product.borderGlow}, transparent 95%)` }} />
        </div>

        {/* Navigation */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex gap-2">
            {PRODUCTS.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} className="h-1 rounded-full transition-all duration-300" style={{ width: active === i ? 24 : 6, background: active === i ? product.borderGlow : "rgba(255,255,255,0.15)" }} />
            ))}
          </div>
          <div className="flex gap-3">
            {[
              { Icon: ChevronLeft, onClick: () => goTo(Math.max(0, active - 1)), disabled: active === 0 },
              { Icon: ChevronRight, onClick: () => goTo(Math.min(PRODUCTS.length - 1, active + 1)), disabled: active === PRODUCTS.length - 1 },
            ].map(({ Icon, onClick, disabled }, i) => (
              <motion.button key={i} onClick={onClick} disabled={disabled} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.04] backdrop-blur-sm disabled:opacity-25" whileHover={disabled ? {} : { scale: 1.08, borderColor: "rgba(255,255,255,0.22)" }} whileTap={disabled ? {} : { scale: 0.94 }} transition={{ duration: 0.2, ease }}>
                <Icon className="h-4 w-4 text-white/60" strokeWidth={2} />
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
