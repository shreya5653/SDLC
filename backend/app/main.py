import structlog
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.router import api_router
from app.core.config import settings
from app.middleware.rate_limit import RateLimitMiddleware

logger = structlog.get_logger()


def create_app() -> FastAPI:
    app = FastAPI(
        title=settings.PROJECT_NAME,
        version=settings.VERSION,
        description="AI-powered SDLC platform that transforms ideas into deployable applications",
        docs_url="/docs",
        redoc_url="/redoc",
        openapi_url="/openapi.json",
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.add_middleware(
        RateLimitMiddleware,
        calls=settings.RATE_LIMIT_PER_MINUTE,
        period=60,
    )

    app.include_router(api_router, prefix=settings.API_V1_STR)

    @app.get("/health")
    async def health_check() -> dict:
        return {
            "status": "healthy",
            "version": settings.VERSION,
            "service": settings.PROJECT_NAME,
        }

    @app.on_event("startup")
    async def startup() -> None:
        logger.info("SDLC AI Studio starting up", version=settings.VERSION)

    @app.on_event("shutdown")
    async def shutdown() -> None:
        logger.info("SDLC AI Studio shutting down")

    return app


app = create_app()
