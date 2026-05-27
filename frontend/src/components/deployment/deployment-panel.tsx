"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Rocket,
  Globe,
  Terminal,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";

const deployments = [
  {
    id: "dep-1",
    environment: "Production",
    status: "active" as const,
    url: "https://healthcare-chatbot.vercel.app",
    provider: "Vercel",
    deployedAt: "May 27, 2026 04:30 AM",
    commit: "a3f8d2e",
    metrics: { uptime: 99.97, responseTime: 145, errorRate: 0.02, rpm: 1250 },
  },
  {
    id: "dep-2",
    environment: "Staging",
    status: "active" as const,
    url: "https://staging-healthcare-chatbot.railway.app",
    provider: "Railway",
    deployedAt: "May 27, 2026 02:15 AM",
    commit: "b7c1e4f",
    metrics: { uptime: 99.9, responseTime: 190, errorRate: 0.15, rpm: 85 },
  },
  {
    id: "dep-3",
    environment: "Development",
    status: "deploying" as const,
    url: null,
    provider: "Docker",
    deployedAt: "May 27, 2026 06:40 AM",
    commit: "c9d3a1b",
    metrics: null,
  },
];

const buildLogs = [
  { time: "06:40:01", level: "info", message: "Starting build process..." },
  { time: "06:40:02", level: "info", message: "Installing dependencies..." },
  { time: "06:40:15", level: "info", message: "npm install completed (352 packages)" },
  { time: "06:40:16", level: "info", message: "Building frontend..." },
  { time: "06:40:28", level: "info", message: "Frontend build successful" },
  { time: "06:40:29", level: "info", message: "Building backend..." },
  { time: "06:40:35", level: "info", message: "Backend build successful" },
  { time: "06:40:36", level: "info", message: "Running tests..." },
  { time: "06:40:52", level: "info", message: "47/47 tests passed" },
  { time: "06:40:53", level: "info", message: "Building Docker image..." },
  { time: "06:41:10", level: "info", message: "Docker image built (245MB)" },
  { time: "06:41:11", level: "info", message: "Pushing to registry..." },
  { time: "06:41:25", level: "info", message: "Deploying container..." },
  { time: "06:41:30", level: "warn", message: "Health check pending..." },
];

const statusConfig = {
  active: { color: "text-emerald-400", bg: "bg-emerald-600/10", label: "Active" },
  deploying: { color: "text-amber-400", bg: "bg-amber-600/10", label: "Deploying" },
  failed: { color: "text-red-400", bg: "bg-red-600/10", label: "Failed" },
  stopped: { color: "text-zinc-400", bg: "bg-zinc-600/10", label: "Stopped" },
};

export function DeploymentPanel() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white">Deployments</h2>
          <p className="text-sm text-zinc-500">
            Manage and monitor your deployments
          </p>
        </div>
        <Button variant="gradient" className="gap-2">
          <Rocket className="h-4 w-4" />
          Deploy Now
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {deployments.map((dep, i) => (
          <motion.div
            key={dep.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="h-full">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        dep.status === "active"
                          ? "bg-emerald-500 animate-pulse"
                          : dep.status === "deploying"
                            ? "bg-amber-500 animate-pulse"
                            : "bg-zinc-500"
                      }`}
                    />
                    <CardTitle className="text-sm">
                      {dep.environment}
                    </CardTitle>
                  </div>
                  <Badge
                    variant={
                      dep.status === "active"
                        ? "success"
                        : dep.status === "deploying"
                          ? "warning"
                          : "secondary"
                    }
                    className="text-[10px]"
                  >
                    {statusConfig[dep.status].label}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {dep.url && (
                  <a
                    href={dep.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    <Globe className="h-3 w-3" />
                    <span className="truncate">{dep.url}</span>
                    <ExternalLink className="h-3 w-3 shrink-0" />
                  </a>
                )}

                <div className="space-y-1.5 text-xs text-zinc-500">
                  <div className="flex items-center justify-between">
                    <span>Provider</span>
                    <span className="text-zinc-300">{dep.provider}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Commit</span>
                    <code className="text-indigo-400 font-mono text-[10px]">
                      {dep.commit}
                    </code>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Deployed</span>
                    <span className="text-zinc-400">{dep.deployedAt}</span>
                  </div>
                </div>

                {dep.metrics && (
                  <div className="grid grid-cols-2 gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 p-2">
                    <div className="text-center">
                      <p className="text-[10px] text-zinc-500">Uptime</p>
                      <p className="text-sm font-semibold text-emerald-400">
                        {dep.metrics.uptime}%
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] text-zinc-500">Latency</p>
                      <p className="text-sm font-semibold text-zinc-200">
                        {dep.metrics.responseTime}ms
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] text-zinc-500">Error Rate</p>
                      <p className="text-sm font-semibold text-zinc-200">
                        {dep.metrics.errorRate}%
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] text-zinc-500">RPM</p>
                      <p className="text-sm font-semibold text-zinc-200">
                        {dep.metrics.rpm}
                      </p>
                    </div>
                  </div>
                )}

                {dep.status === "deploying" && (
                  <div>
                    <div className="mb-1 flex items-center gap-1 text-[10px] text-amber-400">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      Deploying...
                    </div>
                    <Progress value={75} className="h-1" />
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold">
              <Terminal className="h-4 w-4 text-zinc-500" />
              Build Logs
            </CardTitle>
            <Badge variant="secondary" className="text-[10px]">
              Live
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-64">
            <div className="space-y-0.5 font-mono text-xs">
              {buildLogs.map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="flex items-start gap-3 rounded px-2 py-0.5 hover:bg-zinc-800/30"
                >
                  <span className="shrink-0 text-zinc-600">{log.time}</span>
                  <span
                    className={`shrink-0 ${
                      log.level === "warn"
                        ? "text-amber-400"
                        : log.level === "error"
                          ? "text-red-400"
                          : "text-zinc-500"
                    }`}
                  >
                    [{log.level.toUpperCase().padEnd(5)}]
                  </span>
                  <span className="text-zinc-300">{log.message}</span>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
