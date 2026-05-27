"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { ProjectCard } from "@/components/dashboard/project-card";
import { NewProjectDialog } from "@/components/dashboard/new-project-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/store";
import { Plus, Search, Filter, LayoutGrid, List } from "lucide-react";
import { AnimatePresence } from "framer-motion";

export default function ProjectsPage() {
  const { projects } = useAppStore();
  const [showNewProject, setShowNewProject] = useState(false);
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppShell>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Projects</h1>
            <p className="mt-1 text-sm text-zinc-500">
              Manage all your SDLC projects
            </p>
          </div>
          <Button
            variant="gradient"
            onClick={() => setShowNewProject(true)}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <Input
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Filter className="h-3.5 w-3.5" />
            Filter
          </Button>
          <div className="flex items-center rounded-lg border border-zinc-800 p-0.5">
            <button
              onClick={() => setView("grid")}
              className={`rounded-md p-1.5 transition-colors ${
                view === "grid" ? "bg-zinc-800 text-white" : "text-zinc-500"
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setView("list")}
              className={`rounded-md p-1.5 transition-colors ${
                view === "list" ? "bg-zinc-800 text-white" : "text-zinc-500"
              }`}
            >
              <List className="h-3.5 w-3.5" />
            </button>
          </div>
          <Badge variant="secondary" className="text-[10px]">
            {filtered.length} projects
          </Badge>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="rounded-full bg-zinc-800 p-4 mb-4">
              <Search className="h-6 w-6 text-zinc-500" />
            </div>
            <h3 className="text-sm font-medium text-zinc-300">
              No projects found
            </h3>
            <p className="mt-1 text-xs text-zinc-500">
              Try a different search or create a new project
            </p>
          </div>
        )}

        <AnimatePresence>
          {showNewProject && (
            <NewProjectDialog onClose={() => setShowNewProject(false)} />
          )}
        </AnimatePresence>
      </div>
    </AppShell>
  );
}
