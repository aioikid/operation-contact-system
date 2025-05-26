import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginPage from '../pages/LoginPage';

// モックの設定
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

describe('LoginPage', () => {
  test('ログインフォームが正しくレンダリングされること', () => {
    render(<LoginPage />);
    
    // タイトルが表示されていることを確認
    expect(screen.getByText('運用連絡体制WebUIシステム')).toBeInTheDocument();
    expect(screen.getByText('ログイン')).toBeInTheDocument();
    
    // 入力フィールドが存在することを確認
    expect(screen.getByLabelText('ユーザー名')).toBeInTheDocument();
    expect(screen.getByLabelText('パスワード')).toBeInTheDocument();
    
    // ログインボタンが存在することを確認
    expect(screen.getByRole('button', { name: 'ログイン' })).toBeInTheDocument();
  });

  test('バリデーションが正しく機能すること', async () => {
    render(<LoginPage />);
    
    // 空の状態でフォーム送信
    const loginButton = screen.getByRole('button', { name: 'ログイン' });
    fireEvent.click(loginButton);
    
    // バリデーションエラーメッセージが表示されることを確認
    await waitFor(() => {
      expect(screen.getByText('ユーザー名は必須です')).toBeInTheDocument();
      expect(screen.getByText('パスワードは必須です')).toBeInTheDocument();
    });
  });

  test('フォームに値を入力できること', () => {
    render(<LoginPage />);
    
    // 入力フィールドに値を入力
    const usernameInput = screen.getByLabelText('ユーザー名');
    const passwordInput = screen.getByLabelText('パスワード');
    
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    // 入力値が反映されていることを確認
    expect(usernameInput).toHaveValue('testuser');
    expect(passwordInput).toHaveValue('password123');
  });
});
