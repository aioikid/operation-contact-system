from fastapi import APIRouter

# 認証関連のルーターをインポート
from .router import router as auth_router

# メインルーターの作成
router = auth_router
