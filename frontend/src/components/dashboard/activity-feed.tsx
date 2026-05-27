"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FileText,
  GitBranch,
  Rocket,
  TestTube2,
  Network,
  Code2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const activities = [
  {
    id: 1,
    action: "PRD Generated",
    project: "Healthcare Chatbot",
    time: "2 minutes ago",
    icon: FileText,
    color: "text-blue-400",
    bgColor: "bg-blue-600/10",
    status: "success",
  },
  {
    id: 2,
    action: "Architecture Review",
    project: "E-Commerce Platform",
    time: "15 minutes ago",
    icon: Network,
    color: "text-purple-400",
    bgColor: "bg-purple-600/10",
    status: "success",
  },
  {
    id: 3,
    action: "Tests Failed (3/47)",
    project: "Task Management API",
    time: "32 minutes ago",
    icon: TestTube2,
    color: "text-red-400",
    bgColor: "bg-red-600/10",
    status: "error",
  },
  {
    id: 4,
    action: "Code Generated",
    project: "Healthcare Chatbot",
    time: "1 hour ago",
    icon: Code2,
    color: "text-amber-400",
    bgColor: "bg-amber-600/10",
    status: "success",
  },
  {
    id: 5,
    action: "Deployed to Staging",
    project: "Task Management API",
    time: "2 hours ago",
    icon: Rocket,
    color: "text-emerald-400",
    bgColor: "bg-emerald-600/10",
    status: "success",
  },
  {
    id: 6,
    action: "Branch Created",
    project: "E-Commerce Platform",
    time: "3 hours ago",
    icon: GitBranch,
    color: "text-cyan-400",
    bgColor: "bg-cyan-600/10",
    status: "success",
  },
  {
    id: 7,
    action: "SRS Updated (v3)",
    project: "Healthcare Chatbot",
    time: "4 hours ago",
    icon: FileText,
    color: "text-indigo-400",
    bgColor: "bg-indigo-600/10",
    status: "success",
  },
];

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold">
            Recent Activity
          </CardTitle>
          <Badge variant="secondary" className="text-[10px]">
            {activities.length} events
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[360px] pr-4">
          <div className="space-y-3">
            {activities.map((activity, i) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-zinc-800/30"
              >
                <div
                  className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${activity.bgColor}`}
                >
                  <activity.icon className={`h-3.5 w-3.5 ${activity.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-zinc-200 truncate">
                      {activity.action}
                    </span>
                    {activity.status === "error" && (
                      <AlertCircle className="h-3 w-3 text-red-400 shrink-0" />
                    )}
                    {activity.status === "success" && (
                      <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-zinc-500 truncate">
                      {activity.project}
                    </span>
                    <span className="text-xs text-zinc-600">•</span>
                    <span className="text-xs text-zinc-600">
                      {activity.time}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
