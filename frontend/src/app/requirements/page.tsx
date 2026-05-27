"use client";

import React from "react";
import { AppShell } from "@/components/layout/app-shell";
import { DocumentEditor } from "@/components/documents/document-editor";
import { VersionHistory } from "@/components/documents/version-history";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Plus, Sparkles } from "lucide-react";

const documents = [
  { name: "PRD", status: "complete", version: 3, updated: "2h ago" },
  { name: "SRS", status: "complete", version: 2, updated: "4h ago" },
  { name: "User Stories", status: "in_progress", version: 1, updated: "1h ago" },
  { name: "Acceptance Criteria", status: "draft", version: 1, updated: "30m ago" },
];

export default function RequirementsPage() {
  return (
    <AppShell>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Requirements</h1>
            <p className="mt-1 text-sm text-zinc-500">
              PRD, SRS, user stories and acceptance criteria
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              AI Generate
            </Button>
            <Button variant="gradient" size="sm" className="gap-1.5">
              <Plus className="h-3.5 w-3.5" />
              New Document
            </Button>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-4">
          {documents.map((doc) => (
            <Card
              key={doc.name}
              className="cursor-pointer hover:border-indigo-500/30 transition-all"
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-blue-400" />
                    <span className="text-sm font-medium text-white">
                      {doc.name}
                    </span>
                  </div>
                  <Badge
                    variant={
                      doc.status === "complete"
                        ? "success"
                        : doc.status === "in_progress"
                          ? "warning"
                          : "secondary"
                    }
                    className="text-[10px]"
                  >
                    {doc.status === "complete" ? "Complete" : doc.status === "in_progress" ? "In Progress" : "Draft"}
                  </Badge>
                </div>
                <div className="mt-2 flex items-center gap-3 text-[10px] text-zinc-500">
                  <span>v{doc.version}</span>
                  <span>Updated {doc.updated}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="h-[600px]">
              <DocumentEditor
                title="Product Requirements Document"
                type="PRD"
              />
            </Card>
          </div>
          <div>
            <VersionHistory />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
