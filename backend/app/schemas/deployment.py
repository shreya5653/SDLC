from datetime import datetime

from pydantic import BaseModel


class DeploymentCreate(BaseModel):
    project_id: str
    environment: str = "development"
    provider: str = "docker"


class DeploymentResponse(BaseModel):
    id: str
    project_id: str
    environment: str
    status: str
    provider: str
    url: str | None
    commit_sha: str | None
    uptime: float | None
    response_time_ms: float | None
    error_rate: float | None
    created_at: datetime
    deployed_at: datetime | None

    model_config = {"from_attributes": True}


class GenerateRequest(BaseModel):
    prompt: str
    tech_frontend: str = "React"
    tech_backend: str = "FastAPI"
    tech_database: str = "PostgreSQL"


class GenerateResponse(BaseModel):
    project_id: str
    status: str
    message: str
