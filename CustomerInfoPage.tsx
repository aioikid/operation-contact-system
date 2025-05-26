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
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  CircularProgress,
  Alert,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

// 顧客情報のバリデーションスキーマ
const customerValidationSchema = Yup.object({
  customer_name: Yup.string().required('お客様名は必須です'),
  customer_address: Yup.string().required('お客様住所は必須です'),
  end_user_name: Yup.string().required('エンドユーザー名は必須です'),
  end_user_address: Yup.string().required('エンドユーザー住所は必須です'),
  system_name: Yup.string().required('システム名称は必須です'),
  operation_start_date: Yup.date().required('運用開始日は必須です')
});

// 顧客情報の型定義
interface Customer {
  id: string;
  customer_name: string;
  customer_address: string;
  end_user_name: string;
  end_user_address: string;
  system_name: string;
  operation_start_date: string;
  created_at: string;
  updated_at: string;
}

const CustomerInfoPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState<string | null>(null);

  // 顧客情報フォーム
  const formik = useFormik({
    initialValues: {
      customer_name: '',
      customer_address: '',
      end_user_name: '',
      end_user_address: '',
      system_name: '',
      operation_start_date: ''
    },
    validationSchema: customerValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError(null);
      try {
        if (editingCustomer) {
          // 更新処理（実際の実装では適切なエンドポイントとパラメータを使用）
          // await axios.put(`/api/v1/customers/${editingCustomer.id}`, values);
          console.log('顧客情報を更新:', values);
          setSuccess('顧客情報が正常に更新されました');
        } else {
          // 新規作成処理（実際の実装では適切なエンドポイントとパラメータを使用）
          // await axios.post('/api/v1/customers', values);
          console.log('顧客情報を作成:', values);
          setSuccess('顧客情報が正常に作成されました');
        }
        setOpenDialog(false);
        fetchCustomers(); // 顧客一覧を再取得
        setLoading(false);
      } catch (err) {
        console.error('顧客情報の保存に失敗しました', err);
        setError('顧客情報の保存に失敗しました');
        setLoading(false);
      }
    }
  });

  // 顧客情報の取得
  const fetchCustomers = async () => {
    setLoading(true);
    try {
      // APIリクエスト（実際の実装では適切なエンドポイントとパラメータを使用）
      // const response = await axios.get('/api/v1/customers', {
      //   params: {
      //     page: page + 1,
      //     limit: rowsPerPage,
      //     search: searchTerm
      //   }
      // });
      // setCustomers(response.data.items);
      // setTotalCount(response.data.total);
      
      // モックデータ（実際の実装では削除）
      const mockCustomers: Customer[] = [
        {
          id: '1',
          customer_name: '株式会社ABC',
          customer_address: '東京都千代田区1-1-1',
          end_user_name: '株式会社DEF',
          end_user_address: '東京都中央区2-2-2',
          system_name: '販売管理システム',
          operation_start_date: '2023-04-01',
          created_at: '2023-03-15T09:00:00Z',
          updated_at: '2023-03-15T09:00:00Z'
        },
        {
          id: '2',
          customer_name: '株式会社GHI',
          customer_address: '大阪府大阪市3-3-3',
          end_user_name: '株式会社JKL',
          end_user_address: '大阪府堺市4-4-4',
          system_name: '在庫管理システム',
          operation_start_date: '2023-05-01',
          created_at: '2023-04-10T10:00:00Z',
          updated_at: '2023-04-10T10:00:00Z'
        },
        {
          id: '3',
          customer_name: '株式会社MNO',
          customer_address: '愛知県名古屋市5-5-5',
          end_user_name: '株式会社PQR',
          end_user_address: '愛知県豊田市6-6-6',
          system_name: '人事管理システム',
          operation_start_date: '2023-06-01',
          created_at: '2023-05-20T11:00:00Z',
          updated_at: '2023-05-20T11:00:00Z'
        }
      ];
      
      setCustomers(mockCustomers);
      setTotalCount(mockCustomers.length);
      setLoading(false);
    } catch (err) {
      console.error('顧客情報の取得に失敗しました', err);
      setError('顧客情報の取得に失敗しました');
      setLoading(false);
    }
  };

  // 初回レンダリング時に顧客情報を取得
  useEffect(() => {
    fetchCustomers();
  }, [page, rowsPerPage, searchTerm]);

  // 編集ダイアログを開く
  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer);
    formik.setValues({
      customer_name: customer.customer_name,
      customer_address: customer.customer_address,
      end_user_name: customer.end_user_name,
      end_user_address: customer.end_user_address,
      system_name: customer.system_name,
      operation_start_date: customer.operation_start_date
    });
    setOpenDialog(true);
  };

  // 新規作成ダイアログを開く
  const handleAddCustomer = () => {
    setEditingCustomer(null);
    formik.resetForm();
    setOpenDialog(true);
  };

  // 削除確認ダイアログを開く
  const handleDeleteConfirm = (customerId: string) => {
    setCustomerToDelete(customerId);
    setDeleteConfirmOpen(true);
  };

  // 顧客情報を削除
  const handleDeleteCustomer = async () => {
    if (!customerToDelete) return;
    
    setLoading(true);
    try {
      // APIリクエスト（実際の実装では適切なエンドポイントとパラメータを使用）
      // await axios.delete(`/api/v1/customers/${customerToDelete}`);
      console.log('顧客情報を削除:', customerToDelete);
      setSuccess('顧客情報が正常に削除されました');
      setDeleteConfirmOpen(false);
      setCustomerToDelete(null);
      fetchCustomers(); // 顧客一覧を再取得
      setLoading(false);
    } catch (err) {
      console.error('顧客情報の削除に失敗しました', err);
      setError('顧客情報の削除に失敗しました');
      setLoading(false);
    }
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

  // 検索ハンドラ
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        顧客情報管理
      </Typography>
      
      <Paper sx={{ width: '100%', mb: 4, p: 2 }}>
        <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="顧客検索"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearch}
              InputProps={{
                endAdornment: <SearchIcon />
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={8} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleAddCustomer}
            >
              新規顧客登録
            </Button>
          </Grid>
        </Grid>
        
        {loading && customers.length === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : error && customers.length === 0 ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="顧客情報テーブル">
                <TableHead>
                  <TableRow>
                    <TableCell>お客様名</TableCell>
                    <TableCell>エンドユーザー名</TableCell>
                    <TableCell>システム名称</TableCell>
                    <TableCell>運用開始日</TableCell>
                    <TableCell align="right">操作</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {customers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell component="th" scope="row">
                        {customer.customer_name}
                      </TableCell>
                      <TableCell>{customer.end_user_name}</TableCell>
                      <TableCell>{customer.system_name}</TableCell>
                      <TableCell>{customer.operation_start_date}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          color="primary"
                          aria-label="編集"
                          onClick={() => handleEditCustomer(customer)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          aria-label="削除"
                          onClick={() => handleDeleteConfirm(customer.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={totalCount}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="表示件数:"
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} / ${count}`}
            />
          </>
        )}
      </Paper>
      
      {/* 顧客情報編集ダイアログ */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>{editingCustomer ? '顧客情報編集' : '新規顧客登録'}</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="customer_name"
                  name="customer_name"
                  label="お客様名"
                  value={formik.values.customer_name}
                  onChange={formik.handleChange}
                  error={formik.touched.customer_name && Boolean(formik.errors.customer_name)}
                  helperText={formik.touched.customer_name && formik.errors.customer_name}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="customer_address"
                  name="customer_address"
                  label="お客様住所"
                  value={formik.values.customer_address}
                  onChange={formik.handleChange}
                  error={formik.touched.customer_address && Boolean(formik.errors.customer_address)}
                  helperText={formik.touched.customer_address && formik.errors.customer_address}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="end_user_name"
                  name="end_user_name"
                  label="エンドユーザー名"
                  value={formik.values.end_user_name}
                  onChange={formik.handleChange}
                  error={formik.touched.end_user_name && Boolean(formik.errors.end_user_name)}
                  helperText={formik.touched.end_user_name && formik.errors.end_user_name}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="end_user_address"
                  name="end_user_address"
                  label="エンドユーザー住所"
                  value={formik.values.end_user_address}
                  onChange={formik.handleChange}
                  error={formik.touched.end_user_address && Boolean(formik.errors.end_user_address)}
                  helperText={formik.touched.end_user_address && formik.errors.end_user_address}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="system_name"
                  name="system_name"
                  label="システム名称"
                  value={formik.values.system_name}
                  onChange={formik.handleChange}
                  error={formik.touched.system_name && Boolean(formik.errors.system_name)}
                  helperText={formik.touched.system_name && formik.errors.system_name}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="operation_start_date"
                  name="operation_start_date"
                  label="運用開始日"
                  type="date"
                  value={formik.values.operation_start_date}
                  onChange={formik.handleChange}
                  error={formik.touched.operation_start_date && Boolean(formik.errors.operation_start_date)}
                  helperText={formik.touched.operation_start_date && formik.errors.operation_start_date}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>キャンセル</Button>
            <Button type="submit" variant="contained" color="primary" disabled={loading}>
              {loading ? <CircularProgress size={24} /> : '保存'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      
      {/* 削除確認ダイアログ */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
      >
        <DialogTitle>顧客情報の削除</DialogTitle>
        <DialogContent>
          <DialogContentText>
            この顧客情報を削除してもよろしいですか？この操作は元に戻せません。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>キャンセル</Button>
          <Button onClick={handleDeleteCustomer} color="error" variant="contained">
            削除
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* 成功・エラーメッセージ */}
      <Snackbar 
        open={Boolean(success)} 
        autoHideDuration={6000} 
        onClose={() => setSuccess(null)}
      >
        <Alert onClose={() => setSuccess(null)} severity="success" sx={{ width: '100%' }}>
          {success}
        </Alert>
      </Snackbar>
      
      <Snackbar 
        open={Boolean(error)} 
        autoHideDuration={6000} 
        onClose={() => setError(null)}
      >
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
          {error}
   
(Content truncated due to size limit. Use line ranges to read in chunks)