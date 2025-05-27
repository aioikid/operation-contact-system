import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

// ページコンポーネント
const HomePage = () => {
  const [apiStatus, setApiStatus] = useState('確認中...');
  
  useEffect(() => {
    // バックエンドAPIの状態を確認
    fetch('/api/health')
      .then(response => response.json())
      .then(data => {
        setApiStatus('接続成功: ' + JSON.stringify(data));
      })
      .catch(error => {
        setApiStatus('接続エラー: ' + error.message);
      });
  }, []);

  return (
    <div>
      <h2>運用連絡体制WebUIシステムへようこそ</h2>
      <p>このシステムでは、お客様の運用連絡体制情報を管理できます。</p>
      <div style={{ margin: '20px 0', padding: '10px', border: '1px solid #ccc' }}>
        <h3>バックエンド接続状態:</h3>
        <p>{apiStatus}</p>
      </div>
      <div>
        <h3>主な機能:</h3>
        <ul>
          <li>連絡体制管理</li>
          <li>顧客情報管理</li>
          <li>管理者ダッシュボード</li>
          <li>ログ記録・表示</li>
        </ul>
      </div>
    </div>
  );
};

// 他のページコンポーネント
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
