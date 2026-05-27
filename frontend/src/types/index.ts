export type SDLCPhase =
  | "idea"
  | "requirements"
  | "architecture"
  | "development"
  | "testing"
  | "deployment"
  | "monitoring";

export type PhaseStatus = "pending" | "in_progress" | "completed" | "failed";

export type AgentType =
  | "requirements"
  | "architecture"
  | "database"
  | "frontend"
  | "backend"
  | "testing"
  | "cicd"
  | "deployment"
  | "monitoring";

export interface Project {
  id: string;
  name: string;
  description: string;
  currentPhase: SDLCPhase;
  status: "active" | "completed" | "paused" | "failed";
  progress: number;
  createdAt: string;
  updatedAt: string;
  techStack: TechStack;
  phases: PhaseInfo[];
  artifacts: Artifact[];
  team: TeamMember[];
}

export interface TechStack {
  frontend: string;
  backend: string;
  database: string;
  deployment: string;
}

export interface PhaseInfo {
  phase: SDLCPhase;
  status: PhaseStatus;
  startedAt?: string;
  completedAt?: string;
  artifacts: string[];
  progress: number;
}

export interface Artifact {
  id: string;
  name: string;
  type: ArtifactType;
  phase: SDLCPhase;
  version: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export type ArtifactType =
  | "prd"
  | "srs"
  | "user_stories"
  | "acceptance_criteria"
  | "architecture_doc"
  | "er_diagram"
  | "api_spec"
  | "task_breakdown"
  | "ui_suggestion"
  | "frontend_code"
  | "backend_code"
  | "test_suite"
  | "cicd_config"
  | "deployment_config"
  | "dockerfile"
  | "readme";

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

export interface DocumentVersion {
  id: string;
  version: number;
  content: string;
  createdAt: string;
  author: string;
  changes: string;
}

export interface AgentState {
  id: string;
  type: AgentType;
  status: "idle" | "running" | "completed" | "error";
  currentTask?: string;
  progress: number;
  output?: string;
  logs: AgentLog[];
}

export interface AgentLog {
  timestamp: string;
  level: "info" | "warn" | "error" | "debug";
  message: string;
}

export interface BuildLog {
  id: string;
  projectId: string;
  type: "build" | "deploy" | "test";
  status: "running" | "success" | "failed";
  output: string[];
  startedAt: string;
  completedAt?: string;
}

export interface DeploymentInfo {
  id: string;
  projectId: string;
  environment: "development" | "staging" | "production";
  status: "deploying" | "active" | "failed" | "stopped";
  url?: string;
  provider: string;
  createdAt: string;
  metrics?: DeploymentMetrics;
}

export interface DeploymentMetrics {
  uptime: number;
  responseTime: number;
  errorRate: number;
  requestsPerMinute: number;
}

export interface GenerationProgress {
  phase: SDLCPhase;
  status: PhaseStatus;
  message: string;
  progress: number;
}
