FROM node:14-alpine as build

WORKDIR /app

# パッケージファイルをコピーして依存関係をインストール
COPY package*.json ./
RUN npm install

# ソースコードをコピー
COPY . .

# publicディレクトリが存在することを確認
RUN mkdir -p public

# publicディレクトリに必要なファイルを作成
RUN echo '<!DOCTYPE html><html lang="ja"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><title>運用連絡体制WebUIシステム</title></head><body><div id="root"></div></body></html>' > public/index.html
RUN echo '{"short_name":"運用連絡体制","name":"運用連絡体制WebUIシステム","icons":[],"start_url":".","display":"standalone","theme_color":"#000000","background_color":"#ffffff"}' > public/manifest.json
RUN echo '# https://www.robotstxt.org/robotstxt.html\nUser-agent: *\nDisallow:' > public/robots.txt

# ビルド実行
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
