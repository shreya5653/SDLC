from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.core.database import get_db
from app.models.agent import AgentRun
from app.schemas.agent import AgentRunCreate, AgentRunResponse

router = APIRouter()


@router.get("", response_model=list[AgentRunResponse])
async def list_agent_runs(
    project_id: str | None = None,
    db: AsyncSession = Depends(get_db),
) -> list[AgentRun]:
    query = select(AgentRun).options(selectinload(AgentRun.logs))
    if project_id:
        query = query.where(AgentRun.project_id == project_id)
    result = await db.execute(query.order_by(AgentRun.created_at.desc()))
    return list(result.scalars().all())


@router.post("", response_model=AgentRunResponse, status_code=201)
async def create_agent_run(
    data: AgentRunCreate,
    db: AsyncSession = Depends(get_db),
) -> AgentRun:
    agent_run = AgentRun(
        project_id=data.project_id,
        agent_type=data.agent_type,
        status="pending",
    )
    db.add(agent_run)
    await db.flush()
    await db.refresh(agent_run)

    result = await db.execute(
        select(AgentRun).options(selectinload(AgentRun.logs)).where(AgentRun.id == agent_run.id)
    )
    return result.scalar_one()


@router.get("/{run_id}", response_model=AgentRunResponse)
async def get_agent_run(
    run_id: str,
    db: AsyncSession = Depends(get_db),
) -> AgentRun:
    result = await db.execute(
        select(AgentRun).options(selectinload(AgentRun.logs)).where(AgentRun.id == run_id)
    )
    run = result.scalar_one_or_none()
    if not run:
        raise HTTPException(status_code=404, detail="Agent run not found")
    return run
