from datetime import datetime

from pydantic import BaseModel, Field


class ArtifactCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    artifact_type: str
    phase: str
    content: str = ""
    format: str = "markdown"


class ArtifactUpdate(BaseModel):
    content: str
    change_summary: str = ""


class ArtifactVersionResponse(BaseModel):
    id: str
    version: int
    content: str
    change_summary: str
    author_id: str | None
    created_at: datetime

    model_config = {"from_attributes": True}


class ArtifactResponse(BaseModel):
    id: str
    project_id: str
    name: str
    artifact_type: str
    phase: str
    current_version: int
    content: str
    format: str
    created_at: datetime
    updated_at: datetime
    versions: list[ArtifactVersionResponse] = []

    model_config = {"from_attributes": True}
