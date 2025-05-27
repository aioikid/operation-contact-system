FROM python:3.9-slim

WORKDIR /app

# requirements.txtをコピーする前にディレクトリ構造を確認
# 直接ファイルパスを指定
COPY ./requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
