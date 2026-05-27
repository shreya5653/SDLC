from datetime import datetime

from pydantic import BaseModel


class AgentRunCreate(BaseModel):
    project_id: str
    agent_type: str


class AgentLogResponse(BaseModel):
    id: str
    level: str
    message: str
    timestamp: datetime

    model_config = {"from_attributes": True}


class AgentRunResponse(BaseModel):
    id: str
    project_id: str
    agent_type: str
    status: str
    current_task: str | None
    progress: float
    output: str | None
    error: str | None
    started_at: datetime | None
    completed_at: datetime | None
    created_at: datetime
    logs: list[AgentLogResponse] = []

    model_config = {"from_attributes": True}
