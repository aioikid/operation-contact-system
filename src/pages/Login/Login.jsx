// src/pages/Login/Login.jsx
import React, { useState } from 'react';
import './Login.scss';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 入力バリデーション
    if (!username || !password) {
      setError('ユーザー名とパスワードを入力してください');
      return;
    }
    
    // ここに認証APIを呼び出す処理を実装
    console.log('ログイン処理:', username, password);
    
    // 仮の処理（実際はAPI連携後に実装）
    setError('');
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h1 className="system-name">FAIRWAY</h1>
        <h2 className="system-subname">OPERATION CONTACT SYSTEM</h2>
      </div>
      
      <div className="login-form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          
          <button type="submit" className="login-button">Log in</button>
          
          <div className="forgot-password">
            <a href="/forgot-password">Forgot password?</a>
          </div>
        </form>
      </div>
      
      <div className="announcements">
        <h3>Company Announcements</h3>
        <div className="announcement-item">
          <p>System maintenance scheduled for June 1, 2025.</p>
        </div>
      </div>
      
      <div className="footer">
        <a href="/terms">Terms of Service</a>
      </div>
    </div>
  );
};

export default Login;
