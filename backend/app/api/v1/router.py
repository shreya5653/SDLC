from fastapi import APIRouter

from app.api.v1 import auth, projects, artifacts, agents, deployments, generate

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(projects.router, prefix="/projects", tags=["Projects"])
api_router.include_router(artifacts.router, prefix="/artifacts", tags=["Artifacts"])
api_router.include_router(agents.router, prefix="/agents", tags=["Agents"])
api_router.include_router(deployments.router, prefix="/deployments", tags=["Deployments"])
api_router.include_router(generate.router, prefix="/generate", tags=["Generation"])
