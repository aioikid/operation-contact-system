FROM python:3.9-slim

WORKDIR /app

# requirements.txtを作成
RUN echo "fastapi==0.104.1\nuvicorn==0.23.2\nsqlalchemy==2.0.23\npydantic==2.4.2\npython-jose==3.3.0\npasslib==1.7.4\npython-multipart==0.0.6\npsycopg2-binary==2.9.9\nalembic==1.12.1" > requirements.txt

# 依存関係をインストール
RUN pip install --no-cache-dir -r requirements.txt

# main.pyファイルを作成
RUN echo 'from fastapi import FastAPI\nfrom fastapi.middleware.cors import CORSMiddleware\n\napp = FastAPI()\n\napp.add_middleware(\n    CORSMiddleware,\n    allow_origins=["*"],\n    allow_credentials=True,\n    allow_methods=["*"],\n    allow_headers=["*"],\n)\n\n@app.get("/")\ndef read_root():\n    return {"message": "運用連絡体制WebUIシステム API"}\n\n@app.get("/api/health")\ndef health_check():\n    return {"status": "healthy"}' > main.py

# コマンドを設定
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
