import React from 'react';
import { Box, Typography, TextField, Button, Paper, CircularProgress, Alert } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// ログイン画面のバリデーションスキーマ
const loginValidationSchema = Yup.object({
  username: Yup.string().required('ユーザー名は必須です'),
  password: Yup.string().required('パスワードは必須です')
});

const LoginPage: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError(null);
      try {
        // APIリクエスト（実際の実装では適切なエンドポイントとパラメータを使用）
        // const response = await axios.post('/api/v1/auth/login', values);
        // localStorage.setItem('token', response.data.access_token);
        // window.location.href = '/';
        
        // モック処理（実際の実装では削除）
        console.log('ログイン情報:', values);
        setTimeout(() => {
          localStorage.setItem('token', 'mock-token');
          window.location.href = '/';
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error('ログインに失敗しました', err);
        setError('ユーザー名またはパスワードが正しくありません');
        setLoading(false);
      }
    }
  });

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5'
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 400,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          運用連絡体制WebUIシステム
        </Typography>
        
        <Typography component="h2" variant="h6" sx={{ mb: 3 }}>
          ログイン
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {error}
          </Alert>
        )}
        
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            fullWidth
            id="username"
            label="ユーザー名"
            name="username"
            autoComplete="username"
            autoFocus
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="パスワード"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'ログイン'}
          </Button>
        </Box>
      </Paper>
      
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        © {new Date().getFullYear()} 株式会社フェアーウェイ
      </Typography>
    </Box>
  );
};

export default LoginPage;
