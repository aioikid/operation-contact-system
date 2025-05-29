# frontend/Dockerfile
# ビルドステージ
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# 実行ステージ
FROM nginx:alpine
# nginxの設定を最適化
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
# セキュリティ強化のためにnginxユーザーで実行
RUN touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid && \
    chown -R nginx:nginx /var/cache/nginx
USER nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
