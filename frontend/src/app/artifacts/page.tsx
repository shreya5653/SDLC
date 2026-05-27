"use client";

import React from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Code2,
  Network,
  Database,
  TestTube2,
  GitBranch,
  Download,
  Eye,
  Clock,
  Filter,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const artifacts = [
  {
    name: "Product Requirements Document",
    type: "PRD",
    phase: "Requirements",
    version: 3,
    updated: "2 hours ago",
    icon: FileText,
    color: "text-blue-400",
    bgColor: "bg-blue-600/10",
    format: "Markdown",
  },
  {
    name: "Software Requirements Specification",
    type: "SRS",
    phase: "Requirements",
    version: 2,
    updated: "4 hours ago",
    icon: FileText,
    color: "text-blue-400",
    bgColor: "bg-blue-600/10",
    format: "Markdown",
  },
  {
    name: "User Stories",
    type: "User Stories",
    phase: "Requirements",
    version: 1,
    updated: "1 hour ago",
    icon: FileText,
    color: "text-blue-400",
    bgColor: "bg-blue-600/10",
    format: "Markdown",
  },
  {
    name: "System Architecture",
    type: "Architecture",
    phase: "Architecture",
    version: 2,
    updated: "6 hours ago",
    icon: Network,
    color: "text-purple-400",
    bgColor: "bg-purple-600/10",
    format: "Diagram",
  },
  {
    name: "ER Diagram",
    type: "Database",
    phase: "Architecture",
    version: 1,
    updated: "6 hours ago",
    icon: Database,
    color: "text-amber-400",
    bgColor: "bg-amber-600/10",
    format: "SQL + Diagram",
  },
  {
    name: "API Specification",
    type: "API Spec",
    phase: "Architecture",
    version: 2,
    updated: "5 hours ago",
    icon: Network,
    color: "text-cyan-400",
    bgColor: "bg-cyan-600/10",
    format: "OpenAPI",
  },
  {
    name: "Frontend Source Code",
    type: "Source Code",
    phase: "Development",
    version: 4,
    updated: "30 min ago",
    icon: Code2,
    color: "text-amber-400",
    bgColor: "bg-amber-600/10",
    format: "TypeScript",
  },
  {
    name: "Backend Source Code",
    type: "Source Code",
    phase: "Development",
    version: 3,
    updated: "1 hour ago",
    icon: Code2,
    color: "text-emerald-400",
    bgColor: "bg-emerald-600/10",
    format: "Java",
  },
  {
    name: "Test Suites",
    type: "Tests",
    phase: "Testing",
    version: 2,
    updated: "45 min ago",
    icon: TestTube2,
    color: "text-rose-400",
    bgColor: "bg-rose-600/10",
    format: "TypeScript",
  },
  {
    name: "CI/CD Pipeline",
    type: "CI/CD",
    phase: "Deployment",
    version: 1,
    updated: "3 hours ago",
    icon: GitBranch,
    color: "text-orange-400",
    bgColor: "bg-orange-600/10",
    format: "YAML",
  },
];

export default function ArtifactsPage() {
  return (
    <AppShell>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Artifacts</h1>
            <p className="mt-1 text-sm text-zinc-500">
              All generated documents, code, and configurations
            </p>
          </div>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Download className="h-3.5 w-3.5" />
            Export All
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <Input placeholder="Search artifacts..." className="pl-9" />
          </div>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Filter className="h-3.5 w-3.5" />
            Filter
          </Button>
          <Badge variant="secondary" className="text-[10px]">
            {artifacts.length} artifacts
          </Badge>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {artifacts.map((artifact, i) => (
            <motion.div
              key={artifact.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <Card className="group cursor-pointer hover:border-indigo-500/30 transition-all">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${artifact.bgColor}`}
                    >
                      <artifact.icon
                        className={`h-4 w-4 ${artifact.color}`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-white truncate">
                        {artifact.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-[10px]">
                          {artifact.phase}
                        </Badge>
                        <Badge variant="outline" className="text-[10px]">
                          v{artifact.version}
                        </Badge>
                        <Badge variant="outline" className="text-[10px]">
                          {artifact.format}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 mt-2 text-[10px] text-zinc-500">
                        <Clock className="h-3 w-3" />
                        {artifact.updated}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
                      <Eye className="h-3 w-3" />
                      View
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
                      <Download className="h-3 w-3" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
