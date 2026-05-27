from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.models.deployment import Deployment
from app.schemas.deployment import DeploymentCreate, DeploymentResponse

router = APIRouter()


@router.get("", response_model=list[DeploymentResponse])
async def list_deployments(
    project_id: str | None = None,
    db: AsyncSession = Depends(get_db),
) -> list[Deployment]:
    query = select(Deployment)
    if project_id:
        query = query.where(Deployment.project_id == project_id)
    result = await db.execute(query.order_by(Deployment.created_at.desc()))
    return list(result.scalars().all())


@router.post("", response_model=DeploymentResponse, status_code=201)
async def create_deployment(
    data: DeploymentCreate,
    db: AsyncSession = Depends(get_db),
) -> Deployment:
    deployment = Deployment(
        project_id=data.project_id,
        environment=data.environment,
        provider=data.provider,
        status="deploying",
    )
    db.add(deployment)
    await db.flush()
    await db.refresh(deployment)
    return deployment


@router.get("/{deployment_id}", response_model=DeploymentResponse)
async def get_deployment(
    deployment_id: str,
    db: AsyncSession = Depends(get_db),
) -> Deployment:
    result = await db.execute(select(Deployment).where(Deployment.id == deployment_id))
    deployment = result.scalar_one_or_none()
    if not deployment:
        raise HTTPException(status_code=404, detail="Deployment not found")
    return deployment
