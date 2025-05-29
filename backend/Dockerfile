# backend/Dockerfile
FROM node:20-alpine
WORKDIR /app
# パッケージインストールを最適化
COPY package*.json ./
RUN npm ci --only=production
# ソースコードをコピー
COPY . .
# セキュリティ強化のためにnodeユーザーで実行
USER node
EXPOSE 5000
CMD ["node", "src/app.js"]
