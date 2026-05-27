# SDLC AI Studio

An AI-powered software engineering platform that transforms a user's idea into a deployable application while strictly following every phase of the Software Development Life Cycle (SDLC).

## Overview

SDLC AI Studio is a production-grade SaaS platform that combines the capabilities of AI code generation, project management, and deployment automation. Enter a project idea and the platform automatically generates and maintains every SDLC artifact — from PRDs to deployed applications.

```
Idea → PRD → SRS → User Stories → Architecture → ER Diagrams → API Specs
→ Task Breakdown → UI Suggestions → Frontend Code → Backend Code
→ Tests → CI/CD → Deployment → Hosted URL
```

Each phase is visible, editable, downloadable, versioned, and interconnected. Editing an earlier phase triggers downstream updates automatically.

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (Next.js)                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐ │
│  │ Dashboard │  │ Workflow │  │ Doc Edit │  │  Code  │ │
│  │   Page   │  │ (React   │  │ (TipTap) │  │ Viewer │ │
│  │          │  │  Flow)   │  │          │  │(Monaco)│ │
│  └──────────┘  └──────────┘  └──────────┘  └────────┘ │
└────────────────────────┬────────────────────────────────┘
                         │ REST API
┌────────────────────────┴────────────────────────────────┐
│                   Backend (FastAPI)                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐ │
│  │   Auth   │  │ Projects │  │ Artifacts│  │ Agents │ │
│  │  (JWT)   │  │   API    │  │   API    │  │  API   │ │
│  └──────────┘  └──────────┘  └──────────┘  └────────┘ │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │           Multi-Agent Orchestrator               │  │
│  │  Requirements → Architecture → Database →        │  │
│  │  Frontend → Backend → Testing → CI/CD →          │  │
│  │  Deployment → Monitoring                         │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────┘
                         │
┌────────────────────────┴────────────────────────────────┐
│                    Infrastructure                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐ │
│  │PostgreSQL│  │  Redis   │  │  Docker  │  │  S3    │ │
│  └──────────┘  └──────────┘  └──────────┘  └────────┘ │
└─────────────────────────────────────────────────────────┘
```

## Tech Stack

### Frontend
- **Next.js 16** (App Router) with TypeScript
- **TailwindCSS v4** for styling
- **shadcn/ui** component library (Radix UI primitives)
- **React Flow** for SDLC workflow visualization
- **Monaco Editor** for code viewing/editing
- **TipTap** for rich text document editing
- **Framer Motion** for animations
- **Zustand** for state management

### Backend
- **FastAPI** with async support
- **PostgreSQL** with SQLAlchemy 2.0 async
- **Redis** for caching and message queuing
- **LangGraph** for multi-agent orchestration
- **OpenAI** API integration
- **Alembic** for database migrations

### Infrastructure
- **Docker** & **Docker Compose**
- **GitHub Actions** CI/CD
- Support for **Vercel**, **Railway**, **AWS** deployment

## Features

### Multi-Project Dashboard
- Project cards with status, progress, and tech stack
- Activity feed with real-time updates
- Stats overview (active projects, deployments, test pass rate)

### Interactive SDLC Workflow
- React Flow-based visual pipeline
- Phase nodes with status indicators and progress bars
- Animated edges showing data flow between phases

### Document Generation & Editing
- PRD, SRS, User Stories, Acceptance Criteria
- Rich text editing with TipTap
- Markdown preview with syntax highlighting
- Export to PDF, Markdown, DOCX

### Version History
- Git-like versioning for all artifacts
- Diff comparison between versions
- One-click rollback to any version

### Multi-Agent AI System
- 9 specialized agents (Requirements, Architecture, Database, Frontend, Backend, Testing, CI/CD, Deployment, Monitoring)
- Shared state communication
- Real-time progress tracking

### Code Generation
- Full repository generation (frontend, backend, tests, docker)
- File explorer with syntax-highlighted code viewer
- Support for React, Next.js, FastAPI, Spring Boot, Node.js

### Testing
- Unit, Integration, and E2E test generation
- Autonomous test-repair loop
- Coverage tracking per test suite

### CI/CD & Deployment
- Auto-generated Dockerfiles and docker-compose
- GitHub Actions pipelines
- One-click deployment to Vercel, Railway, AWS
- Build logs and deployment monitoring

### Monitoring
- Real-time build and deploy logs
- Uptime, response time, and error rate metrics
- Runtime monitoring dashboard

## Getting Started

### Prerequisites
- Node.js 22+
- Python 3.12+
- Docker & Docker Compose
- PostgreSQL 16+
- Redis 7+

### Quick Start with Docker

```bash
# Clone the repository
git clone https://github.com/shreya5653/SDLC.git
cd SDLC

# Copy environment variables
cp .env.example .env
# Edit .env with your OpenAI API key and other settings

# Start all services
docker-compose up -d

# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
# API Docs: http://localhost:8000/docs
```

### Local Development

#### Frontend
```bash
cd frontend
npm install
npm run dev
# Open http://localhost:3000
```

#### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
# API docs at http://localhost:8000/docs
```

## Project Structure

```
SDLC/
├── frontend/                    # Next.js application
│   ├── src/
│   │   ├── app/                # App Router pages
│   │   │   ├── page.tsx        # Dashboard
│   │   │   ├── projects/       # Projects pages
│   │   │   ├── requirements/   # Requirements editor
│   │   │   ├── architecture/   # Architecture diagrams
│   │   │   ├── development/    # Code viewer
│   │   │   ├── testing/        # Test management
│   │   │   ├── deployments/    # Deployment panel
│   │   │   ├── artifacts/      # Artifact browser
│   │   │   └── settings/       # Settings page
│   │   ├── components/
│   │   │   ├── ui/             # shadcn/ui components
│   │   │   ├── layout/         # App shell, sidebar, header
│   │   │   ├── dashboard/      # Dashboard components
│   │   │   ├── workflow/       # SDLC flow visualization
│   │   │   ├── documents/      # Document editor & history
│   │   │   ├── code/           # Code viewer
│   │   │   ├── agents/         # Agent monitoring panel
│   │   │   └── deployment/     # Deployment management
│   │   ├── store/              # Zustand state management
│   │   ├── types/              # TypeScript type definitions
│   │   └── lib/                # Utility functions
│   ├── Dockerfile              # Frontend Docker image
│   ├── docker-compose.yml      # Frontend standalone compose
│   ├── .github/workflows/ci.yml
│   └── package.json
│
├── backend/                     # FastAPI application
│   ├── app/
│   │   ├── api/v1/             # API endpoints
│   │   │   ├── auth.py         # Authentication
│   │   │   ├── projects.py     # Project CRUD
│   │   │   ├── artifacts.py    # Artifact management
│   │   │   ├── agents.py       # Agent monitoring
│   │   │   ├── deployments.py  # Deployment management
│   │   │   └── generate.py     # AI generation endpoint
│   │   ├── models/             # SQLAlchemy models
│   │   ├── schemas/            # Pydantic schemas
│   │   ├── agents/             # Multi-agent system
│   │   │   └── orchestrator.py # SDLC pipeline orchestrator
│   │   ├── core/               # Config, DB, security
│   │   ├── middleware/         # Rate limiting, etc.
│   │   └── main.py            # FastAPI app entry
│   ├── tests/                  # API tests
│   ├── Dockerfile              # Backend Docker image
│   ├── docker-compose.yml      # Backend + DB + Redis compose
│   ├── .github/workflows/ci.yml
│   ├── .env.example
│   └── pyproject.toml
│
├── .env.example                 # Root environment template
├── .gitignore
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/register` | Register new user |
| POST | `/api/v1/auth/login` | Login |
| GET | `/api/v1/auth/me` | Get current user |
| GET | `/api/v1/projects` | List projects |
| POST | `/api/v1/projects` | Create project |
| GET | `/api/v1/projects/:id` | Get project |
| PATCH | `/api/v1/projects/:id` | Update project |
| DELETE | `/api/v1/projects/:id` | Delete project |
| GET | `/api/v1/artifacts` | List artifacts |
| POST | `/api/v1/artifacts` | Create artifact |
| GET | `/api/v1/artifacts/:id` | Get artifact |
| PUT | `/api/v1/artifacts/:id` | Update artifact |
| GET | `/api/v1/agents` | List agent runs |
| POST | `/api/v1/agents` | Create agent run |
| GET | `/api/v1/deployments` | List deployments |
| POST | `/api/v1/deployments` | Create deployment |
| POST | `/api/v1/generate` | Generate project from prompt |

## Database Schema

### Core Tables
- **users** — User accounts with JWT auth
- **projects** — SDLC projects with tech stack config
- **project_phases** — Phase tracking (idea → monitoring)
- **project_members** — Team collaboration
- **artifacts** — Generated documents and code
- **artifact_versions** — Version history with diffs
- **agent_runs** — AI agent execution tracking
- **agent_logs** — Agent activity logs
- **deployments** — Deployment configurations
- **build_logs** — Build and deploy output

## Environment Variables

See `.env.example` for all available configuration options.

## License

MIT
