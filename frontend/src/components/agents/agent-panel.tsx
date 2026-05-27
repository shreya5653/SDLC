"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Bot,
  FileText,
  Network,
  Database,
  Code2,
  Server,
  TestTube2,
  GitBranch,
  Rocket,
  Activity,
  Loader2,
  CheckCircle2,
  Circle,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppStore } from "@/store";
import type { AgentType } from "@/types";

const agentConfig: Record<
  AgentType,
  {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    description: string;
  }
> = {
  requirements: {
    label: "Requirements Agent",
    icon: FileText,
    color: "text-blue-400",
    description: "Generates PRD, SRS, user stories, and acceptance criteria",
  },
  architecture: {
    label: "Architecture Agent",
    icon: Network,
    color: "text-purple-400",
    description: "Designs system architecture, ER diagrams, and API contracts",
  },
  database: {
    label: "Database Agent",
    icon: Database,
    color: "text-amber-400",
    description: "Creates database schemas, migrations, and seed data",
  },
  frontend: {
    label: "Frontend Agent",
    icon: Code2,
    color: "text-cyan-400",
    description: "Generates React/Next.js components and pages",
  },
  backend: {
    label: "Backend Agent",
    icon: Server,
    color: "text-emerald-400",
    description: "Creates API endpoints, services, and business logic",
  },
  testing: {
    label: "Testing Agent",
    icon: TestTube2,
    color: "text-rose-400",
    description: "Generates unit, integration, and E2E test suites",
  },
  cicd: {
    label: "CI/CD Agent",
    icon: GitBranch,
    color: "text-orange-400",
    description: "Creates Dockerfiles, GitHub Actions, and pipelines",
  },
  deployment: {
    label: "Deployment Agent",
    icon: Rocket,
    color: "text-green-400",
    description: "Manages deployment configurations and hosting",
  },
  monitoring: {
    label: "Monitoring Agent",
    icon: Activity,
    color: "text-indigo-400",
    description: "Sets up logging, metrics, and alerting",
  },
};

export function AgentPanel() {
  const { agents } = useAppStore();

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <Bot className="h-4 w-4 text-indigo-400" />
            AI Agents
          </CardTitle>
          <Badge variant="purple" className="text-[10px]">
            {agents.filter((a) => a.status === "running").length} active
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px]">
          <div className="space-y-2">
            {agents.map((agent, i) => {
              const config = agentConfig[agent.type];
              return (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className={`rounded-lg border p-3 transition-all ${
                    agent.status === "running"
                      ? "border-indigo-500/20 bg-indigo-600/5"
                      : agent.status === "completed"
                        ? "border-emerald-500/20 bg-emerald-600/5"
                        : agent.status === "error"
                          ? "border-red-500/20 bg-red-600/5"
                          : "border-zinc-800"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-800">
                      <config.icon
                        className={`h-4 w-4 ${config.color}`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-zinc-200 truncate">
                          {config.label}
                        </span>
                        <div className="shrink-0">
                          {agent.status === "running" && (
                            <Loader2 className="h-3 w-3 animate-spin text-indigo-400" />
                          )}
                          {agent.status === "completed" && (
                            <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                          )}
                          {agent.status === "error" && (
                            <AlertCircle className="h-3 w-3 text-red-400" />
                          )}
                          {agent.status === "idle" && (
                            <Circle className="h-3 w-3 text-zinc-600" />
                          )}
                        </div>
                      </div>
                      <p className="text-[10px] text-zinc-500 truncate mt-0.5">
                        {agent.currentTask || config.description}
                      </p>
                    </div>
                  </div>

                  {agent.status === "running" && (
                    <div className="mt-2">
                      <Progress value={agent.progress} className="h-1" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
