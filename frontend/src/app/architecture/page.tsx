"use client";

import React from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Network,
  Database,
  Layers,
  Sparkles,
  Download,
} from "lucide-react";

const erDiagram = `┌─────────────────┐       ┌─────────────────┐
│     Patient     │       │   Appointment   │
├─────────────────┤       ├─────────────────┤
│ id          PK  │──┐    │ id          PK  │
│ first_name      │  │    │ patient_id  FK  │──┐
│ last_name       │  │    │ doctor_id   FK  │  │
│ email           │  ├───>│ date_time       │  │
│ date_of_birth   │  │    │ status          │  │
│ phone           │  │    │ notes           │  │
│ created_at      │  │    │ created_at      │  │
└─────────────────┘  │    └─────────────────┘  │
                     │                          │
┌─────────────────┐  │    ┌─────────────────┐  │
│     Doctor      │  │    │  Chat Session   │  │
├─────────────────┤  │    ├─────────────────┤  │
│ id          PK  │<─┘    │ id          PK  │  │
│ name            │       │ patient_id  FK  │<─┘
│ specialization  │       │ started_at      │
│ email           │       │ ended_at        │
│ available       │       │ summary         │
└─────────────────┘       └─────────────────┘
                               │
                     ┌─────────────────┐
                     │    Message      │
                     ├─────────────────┤
                     │ id          PK  │
                     │ session_id  FK  │
                     │ role            │
                     │ content         │
                     │ timestamp       │
                     └─────────────────┘`;

const systemArch = `┌──────────────────────────────────────────────────────┐
│                   Client Layer                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────┐   │
│  │  React   │  │  Mobile  │  │  Admin Dashboard │   │
│  │   App    │  │   App    │  │                  │   │
│  └────┬─────┘  └────┬─────┘  └────────┬─────────┘   │
│       │              │                 │              │
└───────┼──────────────┼─────────────────┼──────────────┘
        │              │                 │
┌───────┼──────────────┼─────────────────┼──────────────┐
│       ▼              ▼                 ▼              │
│  ┌──────────────────────────────────────────────┐    │
│  │            API Gateway / Load Balancer        │    │
│  └──────────────────────┬───────────────────────┘    │
│                          │                            │
│  ┌───────────┐  ┌───────┴───────┐  ┌────────────┐   │
│  │   Auth    │  │     Chat      │  │ Appointment │   │
│  │  Service  │  │   Service     │  │   Service   │   │
│  └─────┬─────┘  └───────┬───────┘  └──────┬─────┘   │
│        │                │                   │         │
│  ┌─────┴────────────────┴───────────────────┴────┐   │
│  │              Message Queue (Redis)             │   │
│  └────────────────────┬──────────────────────────┘   │
│                       │                               │
│  ┌────────┐   ┌──────┴──────┐   ┌───────────────┐   │
│  │PostgreSQL│  │   Redis     │   │  OpenAI API   │   │
│  │   DB   │   │   Cache     │   │               │   │
│  └────────┘   └─────────────┘   └───────────────┘   │
│                   Service Layer                       │
└──────────────────────────────────────────────────────┘`;

const apiSpec = `# API Specification

## Authentication
POST   /api/v1/auth/register     Register a new user
POST   /api/v1/auth/login        Login and get JWT token
POST   /api/v1/auth/refresh      Refresh JWT token
POST   /api/v1/auth/logout       Invalidate token

## Chat
POST   /api/v1/chat/sessions     Create new chat session
GET    /api/v1/chat/sessions     List user's chat sessions
GET    /api/v1/chat/sessions/:id Get session with messages
POST   /api/v1/chat/messages     Send message and get AI response
DELETE /api/v1/chat/sessions/:id Delete a chat session

## Patients
GET    /api/v1/patients          List patients (admin)
GET    /api/v1/patients/:id      Get patient profile
PUT    /api/v1/patients/:id      Update patient info
GET    /api/v1/patients/:id/history  Get medical history

## Appointments
POST   /api/v1/appointments      Book new appointment
GET    /api/v1/appointments      List appointments
PUT    /api/v1/appointments/:id  Update appointment
DELETE /api/v1/appointments/:id  Cancel appointment
GET    /api/v1/appointments/slots Available time slots

## Doctors
GET    /api/v1/doctors           List doctors
GET    /api/v1/doctors/:id       Get doctor profile
GET    /api/v1/doctors/:id/schedule  Get doctor schedule

## Health Records
GET    /api/v1/records           Get patient records
POST   /api/v1/records           Create new record
GET    /api/v1/records/:id       Get specific record`;

export default function ArchitecturePage() {
  return (
    <AppShell>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Architecture</h1>
            <p className="mt-1 text-sm text-zinc-500">
              System design, database schemas, and API specifications
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1.5">
              <Download className="h-3.5 w-3.5" />
              Export All
            </Button>
            <Button variant="gradient" size="sm" className="gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              Regenerate
            </Button>
          </div>
        </div>

        <Tabs defaultValue="system">
          <TabsList>
            <TabsTrigger value="system" className="gap-1.5">
              <Layers className="h-3.5 w-3.5" />
              System Architecture
            </TabsTrigger>
            <TabsTrigger value="database" className="gap-1.5">
              <Database className="h-3.5 w-3.5" />
              ER Diagram
            </TabsTrigger>
            <TabsTrigger value="api" className="gap-1.5">
              <Network className="h-3.5 w-3.5" />
              API Specification
            </TabsTrigger>
          </TabsList>

          <TabsContent value="system">
            <Card className="mt-4">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <Layers className="h-4 w-4 text-purple-400" />
                    System Architecture Diagram
                  </CardTitle>
                  <Badge variant="purple" className="text-[10px]">
                    Auto-generated
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 overflow-x-auto">
                  <pre className="text-xs text-zinc-300 font-mono leading-relaxed whitespace-pre">
                    {systemArch}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="database">
            <Card className="mt-4">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <Database className="h-4 w-4 text-amber-400" />
                    Entity-Relationship Diagram
                  </CardTitle>
                  <Badge variant="warning" className="text-[10px]">
                    5 entities
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 overflow-x-auto">
                  <pre className="text-xs text-zinc-300 font-mono leading-relaxed whitespace-pre">
                    {erDiagram}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="api">
            <Card className="mt-4">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <Network className="h-4 w-4 text-cyan-400" />
                    API Specification
                  </CardTitle>
                  <Badge variant="cyan" className="text-[10px]">
                    REST API
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 overflow-x-auto">
                  <pre className="text-xs text-zinc-300 font-mono leading-relaxed whitespace-pre">
                    {apiSpec}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}
