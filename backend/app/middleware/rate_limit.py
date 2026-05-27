import time
from collections import defaultdict

from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware

from app.core.config import settings


class RateLimitMiddleware(BaseHTTPMiddleware):
    """Simple in-memory rate limiting middleware."""

    def __init__(self, app, calls: int = 60, period: int = 60):  # type: ignore[no-untyped-def]
        super().__init__(app)
        self.calls = calls
        self.period = period
        self.clients: dict[str, list[float]] = defaultdict(list)

    async def dispatch(self, request: Request, call_next):  # type: ignore[no-untyped-def]
        client_ip = request.client.host if request.client else "unknown"
        now = time.time()

        self.clients[client_ip] = [
            t for t in self.clients[client_ip] if now - t < self.period
        ]

        if len(self.clients[client_ip]) >= self.calls:
            return Response(
                content='{"detail": "Rate limit exceeded"}',
                status_code=429,
                media_type="application/json",
            )

        self.clients[client_ip].append(now)
        return await call_next(request)
