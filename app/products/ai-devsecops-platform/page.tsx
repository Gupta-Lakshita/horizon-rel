"use client";

import ProductPageTemplate from "@/components/ProductPageTemplate";
import DevSecOpsVisual from "@/components/product-visuals/DevSecOpsVisual";
import {
  GitBranch, ScanLine, ShieldCheck, Gauge, LayoutDashboard, ScrollText,
} from "lucide-react";
import type { ProductPageData } from "@/components/ProductPageTemplate";

const PRIMARY   = "rgba(0,185,95,1)";
const SECONDARY = "rgba(13,148,136,1)";

const data: ProductPageData = {
  name: "AI DevSecOps Platform",
  tagline: "Faster releases. No security trade-offs.",
  hook: "Self-service pipelines that teams actually use. Security that doesn't slow them down. One platform where speed and safety are the same thing.",
  pill: "DevSecOps Platform",
  primaryColor: PRIMARY,
  secondaryColor: SECONDARY,
  problem:
    "Engineering teams context-switch between five different tools just to ship a feature. Security is an afterthought tacked on at the end — which means vulnerabilities, rework, and release bottlenecks. Horizon Relevance gives every developer a self-service, policy-compliant pipeline from day one, with automated scanning and governance built in, not bolted on.",
  capabilities: [
    {
      icon: GitBranch,
      title: "Self-Service CI/CD Pipelines",
      description: "Developers spin up production-grade, policy-compliant pipelines in minutes — no platform team ticket required.",
    },
    {
      icon: ScanLine,
      title: "Automated Security Scanning",
      description: "Every push triggers SAST, container scanning, and secrets detection — before the merge, not after.",
    },
    {
      icon: ShieldCheck,
      title: "Policy Gates & Controls",
      description: "OPA-based policies enforce your security standards at every stage. Non-compliant builds don't ship.",
    },
    {
      icon: Gauge,
      title: "Vulnerability Insights Dashboard",
      description: "A live view of risk across every pipeline — severity, age, owner, and remediation status in one pane.",
    },
    {
      icon: LayoutDashboard,
      title: "Developer Experience First",
      description: "Inline fix suggestions, zero-config onboarding, and GitHub/GitLab native integrations that disappear into the workflow.",
    },
    {
      icon: ScrollText,
      title: "Release Evidence & Audit Trail",
      description: "Every deployment generates a signed, timestamped evidence package — ready for your next compliance audit.",
    },
  ],
  outcomes: [
    {
      metric: "3×",
      industry: "FinTech",
      result: "3× faster developer deployments after replacing a fragmented 6-tool CI chain with the platform.",
    },
    {
      metric: "75%",
      industry: "Enterprise",
      result: "75% fewer manual security reviews — policy gates automated what used to take a full security team.",
    },
  ],
  cta: "Book a Demo",
  visual: <DevSecOpsVisual />,
};

export default function Page() {
  return <ProductPageTemplate data={data} />;
}
