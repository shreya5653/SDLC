"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FolderKanban,
  Rocket,
  TestTube2,
  Cpu,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  {
    label: "Active Projects",
    value: "3",
    change: "+2 this month",
    icon: FolderKanban,
    color: "from-indigo-600 to-indigo-400",
    bgColor: "bg-indigo-600/10",
  },
  {
    label: "Deployments",
    value: "12",
    change: "+5 this week",
    icon: Rocket,
    color: "from-emerald-600 to-emerald-400",
    bgColor: "bg-emerald-600/10",
  },
  {
    label: "Tests Passing",
    value: "94%",
    change: "+3% improvement",
    icon: TestTube2,
    color: "from-cyan-600 to-cyan-400",
    bgColor: "bg-cyan-600/10",
  },
  {
    label: "AI Agents Active",
    value: "9",
    change: "All operational",
    icon: Cpu,
    color: "from-purple-600 to-purple-400",
    bgColor: "bg-purple-600/10",
  },
];

export function StatsCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          <Card className="relative overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-zinc-500">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-2xl font-bold text-white">
                    {stat.value}
                  </p>
                  <div className="mt-1 flex items-center gap-1 text-xs text-emerald-400">
                    <TrendingUp className="h-3 w-3" />
                    {stat.change}
                  </div>
                </div>
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.bgColor}`}
                >
                  <stat.icon
                    className={`h-5 w-5 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}
                    style={{ color: "currentColor" }}
                  />
                </div>
              </div>
            </CardContent>
            <div
              className={`absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r ${stat.color} opacity-50`}
            />
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
