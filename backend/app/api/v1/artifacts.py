from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.core.database import get_db
from app.models.artifact import Artifact, ArtifactVersion
from app.schemas.artifact import ArtifactCreate, ArtifactResponse, ArtifactUpdate

router = APIRouter()


@router.get("", response_model=list[ArtifactResponse])
async def list_artifacts(
    project_id: str | None = None,
    phase: str | None = None,
    db: AsyncSession = Depends(get_db),
) -> list[Artifact]:
    query = select(Artifact).options(selectinload(Artifact.versions))
    if project_id:
        query = query.where(Artifact.project_id == project_id)
    if phase:
        query = query.where(Artifact.phase == phase)
    result = await db.execute(query)
    return list(result.scalars().all())


@router.post("", response_model=ArtifactResponse, status_code=status.HTTP_201_CREATED)
async def create_artifact(
    project_id: str,
    data: ArtifactCreate,
    db: AsyncSession = Depends(get_db),
) -> Artifact:
    artifact = Artifact(
        project_id=project_id,
        name=data.name,
        artifact_type=data.artifact_type,
        phase=data.phase,
        content=data.content,
        format=data.format,
    )
    db.add(artifact)
    await db.flush()

    version = ArtifactVersion(
        artifact_id=artifact.id,
        version=1,
        content=data.content,
        change_summary="Initial creation",
    )
    db.add(version)
    await db.flush()
    await db.refresh(artifact)

    result = await db.execute(
        select(Artifact).options(selectinload(Artifact.versions)).where(Artifact.id == artifact.id)
    )
    return result.scalar_one()


@router.get("/{artifact_id}", response_model=ArtifactResponse)
async def get_artifact(
    artifact_id: str,
    db: AsyncSession = Depends(get_db),
) -> Artifact:
    result = await db.execute(
        select(Artifact).options(selectinload(Artifact.versions)).where(Artifact.id == artifact_id)
    )
    artifact = result.scalar_one_or_none()
    if not artifact:
        raise HTTPException(status_code=404, detail="Artifact not found")
    return artifact


@router.put("/{artifact_id}", response_model=ArtifactResponse)
async def update_artifact(
    artifact_id: str,
    data: ArtifactUpdate,
    db: AsyncSession = Depends(get_db),
) -> Artifact:
    result = await db.execute(
        select(Artifact).options(selectinload(Artifact.versions)).where(Artifact.id == artifact_id)
    )
    artifact = result.scalar_one_or_none()
    if not artifact:
        raise HTTPException(status_code=404, detail="Artifact not found")

    artifact.content = data.content
    artifact.current_version += 1

    version = ArtifactVersion(
        artifact_id=artifact.id,
        version=artifact.current_version,
        content=data.content,
        change_summary=data.change_summary,
    )
    db.add(version)
    await db.flush()
    await db.refresh(artifact)

    result = await db.execute(
        select(Artifact).options(selectinload(Artifact.versions)).where(Artifact.id == artifact.id)
    )
    return result.scalar_one()
