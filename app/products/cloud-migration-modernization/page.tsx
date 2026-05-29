"use client";

import ProductPageTemplate from "@/components/ProductPageTemplate";
import MigrationVisual from "@/components/product-visuals/MigrationVisual";
import {
  Map, Layers, FileCode2, TrendingDown, GitBranch, Cloud,
} from "lucide-react";
import type { ProductPageData } from "@/components/ProductPageTemplate";

const PRIMARY   = "rgba(244,63,94,1)";
const SECONDARY = "rgba(217,70,239,1)";

const data: ProductPageData = {
  name: "Cloud Migration & Modernization",
  tagline: "Move faster. Land cleaner. Control every step.",
  hook: "Migration projects stall when plans meet reality. Horizon Relevance orchestrates the entire lift — from dependency mapping to wave execution — with real-time visibility into every workload.",
  pill: "Cloud Migration",
  primaryColor: PRIMARY,
  secondaryColor: SECONDARY,
  problem:
    "Enterprise migrations fail not because of technology, but because of coordination: discovery gaps, manual runbooks, dependency surprises, and runaway costs during the transition. Teams hand off between cloud engineers, app owners, and security with nothing more than a spreadsheet. Horizon Relevance replaces the spreadsheet with an intelligent execution engine that plans, executes, and validates each migration wave.",
  capabilities: [
    {
      icon: Map,
      title: "Automated Migration Planning",
      description: "AI-assisted dependency discovery maps your workloads and generates a wave plan with risk scoring built in.",
    },
    {
      icon: Layers,
      title: "Wave-Based Execution Engine",
      description: "Execute migrations in controlled waves with rollback checkpoints, progress tracking, and automated validation.",
    },
    {
      icon: FileCode2,
      title: "Infrastructure-as-Code Templates",
      description: "Terraform and Helm templates for EKS, AKS, and GKE are generated and validated before any workload moves.",
    },
    {
      icon: TrendingDown,
      title: "Cost Visibility During Migration",
      description: "Real-time cost comparison between source and destination environments — catch overruns before they compound.",
    },
    {
      icon: GitBranch,
      title: "Deployment Orchestration",
      description: "Sequence-aware orchestration handles service-by-service migration with dependency ordering enforced automatically.",
    },
    {
      icon: Cloud,
      title: "Landing Zone & Guardrails",
      description: "Pre-hardened cloud landing zones with networking, IAM, and compliance guardrails ready on day one.",
    },
  ],
  outcomes: [
    {
      metric: "Zero",
      industry: "Healthcare",
      result: "EKS + AKS dual-cloud migration for 60 services — zero friction, zero incidents, completed on schedule.",
    },
    {
      metric: "3 days → 1 hr",
      industry: "Enterprise",
      result: "New team cloud onboarding compressed from 3 days of manual setup to under one hour with automated landing zones.",
    },
  ],
  cta: "Plan Your Migration",
  visual: <MigrationVisual />,
};

export default function Page() {
  return <ProductPageTemplate data={data} />;
}
