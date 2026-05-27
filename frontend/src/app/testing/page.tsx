"use client";

import React from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  TestTube2,
  Play,
  RefreshCw,
  XCircle,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

const testSuites = [
  {
    name: "Unit Tests",
    description: "Component and function level tests",
    total: 47,
    passed: 44,
    failed: 3,
    duration: "12.4s",
    status: "completed" as const,
    coverage: 87,
  },
  {
    name: "Integration Tests",
    description: "API and service integration tests",
    total: 16,
    passed: 16,
    failed: 0,
    duration: "28.1s",
    status: "completed" as const,
    coverage: 92,
  },
  {
    name: "E2E Tests",
    description: "Full user flow end-to-end tests",
    total: 10,
    passed: 8,
    failed: 2,
    duration: "45.3s",
    status: "running" as const,
    coverage: 78,
  },
];

const failedTests = [
  {
    name: "SymptomChecker should handle unknown symptoms",
    file: "SymptomChecker.test.tsx",
    error: "Expected: 'unknown condition' Received: undefined",
    suite: "Unit",
  },
  {
    name: "ChatBot should display error on network failure",
    file: "ChatBot.test.tsx",
    error: "Timeout: did not receive expected error message within 5000ms",
    suite: "Unit",
  },
  {
    name: "Patient can complete full appointment flow",
    file: "PatientFlow.test.ts",
    error: "Element #appointment-confirm not found in DOM",
    suite: "E2E",
  },
];

export default function TestingPage() {
  const totalPassed = testSuites.reduce((acc, s) => acc + s.passed, 0);
  const totalFailed = testSuites.reduce((acc, s) => acc + s.failed, 0);
  const totalTests = testSuites.reduce((acc, s) => acc + s.total, 0);
  const avgCoverage = Math.round(
    testSuites.reduce((acc, s) => acc + s.coverage, 0) / testSuites.length
  );

  return (
    <AppShell>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Testing</h1>
            <p className="mt-1 text-sm text-zinc-500">
              Unit, integration, and E2E test management
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1.5">
              <RefreshCw className="h-3.5 w-3.5" />
              Re-run Failed
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              Auto-Repair
            </Button>
            <Button variant="gradient" size="sm" className="gap-1.5">
              <Play className="h-3.5 w-3.5" />
              Run All Tests
            </Button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-4">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-white">{totalTests}</p>
              <p className="text-xs text-zinc-500 mt-1">Total Tests</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-emerald-400">{totalPassed}</p>
              <p className="text-xs text-zinc-500 mt-1">Passed</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-red-400">{totalFailed}</p>
              <p className="text-xs text-zinc-500 mt-1">Failed</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-indigo-400">{avgCoverage}%</p>
              <p className="text-xs text-zinc-500 mt-1">Avg Coverage</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {testSuites.map((suite, i) => (
            <motion.div
              key={suite.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <TestTube2 className="h-4 w-4 text-cyan-400" />
                      {suite.name}
                    </CardTitle>
                    <Badge
                      variant={
                        suite.status === "completed" && suite.failed === 0
                          ? "success"
                          : suite.status === "running"
                            ? "warning"
                            : "destructive"
                      }
                      className="text-[10px]"
                    >
                      {suite.status === "running" ? "Running" : suite.failed > 0 ? `${suite.failed} Failed` : "All Passed"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-xs text-zinc-500">{suite.description}</p>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500">Pass Rate</span>
                    <span className="font-medium text-zinc-200">
                      {Math.round((suite.passed / suite.total) * 100)}%
                    </span>
                  </div>
                  <Progress
                    value={(suite.passed / suite.total) * 100}
                    className="h-1.5"
                  />

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-sm font-semibold text-emerald-400">
                        {suite.passed}
                      </p>
                      <p className="text-[10px] text-zinc-500">Passed</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-red-400">
                        {suite.failed}
                      </p>
                      <p className="text-[10px] text-zinc-500">Failed</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-zinc-400">
                        {suite.duration}
                      </p>
                      <p className="text-[10px] text-zinc-500">Duration</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-zinc-500">Coverage</span>
                      <span className="text-zinc-300">{suite.coverage}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-zinc-800">
                      <div
                        className="h-full rounded-full bg-indigo-500"
                        style={{ width: `${suite.coverage}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {failedTests.length > 0 && (
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-400" />
                  Failed Tests
                </CardTitle>
                <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                  <Sparkles className="h-3 w-3" />
                  AI Auto-Repair
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {failedTests.map((test, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-red-500/10 bg-red-600/5 p-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-zinc-200">
                        {test.name}
                      </span>
                      <Badge variant="destructive" className="text-[10px]">
                        {test.suite}
                      </Badge>
                    </div>
                    <p className="mt-1 text-xs text-zinc-500 font-mono">
                      {test.file}
                    </p>
                    <div className="mt-2 rounded bg-zinc-900 px-3 py-2">
                      <code className="text-xs text-red-300">{test.error}</code>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AppShell>
  );
}
