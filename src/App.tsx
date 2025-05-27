import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

// ページコンポーネントのインポート（存在する場合）
// 存在しない場合は、以下のようなシンプルなコンポーネントを作成
const HomePage = () => <div>運用連絡体制WebUIシステムへようこそ</div>;
const LoginPage = () => <div>ログインページ</div>;
const ContactSystemPage = () => <div>連絡体制管理ページ</div>;
const CustomerInfoPage = () => <div>顧客情報管理ページ</div>;
const AdminDashboardPage = () => <div>管理者ダッシュボードページ</div>;
const LogsPage = () => <div>ログ記録ページ</div>;
const NotFoundPage = () => <div>404 - ページが見つかりません</div>;

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/contact-system" element={<ContactSystemPage />} />
        <Route path="/customer-info" element={<CustomerInfoPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
        <Route path="/logs" element={<LogsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
