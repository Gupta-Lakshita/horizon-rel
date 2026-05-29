"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

function alpha(color: string, a: number) {
  return color.replace(/[\d.]+\)$/, `${a})`);
}

// ─── Data ─────────────────────────────────────────────────────────────────────

type Member = {
  id: string;
  name?: string;
  initials: string;
  title: string;
  department: string;
  bio: string;
  photo?: string;
  level: number;
  xFrac: number;
  color: string;
  connectedTo: string[];
  entranceDelay: number;
};

const MEMBERS: Member[] = [
  {
    id: "ceo",
    name: "Ankur Kashyap",
    initials: "AK",
    title: "Founder & Chief Executive Officer",
    department: "Leadership",
    bio: "Specializing in Platform Engineering, Cloud Transformation, DevSecOps, and Enterprise Automation. Helping organizations modernize technology operations through scalable platforms and intelligent automation.",
    photo: "/ankur-kashyap.jpg",
    level: 0,
    xFrac: 0.5,
    color: "rgba(6,182,212,0.9)",
    connectedTo: ["ai-lead", "tpm"],
    entranceDelay: 0.05,
  },
  {
    id: "ai-lead",
    initials: "AIL",
    title: "AI Lead",
    department: "Artificial Intelligence",
    bio: "Driving AI/ML strategy and overseeing intelligent system design.",
    level: 1,
    xFrac: 0.27,
    color: "rgba(167,139,250,0.9)",
    connectedTo: ["ceo", "ml-eng", "backend-eng"],
    entranceDelay: 0.18,
  },
  {
    id: "tpm",
    name: "Rishi Sharma",
    initials: "RS",
    title: "Technical Program Manager",
    department: "Program Management",
    bio: "Expertise in Cloud Engineering, DevOps, and DevSecOps — specializing in scalable cloud-native solutions, CI/CD automation, and secure product delivery across enterprise and healthcare environments.",
    photo: "/rishi-sharma.jpg",
    level: 1,
    xFrac: 0.73,
    color: "rgba(232,72,212,0.9)",
    connectedTo: ["ceo", "cloud-eng", "fullstack-eng"],
    entranceDelay: 0.26,
  },
  {
    id: "ml-eng",
    initials: "ML",
    title: "ML Engineer",
    department: "Artificial Intelligence",
    bio: "Designing and training models for predictive analytics and AIOps.",
    level: 2,
    xFrac: 0.12,
    color: "rgba(251,113,133,0.9)",
    connectedTo: ["ai-lead"],
    entranceDelay: 0.36,
  },
  {
    id: "backend-eng",
    initials: "BE",
    title: "Backend Engineer",
    department: "Engineering",
    bio: "Building robust APIs and microservices that power the platform.",
    level: 2,
    xFrac: 0.40,
    color: "rgba(52,211,153,0.9)",
    connectedTo: ["ai-lead"],
    entranceDelay: 0.42,
  },
  {
    id: "cloud-eng",
    initials: "CE",
    title: "Cloud Engineer",
    department: "Platform Engineering",
    bio: "Architecting multi-cloud infrastructure with cost and reliability focus.",
    level: 2,
    xFrac: 0.62,
    color: "rgba(251,191,36,0.9)",
    connectedTo: ["tpm"],
    entranceDelay: 0.48,
  },
  {
    id: "fullstack-eng",
    initials: "FS",
    title: "Full Stack Engineer",
    department: "Engineering",
    bio: "Delivering end-to-end features across frontend, backend, and cloud.",
    level: 2,
    xFrac: 0.88,
    color: "rgba(244,63,94,0.9)",
    connectedTo: ["tpm"],
    entranceDelay: 0.54,
  },
];

const EDGES: [string, string][] = [
  ["ceo", "ai-lead"],
  ["ceo", "tpm"],
  ["ai-lead", "ml-eng"],
  ["ai-lead", "backend-eng"],
  ["tpm", "cloud-eng"],
  ["tpm", "fullstack-eng"],
];

const CARD_W = 196;
const CARD_H = 268;
const LEVEL_Y = [0, 344, 688];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isConnectedTo(memberId: string, hoveredId: string | null): boolean {
  if (!hoveredId) return true;
  if (memberId === hoveredId) return true;
  const member = MEMBERS.find((m) => m.id === memberId);
  return member?.connectedTo.includes(hoveredId) ?? false;
}

function getPath(fromId: string, toId: string, w: number): string {
  const from = MEMBERS.find((m) => m.id === fromId)!;
  const to = MEMBERS.find((m) => m.id === toId)!;
  const ax = from.xFrac * w;
  const ay = LEVEL_Y[from.level] + CARD_H;
  const bx = to.xFrac * w;
  const by = LEVEL_Y[to.level];
  const midY = (ay + by) / 2;
  return `M ${ax} ${ay} C ${ax} ${midY}, ${bx} ${midY}, ${bx} ${by}`;
}

// ─── Member Card (Desktop) ────────────────────────────────────────────────────

function MemberCard({
  member,
  containerWidth,
  hoveredId,
  onHover,
}: {
  member: Member;
  containerWidth: number;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}) {
  const x = member.xFrac * containerWidth;
  const isActive = isConnectedTo(member.id, hoveredId);
  const isSelf = hoveredId === member.id;

  return (
    <motion.div
      className="absolute"
      style={{
        left: x - CARD_W / 2,
        top: LEVEL_Y[member.level],
        width: CARD_W,
        zIndex: isSelf ? 10 : 1,
      }}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: member.entranceDelay, ease: easeOutExpo }}
    >
      <motion.div
        animate={{ opacity: isActive ? 1 : 0.15, y: isSelf ? -6 : 0 }}
        transition={{ duration: 0.26, ease: [0.25, 0.46, 0.45, 0.94] }}
        onMouseEnter={() => onHover(member.id)}
        onMouseLeave={() => onHover(null)}
        className="group relative cursor-pointer rounded-2xl p-px"
      >
        {/* Gradient border */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
          style={{
            background: `linear-gradient(135deg, ${alpha(member.color, isSelf ? 0.62 : 0.38)} 0%, rgba(255,255,255,0.05) 50%, transparent 100%)`,
          }}
        />

        {/* Card body */}
        <div
          className="relative rounded-[calc(1rem-1px)] px-5 py-6 text-center"
          style={{
            background: `radial-gradient(ellipse 90% 60% at 50% 0%, ${alpha(member.color, 0.14)} 0%, transparent 55%), rgba(8,3,22,0.97)`,
            backdropFilter: "blur(10px)",
          }}
        >
          {/* Avatar */}
          <div className="mb-4 flex justify-center">
            <div
              className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-2 text-[13px] font-bold tracking-wide"
              style={{
                borderColor: alpha(member.color, 0.4),
                background: alpha(member.color, 0.1),
                color: member.color,
                boxShadow: `0 0 18px ${alpha(member.color, isSelf ? 0.4 : 0.18)}, inset 0 0 12px ${alpha(member.color, 0.06)}`,
              }}
            >
              {member.photo ? (
                <Image
                  src={member.photo}
                  alt={member.name ?? member.title}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              ) : (
                member.initials
              )}
            </div>
          </div>

          {/* Name (real) or placeholder bars (generic) */}
          <div className="mb-3 flex flex-col items-center gap-1.5">
            {member.name ? (
              <>
                <p className="text-[13px] font-semibold leading-tight text-white/88">
                  {member.name}
                </p>
              </>
            ) : (
              <>
                <div className="h-2.5 w-24 rounded-full" style={{ background: "rgba(255,255,255,0.14)" }} />
                <div className="h-2 w-16 rounded-full" style={{ background: "rgba(255,255,255,0.07)" }} />
              </>
            )}
          </div>

          {/* Role */}
          <p
            className="mb-2.5 text-[13px] font-semibold leading-tight tracking-wide"
            style={{ color: member.color }}
          >
            {member.title}
          </p>

          {/* Bio */}
          <p className={`mb-4 text-[12px] leading-relaxed text-white/36 ${isSelf ? "" : "line-clamp-2"}`}>
            {member.bio}
          </p>

          {/* Dept tag */}
          <div className="flex justify-center">
            <div
              className="inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest"
              style={{
                background: alpha(member.color, 0.07),
                border: `1px solid ${alpha(member.color, 0.2)}`,
                color: alpha(member.color, 0.65),
              }}
            >
              {member.department}
            </div>
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          className="pointer-events-none absolute bottom-0 left-4 right-4 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `linear-gradient(90deg, transparent, ${member.color}, transparent)`,
          }}
        />
      </motion.div>
    </motion.div>
  );
}

// ─── Connection SVG ───────────────────────────────────────────────────────────

function ConnectionLayer({
  containerWidth,
  hoveredId,
}: {
  containerWidth: number;
  hoveredId: string | null;
}) {
  const totalH = LEVEL_Y[2] + CARD_H;

  return (
    <svg
      className="pointer-events-none absolute inset-0"
      width={containerWidth}
      height={totalH}
      viewBox={`0 0 ${containerWidth} ${totalH}`}
      style={{ overflow: "visible" }}
    >
      {EDGES.map(([fromId, toId], i) => {
        const isActive = hoveredId
          ? fromId === hoveredId || toId === hoveredId
          : false;
        const toMember = MEMBERS.find((m) => m.id === toId)!;
        const strokeColor = isActive
          ? alpha(toMember.color, 0.72)
          : "rgba(255,255,255,0.07)";

        return (
          <motion.path
            key={`${fromId}-${toId}`}
            d={getPath(fromId, toId, containerWidth)}
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: { duration: 1.5, delay: 0.45 + i * 0.14, ease: easeOutExpo },
              opacity: { duration: 0.4, delay: 0.4 + i * 0.1 },
            }}
            style={{
              stroke: strokeColor,
              strokeWidth: isActive ? 1.5 : 1,
              transition: "stroke 0.25s ease, stroke-width 0.25s ease",
            }}
          />
        );
      })}
    </svg>
  );
}

// ─── Desktop Graph ────────────────────────────────────────────────────────────

function TeamGraph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const totalH = LEVEL_Y[2] + CARD_H;

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: totalH }}>
      {containerWidth > 0 && (
        <>
          <ConnectionLayer containerWidth={containerWidth} hoveredId={hoveredId} />
          {MEMBERS.map((member) => (
            <MemberCard
              key={member.id}
              member={member}
              containerWidth={containerWidth}
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </>
      )}
    </div>
  );
}

// ─── Mobile Card ──────────────────────────────────────────────────────────────

function MobileMemberCard({ member, index }: { member: Member; index: number }) {
  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl p-px"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: easeOutExpo }}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background: `linear-gradient(135deg, ${alpha(member.color, 0.38)} 0%, rgba(255,255,255,0.04) 50%, transparent 100%)`,
        }}
      />
      <div
        className="relative rounded-[calc(1rem-1px)] p-5"
        style={{
          background: `radial-gradient(ellipse 70% 55% at 10% 0%, ${alpha(member.color, 0.11)} 0%, transparent 55%), rgba(8,3,22,0.97)`,
        }}
      >
        <div className="flex items-center gap-4">
          <div
            className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 text-[12px] font-bold"
            style={{
              borderColor: alpha(member.color, 0.4),
              background: alpha(member.color, 0.1),
              color: member.color,
              boxShadow: `0 0 14px ${alpha(member.color, 0.2)}`,
            }}
          >
            {member.photo ? (
              <Image
                src={member.photo}
                alt={member.name ?? member.title}
                fill
                className="object-cover"
                sizes="56px"
              />
            ) : (
              member.initials
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p
              className="mb-0.5 truncate text-[10px] font-medium uppercase tracking-widest"
              style={{ color: alpha(member.color, 0.6) }}
            >
              {member.department}
            </p>
            {member.name && (
              <p className="mb-0.5 truncate text-[13px] font-semibold text-white/88">
                {member.name}
              </p>
            )}
            <p
              className="text-[13px] font-semibold leading-tight"
              style={{ color: member.color }}
            >
              {member.title}
            </p>
          </div>
        </div>
        <p className="mt-3 text-[13px] leading-relaxed text-white/38">
          {member.bio}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TeamPage() {
  return (
    <main
      className="min-h-screen"
      style={{
        background:
          "radial-gradient(ellipse 160% 80% at 18% 0%, #031c24 0%, #060b1a 48%, #040810 100%)",
      }}
    >
      {/* Grain */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[0]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
          backgroundSize: "160px 160px",
          opacity: 0.06,
          mixBlendMode: "screen",
        }}
        animate={{ backgroundPosition: ["0% 0%", "-5% -8%", "6% 4%", "0% 0%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      {/* Cyan bloom */}
      <motion.div
        className="pointer-events-none fixed z-[0]"
        style={{
          left: "-8%",
          top: "5%",
          width: "55vw",
          height: "65vh",
          background: "radial-gradient(ellipse 50% 55% at 44% 40%, rgba(6,182,212,0.14) 0%, transparent 68%)",
          filter: "blur(110px)",
        }}
        animate={{ x: [0, 24, 0], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Violet bloom */}
      <motion.div
        className="pointer-events-none fixed z-[0]"
        style={{
          right: "-6%",
          bottom: "10%",
          width: "44vw",
          height: "52vh",
          background: "radial-gradient(ellipse 52% 48% at 52% 46%, rgba(139,92,246,0.12) 0%, transparent 68%)",
          filter: "blur(90px)",
        }}
        animate={{ x: [0, -18, 0], opacity: [0.45, 0.72, 0.45] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 6 }}
      />

      <div className="relative z-[1] mx-auto max-w-6xl px-6 pb-28 pt-28">

        {/* Back nav */}
        <motion.div
          initial={{ opacity: 0, x: -14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: easeOutExpo }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-[12px] text-white/38 transition-colors duration-200 hover:text-white/70"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Home
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          className="mb-16 mt-10"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, delay: 0.06, ease: easeOutExpo }}
        >
          <div className="mb-5 flex">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-[11px] font-medium uppercase tracking-widest text-white/45 backdrop-blur-sm">
              <span
                className="h-1.5 w-1.5 rounded-full bg-cyan-400"
                style={{ boxShadow: "0 0 6px rgba(6,182,212,0.9)" }}
              />
              The People
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Built by a team that{" "}
            <motion.span
              className="inline-block bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400 bg-clip-text text-transparent"
              style={{ backgroundSize: "200% 100%" }}
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              ships.
            </motion.span>
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-white/30">
            Engineers, architects, and operators who&apos;ve built and run cloud-scale
            systems. No bloat — just people who get things done.
          </p>
        </motion.div>

        {/* Desktop: connected graph */}
        <div className="hidden lg:block">
          <TeamGraph />
        </div>

        {/* Mobile: stacked list */}
        <div className="flex flex-col gap-4 lg:hidden">
          {MEMBERS.map((member, i) => (
            <MobileMemberCard key={member.id} member={member} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-20 flex flex-col items-center gap-5 border-t border-white/[0.06] pt-16 text-center"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, ease: easeOutExpo }}
        >
          <div
            className="flex h-12 w-12 items-center justify-center rounded-2xl border"
            style={{
              borderColor: "rgba(6,182,212,0.25)",
              background: "rgba(6,182,212,0.08)",
              boxShadow: "0 0 20px rgba(6,182,212,0.1)",
            }}
          >
            <span className="text-xl">🚀</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white/88">
              We&apos;re still growing.
            </h3>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/36">
              If you want to build something that actually matters, check out our
              open roles.
            </p>
          </div>
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            style={{
              borderColor: "rgba(6,182,212,0.35)",
              background: "rgba(6,182,212,0.08)",
              color: "rgba(6,182,212,0.9)",
            }}
          >
            View Open Roles
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

      </div>
    </main>
  );
}
