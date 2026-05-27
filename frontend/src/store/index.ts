"use client";

import { create } from "zustand";
import type {
  Project,
  AgentState,
  GenerationProgress,
  BuildLog,
  DeploymentInfo,
  SDLCPhase,
  AgentType,
} from "@/types";

interface AppState {
  projects: Project[];
  activeProject: Project | null;
  sidebarOpen: boolean;
  aiPanelOpen: boolean;
  commandPaletteOpen: boolean;
  agents: AgentState[];
  generationProgress: GenerationProgress[];
  buildLogs: BuildLog[];
  deployments: DeploymentInfo[];
  activePhase: SDLCPhase;

  setActiveProject: (project: Project | null) => void;
  setSidebarOpen: (open: boolean) => void;
  setAiPanelOpen: (open: boolean) => void;
  setCommandPaletteOpen: (open: boolean) => void;
  setActivePhase: (phase: SDLCPhase) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  updateAgentState: (type: AgentType, updates: Partial<AgentState>) => void;
  addGenerationProgress: (progress: GenerationProgress) => void;
  resetGenerationProgress: () => void;
  addBuildLog: (log: BuildLog) => void;
  addDeployment: (deployment: DeploymentInfo) => void;
  startGeneration: (prompt: string) => void;
}

const SAMPLE_PROJECTS: Project[] = [
  {
    id: "proj-1",
    name: "Healthcare Chatbot",
    description:
      "AI-powered healthcare chatbot with React frontend and Spring Boot backend",
    currentPhase: "development",
    status: "active",
    progress: 62,
    createdAt: "2026-05-20T10:00:00Z",
    updatedAt: "2026-05-27T06:00:00Z",
    techStack: {
      frontend: "React",
      backend: "Spring Boot",
      database: "PostgreSQL",
      deployment: "AWS",
    },
    phases: [
      {
        phase: "idea",
        status: "completed",
        startedAt: "2026-05-20T10:00:00Z",
        completedAt: "2026-05-20T10:01:00Z",
        artifacts: ["idea-doc"],
        progress: 100,
      },
      {
        phase: "requirements",
        status: "completed",
        startedAt: "2026-05-20T10:01:00Z",
        completedAt: "2026-05-20T10:05:00Z",
        artifacts: ["prd-v1", "srs-v1", "user-stories"],
        progress: 100,
      },
      {
        phase: "architecture",
        status: "completed",
        startedAt: "2026-05-20T10:05:00Z",
        completedAt: "2026-05-20T10:10:00Z",
        artifacts: ["arch-doc", "er-diagram", "api-spec"],
        progress: 100,
      },
      {
        phase: "development",
        status: "in_progress",
        startedAt: "2026-05-20T10:10:00Z",
        artifacts: ["frontend-code", "backend-code"],
        progress: 45,
      },
      {
        phase: "testing",
        status: "pending",
        artifacts: [],
        progress: 0,
      },
      {
        phase: "deployment",
        status: "pending",
        artifacts: [],
        progress: 0,
      },
      {
        phase: "monitoring",
        status: "pending",
        artifacts: [],
        progress: 0,
      },
    ],
    artifacts: [],
    team: [
      {
        id: "user-1",
        name: "Shreya",
        email: "shreya@example.com",
        role: "Owner",
      },
    ],
  },
  {
    id: "proj-2",
    name: "E-Commerce Platform",
    description:
      "Full-stack e-commerce platform with Next.js and FastAPI",
    currentPhase: "architecture",
    status: "active",
    progress: 28,
    createdAt: "2026-05-25T08:00:00Z",
    updatedAt: "2026-05-27T05:30:00Z",
    techStack: {
      frontend: "Next.js",
      backend: "FastAPI",
      database: "PostgreSQL",
      deployment: "Vercel",
    },
    phases: [
      {
        phase: "idea",
        status: "completed",
        startedAt: "2026-05-25T08:00:00Z",
        completedAt: "2026-05-25T08:01:00Z",
        artifacts: ["idea-doc"],
        progress: 100,
      },
      {
        phase: "requirements",
        status: "completed",
        startedAt: "2026-05-25T08:01:00Z",
        completedAt: "2026-05-25T08:10:00Z",
        artifacts: ["prd-v1", "srs-v1"],
        progress: 100,
      },
      {
        phase: "architecture",
        status: "in_progress",
        startedAt: "2026-05-25T08:10:00Z",
        artifacts: [],
        progress: 35,
      },
      {
        phase: "development",
        status: "pending",
        artifacts: [],
        progress: 0,
      },
      {
        phase: "testing",
        status: "pending",
        artifacts: [],
        progress: 0,
      },
      {
        phase: "deployment",
        status: "pending",
        artifacts: [],
        progress: 0,
      },
      {
        phase: "monitoring",
        status: "pending",
        artifacts: [],
        progress: 0,
      },
    ],
    artifacts: [],
    team: [
      {
        id: "user-1",
        name: "Shreya",
        email: "shreya@example.com",
        role: "Owner",
      },
    ],
  },
  {
    id: "proj-3",
    name: "Task Management API",
    description: "RESTful task management API with Node.js and MongoDB",
    currentPhase: "testing",
    status: "active",
    progress: 78,
    createdAt: "2026-05-18T14:00:00Z",
    updatedAt: "2026-05-27T04:00:00Z",
    techStack: {
      frontend: "React",
      backend: "Node.js",
      database: "MongoDB",
      deployment: "Railway",
    },
    phases: [
      {
        phase: "idea",
        status: "completed",
        startedAt: "2026-05-18T14:00:00Z",
        completedAt: "2026-05-18T14:01:00Z",
        artifacts: [],
        progress: 100,
      },
      {
        phase: "requirements",
        status: "completed",
        startedAt: "2026-05-18T14:01:00Z",
        completedAt: "2026-05-18T14:05:00Z",
        artifacts: [],
        progress: 100,
      },
      {
        phase: "architecture",
        status: "completed",
        startedAt: "2026-05-18T14:05:00Z",
        completedAt: "2026-05-18T14:10:00Z",
        artifacts: [],
        progress: 100,
      },
      {
        phase: "development",
        status: "completed",
        startedAt: "2026-05-18T14:10:00Z",
        completedAt: "2026-05-22T10:00:00Z",
        artifacts: [],
        progress: 100,
      },
      {
        phase: "testing",
        status: "in_progress",
        startedAt: "2026-05-22T10:00:00Z",
        artifacts: [],
        progress: 60,
      },
      {
        phase: "deployment",
        status: "pending",
        artifacts: [],
        progress: 0,
      },
      {
        phase: "monitoring",
        status: "pending",
        artifacts: [],
        progress: 0,
      },
    ],
    artifacts: [],
    team: [
      {
        id: "user-1",
        name: "Shreya",
        email: "shreya@example.com",
        role: "Owner",
      },
    ],
  },
];

const INITIAL_AGENTS: AgentState[] = [
  {
    id: "agent-req",
    type: "requirements",
    status: "idle",
    progress: 0,
    logs: [],
  },
  {
    id: "agent-arch",
    type: "architecture",
    status: "idle",
    progress: 0,
    logs: [],
  },
  {
    id: "agent-db",
    type: "database",
    status: "idle",
    progress: 0,
    logs: [],
  },
  {
    id: "agent-fe",
    type: "frontend",
    status: "idle",
    progress: 0,
    logs: [],
  },
  {
    id: "agent-be",
    type: "backend",
    status: "idle",
    progress: 0,
    logs: [],
  },
  {
    id: "agent-test",
    type: "testing",
    status: "idle",
    progress: 0,
    logs: [],
  },
  {
    id: "agent-cicd",
    type: "cicd",
    status: "idle",
    progress: 0,
    logs: [],
  },
  {
    id: "agent-deploy",
    type: "deployment",
    status: "idle",
    progress: 0,
    logs: [],
  },
  {
    id: "agent-monitor",
    type: "monitoring",
    status: "idle",
    progress: 0,
    logs: [],
  },
];

export const useAppStore = create<AppState>((set, get) => ({
  projects: SAMPLE_PROJECTS,
  activeProject: null,
  sidebarOpen: true,
  aiPanelOpen: false,
  commandPaletteOpen: false,
  agents: INITIAL_AGENTS,
  generationProgress: [],
  buildLogs: [],
  deployments: [],
  activePhase: "idea",

  setActiveProject: (project) => set({ activeProject: project }),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setAiPanelOpen: (open) => set({ aiPanelOpen: open }),
  setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
  setActivePhase: (phase) => set({ activePhase: phase }),

  addProject: (project) =>
    set((state) => ({ projects: [...state.projects, project] })),

  updateProject: (id, updates) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      ),
      activeProject:
        state.activeProject?.id === id
          ? { ...state.activeProject, ...updates }
          : state.activeProject,
    })),

  updateAgentState: (type, updates) =>
    set((state) => ({
      agents: state.agents.map((a) =>
        a.type === type ? { ...a, ...updates } : a
      ),
    })),

  addGenerationProgress: (progress) =>
    set((state) => ({
      generationProgress: [...state.generationProgress, progress],
    })),

  resetGenerationProgress: () => set({ generationProgress: [] }),

  addBuildLog: (log) =>
    set((state) => ({ buildLogs: [...state.buildLogs, log] })),

  addDeployment: (deployment) =>
    set((state) => ({
      deployments: [...state.deployments, deployment],
    })),

  startGeneration: (prompt: string) => {
    const phases: SDLCPhase[] = [
      "idea",
      "requirements",
      "architecture",
      "development",
      "testing",
      "deployment",
      "monitoring",
    ];

    const agentOrder: AgentType[] = [
      "requirements",
      "architecture",
      "database",
      "frontend",
      "backend",
      "testing",
      "cicd",
      "deployment",
      "monitoring",
    ];

    set({ generationProgress: [] });

    const newProject: Project = {
      id: `proj-${Date.now()}`,
      name: prompt.slice(0, 50),
      description: prompt,
      currentPhase: "idea",
      status: "active",
      progress: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      techStack: {
        frontend: "React",
        backend: "FastAPI",
        database: "PostgreSQL",
        deployment: "Docker",
      },
      phases: phases.map((phase) => ({
        phase,
        status: "pending" as const,
        artifacts: [],
        progress: 0,
      })),
      artifacts: [],
      team: [
        {
          id: "user-1",
          name: "Shreya",
          email: "shreya@example.com",
          role: "Owner",
        },
      ],
    };

    get().addProject(newProject);
    get().setActiveProject(newProject);

    const messages: Record<SDLCPhase, string> = {
      idea: "Analyzing project idea and scope...",
      requirements:
        "Generating PRD, SRS, and user stories...",
      architecture:
        "Designing system architecture and database schema...",
      development:
        "Generating frontend and backend code...",
      testing: "Creating test suites and running tests...",
      deployment:
        "Building Docker containers and CI/CD pipelines...",
      monitoring:
        "Setting up monitoring and observability...",
    };

    let delay = 0;
    phases.forEach((phase, index) => {
      delay += 1500 + Math.random() * 1000;
      setTimeout(() => {
        get().addGenerationProgress({
          phase,
          status: "in_progress",
          message: messages[phase],
          progress: 50,
        });

        if (index < agentOrder.length) {
          get().updateAgentState(agentOrder[index], {
            status: "running",
            currentTask: messages[phase],
            progress: 50,
          });
        }

        get().updateProject(newProject.id, {
          currentPhase: phase,
          progress: Math.round(((index + 0.5) / phases.length) * 100),
        });
      }, delay);

      delay += 1000 + Math.random() * 800;
      setTimeout(() => {
        get().addGenerationProgress({
          phase,
          status: "completed",
          message: `${phase.charAt(0).toUpperCase() + phase.slice(1)} phase completed`,
          progress: 100,
        });

        if (index < agentOrder.length) {
          get().updateAgentState(agentOrder[index], {
            status: "completed",
            progress: 100,
          });
        }

        get().updateProject(newProject.id, {
          progress: Math.round(((index + 1) / phases.length) * 100),
          phases: phases.map((p, i) => ({
            phase: p,
            status:
              i <= index
                ? ("completed" as const)
                : i === index + 1
                  ? ("in_progress" as const)
                  : ("pending" as const),
            artifacts: [],
            progress: i <= index ? 100 : 0,
          })),
        });

        if (index === phases.length - 1) {
          get().updateProject(newProject.id, {
            status: "completed",
            currentPhase: "monitoring",
            progress: 100,
          });
        }
      }, delay);
    });
  },
}));
