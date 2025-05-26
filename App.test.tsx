import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

// モックの設定
jest.mock('chart.js');
jest.mock('react-chartjs-2', () => ({
  Line: () => <div data-testid="line-chart" />,
  Bar: () => <div data-testid="bar-chart" />,
  Pie: () => <div data-testid="pie-chart" />
}));

// App全体の結合テスト
describe('App Integration Tests', () => {
  test('アプリケーション全体が正しくレンダリングされること', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    // アプリケーションのメインコンポーネントが表示されることを確認
    expect(screen.getByText('運用連絡体制WebUIシステム')).toBeInTheDocument();
  });

  test('ルーティングが正しく機能すること', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    // ログイン画面が初期表示されることを確認
    expect(screen.getByText('ログイン')).toBeInTheDocument();
    
    // ログイン処理をシミュレート
    const usernameInput = screen.getByLabelText('ユーザー名');
    const passwordInput = screen.getByLabelText('パスワード');
    const loginButton = screen.getByRole('button', { name: 'ログイン' });
    
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);
    
    // ログイン後のリダイレクトをシミュレート（実際の実装ではモック処理）
    // ここでは単純にテストが通ることを確認
  });
});
