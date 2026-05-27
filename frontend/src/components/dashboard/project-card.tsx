"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Clock,
  MoreHorizontal,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Project } from "@/types";
import { formatDate } from "@/lib/utils";

const phaseColors: Record<string, string> = {
  idea: "bg-zinc-600",
  requirements: "bg-blue-600",
  architecture: "bg-purple-600",
  development: "bg-amber-600",
  testing: "bg-cyan-600",
  deployment: "bg-emerald-600",
  monitoring: "bg-green-600",
};

const statusVariant = {
  active: "default" as const,
  completed: "success" as const,
  paused: "warning" as const,
  failed: "destructive" as const,
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/projects/${project.id}`}>
        <Card className="group cursor-pointer transition-all duration-300 hover:border-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/5">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-white truncate">
                    {project.name}
                  </h3>
                  <Badge variant={statusVariant[project.status]} className="text-[10px]">
                    {project.status}
                  </Badge>
                </div>
                <p className="mt-1 text-xs text-zinc-500 line-clamp-2">
                  {project.description}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => e.preventDefault()}
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="text-zinc-500">Progress</span>
                  <span className="font-medium text-zinc-300">
                    {project.progress}%
                  </span>
                </div>
                <Progress value={project.progress} />
              </div>

              <div className="flex items-center gap-2">
                <div
                  className={`h-2 w-2 rounded-full ${
                    phaseColors[project.currentPhase] || "bg-zinc-600"
                  }`}
                />
                <span className="text-xs font-medium capitalize text-zinc-400">
                  {project.currentPhase}
                </span>
              </div>

              <div className="flex flex-wrap gap-1">
                {Object.values(project.techStack).map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="text-[10px] px-1.5 py-0"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-zinc-800/50">
                <div className="flex items-center gap-1 text-xs text-zinc-500">
                  <Clock className="h-3 w-3" />
                  {formatDate(project.updatedAt)}
                </div>
                <div className="flex -space-x-1.5">
                  {project.team.slice(0, 3).map((member) => (
                    <Avatar key={member.id} className="h-5 w-5 border border-[#111827]">
                      <AvatarFallback className="text-[8px]">
                        {member.name[0]}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
