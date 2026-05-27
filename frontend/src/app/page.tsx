"use client";

import React from "react";
import { AppShell } from "@/components/layout/app-shell";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { ProjectCard } from "@/components/dashboard/project-card";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { GenerationProgress } from "@/components/dashboard/generation-progress";
import { SDLCFlow } from "@/components/workflow/sdlc-flow";
import { useAppStore } from "@/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  const { projects, generationProgress } = useAppStore();

  const activeProject = projects[0];

  return (
    <AppShell>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Overview of your software development projects
          </p>
        </div>

        <StatsCards />

        {generationProgress.length > 0 && <GenerationProgress />}

        {activeProject && (
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold">
                  SDLC Pipeline — {activeProject.name}
                </CardTitle>
                <Badge variant="default" className="text-[10px]">
                  {activeProject.progress}% Complete
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <SDLCFlow phases={activeProject.phases} />
            </CardContent>
          </Card>
        )}

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-white">
                  Active Projects
                </h2>
                <Badge variant="secondary" className="text-[10px]">
                  {projects.length} projects
                </Badge>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          </div>

          <div>
            <ActivityFeed />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
