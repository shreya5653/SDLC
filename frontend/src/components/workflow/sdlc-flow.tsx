"use client";

import React, { useMemo } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  type Node,
  type Edge,
  Position,
  Handle,
  type NodeProps,
  MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import {
  Lightbulb,
  FileText,
  Network,
  Code2,
  TestTube2,
  Rocket,
  Activity,
  CheckCircle2,
  Loader2,
  Circle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { SDLCPhase, PhaseStatus } from "@/types";

const phaseConfig: Record<
  SDLCPhase,
  {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    gradient: string;
  }
> = {
  idea: {
    label: "Idea & Scope",
    icon: Lightbulb,
    color: "#818CF8",
    gradient: "from-indigo-600 to-indigo-400",
  },
  requirements: {
    label: "Requirements",
    icon: FileText,
    color: "#60A5FA",
    gradient: "from-blue-600 to-blue-400",
  },
  architecture: {
    label: "Architecture",
    icon: Network,
    color: "#A78BFA",
    gradient: "from-purple-600 to-purple-400",
  },
  development: {
    label: "Development",
    icon: Code2,
    color: "#FBBF24",
    gradient: "from-amber-600 to-amber-400",
  },
  testing: {
    label: "Testing",
    icon: TestTube2,
    color: "#22D3EE",
    gradient: "from-cyan-600 to-cyan-400",
  },
  deployment: {
    label: "Deployment",
    icon: Rocket,
    color: "#34D399",
    gradient: "from-emerald-600 to-emerald-400",
  },
  monitoring: {
    label: "Monitoring",
    icon: Activity,
    color: "#4ADE80",
    gradient: "from-green-600 to-green-400",
  },
};

interface PhaseNodeData {
  phase: SDLCPhase;
  status: PhaseStatus;
  progress: number;
  artifacts: string[];
  label: string;
  [key: string]: unknown;
}

function PhaseNode({ data }: NodeProps<Node<PhaseNodeData>>) {
  const config = phaseConfig[data.phase];
  const StatusIcon =
    data.status === "completed"
      ? CheckCircle2
      : data.status === "in_progress"
        ? Loader2
        : Circle;

  return (
    <div className="group relative">
      <Handle type="target" position={Position.Left} className="!bg-zinc-600 !border-zinc-700 !w-2 !h-2" />

      <div
        className={`relative w-56 rounded-xl border bg-[#111827] p-4 shadow-xl transition-all duration-300 hover:shadow-2xl ${
          data.status === "completed"
            ? "border-emerald-500/30"
            : data.status === "in_progress"
              ? "border-indigo-500/30 shadow-indigo-500/10"
              : "border-zinc-800"
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ${config.gradient} shadow-lg`}
          >
            <config.icon className="h-4 w-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-white truncate">
              {config.label}
            </h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <StatusIcon
                className={`h-3 w-3 ${
                  data.status === "completed"
                    ? "text-emerald-400"
                    : data.status === "in_progress"
                      ? "text-indigo-400 animate-spin"
                      : "text-zinc-600"
                }`}
              />
              <span
                className={`text-[10px] font-medium capitalize ${
                  data.status === "completed"
                    ? "text-emerald-400"
                    : data.status === "in_progress"
                      ? "text-indigo-400"
                      : "text-zinc-500"
                }`}
              >
                {data.status.replace("_", " ")}
              </span>
            </div>
          </div>
        </div>

        {data.status !== "pending" && (
          <div className="mt-3">
            <div className="flex items-center justify-between text-[10px] mb-1">
              <span className="text-zinc-500">Progress</span>
              <span className="text-zinc-400">{data.progress}%</span>
            </div>
            <div className="h-1 w-full rounded-full bg-zinc-800 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  data.status === "completed"
                    ? "bg-emerald-500"
                    : "bg-gradient-to-r from-indigo-600 to-purple-600"
                }`}
                style={{ width: `${data.progress}%` }}
              />
            </div>
          </div>
        )}

        {data.artifacts.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {data.artifacts.slice(0, 3).map((artifact) => (
              <Badge
                key={artifact}
                variant="secondary"
                className="text-[8px] px-1 py-0"
              >
                {artifact}
              </Badge>
            ))}
            {data.artifacts.length > 3 && (
              <Badge variant="secondary" className="text-[8px] px-1 py-0">
                +{data.artifacts.length - 3}
              </Badge>
            )}
          </div>
        )}

        {data.status === "in_progress" && (
          <div
            className="absolute inset-0 rounded-xl opacity-20"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${config.color}33, transparent 70%)`,
            }}
          />
        )}
      </div>

      <Handle type="source" position={Position.Right} className="!bg-zinc-600 !border-zinc-700 !w-2 !h-2" />
    </div>
  );
}

const nodeTypes = { phaseNode: PhaseNode };

interface SDLCFlowProps {
  phases: Array<{
    phase: SDLCPhase;
    status: PhaseStatus;
    progress: number;
    artifacts: string[];
  }>;
}

export function SDLCFlow({ phases }: SDLCFlowProps) {
  const nodes: Node<PhaseNodeData>[] = useMemo(
    () =>
      phases.map((p, i) => ({
        id: p.phase,
        type: "phaseNode",
        position: { x: i * 300, y: i % 2 === 0 ? 0 : 80 },
        data: {
          phase: p.phase,
          status: p.status,
          progress: p.progress,
          artifacts: p.artifacts,
          label: phaseConfig[p.phase].label,
        },
      })),
    [phases]
  );

  const edges: Edge[] = useMemo(
    () =>
      phases.slice(0, -1).map((p, i) => ({
        id: `${p.phase}-${phases[i + 1].phase}`,
        source: p.phase,
        target: phases[i + 1].phase,
        type: "smoothstep",
        animated: p.status === "in_progress",
        style: {
          stroke:
            p.status === "completed"
              ? "#34D399"
              : p.status === "in_progress"
                ? "#818CF8"
                : "#27272A",
          strokeWidth: 2,
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color:
            p.status === "completed"
              ? "#34D399"
              : p.status === "in_progress"
                ? "#818CF8"
                : "#27272A",
        },
      })),
    [phases]
  );

  return (
    <div className="h-[300px] w-full rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        proOptions={{ hideAttribution: true }}
        nodesDraggable={false}
        nodesConnectable={false}
        zoomOnScroll={false}
        panOnScroll={false}
        minZoom={0.5}
        maxZoom={1.5}
      >
        <Background color="#1F2937" gap={20} size={1} />
        <Controls
          className="!bg-zinc-900 !border-zinc-800 !shadow-xl"
          showInteractive={false}
        />
      </ReactFlow>
    </div>
  );
}
