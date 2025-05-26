from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import uvicorn

from .database import engine, Base, get_db
from .api import router as api_router
from .auth import router as auth_router

# データベーステーブルの作成
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="運用連絡体制WebUIシステム API",
    description="株式会社フェアーウェイの運用連絡体制管理システムのバックエンドAPI",
    version="0.1.0"
)

# CORS設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 本番環境では適切に制限する
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ルーターの登録
app.include_router(auth_router, prefix="/api/v1/auth", tags=["認証"])
app.include_router(api_router, prefix="/api/v1", tags=["API"])

@app.get("/", tags=["ヘルスチェック"])
def read_root():
    return {"message": "運用連絡体制WebUIシステム API サーバー稼働中"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
