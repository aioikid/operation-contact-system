import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LogsPage from '../pages/LogsPage';

// モックの設定
jest.mock('@mui/x-date-pickers/AdapterDateFns', () => ({
  AdapterDateFns: class MockAdapter {}
}));

jest.mock('@mui/x-date-pickers/LocalizationProvider', () => ({
  LocalizationProvider: ({ children }) => <div>{children}</div>
}));

jest.mock('@mui/x-date-pickers/DatePicker', () => ({
  DatePicker: ({ label }) => <div data-testid={`date-picker-${label}`}>{label}</div>
}));

describe('LogsPage', () => {
  test('ログ記録ページが正しくレンダリングされること', () => {
    render(<LogsPage />);
    
    // タイトルが表示されていることを確認
    expect(screen.getByText('ログ記録')).toBeInTheDocument();
    
    // フィルターセクションが表示されていることを確認
    expect(screen.getByText('フィルター')).toBeInTheDocument();
    expect(screen.getByTestId('date-picker-開始日')).toBeInTheDocument();
    expect(screen.getByTestId('date-picker-終了日')).toBeInTheDocument();
    
    // タブが表示されていることを確認
    expect(screen.getByText('変更ログ')).toBeInTheDocument();
    expect(screen.getByText('ユーザーアクティビティ')).toBeInTheDocument();
  });

  test('タブが正しく切り替わること', async () => {
    render(<LogsPage />);
    
    // 初期状態では変更ログタブが選択されていることを確認
    expect(screen.getByText('変更ログ')).toBeInTheDocument();
    expect(screen.getByText('変更タイプ')).toBeInTheDocument();
    
    // ユーザーアクティビティタブをクリック
    const activityTab = screen.getByText('ユーザーアクティビティ');
    fireEvent.click(activityTab);
    
    // アクティビティテーブルが表示されることを確認
    await waitFor(() => {
      expect(screen.getByText('アクティビティ')).toBeInTheDocument();
      expect(screen.getByText('IPアドレス')).toBeInTheDocument();
    });
  });

  test('フィルターボタンがクリックできること', () => {
    render(<LogsPage />);
    
    // フィルター適用ボタンをクリック
    const filterButton = screen.getByRole('button', { name: 'フィルター適用' });
    fireEvent.click(filterButton);
    
    // リセットボタンをクリック
    const resetButton = screen.getByRole('button', { name: 'リセット' });
    fireEvent.click(resetButton);
  });
});
