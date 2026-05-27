from datetime import datetime

from pydantic import BaseModel, Field


class TechStackSchema(BaseModel):
    frontend: str = "React"
    backend: str = "FastAPI"
    database: str = "PostgreSQL"
    deployment: str = "Docker"


class ProjectCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    description: str = Field(..., min_length=1)
    prompt: str = Field(..., min_length=1)
    tech_stack: TechStackSchema = TechStackSchema()


class ProjectUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    status: str | None = None
    current_phase: str | None = None
    progress: float | None = None


class PhaseSchema(BaseModel):
    phase: str
    status: str
    progress: float
    started_at: datetime | None = None
    completed_at: datetime | None = None

    model_config = {"from_attributes": True}


class ProjectResponse(BaseModel):
    id: str
    name: str
    description: str
    prompt: str
    status: str
    current_phase: str
    progress: float
    tech_frontend: str
    tech_backend: str
    tech_database: str
    tech_deployment: str
    created_at: datetime
    updated_at: datetime
    phases: list[PhaseSchema] = []

    model_config = {"from_attributes": True}


class ProjectListResponse(BaseModel):
    projects: list[ProjectResponse]
    total: int
