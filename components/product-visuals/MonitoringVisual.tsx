"use client";

import { motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, Zap } from "lucide-react";

const PRIMARY   = "rgba(245,158,11,1)";
const SECONDARY = "rgba(234,88,12,1)";

// SVG-based radial node graph
// viewBox: 0 0 480 380
// Center hub at (240, 180)
// 6 peripheral nodes

const CENTER = { cx: 240, cy: 180, r: 32 };

const NODES = [
  { id: "api",     label: "API",     cx: 80,  cy: 70,  color: "rgba(245,158,11,1)" },
  { id: "auth",    label: "Auth",    cx: 240, cy: 40,  color: "rgba(251,191,36,1)" },
  { id: "cache",   label: "Cache",   cx: 400, cy: 70,  color: "rgba(234,88,12,1)"  },
  { id: "queue",   label: "Queue",   cx: 400, cy: 290, color: "rgba(220,38,38,1)"  },
  { id: "metrics", label: "Metrics", cx: 240, cy: 320, color: "rgba(245,158,11,1)" },
  { id: "logs",    label: "Logs",    cx: 80,  cy: 290, color: "rgba(234,88,12,1)"  },
];

function Particle({
  x1, y1, x2, y2, delay, color,
}: {
  x1: number; y1: number; x2: number; y2: number;
  delay: number; color: string;
}) {
  return (
    <motion.circle
      r={4}
      fill={color}
      filter={`drop-shadow(0 0 5px ${color})`}
      animate={{
        cx: [x1, x2],
        cy: [y1, y2],
        opacity: [0, 0.9, 0.9, 0],
      }}
      transition={{
        duration: 1.8,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
        times: [0, 0.08, 0.88, 1],
      }}
    />
  );
}

const ALERTS = [
  { icon: AlertTriangle, msg: "Anomaly detected — CPU spike API-gateway",  status: "Remediating", color: "text-amber-400",  t: "12s ago" },
  { icon: Zap,           msg: "RCA complete — root cause: memory leak",     status: "Isolated",    color: "text-orange-400", t: "2m ago"  },
  { icon: CheckCircle2,  msg: "Incident resolved via AI playbook #42",      status: "Resolved",    color: "text-emerald-400",t: "4m ago"  },
];

export default function MonitoringVisual() {
  return (
    <div className="flex flex-col gap-0 px-4 py-8 md:flex-row md:items-stretch md:gap-6 md:px-10 md:py-10">

      {/* SVG Graph */}
      <div className="flex flex-1 items-center justify-center">
        <svg viewBox="0 0 480 370" className="w-full max-w-[380px]" aria-hidden>
          <defs>
            <radialGradient id="hub-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(245,158,11,0.35)" />
              <stop offset="100%" stopColor="rgba(245,158,11,0)" />
            </radialGradient>
          </defs>

          {/* Glow around center */}
          <motion.circle
            cx={CENTER.cx} cy={CENTER.cy} r={64}
            fill="url(#hub-glow)"
            animate={{ r: [64, 80, 64], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Lines */}
          {NODES.map((node) => (
            <line
              key={node.id}
              x1={CENTER.cx} y1={CENTER.cy}
              x2={node.cx}   y2={node.cy}
              stroke={node.color.replace("1)", "0.22)")}
              strokeWidth={1.2}
              strokeDasharray="4 6"
            />
          ))}

          {/* Particles flowing from periphery → center */}
          {NODES.map((node, i) => (
            <Particle
              key={node.id}
              x1={node.cx} y1={node.cy}
              x2={CENTER.cx} y2={CENTER.cy}
              delay={i * 0.42}
              color={node.color}
            />
          ))}

          {/* Peripheral nodes */}
          {NODES.map((node, i) => (
            <motion.g
              key={node.id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 + 0.2 }}
            >
              <circle
                cx={node.cx} cy={node.cy} r={22}
                fill="rgba(6,9,22,0.95)"
                stroke={node.color.replace("1)", "0.28)")}
                strokeWidth={1}
              />
              <motion.circle
                cx={node.cx} cy={node.cy} r={22}
                fill="none"
                stroke={node.color.replace("1)", "0.45)")}
                strokeWidth={1}
                animate={{ r: [22, 34, 22], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.38 }}
              />
              <text
                x={node.cx} y={node.cy + 4}
                textAnchor="middle"
                fill="rgba(255,255,255,0.62)"
                fontSize={9}
                fontFamily="monospace"
                fontWeight="600"
              >
                {node.label}
              </text>
            </motion.g>
          ))}

          {/* Center Hub */}
          <circle
            cx={CENTER.cx} cy={CENTER.cy} r={CENTER.r}
            fill="rgba(6,9,22,0.97)"
            stroke="rgba(245,158,11,0.38)"
            strokeWidth={1.5}
          />
          <motion.circle
            cx={CENTER.cx} cy={CENTER.cy} r={CENTER.r}
            fill="none"
            stroke="rgba(245,158,11,0.55)"
            strokeWidth={1.5}
            animate={{ r: [32, 46, 32], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 2.2, repeat: Infinity }}
          />
          <text
            x={CENTER.cx} y={CENTER.cy - 4}
            textAnchor="middle"
            fill="rgba(245,158,11,0.92)"
            fontSize={10}
            fontFamily="monospace"
            fontWeight="700"
          >
            AI Hub
          </text>
          <text
            x={CENTER.cx} y={CENTER.cy + 10}
            textAnchor="middle"
            fill="rgba(255,255,255,0.25)"
            fontSize={7}
            fontFamily="monospace"
          >
            99.99% uptime
          </text>
        </svg>
      </div>

      {/* Right — alert feed */}
      <div className="flex w-full flex-col justify-center gap-2.5 md:w-[240px]">
        <p className="mb-1 text-[9px] font-medium uppercase tracking-widest text-white/22">Live Incident Feed</p>
        {ALERTS.map((alert, i) => (
          <motion.div
            key={alert.msg}
            className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-3"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: i * 0.15 + 0.4 }}
          >
            <alert.icon className={`mt-0.5 h-3.5 w-3.5 flex-shrink-0 ${alert.color}`} strokeWidth={2} />
            <div className="min-w-0 flex-1">
              <p className="text-[10px] leading-snug text-white/58">{alert.msg}</p>
              <div className="mt-1.5 flex items-center gap-2">
                <span
                  className="rounded px-1.5 py-0.5 text-[8px] font-semibold"
                  style={{ background: "rgba(245,158,11,0.1)", color: PRIMARY }}
                >
                  {alert.status}
                </span>
                <span className="text-[8px] text-white/20">{alert.t}</span>
              </div>
            </div>
          </motion.div>
        ))}

        {/* MTTD stat */}
        <motion.div
          className="mt-1 rounded-xl border p-4 text-center"
          style={{ borderColor: "rgba(245,158,11,0.2)", background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(245,158,11,0.07) 0%, transparent 60%), rgba(6,9,22,1)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="font-mono text-2xl font-bold" style={{ color: PRIMARY }}>{"< 2 min"}</p>
          <p className="mt-0.5 text-[9px] text-white/25">Mean time to detect</p>
        </motion.div>
      </div>
    </div>
  );
}
