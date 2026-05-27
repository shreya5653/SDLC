"use client";

import React from "react";
import { AppShell } from "@/components/layout/app-shell";
import { CodeViewer } from "@/components/code/code-viewer";
import { AgentPanel } from "@/components/agents/agent-panel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Code2,
  Download,
  Play,
  GitBranch,
  Sparkles,
  FileCode2,
  FolderTree,
} from "lucide-react";

const repoStats = [
  { label: "Files Generated", value: "47", icon: FileCode2 },
  { label: "Lines of Code", value: "4,832", icon: Code2 },
  { label: "Components", value: "23", icon: FolderTree },
  { label: "API Endpoints", value: "18", icon: GitBranch },
];

export default function DevelopmentPage() {
  return (
    <AppShell>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Development</h1>
            <p className="mt-1 text-sm text-zinc-500">
              Generated code, file explorer, and code editor
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1.5">
              <Download className="h-3.5 w-3.5" />
              Download Repo
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Play className="h-3.5 w-3.5" />
              Run Sandbox
            </Button>
            <Button variant="gradient" size="sm" className="gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              Generate Code
            </Button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-4">
          {repoStats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600/10">
                  <stat.icon className="h-4 w-4 text-indigo-400" />
                </div>
                <div>
                  <p className="text-lg font-bold text-white">{stat.value}</p>
                  <p className="text-[10px] text-zinc-500">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <CodeViewer />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <GitBranch className="h-4 w-4 text-indigo-400" />
                    Sandbox Execution
                  </CardTitle>
                  <Badge variant="success" className="text-[10px]">
                    Running
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4 font-mono text-xs text-zinc-400 h-48 overflow-y-auto">
                  <div className="text-emerald-400">$ docker-compose up --build</div>
                  <div className="mt-1 text-zinc-500">Creating network &quot;healthcare_default&quot;...</div>
                  <div className="text-zinc-500">Building frontend...</div>
                  <div className="text-zinc-500">Building backend...</div>
                  <div className="text-emerald-400 mt-1">✓ frontend container started on port 3000</div>
                  <div className="text-emerald-400">✓ backend container started on port 8080</div>
                  <div className="text-emerald-400">✓ PostgreSQL container started on port 5432</div>
                  <div className="text-emerald-400">✓ Redis container started on port 6379</div>
                  <div className="mt-1 text-cyan-400">Application running at http://localhost:3000</div>
                  <div className="text-cyan-400">API docs at http://localhost:8080/docs</div>
                  <div className="mt-1 text-zinc-500">[INFO] Watching for file changes...</div>
                  <div className="text-zinc-500 animate-pulse">█</div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div>
            <AgentPanel />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
