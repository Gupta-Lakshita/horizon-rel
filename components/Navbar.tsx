"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  AnimatePresence,
} from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ArrowUpRight } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

type NavLabel = { label: string; color: string; hash: string | null; page: string | null };

const NAV_LABELS: NavLabel[] = [
  { label: "Products", hash: "products", page: null,       color: "rgba(96,165,250,0.9)"  },
  { label: "Why Us",   hash: "why-us",   page: null,       color: "rgba(168,85,247,0.9)"  },
  { label: "Company",  hash: "company",  page: null,       color: "rgba(244,63,94,0.9)"   },
  { label: "Team",     hash: null,       page: "/team",    color: "rgba(232,72,212,0.9)"  },
  { label: "Blog",     hash: null,       page: "/blog",    color: "rgba(251,113,133,0.9)" },
  { label: "Careers",  hash: null,       page: "/careers", color: "rgba(52,211,153,0.9)"  },
  { label: "Contact",  hash: "contact",  page: null,       color: "rgba(16,185,129,0.9)"  },
];

const PRODUCTS_DROPDOWN = [
  { label: "AI-Powered Secure SDLC",           href: "/products/ai-powered-secure-sdlc",         num: "01", color: "rgba(0,195,220,0.9)"   },
  { label: "AI DevSecOps Platform",             href: "/products/ai-devsecops-platform",           num: "02", color: "rgba(0,185,95,0.9)"    },
  { label: "AI Monitoring & Incident Response", href: "/products/ai-monitoring-incident-response", num: "03", color: "rgba(245,158,11,0.9)"  },
  { label: "Cloud Migration & Modernization",   href: "/products/cloud-migration-modernization",   num: "04", color: "rgba(244,63,94,0.9)"   },
  { label: "Cloud Cost Optimization",           href: "/products/cloud-cost-optimization",         num: "05", color: "rgba(167,139,250,0.9)" },
] as const;

// All sections on the home page + which nav hash they activate (null = no highlight)
const ALL_SECTIONS = [
  { id: "intro",      navHash: null       },
  { id: "platform",   navHash: null       },
  { id: "products",   navHash: "products" },
  { id: "services",   navHash: null       },
  { id: "why-us",     navHash: "why-us"   },
  { id: "industries", navHash: null       },
  { id: "company",    navHash: "company"  },
  { id: "contact",    navHash: "contact"  },
] as const;

// ─── Easing ───────────────────────────────────────────────────────────────────

const ease = [0.25, 0.46, 0.45, 0.94] as const;
const easeOutExpo = [0.16, 1, 0.3, 1] as const;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function alpha(color: string, a: number) {
  return color.replace(/[\d.]+\)$/, `${a})`);
}

// ─── NavLink ──────────────────────────────────────────────────────────────────

function NavLink({
  label,
  href,
  isActive,
  color,
}: {
  label: string;
  href: string;
  isActive: boolean;
  color: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      className="relative rounded-full px-3.5 py-1.5 text-sm font-medium"
      style={{
        color: isActive
          ? "rgba(255,255,255,0.92)"
          : hovered
            ? "rgba(255,255,255,0.72)"
            : "rgba(255,255,255,0.45)",
        transition: "color 0.22s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Active frosted pill — shared layoutId slides between tabs */}
      {isActive && (
        <motion.div
          layoutId="nav-active-pill"
          className="absolute inset-0 rounded-full"
          style={{
            background: alpha(color, 0.13),
            border: `1px solid ${alpha(color, 0.38)}`,
            boxShadow: `0 0 20px ${alpha(color, 0.22)}, inset 0 0 12px ${alpha(color, 0.07)}`,
          }}
          transition={{ duration: 0.42, ease: easeOutExpo }}
        />
      )}

      {/* Hover ghost pill (inactive only) */}
      {!isActive && (
        <span
          className="absolute inset-0 rounded-full border border-white/[0.09] bg-white/[0.04]"
          style={{
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.15s ease",
          }}
        />
      )}

      <span className="relative z-10">{label}</span>
    </Link>
  );
}

// ─── ProductsNavItem ──────────────────────────────────────────────────────────

function ProductsNavItem({ isActive, color }: { isActive: boolean; color: string }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const handleEnter = () => {
    clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 130);
  };

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button
        className="relative flex items-center gap-1 rounded-full px-3.5 py-1.5 text-sm font-medium"
        style={{
          color: isActive || open ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.45)",
          transition: "color 0.22s ease",
        }}
      >
        {isActive && (
          <motion.div
            layoutId="nav-active-pill"
            className="absolute inset-0 rounded-full"
            style={{
              background: alpha(color, 0.13),
              border: `1px solid ${alpha(color, 0.38)}`,
              boxShadow: `0 0 20px ${alpha(color, 0.22)}, inset 0 0 12px ${alpha(color, 0.07)}`,
            }}
            transition={{ duration: 0.42, ease: easeOutExpo }}
          />
        )}
        {!isActive && (
          <span
            className="absolute inset-0 rounded-full border border-white/[0.09] bg-white/[0.04]"
            style={{ opacity: open ? 1 : 0, transition: "opacity 0.15s ease" }}
          />
        )}
        <span className="relative z-10">Products</span>
        <motion.span
          className="relative z-10 flex items-center"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22, ease }}
        >
          <ChevronDown className="h-3 w-3 opacity-55" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.2, ease: easeOutExpo }}
            className="absolute left-1/2 top-full mt-2 w-72 -translate-x-1/2"
            style={{
              background: "rgba(8,8,14,0.94)",
              border: "1px solid rgba(255,255,255,0.10)",
              borderRadius: 16,
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow: "0 24px 64px rgba(0,0,0,0.65), inset 0 0 0 1px rgba(255,255,255,0.05)",
            }}
          >
            <div className="p-2">
              {PRODUCTS_DROPDOWN.map((product) => (
                <Link
                  key={product.href}
                  href={product.href}
                  className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-150 hover:bg-white/[0.05]"
                >
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold"
                    style={{
                      background: alpha(product.color, 0.12),
                      color: product.color,
                      border: `1px solid ${alpha(product.color, 0.25)}`,
                    }}
                  >
                    {product.num}
                  </span>
                  <span className="flex-1 text-[13px] font-medium text-white/60 transition-colors duration-150 group-hover:text-white/88">
                    {product.label}
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-white/18 transition-colors duration-150 group-hover:text-white/45" />
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── HamburgerButton ──────────────────────────────────────────────────────────

function HamburgerButton({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="relative flex h-8 w-8 flex-col items-center justify-center gap-[5px] rounded-md focus:outline-none md:hidden"
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      <motion.span
        className="block h-px w-5 rounded-full bg-white/75"
        animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.32, ease }}
      />
      <motion.span
        className="block h-px w-5 rounded-full bg-white/75"
        animate={isOpen ? { opacity: 0, scaleX: 0.4 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.22, ease }}
      />
      <motion.span
        className="block h-px w-5 rounded-full bg-white/75"
        animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.32, ease }}
      />
    </button>
  );
}

// ─── CTAButton ────────────────────────────────────────────────────────────────

function CTAButton({ onClick }: { onClick?: () => void }) {
  return (
    <motion.a
      href="/#contact"
      onClick={onClick}
      className="relative inline-flex cursor-pointer select-none items-center overflow-hidden rounded-full border px-5 py-2 text-sm font-semibold text-white/88 backdrop-blur-sm"
      style={{
        borderColor: "rgba(167,139,250,0.30)",
        background: "rgba(139,92,246,0.08)",
      }}
      whileHover={{
        borderColor: "rgba(167,139,250,0.52)",
        background: "rgba(139,92,246,0.16)",
        boxShadow: "0 0 22px rgba(139,92,246,0.28), inset 0 0 12px rgba(139,92,246,0.06)",
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.22, ease }}
    >
      <motion.span
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.09] to-transparent"
        initial={{ x: "-120%" }}
        whileHover={{ x: "140%" }}
        transition={{ duration: 0.55, ease }}
      />
      <span className="relative z-10">Book a Demo</span>
    </motion.a>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [activeHash, setActiveHash] = useState<string | null>(null);
  const pathname = usePathname();
  const isProductPage = pathname.startsWith("/products/");

  const { scrollY } = useScroll();
  const bgOpacity     = useTransform(scrollY, [0, 80], [0, 0.82]);
  const blurAmount    = useTransform(scrollY, [0, 80], [0, 14]);
  const borderOpacity = useTransform(scrollY, [0, 80], [0.07, 0.16]);
  const shadowOpacity = useTransform(scrollY, [0, 80], [0, 0.45]);
  const navHeight     = useTransform(scrollY, [0, 80], [56, 46]);

  const background     = useMotionTemplate`rgba(8, 8, 14, ${bgOpacity})`;
  const backdropFilter = useMotionTemplate`blur(${blurAmount}px)`;
  const boxShadow      = useMotionTemplate`0 8px 40px rgba(0, 0, 0, ${shadowOpacity}), inset 0 0 0 1px rgba(255, 255, 255, ${borderOpacity})`;

  // Scroll-based active section detection (home page only)
  useEffect(() => {
    if (isProductPage) return;

    const elements = ALL_SECTIONS
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          const hit = ALL_SECTIONS.find((s) => s.id === visible[0].target.id);
          setActiveHash(hit?.navHash ?? null);
        }
      },
      { rootMargin: "-38% 0px -38% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isProductPage]);

  // On product pages: always highlight Products tab
  const activeNavHash = isProductPage ? "products" : activeHash;

  // Nav links — page links are direct paths; hash links are prefixed on non-home pages
  const navLinks = NAV_LABELS.map(({ label, hash, page, color }) => ({
    label,
    href: page ?? (hash ? (pathname === "/" ? `#${hash}` : `/#${hash}`) : "/"),
    hash,
    color,
    isPage: page !== null,
  }));

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <motion.div
        className="pointer-events-auto w-full max-w-5xl"
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.75, ease: easeOutExpo, delay: 0.12 }}
      >
        {/* overflow-hidden removed so the Products dropdown can render outside nav bounds */}
        <motion.nav
          style={{ background, backdropFilter, WebkitBackdropFilter: backdropFilter, boxShadow }}
          animate={{ borderRadius: mobileOpen ? 20 : 9999 }}
          transition={{ duration: 0.38, ease }}
        >
          {/* Header row */}
          <motion.div
            className="flex items-center justify-between px-4 sm:px-5"
            style={{ height: navHeight }}
          >
            {/* Logo */}
            <Link href="/" className="shrink-0">
              <motion.span
                className="flex select-none items-center gap-2"
                whileHover={{ opacity: 0.82 }}
                transition={{ duration: 0.2 }}
              >
                <svg width="20" height="20" viewBox="0 0 100 100" aria-hidden>
                  <rect width="100" height="100" rx="22" fill="rgba(7,3,20,0.6)" />
                  <path d="M28 54 A22 22 0 0 1 72 54 Z" fill="oklch(0.66 0.18 290)" />
                  <rect x="14" y="60" width="72" height="7" rx="3.5" fill="rgba(255,255,255,0.88)" />
                </svg>
                <span
                  className="text-[14px] leading-none tracking-tight text-white"
                  style={{ fontFamily: "var(--font-plus-jakarta)", fontWeight: 800 }}
                >
                  Horizon
                  <span
                    style={{
                      color: "oklch(0.66 0.18 290)",
                      textShadow: "0 0 18px oklch(0.66 0.18 290 / 0.55)",
                    }}
                  >
                    Relevance
                  </span>
                </span>
              </motion.span>
            </Link>

            {/* Desktop tabs */}
            <nav className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) =>
                link.hash === "products" ? (
                  <ProductsNavItem
                    key={link.label}
                    isActive={activeNavHash === "products"}
                    color={link.color}
                  />
                ) : (
                  <NavLink
                    key={link.label}
                    label={link.label}
                    href={link.href}
                    isActive={link.isPage ? pathname === link.href : activeNavHash === link.hash}
                    color={link.color}
                  />
                )
              )}
            </nav>

            {/* CTA + Mobile toggle */}
            <div className="flex items-center gap-3">
              <div className="hidden md:block">
                <CTAButton />
              </div>
              <HamburgerButton isOpen={mobileOpen} onClick={() => setMobileOpen((v) => !v)} />
            </div>
          </motion.div>

          {/* Mobile dropdown */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                key="mobile-menu"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.38, ease }}
                className="overflow-hidden md:hidden"
              >
                <div className="border-t border-white/[0.07] px-4 pb-5 pt-3">
                  <div className="flex flex-col gap-0.5">
                    {navLinks.map((link, i) => {
                      if (link.hash === "products") {
                        const isActive = activeNavHash === "products";
                        return (
                          <motion.div
                            key={link.label}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.055, duration: 0.32, ease: easeOutExpo }}
                          >
                            <button
                              onClick={() => setMobileProductsOpen((v) => !v)}
                              className="flex w-full items-center gap-2.5 px-1 py-2.5 text-sm font-medium transition-colors duration-200"
                              style={{ color: isActive ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.45)" }}
                            >
                              <span
                                className="h-1.5 w-1.5 flex-shrink-0 rounded-full transition-all duration-300"
                                style={{
                                  background: isActive ? link.color : "rgba(255,255,255,0.15)",
                                  boxShadow: isActive ? `0 0 6px ${link.color}` : "none",
                                }}
                              />
                              <span className="flex-1 text-left">Products</span>
                              <motion.span
                                animate={{ rotate: mobileProductsOpen ? 180 : 0 }}
                                transition={{ duration: 0.22, ease }}
                                className="flex items-center"
                              >
                                <ChevronDown className="h-3.5 w-3.5 opacity-45" />
                              </motion.span>
                            </button>

                            <AnimatePresence>
                              {mobileProductsOpen && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.26, ease }}
                                  className="overflow-hidden"
                                >
                                  <div className="ml-4 border-l border-white/[0.08] pb-1 pl-3">
                                    {PRODUCTS_DROPDOWN.map((product) => (
                                      <Link
                                        key={product.href}
                                        href={product.href}
                                        onClick={() => setMobileOpen(false)}
                                        className="flex items-center gap-2.5 py-2 text-[13px] text-white/38 transition-colors duration-200 hover:text-white/70"
                                      >
                                        <span
                                          className="text-[10px] font-bold"
                                          style={{ color: alpha(product.color, 0.8) }}
                                        >
                                          {product.num}
                                        </span>
                                        {product.label}
                                      </Link>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        );
                      }

                      const isActive = link.isPage ? pathname === link.href : activeNavHash === link.hash;
                      return (
                        <motion.div
                          key={link.label}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.055, duration: 0.32, ease: easeOutExpo }}
                        >
                          <Link
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-2.5 px-1 py-2.5 text-sm font-medium transition-colors duration-200"
                            style={{ color: isActive ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.45)" }}
                          >
                            <span
                              className="h-1.5 w-1.5 flex-shrink-0 rounded-full transition-all duration-300"
                              style={{
                                background: isActive ? link.color : "rgba(255,255,255,0.15)",
                                boxShadow: isActive ? `0 0 6px ${link.color}` : "none",
                              }}
                            />
                            {link.label}
                          </Link>
                        </motion.div>
                      );
                    })}

                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: navLinks.length * 0.055, duration: 0.35, ease: easeOutExpo }}
                      className="pt-3"
                    >
                      <CTAButton onClick={() => setMobileOpen(false)} />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </motion.div>
    </div>
  );
}
