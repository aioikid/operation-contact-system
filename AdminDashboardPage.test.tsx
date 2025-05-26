import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdminDashboardPage from '../pages/AdminDashboardPage';

// モックの設定
jest.mock('chart.js');
jest.mock('react-chartjs-2', () => ({
  Line: () => <div data-testid="line-chart" />,
  Bar: () => <div data-testid="bar-chart" />,
  Pie: () => <div data-testid="pie-chart" />
}));

describe('AdminDashboardPage', () => {
  test('管理者ダッシュボードが正しくレンダリングされること', () => {
    render(<AdminDashboardPage />);
    
    // タイトルが表示されていることを確認
    expect(screen.getByText('管理者ダッシュボード')).toBeInTheDocument();
    
    // サマリーカードが表示されていることを確認
    expect(screen.getByText('総顧客数')).toBeInTheDocument();
    expect(screen.getByText('アクティブ顧客')).toBeInTheDocument();
    expect(screen.getByText('システム数')).toBeInTheDocument();
    expect(screen.getByText('最近の更新')).toBeInTheDocument();
    
    // エクスポートボタンが存在することを確認
    expect(screen.getByRole('button', { name: '顧客情報CSVエクスポート' })).toBeInTheDocument();
  });

  test('タブが正しく切り替わること', async () => {
    render(<AdminDashboardPage />);
    
    // 初期状態では統計情報タブが選択されていることを確認
    expect(screen.getByText('統計情報')).toBeInTheDocument();
    expect(screen.getByText('顧客数推移')).toBeInTheDocument();
    expect(screen.getByText('連絡方法分布')).toBeInTheDocument();
    
    // 最近のアクティビティタブをクリック
    const activityTab = screen.getByText('最近のアクティビティ');
    fireEvent.click(activityTab);
    
    // アクティビティテーブルが表示されることを確認
    await waitFor(() => {
      expect(screen.getByText('ユーザー')).toBeInTheDocument();
      expect(screen.getByText('アクション')).toBeInTheDocument();
      expect(screen.getByText('対象')).toBeInTheDocument();
      expect(screen.getByText('日時')).toBeInTheDocument();
    });
  });

  test('CSVエクスポートボタンがクリックできること', () => {
    // コンソールログのモック
    const consoleSpy = jest.spyOn(console, 'log');
    // アラートのモック
    window.alert = jest.fn();
    
    render(<AdminDashboardPage />);
    
    // エクスポートボタンをクリック
    const exportButton = screen.getByRole('button', { name: '顧客情報CSVエクスポート' });
    fireEvent.click(exportButton);
    
    // コンソールログとアラートが呼び出されることを確認
    expect(consoleSpy).toHaveBeenCalledWith('顧客情報をCSVエクスポート');
    expect(window.alert).toHaveBeenCalledWith('顧客情報のCSVエクスポートを開始しました。ダウンロードが完了するまでお待ちください。');
    
    // モックをリセット
    consoleSpy.mockRestore();
  });
});
