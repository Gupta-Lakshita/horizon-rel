"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

// ─── Right-column scenes — each has a distinct entry ─────────────────────────

function SceneVision() {
  return (
    <div className="py-16 lg:py-20">
      {/* Dot + label */}
      <motion.div
        className="mb-6 flex items-center gap-3"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "0px 0px -35% 0px" }}
        transition={{ duration: 0.6 }}
      >
        <span
          className="h-2 w-2 rounded-full bg-rose-400 shrink-0"
          style={{ boxShadow: "0 0 8px rgba(255,90,150,0.9)" }}
        />
        <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/30">
          Vision
        </span>
      </motion.div>

      {/* Expanding line — unique to Vision */}
      <motion.div
        className="mb-9 h-px"
        style={{
          background:
            "linear-gradient(90deg, rgba(215,50,125,0.7), rgba(215,50,125,0.15), transparent)",
        }}
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: 88, opacity: 1 }}
        viewport={{ once: true, margin: "0px 0px -35% 0px" }}
        transition={{ duration: 0.85, delay: 0.22, ease: easeOutExpo }}
      />

      {/* Headline — blur reveal */}
      <motion.h3
        className="mb-5 font-bold leading-tight text-white/92"
        style={{
          fontSize: "clamp(1.55rem, 2.6vw, 2.5rem)",
          letterSpacing: "-0.025em",
        }}
        initial={{ opacity: 0, filter: "blur(10px)", y: 12 }}
        whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        viewport={{ once: true, margin: "0px 0px -35% 0px" }}
        transition={{ duration: 1.1, delay: 0.1, ease: "easeOut" }}
      >
        Transform how the world builds in the cloud.
      </motion.h3>

      {/* Body — staggered after headline */}
      <motion.p
        className="max-w-[480px] text-[15px] leading-relaxed text-white/38"
        initial={{ opacity: 0, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "0px 0px -35% 0px" }}
        transition={{ duration: 1.0, delay: 0.38, ease: "easeOut" }}
      >
        We see a future where infrastructure is invisible, intelligent, and
        effortlessly scalable — freeing engineering teams to focus entirely on
        what they create.
      </motion.p>
    </div>
  );
}

function SceneMission() {
  return (
    <div className="py-16 lg:py-20">
      {/* Dot + label */}
      <motion.div
        className="mb-6 flex items-center gap-3"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "0px 0px -35% 0px" }}
        transition={{ duration: 0.55, ease: easeOutExpo }}
      >
        <span
          className="h-2 w-2 rounded-full bg-fuchsia-400 shrink-0"
          style={{ boxShadow: "0 0 8px rgba(220,80,220,0.9)" }}
        />
        <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/30">
          Mission
        </span>
      </motion.div>

      {/* Divider — fades in (not expanding), unique feel */}
      <motion.div
        className="mb-9 h-px w-[72px]"
        style={{
          background:
            "linear-gradient(90deg, rgba(180,40,215,0.65), transparent)",
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "0px 0px -35% 0px" }}
        transition={{ duration: 0.55, delay: 0.15 }}
      />

      {/* Headline — horizontal slide */}
      <motion.h3
        className="mb-5 font-bold leading-tight text-white/92"
        style={{
          fontSize: "clamp(1.55rem, 2.6vw, 2.5rem)",
          letterSpacing: "-0.025em",
        }}
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "0px 0px -35% 0px" }}
        transition={{ duration: 0.9, delay: 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        Be the intelligence layer behind cloud-native engineering.
      </motion.h3>

      {/* Body — slight delay after headline */}
      <motion.p
        className="max-w-[480px] text-[15px] leading-relaxed text-white/38"
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "0px 0px -35% 0px" }}
        transition={{ duration: 0.85, delay: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        We embed into teams adopting cloud, AI, and DevSecOps — delivering
        measurable outcomes from day one, not six months later.
      </motion.p>
    </div>
  );
}

function ScenePhilosophy() {
  return (
    <div className="py-16 lg:py-20">
      {/* Dot + label — slow deliberate fade */}
      <motion.div
        className="mb-6 flex items-center gap-3"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "0px 0px -35% 0px" }}
        transition={{ duration: 1.0 }}
      >
        <span
          className="h-2 w-2 rounded-full bg-violet-400 shrink-0"
          style={{ boxShadow: "0 0 8px rgba(148,100,255,0.9)" }}
        />
        <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/30">
          Philosophy
        </span>
      </motion.div>

      {/* No line — intentional negative space, meditative pause */}
      <div className="mb-9 h-px w-[72px] opacity-0" />

      {/* Headline — slower rise */}
      <motion.h3
        className="mb-5 font-bold leading-tight text-white/92"
        style={{
          fontSize: "clamp(1.55rem, 2.6vw, 2.5rem)",
          letterSpacing: "-0.025em",
        }}
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -35% 0px" }}
        transition={{ duration: 1.45, ease: "easeOut" }}
      >
        We don't consult from outside — we build from within.
      </motion.h3>

      {/* Body — slowest fade, feels like the final word */}
      <motion.p
        className="max-w-[480px] text-[15px] leading-relaxed text-white/38"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -35% 0px" }}
        transition={{ duration: 1.6, delay: 0.3, ease: "easeOut" }}
      >
        Engineering excellence, security-first thinking, and relentless
        automation aren't our services. They're our operating principles.
      </motion.p>
    </div>
  );
}

// ─── Company ──────────────────────────────────────────────────────────────────

export default function Company() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Left column drifts subtly as user scrolls — alive but calm
  const leftY = useTransform(scrollYProgress, [0, 1], [0, 48]);

  return (
    <section
      id="company"
      ref={sectionRef}
      className="relative" // NO overflow-hidden — sticky needs it absent
      style={{
        background:
          "radial-gradient(ellipse 150% 80% at 85% 0%, #280820 0%, #120214 50%, #08010a 100%)",
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
        animate={{ backgroundPosition: ["0% 0%", "-6% -9%", "7% 5%", "0% 0%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* Rose bloom */}
      <motion.div
        className="pointer-events-none absolute z-[0]"
        style={{
          right: "-8%", top: "-5%", width: "70vw", height: "90vh",
          background: "radial-gradient(ellipse 52% 55% at 55% 38%, rgba(215,45,125,0.26) 0%, rgba(175,25,105,0.1) 46%, transparent 68%)",
          filter: "blur(115px)",
        }}
        animate={{ x: [0, -28, 0], y: [0, 16, 0], opacity: [0.72, 1, 0.72] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute z-[0]"
        style={{
          left: "-6%", top: "20%", width: "52vw", height: "70vh",
          background: "radial-gradient(ellipse 54% 48% at 48% 44%, rgba(145,35,215,0.18) 0%, rgba(110,20,180,0.07) 50%, transparent 70%)",
          filter: "blur(100px)",
        }}
        animate={{ x: [0, 24, 0], opacity: [0.55, 0.88, 0.55] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />
      <motion.div
        className="pointer-events-none absolute z-[0]"
        style={{
          left: "22%", bottom: "8%", width: "38vw", height: "42vh",
          background: "radial-gradient(circle, rgba(220,50,190,0.14) 0%, transparent 60%)",
          filter: "blur(90px)",
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.42, 0.72, 0.42] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 8 }}
      />

      {/* Top edge */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[50] h-36 bg-gradient-to-b from-[#080412] to-transparent" />
      {/* Bottom edge */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[50] h-36 bg-gradient-to-t from-[#0e0414] to-transparent" />

      <div className="relative z-[3] mx-auto max-w-6xl px-6">
        <div className="flex gap-16 xl:gap-24">

          {/* ── LEFT: Sticky identity column ─────────────────────────────── */}
          <div className="hidden w-64 shrink-0 xl:block xl:w-72">
            <motion.div
              className="sticky top-0 flex h-screen flex-col justify-center"
              style={{ y: leftY }}
            >
              <div className="relative">
                {/* Ambient glow — slow drift behind the left content */}
                <motion.div
                  className="pointer-events-none absolute rounded-3xl"
                  style={{
                    inset: "-80px",
                    background:
                      "radial-gradient(ellipse 85% 75% at 35% 42%, rgba(215,50,125,0.18) 0%, rgba(145,35,215,0.08) 50%, transparent 70%)",
                    filter: "blur(55px)",
                  }}
                  animate={{
                    opacity: [0.65, 1, 0.65],
                    x: [-8, 8, -8],
                    y: [-5, 7, -5],
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />

                <div className="relative">
                  {/* HORIZON wordmark */}
                  <motion.div
                    className="mb-5"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.1, ease: easeOutExpo }}
                  >
                    <span
                      className="block font-black uppercase text-white"
                      style={{ fontSize: "clamp(1.2rem, 2vw, 1.75rem)", letterSpacing: "0.22em", lineHeight: 1.15 }}
                    >
                      HORIZON
                    </span>
                    <span
                      className="block font-black uppercase text-white/50"
                      style={{ fontSize: "clamp(1.2rem, 2vw, 1.75rem)", letterSpacing: "0.22em", lineHeight: 1.15 }}
                    >
                      RELEVANCE
                    </span>
                  </motion.div>

                  {/* Est. + location */}
                  <motion.div
                    className="mb-8 flex items-center gap-2.5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.28 }}
                  >
                    <span className="font-mono text-[11px] tracking-widest text-white/28">
                      Est. 2024
                    </span>
                    <span className="text-white/[0.12]">·</span>
                    <span className="font-mono text-[11px] tracking-wider text-white/18">
                      Woodbridge, NJ
                    </span>
                  </motion.div>

                  {/* Animated glowing divider */}
                  <motion.div
                    className="mb-8 h-px"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(215,50,125,0.75), rgba(145,40,215,0.45), transparent)",
                    }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                    initial={{ opacity: 0, scaleX: 0, originX: 0 }}
                    whileInView={{ opacity: 0.5, scaleX: 1 }}
                    viewport={{ once: true }}
                  />

                  {/* Capability lines */}
                  <div className="flex flex-col gap-3.5">
                    {[
                      "AI + Cloud Platform",
                      "DevSecOps",
                      "Intelligent Infrastructure",
                    ].map((item, i) => (
                      <motion.div
                        key={item}
                        className="flex items-center gap-2.5"
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.65,
                          delay: 0.45 + i * 0.13,
                          ease: easeOutExpo,
                        }}
                      >
                        <span className="text-[13px] text-rose-400/55">→</span>
                        <span className="text-[13px] tracking-wide text-white/38">
                          {item}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA */}
                  <motion.div
                    className="mt-10 border-t border-white/[0.07] pt-7"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.9 }}
                  >
                    <motion.a
                      href="#contact"
                      className="inline-flex items-center gap-1.5 text-[12px] font-medium text-rose-400/50 hover:text-rose-400 transition-colors duration-200"
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.18 }}
                    >
                      Work with us
                      <ArrowUpRight className="h-3 w-3" />
                    </motion.a>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT: Scroll story ───────────────────────────────────────── */}
          <div className="flex-1 py-14 xl:py-52">

            {/* Mobile-only header */}
            <motion.div
              className="mb-12 xl:hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease: easeOutExpo }}
            >
              <div className="mb-3 flex items-center gap-2.5">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-rose-400"
                  style={{ boxShadow: "0 0 6px rgba(255,65,150,0.9)" }}
                />
                <span className="text-[11px] font-medium uppercase tracking-widest text-white/40">
                  Our Story
                </span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-white">
                Horizon Relevance
              </h2>
            </motion.div>

            {/* Three scenes — each with a distinct entry feel */}
            <SceneVision />

            {/* Thin separator between scenes */}
            <div className="my-2 ml-5 h-16 w-px bg-gradient-to-b from-white/[0.06] to-transparent" />

            <SceneMission />

            <div className="my-2 ml-5 h-16 w-px bg-gradient-to-b from-white/[0.06] to-transparent" />

            <ScenePhilosophy />
          </div>
        </div>
      </div>
    </section>
  );
}
