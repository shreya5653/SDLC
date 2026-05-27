"use client";

import React from "react";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2, Circle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/store";
import type { SDLCPhase } from "@/types";

const phaseLabels: Record<SDLCPhase, string> = {
  idea: "Analyzing Idea",
  requirements: "Generating Requirements",
  architecture: "Designing Architecture",
  development: "Generating Code",
  testing: "Creating Tests",
  deployment: "Configuring Deployment",
  monitoring: "Setting Up Monitoring",
};

export function GenerationProgress() {
  const { generationProgress } = useAppStore();

  if (generationProgress.length === 0) return null;

  const latestByPhase = new Map<SDLCPhase, (typeof generationProgress)[number]>();
  generationProgress.forEach((p) => latestByPhase.set(p.phase, p));

  const phases: SDLCPhase[] = [
    "idea",
    "requirements",
    "architecture",
    "development",
    "testing",
    "deployment",
    "monitoring",
  ];

  return (
    <Card className="border-indigo-500/20 bg-gradient-to-br from-[#111827] to-indigo-900/5">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
            Live Generation Progress
          </CardTitle>
          <Badge variant="purple" className="text-[10px]">
            AI Generating
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {phases.map((phase, i) => {
            const progress = latestByPhase.get(phase);
            const status = progress?.status || "pending";

            return (
              <motion.div
                key={phase}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 rounded-lg px-3 py-2"
              >
                <div className="shrink-0">
                  {status === "completed" && (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  )}
                  {status === "in_progress" && (
                    <Loader2 className="h-4 w-4 animate-spin text-indigo-400" />
                  )}
                  {status === "failed" && (
                    <AlertCircle className="h-4 w-4 text-red-400" />
                  )}
                  {status === "pending" && (
                    <Circle className="h-4 w-4 text-zinc-600" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <span
                    className={`text-sm font-medium ${
                      status === "completed"
                        ? "text-emerald-400"
                        : status === "in_progress"
                          ? "text-indigo-300"
                          : "text-zinc-500"
                    }`}
                  >
                    {phaseLabels[phase]}
                  </span>
                  {progress?.message && status === "in_progress" && (
                    <p className="text-xs text-zinc-500 mt-0.5 truncate">
                      {progress.message}
                    </p>
                  )}
                </div>

                {status === "in_progress" && (
                  <div className="h-1 w-16 rounded-full bg-zinc-800 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-indigo-600 to-purple-600"
                      initial={{ width: "0%" }}
                      animate={{ width: "60%" }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
