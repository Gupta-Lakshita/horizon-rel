"use client";

import ProductPageTemplate from "@/components/ProductPageTemplate";
import MonitoringVisual from "@/components/product-visuals/MonitoringVisual";
import {
  BrainCircuit, Activity, Radar, Zap, BookOpen, Network,
} from "lucide-react";
import type { ProductPageData } from "@/components/ProductPageTemplate";

const PRIMARY   = "rgba(245,158,11,1)";
const SECONDARY = "rgba(234,88,12,1)";

const data: ProductPageData = {
  name: "AI Monitoring & Incident Response",
  tagline: "Detect faster. Respond smarter. Resolve before users notice.",
  hook: "Traditional alerting drowns teams in noise. Our AI correlates signals across logs, metrics, and traces — surfacing the root cause, not the symptom, in under two minutes.",
  pill: "AI Monitoring",
  primaryColor: PRIMARY,
  secondaryColor: SECONDARY,
  problem:
    "On-call engineers are flooded with thousands of low-signal alerts — most of them noise. By the time a real incident is confirmed, users have already noticed. Root cause analysis takes hours of manual log-diving. Runbooks sit stale in wikis no one reads. Horizon Relevance's AI engine correlates signals in real time, predicts failures before they cascade, and executes remediation playbooks autonomously.",
  capabilities: [
    {
      icon: Radar,
      title: "Anomaly Detection & Forecasting",
      description: "ML models trained on your topology detect deviations and forecast failure windows before they materialize.",
    },
    {
      icon: BrainCircuit,
      title: "AI Root Cause Analysis",
      description: "Cross-signal correlation across metrics, logs, and traces pinpoints root cause automatically — no war rooms.",
    },
    {
      icon: Activity,
      title: "Log, Metric & Alert Intelligence",
      description: "Alert deduplication and noise reduction cut alert volume by up to 90%, surfacing only what matters.",
    },
    {
      icon: Zap,
      title: "AI Playbook Execution",
      description: "Prebuilt and custom runbooks execute automatically on detection — restart, rollback, scale-out, notify.",
    },
    {
      icon: Network,
      title: "Topology-Aware Correlation",
      description: "Service dependency maps let the AI understand blast radius instantly — impacted services flagged in seconds.",
    },
    {
      icon: BookOpen,
      title: "Proactive Incident Intelligence",
      description: "Weekly AI-generated reliability reports highlight risk patterns before they become outages.",
    },
  ],
  outcomes: [
    {
      metric: "65%",
      industry: "Healthcare",
      result: "65% faster incident response — from detection to resolution — across a 200-service production environment.",
    },
    {
      metric: "99.99%",
      industry: "Finance",
      result: "99.99% uptime maintained for a high-frequency trading platform with AI-powered auto-remediation.",
    },
  ],
  cta: "Explore AI Monitoring",
  visual: <MonitoringVisual />,
};

export default function Page() {
  return <ProductPageTemplate data={data} />;
}
