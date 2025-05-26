import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomerInfoPage from '../pages/CustomerInfoPage';

// モックの設定
jest.mock('axios');

describe('CustomerInfoPage', () => {
  test('顧客情報ページが正しくレンダリングされること', () => {
    render(<CustomerInfoPage />);
    
    // タイトルが表示されていることを確認
    expect(screen.getByText('顧客情報管理')).toBeInTheDocument();
    
    // 検索フィールドが存在することを確認
    expect(screen.getByLabelText('顧客検索')).toBeInTheDocument();
    
    // 新規登録ボタンが存在することを確認
    expect(screen.getByRole('button', { name: '新規顧客登録' })).toBeInTheDocument();
  });

  test('顧客一覧テーブルが表示されること', async () => {
    render(<CustomerInfoPage />);
    
    // テーブルヘッダーが表示されていることを確認
    await waitFor(() => {
      expect(screen.getByText('お客様名')).toBeInTheDocument();
      expect(screen.getByText('エンドユーザー名')).toBeInTheDocument();
      expect(screen.getByText('システム名称')).toBeInTheDocument();
      expect(screen.getByText('運用開始日')).toBeInTheDocument();
      expect(screen.getByText('操作')).toBeInTheDocument();
    });
    
    // モックデータの顧客情報が表示されていることを確認
    await waitFor(() => {
      expect(screen.getByText('株式会社ABC')).toBeInTheDocument();
      expect(screen.getByText('株式会社DEF')).toBeInTheDocument();
    });
  });

  test('新規顧客登録ダイアログが開くこと', async () => {
    render(<CustomerInfoPage />);
    
    // 新規登録ボタンをクリック
    const addButton = screen.getByRole('button', { name: '新規顧客登録' });
    fireEvent.click(addButton);
    
    // ダイアログが表示されることを確認
    await waitFor(() => {
      expect(screen.getByText('新規顧客登録')).toBeInTheDocument();
      expect(screen.getByLabelText('お客様名')).toBeInTheDocument();
      expect(screen.getByLabelText('お客様住所')).toBeInTheDocument();
      expect(screen.getByLabelText('エンドユーザー名')).toBeInTheDocument();
      expect(screen.getByLabelText('エンドユーザー住所')).toBeInTheDocument();
      expect(screen.getByLabelText('システム名称')).toBeInTheDocument();
      expect(screen.getByLabelText('運用開始日')).toBeInTheDocument();
    });
  });
});
