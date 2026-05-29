"use client";

import ProductPageTemplate from "@/components/ProductPageTemplate";
import CloudCostVisual from "@/components/product-visuals/CloudCostVisual";
import {
  TrendingDown, BarChart3, Cloud, Settings2, ShieldCheck, Layers,
} from "lucide-react";
import type { ProductPageData } from "@/components/ProductPageTemplate";

const PRIMARY   = "rgba(168,85,247,1)";
const SECONDARY = "rgba(124,58,237,1)";

const data: ProductPageData = {
  name: "Cloud Cost Optimization",
  tagline: "Spend less. Scale more. Stay in control.",
  hook: "Cloud bills grow silently. Idle resources, oversized instances, and missed reservations compound every month. We surface the waste and act on it — automatically.",
  pill: "FinOps & Cloud Cost",
  primaryColor: PRIMARY,
  secondaryColor: SECONDARY,
  problem:
    "Most engineering teams don't know where their cloud budget goes until the bill arrives. Reserved capacity goes unused, dev environments run 24/7, and over-provisioned instances sit at 5% utilization. Finance and engineering disagree on what to cut. Horizon Relevance gives both teams a shared view — with AI-driven rightsizing recommendations that translate directly into scheduled actions.",
  capabilities: [
    {
      icon: BarChart3,
      title: "Intelligent Cost Visibility",
      description: "Granular cost breakdowns by team, service, environment, and tag — updated hourly across all clouds.",
    },
    {
      icon: TrendingDown,
      title: "AI Rightsizing Recommendations",
      description: "Machine learning analyzes usage patterns and recommends the exact instance types and sizes to switch to.",
    },
    {
      icon: Cloud,
      title: "Multi-Cloud Support",
      description: "AWS, Azure, and GCP in a single normalized view — compare costs across providers side by side.",
    },
    {
      icon: Settings2,
      title: "Automated Governance Workflows",
      description: "Budget policies trigger automatic alerts, approvals, and resource actions — no manual intervention needed.",
    },
    {
      icon: Layers,
      title: "Reserved Capacity Intelligence",
      description: "AI models predict your 12-month usage to recommend optimal RI and savings plan commitments.",
    },
    {
      icon: ShieldCheck,
      title: "Usage Analysis & Reporting",
      description: "Weekly executive reports and on-demand exports keep finance, engineering, and leadership aligned.",
    },
  ],
  outcomes: [
    {
      metric: "37%",
      industry: "FinTech",
      result: "37% reduction in AWS spend within the first two weeks — without touching a single production workload.",
    },
    {
      metric: "40%",
      industry: "Healthcare",
      result: "40% of infrastructure waste eliminated after AI-driven rightsizing recommendations were applied across 3 accounts.",
    },
  ],
  cta: "Start Free Assessment",
  visual: <CloudCostVisual />,
};

export default function Page() {
  return <ProductPageTemplate data={data} />;
}
