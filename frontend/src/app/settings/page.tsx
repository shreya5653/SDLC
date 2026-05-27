"use client";

import React from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  User,
  Key,
  Bell,
  Cpu,
  Save,
} from "lucide-react";

export default function SettingsPage() {
  return (
    <AppShell>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Manage your account, API keys, and preferences
          </p>
        </div>

        <Tabs defaultValue="profile">
          <TabsList>
            <TabsTrigger value="profile" className="gap-1.5">
              <User className="h-3.5 w-3.5" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="api-keys" className="gap-1.5">
              <Key className="h-3.5 w-3.5" />
              API Keys
            </TabsTrigger>
            <TabsTrigger value="ai" className="gap-1.5">
              <Cpu className="h-3.5 w-3.5" />
              AI Configuration
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-1.5">
              <Bell className="h-3.5 w-3.5" />
              Notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-sm">Profile Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-medium text-zinc-400 mb-1.5 block">
                      Full Name
                    </label>
                    <Input defaultValue="Shreya" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-zinc-400 mb-1.5 block">
                      Email
                    </label>
                    <Input defaultValue="shreya@example.com" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-zinc-400 mb-1.5 block">
                      Organization
                    </label>
                    <Input defaultValue="SDLC AI Studio" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-zinc-400 mb-1.5 block">
                      Role
                    </label>
                    <Input defaultValue="Admin" disabled />
                  </div>
                </div>
                <Button variant="default" className="gap-1.5">
                  <Save className="h-3.5 w-3.5" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="api-keys">
            <Card className="mt-4">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">API Keys</CardTitle>
                  <Button variant="gradient" size="sm" className="gap-1.5">
                    <Key className="h-3.5 w-3.5" />
                    Generate Key
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    {
                      name: "OpenAI API Key",
                      key: "sk-...8f4a",
                      status: "active",
                    },
                    {
                      name: "GitHub Token",
                      key: "ghp_...x2b1",
                      status: "active",
                    },
                    {
                      name: "Vercel Token",
                      key: "vercel_...q9z3",
                      status: "active",
                    },
                    {
                      name: "AWS Access Key",
                      key: "AKIA...WE9R",
                      status: "inactive",
                    },
                  ].map((apiKey) => (
                    <div
                      key={apiKey.name}
                      className="flex items-center justify-between rounded-lg border border-zinc-800 p-3"
                    >
                      <div className="flex items-center gap-3">
                        <Key className="h-4 w-4 text-zinc-500" />
                        <div>
                          <p className="text-sm font-medium text-zinc-200">
                            {apiKey.name}
                          </p>
                          <code className="text-xs text-zinc-500 font-mono">
                            {apiKey.key}
                          </code>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            apiKey.status === "active"
                              ? "success"
                              : "secondary"
                          }
                          className="text-[10px]"
                        >
                          {apiKey.status}
                        </Badge>
                        <Button variant="ghost" size="sm" className="text-xs">
                          Revoke
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai">
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-sm">AI Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-medium text-zinc-400 mb-1.5 block">
                      Default Model
                    </label>
                    <Input defaultValue="gpt-4o" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-zinc-400 mb-1.5 block">
                      Temperature
                    </label>
                    <Input type="number" defaultValue="0.7" step="0.1" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-zinc-400 mb-1.5 block">
                      Max Tokens
                    </label>
                    <Input type="number" defaultValue="4096" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-zinc-400 mb-1.5 block">
                      Code Generation Model
                    </label>
                    <Input defaultValue="gpt-4o" />
                  </div>
                </div>
                <Separator />
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Agent Settings
                  </h4>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="flex items-center justify-between rounded-lg border border-zinc-800 p-3">
                      <span className="text-sm text-zinc-300">
                        Auto-repair failed tests
                      </span>
                      <div className="h-5 w-9 rounded-full bg-indigo-600 p-0.5">
                        <div className="h-4 w-4 rounded-full bg-white translate-x-4" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border border-zinc-800 p-3">
                      <span className="text-sm text-zinc-300">
                        Cascade updates
                      </span>
                      <div className="h-5 w-9 rounded-full bg-indigo-600 p-0.5">
                        <div className="h-4 w-4 rounded-full bg-white translate-x-4" />
                      </div>
                    </div>
                  </div>
                </div>
                <Button variant="default" className="gap-1.5">
                  <Save className="h-3.5 w-3.5" />
                  Save Configuration
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-sm">Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    "Build completed",
                    "Test failures",
                    "Deployment status",
                    "Agent activity",
                    "Document updates",
                    "Team mentions",
                  ].map((pref) => (
                    <div
                      key={pref}
                      className="flex items-center justify-between rounded-lg border border-zinc-800 p-3"
                    >
                      <span className="text-sm text-zinc-300">{pref}</span>
                      <div className="h-5 w-9 rounded-full bg-indigo-600 p-0.5">
                        <div className="h-4 w-4 rounded-full bg-white translate-x-4" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}
