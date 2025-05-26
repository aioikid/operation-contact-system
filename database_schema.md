# 運用連絡体制WebUIシステム データベース設計

## 設計方針

- 連絡体制管理を最優先機能として設計
- 1000社規模の顧客データ管理に対応
- 同時アクセス数50以下を想定した最適化
- 将来的な拡張性を考慮

## データベース選択

PostgreSQLを採用する理由：
- 同時アクセス処理に強い
- トランザクション管理が堅牢
- 将来的な拡張性が高い
- オープンソースで運用コストを抑制可能

## テーブル設計

### 1. ユーザー管理テーブル (users)

```
id: UUID (主キー)
username: VARCHAR(50) (一意)
password_hash: VARCHAR(255)
email: VARCHAR(100) (一意)
role: VARCHAR(20) [admin, customer, staff]
is_active: BOOLEAN
created_at: TIMESTAMP
updated_at: TIMESTAMP
last_login: TIMESTAMP
```

### 2. 顧客情報テーブル (customers)

```
id: UUID (主キー)
user_id: UUID (外部キー -> users.id)
customer_name: VARCHAR(100) (お客様名)
customer_address: TEXT (お客様住所)
end_user_name: VARCHAR(100) (エンドユーザ名)
end_user_address: TEXT (エンドユーザ住所)
system_name: VARCHAR(100) (システム名称)
operation_start_date: DATE (運用開始日)
created_at: TIMESTAMP
updated_at: TIMESTAMP
```

### 3. 連絡体制テーブル (contact_systems)

```
id: UUID (主キー)
customer_id: UUID (外部キー -> customers.id)
is_regular_hours: BOOLEAN (通常受付時間帯か時間外か)
contact_method: VARCHAR(50) [phone, email, other] (連絡方法)
other_contact_method: TEXT (その他の場合の連絡方法)
created_at: TIMESTAMP
updated_at: TIMESTAMP
```

### 4. 受付時間設定テーブル (reception_hours)

```
id: UUID (主キー)
customer_id: UUID (外部キー -> customers.id)
weekday: INTEGER [0-6] (曜日、0=日曜)
start_time: TIME (開始時間)
end_time: TIME (終了時間)
is_holiday: BOOLEAN (祝日扱いか)
created_at: TIMESTAMP
updated_at: TIMESTAMP
```

### 5. 連絡先テーブル (contacts)

```
id: UUID (主キー)
contact_system_id: UUID (外部キー -> contact_systems.id)
priority: INTEGER [1-3] (第一、第二、第三連絡先)
contact_person: VARCHAR(100) (担当者名)
phone: VARCHAR(20) (電話番号)
email: VARCHAR(100) (メールアドレス)
created_at: TIMESTAMP
updated_at: TIMESTAMP
```

### 6. 連絡トリガーテーブル (contact_triggers)

```
id: UUID (主キー)
customer_id: UUID (外部キー -> customers.id)
trigger_name: VARCHAR(100) (トリガー名)
trigger_description: TEXT (トリガー詳細)
created_at: TIMESTAMP
updated_at: TIMESTAMP
```

### 7. レポート設定テーブル (report_settings)

```
id: UUID (主キー)
customer_id: UUID (外部キー -> customers.id)
incident_report_required: BOOLEAN (障害報告書)
monthly_resource_report_required: BOOLEAN (月次リソースレポート)
report_recipients: TEXT (レポート送付先、カンマ区切りメールアドレス)
created_at: TIMESTAMP
updated_at: TIMESTAMP
```

### 8. 変更ログテーブル (change_logs)

```
id: UUID (主キー)
user_id: UUID (外部キー -> users.id)
table_name: VARCHAR(50) (変更されたテーブル)
record_id: UUID (変更されたレコードID)
change_type: VARCHAR(20) [create, update, delete]
change_details: JSONB (変更内容の詳細)
created_at: TIMESTAMP
```

## インデックス設計

### 主要インデックス
- users: username, email
- customers: customer_name, user_id
- contact_systems: customer_id, is_regular_hours
- contacts: contact_system_id, priority
- change_logs: user_id, table_name, record_id

### 複合インデックス
- reception_hours: (customer_id, weekday)
- contacts: (contact_system_id, priority)

## リレーションシップ

1. users 1:1 customers (一人のユーザーは一つの顧客情報を持つ)
2. customers 1:N contact_systems (一つの顧客は複数の連絡体制を持つ)
3. customers 1:N reception_hours (一つの顧客は複数の受付時間設定を持つ)
4. contact_systems 1:N contacts (一つの連絡体制は複数の連絡先を持つ)
5. customers 1:N contact_triggers (一つの顧客は複数の連絡トリガーを持つ)
6. customers 1:1 report_settings (一つの顧客は一つのレポート設定を持つ)
7. users 1:N change_logs (一人のユーザーは複数の変更ログを持つ)

## データ整合性制約

- 外部キー制約: 全ての外部キー参照に対してON DELETE CASCADE制約を設定
- ユニーク制約: username, emailに対してユニーク制約を設定
- NOT NULL制約: 重要なフィールド（名前、連絡先など）に対してNOT NULL制約を設定
- CHECK制約: 
  - priority: 1-3の範囲内
  - weekday: 0-6の範囲内
  - role: 'admin', 'customer', 'staff'のいずれか

## パフォーマンス最適化

- 1000社規模のデータに対応するため、適切なインデックスを設定
- 同時アクセス数50以下を想定し、コネクションプールを最適化
- 大量データの検索を効率化するためのパーティショニング戦略を検討
- 監査ログ（change_logs）は別テーブルに分離し、メインテーブルのパフォーマンスに影響しないよう設計
