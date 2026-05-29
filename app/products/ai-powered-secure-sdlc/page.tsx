"use client";

import ProductPageTemplate from "@/components/ProductPageTemplate";
import SDLCVisual from "@/components/product-visuals/SDLCVisual";
import {
  ScanLine, Hammer, ShieldCheck, GitMerge, FileCheck2, BrainCircuit,
} from "lucide-react";
import type { ProductPageData } from "@/components/ProductPageTemplate";

const PRIMARY   = "rgba(0,195,220,1)";
const SECONDARY = "rgba(99,102,241,1)";

const data: ProductPageData = {
  name: "AI-Powered Secure SDLC",
  tagline: "Scan. Build. Validate. Release — securely, automatically.",
  hook: "Every pull request is a security checkpoint. Every release is an audited, compliance-signed artifact. No manual handoffs. No blind spots.",
  pill: "Secure SDLC",
  primaryColor: PRIMARY,
  secondaryColor: SECONDARY,
  problem:
    "Security teams are bottlenecks — reviewing code manually after the build is already done. Engineers commit blindly, vulnerabilities slip into production, and audit evidence is scattered across spreadsheets. The result: costly findings, delayed releases, and regulatory exposure. Horizon Relevance embeds security directly into the software delivery loop — no gates, no gates, just flow.",
  capabilities: [
    {
      icon: ScanLine,
      title: "Continuous Security Scanning",
      description: "SAST, DAST, and SCA scans run on every commit. Issues surface in the IDE, not post-deployment.",
    },
    {
      icon: Hammer,
      title: "Secure Build Pipelines",
      description: "Artifact signing, dependency lockdown, and provenance attestation baked into every build.",
    },
    {
      icon: ShieldCheck,
      title: "Compliance Validation Gates",
      description: "Policy-as-code gates enforce HIPAA, SOC 2, and PCI standards automatically — zero manual checks.",
    },
    {
      icon: BrainCircuit,
      title: "AI-Guided Remediation",
      description: "AI explains vulnerabilities in context and suggests precise fixes, cutting remediation time by 80%.",
    },
    {
      icon: GitMerge,
      title: "Unified DevSecOps Workflow",
      description: "Security reviews, approvals, and evidence generation happen inside your existing CI/CD toolchain.",
    },
    {
      icon: FileCheck2,
      title: "Audit-Ready Release Evidence",
      description: "Every release ships with a cryptographically signed audit trail — auditor-ready in one click.",
    },
  ],
  outcomes: [
    {
      metric: "3 days",
      industry: "Healthcare",
      result: "HIPAA-compliant pipelines stood up in 3 days — from discovery to production.",
    },
    {
      metric: "Zero",
      industry: "Enterprise",
      result: "Zero audit findings post-release across 40+ services in a regulated financial environment.",
    },
  ],
  cta: "Explore Secure SDLC",
  visual: <SDLCVisual />,
};

export default function Page() {
  return <ProductPageTemplate data={data} />;
}
