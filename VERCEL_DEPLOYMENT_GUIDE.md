# Vercelデプロイ手順ガイド

## 1. GitHubリポジトリの準備

1. GitHubにログインし、新しいリポジトリを作成します
   - リポジトリ名: `fairway-operation-contact-system`（任意の名前でOK）
   - 公開設定: Public または Private
   - README.mdの初期化: チェックを入れない

2. ローカルでリポジトリをクローンします
   ```bash
   git clone https://github.com/あなたのユーザー名/fairway-operation-contact-system.git
   cd fairway-operation-contact-system
   ```

3. 準備したファイルをリポジトリにコピーします
   - `vercel-deploy/public/index.html` → `public/index.html`
   - `vercel-deploy/public/styles.css` → `public/styles.css`
   - `vercel-deploy/vercel.json` → `vercel.json`

4. ファイルをコミットしてプッシュします
   ```bash
   git add .
   git commit -m "Initial commit for FAIRWAY Operation Contact System"
   git push origin main
   ```

## 2. Vercelでのデプロイ

1. [Vercel](https://vercel.com/)にアクセスし、アカウントを作成またはログインします
   - GitHubアカウントでのログインが最も簡単です

2. ダッシュボードから「New Project」をクリックします

3. GitHubリポジトリの連携
   - 「Import Git Repository」セクションで、先ほど作成したリポジトリを選択します
   - 初回の場合は、GitHubとの連携認証が必要です

4. プロジェクト設定
   - Framework Preset: 「Other」を選択
   - Root Directory: デフォルトのまま（変更不要）
   - Build and Output Settings: デフォルトのまま（変更不要）

5. 「Deploy」ボタンをクリックしてデプロイを開始します

6. デプロイが完了すると、自動的にプロジェクトのダッシュボードに移動します
   - 「Visit」ボタンをクリックすると、デプロイされたサイトにアクセスできます
   - 通常、URLは `https://fairway-operation-contact-system.vercel.app` のような形式になります

## 3. デプロイ後の確認

1. デプロイされたサイトにアクセスし、以下の点を確認します
   - ログイン画面が正しく表示されているか
   - スタイルが適用されているか
   - レスポンシブデザインが機能しているか（スマートフォンやタブレットでの表示）

2. 問題がある場合は、ファイルを修正してGitHubにプッシュすると、自動的に再デプロイされます

## 4. カスタムドメインの設定（オプション）

1. Vercelプロジェクトのダッシュボードから「Settings」→「Domains」に移動します

2. 所有しているドメインを入力し、「Add」をクリックします

3. DNSレコードの設定手順に従って、ドメインプロバイダーでの設定を行います

## 5. バックエンドとの連携（将来的な拡張）

1. バックエンドAPIをデプロイする際は、環境変数を使用してAPIのエンドポイントを設定します

2. Vercelプロジェクトの「Settings」→「Environment Variables」で設定できます
   - 例: `API_URL=https://your-backend-api.com`

3. フロントエンドコードでこの環境変数を参照することで、環境ごとに異なるAPIエンドポイントを使用できます
