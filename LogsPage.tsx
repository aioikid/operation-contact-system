import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Box, 
  Paper, 
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ja from 'date-fns/locale/ja';
import SearchIcon from '@mui/icons-material/Search';
import HistoryIcon from '@mui/icons-material/History';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

// タブパネルのプロパティ
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// タブパネルコンポーネント
const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`logs-tabpanel-${index}`}
      aria-labelledby={`logs-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const LogsPage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [changeLogs, setChangeLogs] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalChangeLogs, setTotalChangeLogs] = useState(0);
  const [totalActivities, setTotalActivities] = useState(0);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [userFilter, setUserFilter] = useState('');
  const [tableFilter, setTableFilter] = useState('');
  const [actionFilter, setActionFilter] = useState('');

  // タブ切り替え処理
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setPage(0); // タブ切り替え時にページをリセット
  };

  // ログデータの取得
  const fetchLogs = async () => {
    setLoading(true);
    try {
      // APIリクエスト（実際の実装では適切なエンドポイントとパラメータを使用）
      // const changeLogsResponse = await axios.get('/api/v1/admin/logs/changes', {
      //   params: {
      //     page: page + 1,
      //     limit: rowsPerPage,
      //     start_date: startDate ? startDate.toISOString() : undefined,
      //     end_date: endDate ? endDate.toISOString() : undefined,
      //     user_id: userFilter || undefined,
      //     table_name: tableFilter || undefined,
      //     change_type: actionFilter || undefined
      //   }
      // });
      // setChangeLogs(changeLogsResponse.data.items);
      // setTotalChangeLogs(changeLogsResponse.data.total);
      
      // const activitiesResponse = await axios.get('/api/v1/admin/logs/activities', {
      //   params: {
      //     page: page + 1,
      //     limit: rowsPerPage,
      //     start_date: startDate ? startDate.toISOString() : undefined,
      //     end_date: endDate ? endDate.toISOString() : undefined,
      //     user_id: userFilter || undefined,
      //     activity_type: actionFilter || undefined
      //   }
      // });
      // setActivities(activitiesResponse.data.items);
      // setTotalActivities(activitiesResponse.data.total);
      
      // モックデータ（実際の実装では削除）
      const mockChangeLogs = [
        {
          id: '1',
          user_id: 'user1',
          user: { id: 'user1', username: '管理者A' },
          table_name: 'customers',
          record_id: 'record1',
          change_type: 'update',
          change_details: { name: { old: '株式会社ABC', new: '株式会社ABC（更新）' } },
          created_at: '2025-05-25T10:30:00Z'
        },
        {
          id: '2',
          user_id: 'user2',
          user: { id: 'user2', username: '顧客B' },
          table_name: 'contacts',
          record_id: 'record2',
          change_type: 'create',
          change_details: { contact_person: '山田太郎', phone: '03-1234-5678' },
          created_at: '2025-05-25T09:15:00Z'
        },
        {
          id: '3',
          user_id: 'user1',
          user: { id: 'user1', username: '管理者A' },
          table_name: 'customers',
          record_id: 'record3',
          change_type: 'delete',
          change_details: { name: '株式会社XYZ' },
          created_at: '2025-05-24T16:45:00Z'
        },
        {
          id: '4',
          user_id: 'user3',
          user: { id: 'user3', username: '管理者C' },
          table_name: 'customers',
          record_id: 'record4',
          change_type: 'create',
          change_details: { name: '株式会社GHI', address: '東京都新宿区1-1-1' },
          created_at: '2025-05-24T14:20:00Z'
        },
        {
          id: '5',
          user_id: 'user2',
          user: { id: 'user2', username: '顧客B' },
          table_name: 'contacts',
          record_id: 'record5',
          change_type: 'update',
          change_details: { email: { old: 'old@example.com', new: 'new@example.com' } },
          created_at: '2025-05-24T11:10:00Z'
        }
      ];
      
      const mockActivities = [
        {
          id: '1',
          user_id: 'user1',
          user: { id: 'user1', username: '管理者A' },
          activity_type: 'login',
          ip_address: '192.168.1.1',
          user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          details: null,
          created_at: '2025-05-25T10:00:00Z'
        },
        {
          id: '2',
          user_id: 'user2',
          user: { id: 'user2', username: '顧客B' },
          activity_type: 'export_csv',
          ip_address: '192.168.1.2',
          user_agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
          details: { file: 'customers.csv' },
          created_at: '2025-05-25T09:30:00Z'
        },
        {
          id: '3',
          user_id: 'user3',
          user: { id: 'user3', username: '管理者C' },
          activity_type: 'password_change',
          ip_address: '192.168.1.3',
          user_agent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1)',
          details: null,
          created_at: '2025-05-24T15:45:00Z'
        },
        {
          id: '4',
          user_id: 'user1',
          user: { id: 'user1', username: '管理者A' },
          activity_type: 'logout',
          ip_address: '192.168.1.1',
          user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          details: null,
          created_at: '2025-05-24T14:30:00Z'
        },
        {
          id: '5',
          user_id: 'user2',
          user: { id: 'user2', username: '顧客B' },
          activity_type: 'login',
          ip_address: '192.168.1.2',
          user_agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
          details: null,
          created_at: '2025-05-24T09:15:00Z'
        }
      ];
      
      setChangeLogs(mockChangeLogs);
      setTotalChangeLogs(mockChangeLogs.length);
      setActivities(mockActivities);
      setTotalActivities(mockActivities.length);
      setLoading(false);
    } catch (err) {
      console.error('ログデータの取得に失敗しました', err);
      setError('ログデータの取得に失敗しました');
      setLoading(false);
    }
  };

  // 初回レンダリング時とフィルター変更時にログデータを取得
  useEffect(() => {
    fetchLogs();
  }, [page, rowsPerPage, tabValue]);

  // フィルター適用
  const handleApplyFilter = () => {
    setPage(0);
    fetchLogs();
  };

  // フィルターリセット
  const handleResetFilter = () => {
    setStartDate(null);
    setEndDate(null);
    setUserFilter('');
    setTableFilter('');
    setActionFilter('');
    setPage(0);
    fetchLogs();
  };

  // ページ変更ハンドラ
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // 1ページあたりの行数変更ハンドラ
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // 日付フォーマット関数
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // 変更タイプに応じたチップの色を取得
  const getChangeTypeColor = (changeType: string) => {
    switch (changeType) {
      case 'create':
        return 'success';
      case 'update':
        return 'primary';
      case 'delete':
        return 'error';
      default:
        return 'default';
    }
  };

  // アクティビティタイプに応じたアイコンを取得
  const getActivityTypeIcon = (activityType: string) => {
    switch (activityType) {
      case 'login':
        return <LoginIcon />;
      case 'logout':
        return <LogoutIcon />;
      case 'export_csv':
        return <HistoryIcon />;
      case 'password_change':
        return <PersonIcon />;
      default:
        return <EditIcon />;
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        ログ記録
      </Typography>
      
      {/* フィルター */}
      <Paper sx={{ width: '100%', mb: 4, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          フィルター
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
              <DatePicker
                label="開始日"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                slotProps={{ textField: { fullWidth: true, margin: 'normal' } }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
              <DatePicker
                label="終了日"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                slotProps={{ textField: { fullWidth: true, margin: 'normal' } }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="user-filter-label">ユーザー</InputLabel>
              <Select
                labelId="user-filter-label"
                id="user-filter"
                value={userFilter}
                onChange={(e) => setUserFilter(e.target.value)}
                label="ユーザー"
              >
                <MenuItem value="">すべて</MenuItem>
                <MenuItem value="user1">管理者A</MenuItem>
                <MenuItem value="user2">顧客B</MenuItem>
                <MenuItem value="user3">管理者C</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {tabValue === 0 && (
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="table-filter-label">テーブル</InputLabel>
                <Select
                  labelId="table-filter-label"
                  id="table-filter"
                  value={tableFilter}
                  onChange={(e) => setTableFilter(e.target.value)}
                  label="テーブル"
                >
                  <MenuItem value="">すべて</MenuItem>
                  <MenuItem value="customers">顧客情報</MenuItem>
                  <MenuItem value="contacts">連絡先情報</MenuItem>
                  <MenuItem value="users">ユーザー情報</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          )}
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="action-filter-label">
                {tabValue === 0 ? '変更タイプ' : 'アクティビティタイプ'}
              </InputLabel>
              <Select
                labelId="action-filter-label"
                id="action-filter"
                value={actionFilter}
                onChange={(e) => setActionFilter(e.target.value)}
                label={tabValue === 0 ? '変更タイプ' : 'アクティビティタイプ'}
              >
                <MenuItem value="">すべて</MenuItem>
                {tabValue === 0 ? (
                  <>
                    <MenuItem value="create">作成</MenuItem>
                    <MenuItem value="update">更新</MenuItem>
                    <MenuItem value="delete">削除</MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem value="login">ログイン</MenuItem>
                    <MenuItem value="logout">ログアウト</MenuItem>
                    <MenuItem value="export_csv">CSVエクスポート</MenuItem>
                    <MenuItem value="password_change">パスワード変更</MenuItem>
                  </>
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button
              variant="outlined"
              onClick={handleResetFilter}
            >
              リセット
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SearchIcon />}
              onClick={handleApplyFilter}
            >
              フィルター適用
            </Button>
          </Grid>
        </Grid>
      </Paper>
      
      {/* タブ付きコンテンツ */}
      <Paper sx={{ width: '100%', mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="変更ログ" />
          <Tab label="ユーザーアクティビティ" />
        </Tabs>
        
        {/* 変更ログタブ */}
        <TabPanel value={tabValue} index={0}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <>
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="変更ログテーブル">
                  <TableHead>
                    <TableRow>
                      <TableCell>日時</TableCell>
                      <TableCell>ユーザー</TableCell>
                      <TableCell>テーブル</TableCell>
                      <TableCell>変更タイプ</TableCell>
                      <TableCell>変更内容</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {changeLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell>{formatDate(log.created_at)}</TableCell>
                        <TableCell>{log.user.username}</TableCell>
                        <TableCell>{log.table_name}</TableCell>
                        <TableCell>
                          <Chip
                            label={log.change_type === 'create' ? '作成' : log.change_type === 'update' ? '更新' : '削除'}
                            color={getChangeTypeColor(log.change_type) as any}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          {log.change_type === 'update' ? (
                            <Box>
                              {Object.entries(log.change_details).map(([key, value]: [string, any]) => (
                                <Typography key={key} variant="body2" component="div">
                                  {key}: {value.old} → {value.new}
                          
(Content truncated due to size limit. Use line ranges to read in chunks)