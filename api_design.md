# 運用連絡体制WebUIシステム API設計

## API設計方針

- RESTful APIアーキテクチャを採用
- エンドポイントは `/api/v1/` プレフィックスを使用
- JSON形式でのデータ交換
- JWT認証によるステートレスな認証
- 適切なHTTPステータスコードとエラーレスポンスの使用
- リソース指向の設計

## 認証API

### 1. ユーザー認証

```
POST /api/v1/auth/login
```

**リクエスト**:
```json
{
  "username": "string",
  "password": "string"
}
```

**レスポンス**:
```json
{
  "access_token": "string",
  "token_type": "bearer",
  "expires_in": 3600,
  "refresh_token": "string",
  "user": {
    "id": "uuid",
    "username": "string",
    "email": "string",
    "role": "string"
  }
}
```

### 2. トークンリフレッシュ

```
POST /api/v1/auth/refresh
```

**リクエスト**:
```json
{
  "refresh_token": "string"
}
```

**レスポンス**:
```json
{
  "access_token": "string",
  "token_type": "bearer",
  "expires_in": 3600
}
```

### 3. ログアウト

```
POST /api/v1/auth/logout
```

**リクエスト**:
```json
{
  "refresh_token": "string"
}
```

**レスポンス**:
```json
{
  "message": "Successfully logged out"
}
```

## 顧客情報API

### 1. 顧客情報取得

```
GET /api/v1/customers/{customer_id}
```

**レスポンス**:
```json
{
  "id": "uuid",
  "customer_name": "string",
  "customer_address": "string",
  "end_user_name": "string",
  "end_user_address": "string",
  "system_name": "string",
  "operation_start_date": "date",
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

### 2. 顧客情報更新

```
PUT /api/v1/customers/{customer_id}
```

**リクエスト**:
```json
{
  "customer_name": "string",
  "customer_address": "string",
  "end_user_name": "string",
  "end_user_address": "string",
  "system_name": "string",
  "operation_start_date": "date"
}
```

**レスポンス**:
```json
{
  "id": "uuid",
  "customer_name": "string",
  "customer_address": "string",
  "end_user_name": "string",
  "end_user_address": "string",
  "system_name": "string",
  "operation_start_date": "date",
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

### 3. 顧客一覧取得（管理者用）

```
GET /api/v1/customers
```

**クエリパラメータ**:
- page: ページ番号
- limit: 1ページあたりの件数
- search: 検索キーワード
- sort: ソートフィールド
- order: ソート順序 (asc/desc)

**レスポンス**:
```json
{
  "items": [
    {
      "id": "uuid",
      "customer_name": "string",
      "system_name": "string",
      "operation_start_date": "date",
      "updated_at": "datetime"
    }
  ],
  "total": 0,
  "page": 1,
  "limit": 20,
  "pages": 1
}
```

## 連絡体制API（最優先）

### 1. 連絡体制情報取得

```
GET /api/v1/customers/{customer_id}/contact-systems
```

**レスポンス**:
```json
{
  "regular_hours": {
    "id": "uuid",
    "contact_method": "string",
    "other_contact_method": "string",
    "contacts": [
      {
        "id": "uuid",
        "priority": 1,
        "contact_person": "string",
        "phone": "string",
        "email": "string"
      }
    ]
  },
  "after_hours": {
    "id": "uuid",
    "contact_method": "string",
    "other_contact_method": "string",
    "contacts": [
      {
        "id": "uuid",
        "priority": 1,
        "contact_person": "string",
        "phone": "string",
        "email": "string"
      }
    ]
  },
  "reception_hours": [
    {
      "id": "uuid",
      "weekday": 1,
      "start_time": "time",
      "end_time": "time",
      "is_holiday": false
    }
  ]
}
```

### 2. 通常時連絡体制更新

```
PUT /api/v1/customers/{customer_id}/contact-systems/regular
```

**リクエスト**:
```json
{
  "contact_method": "string",
  "other_contact_method": "string",
  "contacts": [
    {
      "priority": 1,
      "contact_person": "string",
      "phone": "string",
      "email": "string"
    }
  ]
}
```

**レスポンス**:
```json
{
  "id": "uuid",
  "contact_method": "string",
  "other_contact_method": "string",
  "contacts": [
    {
      "id": "uuid",
      "priority": 1,
      "contact_person": "string",
      "phone": "string",
      "email": "string"
    }
  ]
}
```

### 3. 時間外連絡体制更新

```
PUT /api/v1/customers/{customer_id}/contact-systems/after-hours
```

**リクエスト**:
```json
{
  "contact_method": "string",
  "other_contact_method": "string",
  "contacts": [
    {
      "priority": 1,
      "contact_person": "string",
      "phone": "string",
      "email": "string"
    }
  ]
}
```

**レスポンス**:
```json
{
  "id": "uuid",
  "contact_method": "string",
  "other_contact_method": "string",
  "contacts": [
    {
      "id": "uuid",
      "priority": 1,
      "contact_person": "string",
      "phone": "string",
      "email": "string"
    }
  ]
}
```

### 4. 受付時間設定更新

```
PUT /api/v1/customers/{customer_id}/reception-hours
```

**リクエスト**:
```json
{
  "reception_hours": [
    {
      "weekday": 1,
      "start_time": "time",
      "end_time": "time",
      "is_holiday": false
    }
  ]
}
```

**レスポンス**:
```json
{
  "reception_hours": [
    {
      "id": "uuid",
      "weekday": 1,
      "start_time": "time",
      "end_time": "time",
      "is_holiday": false
    }
  ]
}
```

## 連絡トリガーAPI

### 1. 連絡トリガー一覧取得

```
GET /api/v1/customers/{customer_id}/triggers
```

**レスポンス**:
```json
{
  "triggers": [
    {
      "id": "uuid",
      "trigger_name": "string",
      "trigger_description": "string",
      "created_at": "datetime"
    }
  ]
}
```

### 2. 連絡トリガー追加

```
POST /api/v1/customers/{customer_id}/triggers
```

**リクエスト**:
```json
{
  "trigger_name": "string",
  "trigger_description": "string"
}
```

**レスポンス**:
```json
{
  "id": "uuid",
  "trigger_name": "string",
  "trigger_description": "string",
  "created_at": "datetime"
}
```

### 3. 連絡トリガー更新

```
PUT /api/v1/customers/{customer_id}/triggers/{trigger_id}
```

**リクエスト**:
```json
{
  "trigger_name": "string",
  "trigger_description": "string"
}
```

**レスポンス**:
```json
{
  "id": "uuid",
  "trigger_name": "string",
  "trigger_description": "string",
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

### 4. 連絡トリガー削除

```
DELETE /api/v1/customers/{customer_id}/triggers/{trigger_id}
```

**レスポンス**:
```json
{
  "message": "Trigger successfully deleted"
}
```

## レポート設定API

### 1. レポート設定取得

```
GET /api/v1/customers/{customer_id}/report-settings
```

**レスポンス**:
```json
{
  "id": "uuid",
  "incident_report_required": true,
  "monthly_resource_report_required": true,
  "report_recipients": "string",
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

### 2. レポート設定更新

```
PUT /api/v1/customers/{customer_id}/report-settings
```

**リクエスト**:
```json
{
  "incident_report_required": true,
  "monthly_resource_report_required": true,
  "report_recipients": "string"
}
```

**レスポンス**:
```json
{
  "id": "uuid",
  "incident_report_required": true,
  "monthly_resource_report_required": true,
  "report_recipients": "string",
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

## 変更ログAPI

### 1. 変更ログ取得

```
GET /api/v1/customers/{customer_id}/logs
```

**クエリパラメータ**:
- page: ページ番号
- limit: 1ページあたりの件数
- start_date: 開始日
- end_date: 終了日

**レスポンス**:
```json
{
  "items": [
    {
      "id": "uuid",
      "user": {
        "id": "uuid",
        "username": "string"
      },
      "table_name": "string",
      "change_type": "string",
      "change_details": {},
      "created_at": "datetime"
    }
  ],
  "total": 0,
  "page": 1,
  "limit": 20,
  "pages": 1
}
```

## 管理者API

### 1. ユーザー管理

```
GET /api/v1/admin/users
POST /api/v1/admin/users
PUT /api/v1/admin/users/{user_id}
DELETE /api/v1/admin/users/{user_id}
```

### 2. データエクスポート

```
GET /api/v1/admin/export/customers
GET /api/v1/admin/export/contacts
```

**クエリパラメータ**:
- format: エクスポート形式 (csv, xlsx)
- filters: フィルター条件

## エラーレスポンス形式

```json
{
  "error": {
    "code": "string",
    "message": "string",
    "details": {}
  }
}
```

## ステータスコード

- 200: OK - リクエスト成功
- 201: Created - リソース作成成功
- 400: Bad Request - リクエスト不正
- 401: Unauthorized - 認証エラー
- 403: Forbidden - 権限エラー
- 404: Not Found - リソース未発見
- 422: Unprocessable Entity - バリデーションエラー
- 500: Internal Server Error - サーバーエラー

## レート制限

- 1分あたり60リクエストまで
- レート制限超過時は429 Too Many Requestsを返す
- X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Resetヘッダーを含める
