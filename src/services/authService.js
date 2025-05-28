// src/services/authService.js
import axios from 'axios';

const API_URL = '/api/auth';

// ローカルストレージからトークンを取得
const getToken = () => {
  return localStorage.getItem('token');
};

// ローカルストレージにトークンを保存
const setToken = (token) => {
  localStorage.setItem('token', token);
};

// ローカルストレージからトークンを削除
const removeToken = () => {
  localStorage.removeItem('token');
};

// ログイン
const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    const { token, user } = response.data;
    
    // トークンをローカルストレージに保存
    setToken(token);
    
    return { token, user };
  } catch (error) {
    throw error.response ? error.response.data : new Error('ログイン中にエラーが発生しました');
  }
};

// ログアウト
const logout = async () => {
  try {
    await axios.post(`${API_URL}/logout`);
    removeToken();
  } catch (error) {
    console.error('ログアウト中にエラーが発生しました:', error);
    // エラーが発生してもトークンは削除
    removeToken();
  }
};

// パスワードリセットリクエスト
const requestPasswordReset = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/reset-password-request`, { email });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('パスワードリセットリクエスト中にエラーが発生しました');
  }
};

// パスワードリセット実行
const resetPassword = async (token, newPassword) => {
  try {
    const response = await axios.post(`${API_URL}/reset-password`, { token, newPassword });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('パスワードリセット中にエラーが発生しました');
  }
};

// セッション検証
const verifySession = async () => {
  try {
    const token = getToken();
    if (!token) {
      return false;
    }
    
    const response = await axios.get(`${API_URL}/verify-session`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    removeToken();
    return false;
  }
};

export const authService = {
  login,
  logout,
  requestPasswordReset,
  resetPassword,
  verifySession,
  getToken
};
