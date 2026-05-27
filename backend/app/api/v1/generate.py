from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.models.project import Project, ProjectPhase
from app.schemas.deployment import GenerateRequest, GenerateResponse

router = APIRouter()

SDLC_PHASES = ["idea", "requirements", "architecture", "development", "testing", "deployment", "monitoring"]


@router.post("", response_model=GenerateResponse)
async def generate_project(
    data: GenerateRequest,
    db: AsyncSession = Depends(get_db),
) -> dict:
    project = Project(
        name=data.prompt[:100],
        description=data.prompt,
        prompt=data.prompt,
        tech_frontend=data.tech_frontend,
        tech_backend=data.tech_backend,
        tech_database=data.tech_database,
        status="active",
        current_phase="idea",
    )
    db.add(project)
    await db.flush()

    for phase_name in SDLC_PHASES:
        phase = ProjectPhase(project_id=project.id, phase=phase_name)
        db.add(phase)

    await db.flush()

    return {
        "project_id": project.id,
        "status": "generating",
        "message": "Project generation started. All SDLC phases will be processed sequentially.",
    }
