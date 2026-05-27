"use client";

import React from "react";
import { useParams } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { SDLCFlow } from "@/components/workflow/sdlc-flow";
import { AgentPanel } from "@/components/agents/agent-panel";
import { CodeViewer } from "@/components/code/code-viewer";
import { DocumentEditor } from "@/components/documents/document-editor";
import { VersionHistory } from "@/components/documents/version-history";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAppStore } from "@/store";
import {
  ArrowLeft,
  FileText,
  Code2,
  TestTube2,
  Rocket,
  GitBranch,
  Settings,
  Network,
} from "lucide-react";
import Link from "next/link";

export default function ProjectDetailPage() {
  const params = useParams();
  const { projects } = useAppStore();
  const project = projects.find((p) => p.id === params.id);

  if (!project) {
    return (
      <AppShell>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-white">
              Project not found
            </h2>
            <Link href="/projects" className="text-sm text-indigo-400 mt-2">
              Back to projects
            </Link>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/projects">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white">
                  {project.name}
                </h1>
                <Badge
                  variant={
                    project.status === "active" ? "default" : "success"
                  }
                  className="text-[10px]"
                >
                  {project.status}
                </Badge>
              </div>
              <p className="mt-0.5 text-sm text-zinc-500">
                {project.description}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1.5">
              <Settings className="h-3.5 w-3.5" />
              Settings
            </Button>
            <Button variant="gradient" size="sm" className="gap-1.5">
              <Rocket className="h-3.5 w-3.5" />
              Deploy
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-zinc-500">
                Overall Progress
              </span>
              <span className="text-xs font-medium text-zinc-300">
                {project.progress}%
              </span>
            </div>
            <Progress value={project.progress} />
          </div>
          <div className="flex items-center gap-2">
            {Object.entries(project.techStack).map(([key, value]) => (
              <Badge key={key} variant="outline" className="text-[10px]">
                {value}
              </Badge>
            ))}
          </div>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Network className="h-4 w-4 text-indigo-400" />
              SDLC Pipeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SDLCFlow phases={project.phases} />
          </CardContent>
        </Card>

        <Tabs defaultValue="documents" className="w-full">
          <TabsList>
            <TabsTrigger value="documents" className="gap-1.5">
              <FileText className="h-3.5 w-3.5" />
              Documents
            </TabsTrigger>
            <TabsTrigger value="code" className="gap-1.5">
              <Code2 className="h-3.5 w-3.5" />
              Code
            </TabsTrigger>
            <TabsTrigger value="testing" className="gap-1.5">
              <TestTube2 className="h-3.5 w-3.5" />
              Testing
            </TabsTrigger>
            <TabsTrigger value="agents" className="gap-1.5">
              <GitBranch className="h-3.5 w-3.5" />
              Agents
            </TabsTrigger>
          </TabsList>

          <TabsContent value="documents">
            <div className="grid gap-6 lg:grid-cols-3 mt-4">
              <div className="lg:col-span-2">
                <Card className="h-[600px]">
                  <DocumentEditor />
                </Card>
              </div>
              <div>
                <VersionHistory />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="code">
            <div className="mt-4">
              <CodeViewer />
            </div>
          </TabsContent>

          <TabsContent value="testing">
            <div className="mt-4">
              <TestingPanel />
            </div>
          </TabsContent>

          <TabsContent value="agents">
            <div className="mt-4">
              <AgentPanel />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}

function TestingPanel() {
  const tests = [
    { name: "ChatBot.test.tsx", suite: "Unit", passed: 12, failed: 0, total: 12, duration: "1.2s" },
    { name: "SymptomChecker.test.tsx", suite: "Unit", passed: 8, failed: 1, total: 9, duration: "0.8s" },
    { name: "ChatAPI.test.ts", suite: "Integration", passed: 6, failed: 0, total: 6, duration: "3.4s" },
    { name: "PatientFlow.test.ts", suite: "E2E", passed: 4, failed: 2, total: 6, duration: "12.1s" },
    { name: "AppointmentAPI.test.ts", suite: "Integration", passed: 10, failed: 0, total: 10, duration: "2.1s" },
    { name: "AuthFlow.test.ts", suite: "E2E", passed: 4, failed: 0, total: 4, duration: "8.5s" },
  ];

  const totalPassed = tests.reduce((acc, t) => acc + t.passed, 0);
  const totalFailed = tests.reduce((acc, t) => acc + t.failed, 0);
  const totalTests = tests.reduce((acc, t) => acc + t.total, 0);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-emerald-400">{totalPassed}</p>
            <p className="text-xs text-zinc-500 mt-1">Tests Passed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-red-400">{totalFailed}</p>
            <p className="text-xs text-zinc-500 mt-1">Tests Failed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-zinc-200">
              {Math.round((totalPassed / totalTests) * 100)}%
            </p>
            <p className="text-xs text-zinc-500 mt-1">Pass Rate</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-400">
                  Test File
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-400">
                  Suite
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-zinc-400">
                  Passed
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-zinc-400">
                  Failed
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-zinc-400">
                  Duration
                </th>
              </tr>
            </thead>
            <tbody>
              {tests.map((test) => (
                <tr
                  key={test.name}
                  className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors"
                >
                  <td className="px-4 py-2.5 font-mono text-xs text-zinc-300">
                    {test.name}
                  </td>
                  <td className="px-4 py-2.5">
                    <Badge
                      variant={
                        test.suite === "Unit"
                          ? "default"
                          : test.suite === "Integration"
                            ? "purple"
                            : "cyan"
                      }
                      className="text-[10px]"
                    >
                      {test.suite}
                    </Badge>
                  </td>
                  <td className="px-4 py-2.5 text-center text-xs text-emerald-400">
                    {test.passed}
                  </td>
                  <td className="px-4 py-2.5 text-center text-xs text-red-400">
                    {test.failed || "—"}
                  </td>
                  <td className="px-4 py-2.5 text-right text-xs text-zinc-500">
                    {test.duration}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
