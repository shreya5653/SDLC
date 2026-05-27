"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  GitBranch,
  Clock,
  ArrowLeftRight,
  RotateCcw,
  User,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const versions = [
  {
    version: 3,
    date: "May 27, 2026 06:00 AM",
    author: "AI Agent",
    changes: "Added non-functional requirements and success metrics",
    additions: 24,
    deletions: 3,
    isCurrent: true,
  },
  {
    version: 2,
    date: "May 26, 2026 02:30 PM",
    author: "Shreya",
    changes: "Updated feature priorities and added medication reminders",
    additions: 15,
    deletions: 8,
    isCurrent: false,
  },
  {
    version: 1,
    date: "May 25, 2026 10:00 AM",
    author: "AI Agent",
    changes: "Initial PRD generation from project prompt",
    additions: 87,
    deletions: 0,
    isCurrent: false,
  },
];

const sampleDiff = [
  { type: "context", content: "### 2.2 Non-Functional Requirements" },
  { type: "context", content: "" },
  {
    type: "deletion",
    content: "| Response Time | < 3 seconds |",
  },
  {
    type: "addition",
    content: "| Response Time | < 2 seconds |",
  },
  { type: "context", content: "| Uptime | 99.9% |" },
  { type: "context", content: "| Concurrent Users | 10,000+ |" },
  {
    type: "deletion",
    content: "| Data Encryption | AES-128 |",
  },
  {
    type: "addition",
    content: "| Data Encryption | AES-256 |",
  },
  {
    type: "addition",
    content: "| Compliance | HIPAA, GDPR |",
  },
];

export function VersionHistory() {
  const [selectedVersion, setSelectedVersion] = useState<number | null>(null);
  const [compareMode, setCompareMode] = useState(false);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <GitBranch className="h-4 w-4 text-indigo-400" />
            Version History
          </CardTitle>
          <Button
            variant={compareMode ? "default" : "outline"}
            size="sm"
            onClick={() => setCompareMode(!compareMode)}
            className="gap-1.5 text-xs"
          >
            <ArrowLeftRight className="h-3 w-3" />
            {compareMode ? "Exit Compare" : "Compare"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <div className="space-y-2">
            {versions.map((v, i) => (
              <motion.div
                key={v.version}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <button
                  onClick={() =>
                    setSelectedVersion(
                      selectedVersion === v.version ? null : v.version
                    )
                  }
                  className={`w-full rounded-lg border p-3 text-left transition-all ${
                    selectedVersion === v.version
                      ? "border-indigo-500/30 bg-indigo-600/5"
                      : "border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/30"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={v.isCurrent ? "default" : "secondary"}
                        className="text-[10px]"
                      >
                        v{v.version}
                      </Badge>
                      {v.isCurrent && (
                        <Badge variant="success" className="text-[10px]">
                          Current
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-[10px]">
                      <span className="text-emerald-400">
                        +{v.additions}
                      </span>
                      <span className="text-red-400">-{v.deletions}</span>
                    </div>
                  </div>

                  <p className="mt-1.5 text-xs text-zinc-300">
                    {v.changes}
                  </p>

                  <div className="mt-2 flex items-center gap-3 text-[10px] text-zinc-500">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {v.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {v.date}
                    </span>
                  </div>
                </button>

                {selectedVersion === v.version && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 space-y-2"
                  >
                    <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-3">
                      <p className="mb-2 text-xs font-medium text-zinc-400">
                        Changes
                      </p>
                      <div className="space-y-0.5 font-mono text-xs">
                        {sampleDiff.map((line, li) => (
                          <div
                            key={li}
                            className={`rounded px-2 py-0.5 ${
                              line.type === "addition"
                                ? "bg-emerald-600/10 text-emerald-300"
                                : line.type === "deletion"
                                  ? "bg-red-600/10 text-red-300"
                                  : "text-zinc-500"
                            }`}
                          >
                            {line.type === "addition"
                              ? "+ "
                              : line.type === "deletion"
                                ? "- "
                                : "  "}
                            {line.content}
                          </div>
                        ))}
                      </div>
                    </div>

                    {!v.isCurrent && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full gap-1.5 text-xs"
                      >
                        <RotateCcw className="h-3 w-3" />
                        Rollback to v{v.version}
                      </Button>
                    )}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
