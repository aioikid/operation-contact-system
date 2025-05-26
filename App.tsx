import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import ContactSystemPage from './pages/ContactSystemPage';
import CustomerInfoPage from './pages/CustomerInfoPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import LogsPage from './pages/LogsPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        <Route path="/" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="/contact-system" replace />} />
          <Route path="contact-system" element={<ContactSystemPage />} />
          <Route path="customer-info" element={<CustomerInfoPage />} />
          <Route path="admin-dashboard" element={<AdminDashboardPage />} />
          <Route path="logs" element={<LogsPage />} />
        </Route>
        
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Box>
  );
};

export default App;
