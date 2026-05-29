"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;
const ease = [0.25, 0.46, 0.45, 0.94] as const;

const SECTIONS = [
  { id: "intro",      number: "01", label: "Home",       color: "rgba(52,211,153,0.9)"  },
  { id: "platform",   number: "02", label: "Platform",   color: "rgba(232,72,212,0.9)"  },
  { id: "products",   number: "03", label: "Products",   color: "rgba(96,165,250,0.9)"  },
  { id: "services",   number: "04", label: "Services",   color: "rgba(244,63,94,0.9)"   },
  { id: "why-us",     number: "05", label: "Why Us",     color: "rgba(168,85,247,0.9)"  },
  { id: "industries", number: "06", label: "Industries", color: "rgba(99,102,241,0.9)"  },
  { id: "company",    number: "07", label: "Company",    color: "rgba(251,113,133,0.9)" },
  { id: "contact",    number: "08", label: "Contact",    color: "rgba(16,185,129,0.9)"  },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

const PRODUCTS_COLOR = "rgba(96,165,250,0.9)";

export default function SectionIndex() {
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage    = pathname === "/";
  const isProductPage = pathname.startsWith("/products/");

  const [scrollActiveId, setScrollActiveId] = useState<SectionId>("intro");
  const [hoveredId, setHoveredId] = useState<SectionId | null>(null);

  // Home: scroll-detected · Product pages: pin "products" · Everything else: no glow
  const activeId: SectionId | null = isProductPage
    ? "products"
    : isHomePage
      ? scrollActiveId
      : null;

  useEffect(() => {
    if (!isHomePage) return; // observer only meaningful on home page

    const elements = SECTIONS.map(({ id }) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setScrollActiveId(visible[0].target.id as SectionId);
      },
      { rootMargin: "-38% 0px -38% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHomePage]);

  const handleClick = useCallback(
    (id: string) => {
      if (isHomePage) {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push(`/#${id}`);
      }
    },
    [isHomePage, router],
  );

  const activeIndex = activeId !== null ? SECTIONS.findIndex((s) => s.id === activeId) : -1;
  const activeColor = activeId !== null
    ? (SECTIONS.find((s) => s.id === activeId)?.color ?? "rgba(167,139,250,0.9)")
    : "rgba(167,139,250,0)";

  return (
    <aside className="fixed left-7 top-1/2 z-40 hidden -translate-y-1/2 xl:flex">
      <div className="relative flex select-none flex-col">

        {/* Vertical rail */}
        <div className="absolute left-[7px] top-3 h-[calc(100%-24px)] w-px overflow-hidden">
          <div className="h-full w-full bg-white/[0.09]" />
          <motion.div
            className="absolute left-0 w-full rounded-full"
            style={{
              height: 32,
              background: `linear-gradient(to bottom, ${activeColor.replace("0.9)", "0.7)")}, ${activeColor.replace("0.9)", "0.35)")}, transparent)`,
            }}
            animate={{ top: `${Math.max(activeIndex, 0) * 52 + 10}px`, opacity: activeId !== null ? 1 : 0 }}
            transition={{ duration: 0.55, ease: easeOutExpo }}
          />
        </div>

        {/* Section items */}
        {SECTIONS.map(({ id, number, label, color }) => {
          const isActive = activeId !== null && activeId === id;
          const isHovered = hoveredId === id;
          const ringColor = (color as string).replace("0.9)", "0.28)");
          const glowHard = (color as string).replace("0.9)", "0.85)");
          const glowSoft = (color as string).replace("0.9)", "0.32)");

          return (
            <button
              key={id}
              onClick={() => handleClick(id)}
              onMouseEnter={() => setHoveredId(id as SectionId)}
              onMouseLeave={() => setHoveredId(null)}
              aria-label={`Go to ${label}`}
              className="group relative flex h-[52px] items-center gap-4 text-left focus:outline-none"
            >
              {/* Dot */}
              <div className="relative z-10 flex h-[15px] w-[15px] flex-shrink-0 items-center justify-center">
                {/* Pulse ring */}
                <motion.div
                  className="absolute rounded-full border"
                  style={{ width: 8, height: 8, borderColor: ringColor }}
                  animate={
                    isActive
                      ? { scale: [1, 2.6], opacity: [0.55, 0] }
                      : { scale: 1, opacity: 0 }
                  }
                  transition={
                    isActive
                      ? { duration: 2, repeat: Infinity, ease: "easeOut", repeatDelay: 0.6 }
                      : { duration: 0.2 }
                  }
                />
                {/* Core dot */}
                <motion.div
                  className="rounded-full"
                  animate={
                    isActive
                      ? {
                          width: 7,
                          height: 7,
                          backgroundColor: color as string,
                          boxShadow: `0 0 10px ${glowHard}, 0 0 22px ${glowSoft}`,
                        }
                      : isHovered
                        ? { width: 5, height: 5, backgroundColor: "rgba(255,255,255,0.4)", boxShadow: "none" }
                        : { width: 4, height: 4, backgroundColor: "rgba(255,255,255,0.16)", boxShadow: "none" }
                  }
                  transition={{ duration: 0.32, ease }}
                />
              </div>

              {/* Text */}
              <div className="flex items-baseline gap-2">
                <motion.span
                  className="font-mono text-[9px] tabular-nums leading-none tracking-widest"
                  animate={{
                    color: isActive
                      ? "rgba(255,255,255,0.9)"
                      : isHovered
                        ? "rgba(255,255,255,0.42)"
                        : "rgba(255,255,255,0.2)",
                  }}
                  transition={{ duration: 0.28, ease }}
                >
                  {number}
                </motion.span>
                <motion.span
                  className="text-[10px] font-medium leading-none tracking-[0.16em]"
                  style={{ textTransform: "uppercase" }}
                  animate={{
                    color: isActive
                      ? "rgba(255,255,255,0.65)"
                      : isHovered
                        ? "rgba(255,255,255,0.32)"
                        : "rgba(255,255,255,0.14)",
                    x: isActive ? 3 : 0,
                  }}
                  transition={{ duration: 0.32, ease }}
                >
                  {label}
                </motion.span>
              </div>

              {/* Hover cursor line */}
              <motion.div
                className="absolute left-[-6px] top-1/2 h-px -translate-y-1/2 bg-white/30"
                animate={{ width: isHovered && !isActive ? 5 : 0, opacity: isHovered && !isActive ? 1 : 0 }}
                transition={{ duration: 0.2, ease }}
              />
            </button>
          );
        })}
      </div>
    </aside>
  );
}
