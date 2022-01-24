from fastapi import APIRouter
from .manager import router as manager_router
from .client import router as client_router
from .sts import router as sts_router
from .status import router as status_router
from .to import router as to_router

router = APIRouter()
router.include_router(manager_router)
router.include_router(client_router)
router.include_router(sts_router)
router.include_router(status_router)
router.include_router(to_router)
