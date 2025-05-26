import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Box, 
  Paper, 
  Grid,
  Card,
  CardContent,
  CardHeader,
  Button,
  CircularProgress,
  Alert,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import SettingsIcon from '@mui/icons-material/Settings';
import UpdateIcon from '@mui/icons-material/Update';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

// Chart.jsの登録
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

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
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
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

const AdminDashboardPage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dashboardData, setDashboardData] = useState<any>(null);

  // タブ切り替え処理
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // ダッシュボードデータの取得
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // APIリクエスト（実際の実装では適切なエンドポイントとパラメータを使用）
        // const response = await axios.get('/api/v1/admin/dashboard');
        // setDashboardData(response.data);
        
        // モックデータ（実際の実装では削除）
        const mockData = {
          summary: {
            total_customers: 1250,
            active_customers: 1180,
            systems_count: 1500,
            recent_updates: 45
          },
          customer_growth: {
            labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
            data: [1100, 1130, 1160, 1200, 1230, 1250]
          },
          contact_methods: {
            labels: ['電話', 'メール', 'その他'],
            data: [650, 450, 150]
          },
          recent_activities: [
            { id: 1, user: '管理者A', action: '顧客情報更新', target: '株式会社ABC', timestamp: '2025-05-25T10:30:00Z' },
            { id: 2, user: '顧客B', action: '連絡体制更新', target: '株式会社DEF', timestamp: '2025-05-25T09:15:00Z' },
            { id: 3, user: '管理者C', action: '新規顧客登録', target: '株式会社GHI', timestamp: '2025-05-24T16:45:00Z' },
            { id: 4, user: '顧客D', action: 'ログイン', target: '-', timestamp: '2025-05-24T14:20:00Z' },
            { id: 5, user: '管理者A', action: '顧客情報更新', target: '株式会社JKL', timestamp: '2025-05-24T11:10:00Z' }
          ]
        };
        
        setDashboardData(mockData);
        setLoading(false);
      } catch (err) {
        console.error('ダッシュボードデータの取得に失敗しました', err);
        setError('ダッシュボードデータの取得に失敗しました');
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // CSVエクスポート処理
  const handleExportCSV = () => {
    // 実際の実装ではAPIリクエストを行い、CSVファイルをダウンロード
    console.log('顧客情報をCSVエクスポート');
    alert('顧客情報のCSVエクスポートを開始しました。ダウンロードが完了するまでお待ちください。');
  };

  // 顧客成長チャートデータ
  const customerGrowthData = {
    labels: dashboardData?.customer_growth.labels || [],
    datasets: [
      {
        label: '顧客数',
        data: dashboardData?.customer_growth.data || [],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  // 連絡方法分布チャートデータ
  const contactMethodsData = {
    labels: dashboardData?.contact_methods.labels || [],
    datasets: [
      {
        label: '連絡方法',
        data: dashboardData?.contact_methods.data || [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
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

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        管理者ダッシュボード
      </Typography>
      
      {loading && !dashboardData ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress />
        </Box>
      ) : error && !dashboardData ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
          {/* サマリーカード */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography color="text.secondary" gutterBottom>
                    総顧客数
                  </Typography>
                  <Typography variant="h4" component="div">
                    {dashboardData?.summary.total_customers}
                  </Typography>
                  <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                    <PeopleIcon color="primary" />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography color="text.secondary" gutterBottom>
                    アクティブ顧客
                  </Typography>
                  <Typography variant="h4" component="div">
                    {dashboardData?.summary.active_customers}
                  </Typography>
                  <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                    <BusinessIcon color="success" />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography color="text.secondary" gutterBottom>
                    システム数
                  </Typography>
                  <Typography variant="h4" component="div">
                    {dashboardData?.summary.systems_count}
                  </Typography>
                  <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                    <SettingsIcon color="info" />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography color="text.secondary" gutterBottom>
                    最近の更新
                  </Typography>
                  <Typography variant="h4" component="div">
                    {dashboardData?.summary.recent_updates}
                  </Typography>
                  <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                    <UpdateIcon color="warning" />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          
          {/* エクスポートボタン */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<DownloadIcon />}
              onClick={handleExportCSV}
            >
              顧客情報CSVエクスポート
            </Button>
          </Box>
          
          {/* タブ付きコンテンツ */}
          <Paper sx={{ width: '100%', mb: 4 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="統計情報" />
              <Tab label="最近のアクティビティ" />
            </Tabs>
            
            {/* 統計情報タブ */}
            <TabPanel value={tabValue} index={0}>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      顧客数推移
                    </Typography>
                    <Box sx={{ height: 300 }}>
                      <Line 
                        data={customerGrowthData} 
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              position: 'top' as const,
                            },
                            title: {
                              display: false,
                            },
                          },
                        }}
                      />
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      連絡方法分布
                    </Typography>
                    <Box sx={{ height: 300, display: 'flex', justifyContent: 'center' }}>
                      <Pie 
                        data={contactMethodsData}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              position: 'right' as const,
                            },
                          },
                        }}
                      />
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </TabPanel>
            
            {/* 最近のアクティビティタブ */}
            <TabPanel value={tabValue} index={1}>
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="アクティビティテーブル">
                  <TableHead>
                    <TableRow>
                      <TableCell>ユーザー</TableCell>
                      <TableCell>アクション</TableCell>
                      <TableCell>対象</TableCell>
                      <TableCell>日時</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dashboardData?.recent_activities.map((activity: any) => (
                      <TableRow key={activity.id}>
                        <TableCell>{activity.user}</TableCell>
                        <TableCell>{activity.action}</TableCell>
                        <TableCell>{activity.target}</TableCell>
                        <TableCell>{formatDate(activity.timestamp)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
          </Paper>
        </>
      )}
    </Box>
  );
};

export default AdminDashboardPage;
