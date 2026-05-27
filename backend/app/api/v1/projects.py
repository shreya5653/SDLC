from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.core.database import get_db
from app.models.project import Project, ProjectPhase
from app.schemas.project import ProjectCreate, ProjectListResponse, ProjectResponse, ProjectUpdate

router = APIRouter()

SDLC_PHASES = ["idea", "requirements", "architecture", "development", "testing", "deployment", "monitoring"]


@router.get("", response_model=ProjectListResponse)
async def list_projects(
    skip: int = 0,
    limit: int = 50,
    db: AsyncSession = Depends(get_db),
) -> dict:
    result = await db.execute(
        select(Project).options(selectinload(Project.phases)).offset(skip).limit(limit)
    )
    projects = list(result.scalars().all())
    return {"projects": projects, "total": len(projects)}


@router.post("", response_model=ProjectResponse, status_code=status.HTTP_201_CREATED)
async def create_project(
    data: ProjectCreate,
    db: AsyncSession = Depends(get_db),
) -> Project:
    project = Project(
        name=data.name,
        description=data.description,
        prompt=data.prompt,
        tech_frontend=data.tech_stack.frontend,
        tech_backend=data.tech_stack.backend,
        tech_database=data.tech_stack.database,
        tech_deployment=data.tech_stack.deployment,
    )
    db.add(project)
    await db.flush()

    for phase_name in SDLC_PHASES:
        phase = ProjectPhase(project_id=project.id, phase=phase_name)
        db.add(phase)

    await db.flush()
    await db.refresh(project)

    result = await db.execute(
        select(Project).options(selectinload(Project.phases)).where(Project.id == project.id)
    )
    return result.scalar_one()


@router.get("/{project_id}", response_model=ProjectResponse)
async def get_project(
    project_id: str,
    db: AsyncSession = Depends(get_db),
) -> Project:
    result = await db.execute(
        select(Project).options(selectinload(Project.phases)).where(Project.id == project_id)
    )
    project = result.scalar_one_or_none()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project


@router.patch("/{project_id}", response_model=ProjectResponse)
async def update_project(
    project_id: str,
    data: ProjectUpdate,
    db: AsyncSession = Depends(get_db),
) -> Project:
    result = await db.execute(
        select(Project).options(selectinload(Project.phases)).where(Project.id == project_id)
    )
    project = result.scalar_one_or_none()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    update_data = data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(project, key, value)

    await db.flush()
    await db.refresh(project)
    return project


@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_project(
    project_id: str,
    db: AsyncSession = Depends(get_db),
) -> None:
    result = await db.execute(select(Project).where(Project.id == project_id))
    project = result.scalar_one_or_none()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    await db.delete(project)
