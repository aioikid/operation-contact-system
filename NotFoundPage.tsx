import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const NotFoundPage: React.FC = () => {
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
          maxWidth: 500,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
          404 - ページが見つかりません
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, textAlign: 'center' }}>
          お探しのページは存在しないか、移動した可能性があります。
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          <a href="/" style={{ color: '#1976d2', textDecoration: 'none' }}>
            ホームページに戻る
          </a>
        </Typography>
      </Paper>
    </Box>
  );
};

export default NotFoundPage;
