"use client";

import React, { useState } from "react";
import {
  FileText,
  History,
  MessageSquare,
  Save,
  Eye,
  Edit3,
  ChevronDown,
  FileDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";


const SAMPLE_PRD = `# Product Requirements Document (PRD)

## 1. Product Overview

### 1.1 Product Name
Healthcare AI Chatbot

### 1.2 Product Vision
An intelligent healthcare chatbot that provides instant medical information, symptom checking, appointment scheduling, and health monitoring capabilities.

### 1.3 Target Users
- Patients seeking medical information
- Healthcare providers managing appointments
- Hospital administrators monitoring system usage

## 2. Features

### 2.1 Core Features

#### F1: Symptom Checker
- Users can describe symptoms in natural language
- AI analyzes symptoms and suggests possible conditions
- Provides severity assessment and recommended actions
- Priority: P0

#### F2: Appointment Scheduling
- Integration with hospital calendar systems
- Real-time availability checking
- Automated reminders and confirmations
- Priority: P0

#### F3: Health Records Access
- Secure access to patient health records
- Lab results and medication history
- HIPAA-compliant data handling
- Priority: P1

#### F4: Medication Reminders
- Customizable reminder schedules
- Drug interaction warnings
- Refill notifications
- Priority: P1

### 2.2 Non-Functional Requirements

| Requirement | Target |
|-------------|--------|
| Response Time | < 2 seconds |
| Uptime | 99.9% |
| Concurrent Users | 10,000+ |
| Data Encryption | AES-256 |
| Compliance | HIPAA, GDPR |

## 3. Technical Specifications

### 3.1 Frontend
- React 18 with TypeScript
- TailwindCSS for styling
- WebSocket for real-time chat

### 3.2 Backend
- Spring Boot 3.x
- PostgreSQL database
- Redis for caching
- OpenAI GPT-4 integration

### 3.3 Infrastructure
- Docker containerization
- Kubernetes orchestration
- AWS cloud hosting
- CI/CD with GitHub Actions

## 4. Success Metrics
- User satisfaction > 4.5/5
- Symptom check accuracy > 85%
- Average response time < 1.5s
- Monthly active users > 50,000
`;

interface DocumentEditorProps {
  title?: string;
  type?: string;
}

export function DocumentEditor({
  title = "Product Requirements Document",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type = "PRD",
}: DocumentEditorProps) {
  const [mode, setMode] = useState<"edit" | "preview">("preview");
  const [content, setContent] = useState(SAMPLE_PRD);
  const [version] = useState(3);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/10">
            <FileText className="h-4 w-4 text-blue-400" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">{title}</h2>
            <div className="flex items-center gap-2 mt-0.5">
              <Badge variant="secondary" className="text-[10px]">
                v{version}
              </Badge>
              <span className="text-[10px] text-zinc-500">
                Last edited 2 hours ago
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg border border-zinc-800 p-0.5">
            <button
              onClick={() => setMode("edit")}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                mode === "edit"
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <Edit3 className="h-3 w-3" />
              Edit
            </button>
            <button
              onClick={() => setMode("preview")}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                mode === "preview"
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <Eye className="h-3 w-3" />
              Preview
            </button>
          </div>

          <Button variant="ghost" size="sm" className="gap-1.5">
            <History className="h-3.5 w-3.5" />
            History
          </Button>

          <Button variant="ghost" size="sm" className="gap-1.5">
            <MessageSquare className="h-3.5 w-3.5" />
            Comments
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1.5">
                <FileDown className="h-3.5 w-3.5" />
                Export
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Export as PDF</DropdownMenuItem>
              <DropdownMenuItem>Export as Markdown</DropdownMenuItem>
              <DropdownMenuItem>Export as DOCX</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="default" size="sm" className="gap-1.5">
            <Save className="h-3.5 w-3.5" />
            Save
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="mx-auto max-w-4xl p-8">
          {mode === "edit" ? (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[600px] w-full resize-none bg-transparent font-mono text-sm text-zinc-300 focus:outline-none leading-relaxed"
            />
          ) : (
            <div className="prose prose-invert prose-sm max-w-none">
              <MarkdownPreview content={content} />
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

function MarkdownPreview({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let inTable = false;
  let tableRows: string[][] = [];
  let tableIndex = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("|") && line.endsWith("|")) {
      if (!inTable) {
        inTable = true;
        tableRows = [];
        tableIndex = i;
      }
      if (!line.match(/^\|[\s-|]+\|$/)) {
        tableRows.push(
          line
            .split("|")
            .filter(Boolean)
            .map((c) => c.trim())
        );
      }
      continue;
    }

    if (inTable) {
      inTable = false;
      elements.push(
        <div key={`table-${tableIndex}`} className="my-4 overflow-hidden rounded-lg border border-zinc-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/50">
                {tableRows[0]?.map((cell, ci) => (
                  <th
                    key={ci}
                    className="px-4 py-2 text-left text-xs font-semibold text-zinc-400"
                  >
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.slice(1).map((row, ri) => (
                <tr key={ri} className="border-b border-zinc-800/50">
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-4 py-2 text-zinc-300">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableRows = [];
    }

    if (line.startsWith("# ")) {
      elements.push(
        <h1
          key={i}
          className="mb-4 mt-8 text-2xl font-bold text-white first:mt-0"
        >
          {line.slice(2)}
        </h1>
      );
    } else if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={i}
          className="mb-3 mt-6 text-xl font-semibold text-white border-b border-zinc-800 pb-2"
        >
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="mb-2 mt-4 text-lg font-medium text-zinc-200">
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith("#### ")) {
      elements.push(
        <h4 key={i} className="mb-1 mt-3 text-base font-medium text-zinc-300">
          {line.slice(5)}
        </h4>
      );
    } else if (line.startsWith("- ")) {
      elements.push(
        <li key={i} className="ml-4 text-zinc-400 list-disc">
          {formatInline(line.slice(2))}
        </li>
      );
    } else if (line.trim() === "") {
      elements.push(<div key={i} className="h-2" />);
    } else {
      elements.push(
        <p key={i} className="text-zinc-400 leading-relaxed">
          {formatInline(line)}
        </p>
      );
    }
  }

  return <div>{elements}</div>;
}

function formatInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-zinc-200">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={i}
          className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-indigo-300 font-mono"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}
