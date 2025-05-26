import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Box, 
  Paper, 
  Tabs, 
  Tab, 
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
  Snackbar
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

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
      id={`contact-tabpanel-${index}`}
      aria-labelledby={`contact-tab-${index}`}
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

// 連絡先フォームのバリデーションスキーマ
const contactValidationSchema = Yup.object({
  contact_person: Yup.string().required('担当者名は必須です'),
  phone: Yup.string().when('email', {
    is: (email: string) => !email || email.length === 0,
    then: () => Yup.string().required('電話番号またはメールアドレスのいずれかは必須です'),
    otherwise: () => Yup.string()
  }),
  email: Yup.string().email('有効なメールアドレスを入力してください').when('phone', {
    is: (phone: string) => !phone || phone.length === 0,
    then: () => Yup.string().required('電話番号またはメールアドレスのいずれかは必須です'),
    otherwise: () => Yup.string().email('有効なメールアドレスを入力してください')
  })
});

// 連絡体制フォームのバリデーションスキーマ
const contactSystemValidationSchema = Yup.object({
  contact_method: Yup.string().required('連絡方法は必須です'),
  other_contact_method: Yup.string().when('contact_method', {
    is: 'other',
    then: () => Yup.string().required('その他の連絡方法の詳細は必須です'),
    otherwise: () => Yup.string()
  }),
  contacts: Yup.array().of(
    Yup.object().shape({
      priority: Yup.number().required('優先順位は必須です'),
      contact_person: Yup.string().required('担当者名は必須です'),
      phone: Yup.string(),
      email: Yup.string().email('有効なメールアドレスを入力してください')
    })
  ).min(1, '少なくとも1つの連絡先が必要です')
});

const ContactSystemPage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [contactData, setContactData] = useState<any>(null);

  // タブ切り替え処理
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // 通常時連絡体制フォーム
  const regularHoursFormik = useFormik({
    initialValues: {
      contact_method: '',
      other_contact_method: '',
      contacts: [
        { priority: 1, contact_person: '', phone: '', email: '' },
        { priority: 2, contact_person: '', phone: '', email: '' },
        { priority: 3, contact_person: '', phone: '', email: '' }
      ]
    },
    validationSchema: contactSystemValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError(null);
      try {
        // APIリクエスト（実際の実装では適切なエンドポイントとパラメータを使用）
        // await axios.put('/api/v1/customers/{customer_id}/contact-systems/regular', values);
        console.log('通常時連絡体制を更新:', values);
        setSuccess('通常時連絡体制情報が正常に更新されました');
        setLoading(false);
      } catch (err) {
        console.error('通常時連絡体制の更新に失敗しました', err);
        setError('通常時連絡体制情報の更新に失敗しました');
        setLoading(false);
      }
    }
  });

  // 時間外連絡体制フォーム
  const afterHoursFormik = useFormik({
    initialValues: {
      contact_method: '',
      other_contact_method: '',
      contacts: [
        { priority: 1, contact_person: '', phone: '', email: '' },
        { priority: 2, contact_person: '', phone: '', email: '' },
        { priority: 3, contact_person: '', phone: '', email: '' }
      ]
    },
    validationSchema: contactSystemValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError(null);
      try {
        // APIリクエスト（実際の実装では適切なエンドポイントとパラメータを使用）
        // await axios.put('/api/v1/customers/{customer_id}/contact-systems/after-hours', values);
        console.log('時間外連絡体制を更新:', values);
        setSuccess('時間外連絡体制情報が正常に更新されました');
        setLoading(false);
      } catch (err) {
        console.error('時間外連絡体制の更新に失敗しました', err);
        setError('時間外連絡体制情報の更新に失敗しました');
        setLoading(false);
      }
    }
  });

  // 連絡体制データの取得
  useEffect(() => {
    const fetchContactData = async () => {
      setLoading(true);
      try {
        // APIリクエスト（実際の実装では適切なエンドポイントとパラメータを使用）
        // const response = await axios.get('/api/v1/customers/{customer_id}/contact-systems');
        // setContactData(response.data);
        
        // モックデータ（実際の実装では削除）
        const mockData = {
          regular_hours: {
            id: '123',
            customer_id: '456',
            is_regular_hours: true,
            contact_method: 'phone',
            other_contact_method: '',
            contacts: [
              { id: '1', priority: 1, contact_person: '山田太郎', phone: '03-1234-5678', email: 'yamada@example.com' },
              { id: '2', priority: 2, contact_person: '佐藤次郎', phone: '03-8765-4321', email: 'sato@example.com' },
              { id: '3', priority: 3, contact_person: '鈴木三郎', phone: '03-2468-1357', email: 'suzuki@example.com' }
            ]
          },
          after_hours: {
            id: '789',
            customer_id: '456',
            is_regular_hours: false,
            contact_method: 'email',
            other_contact_method: '',
            contacts: [
              { id: '4', priority: 1, contact_person: '高橋四郎', phone: '090-1234-5678', email: 'takahashi@example.com' },
              { id: '5', priority: 2, contact_person: '田中五郎', phone: '090-8765-4321', email: 'tanaka@example.com' },
              { id: '6', priority: 3, contact_person: '伊藤六郎', phone: '090-2468-1357', email: 'ito@example.com' }
            ]
          }
        };
        setContactData(mockData);
        
        // フォームの初期値を設定
        if (mockData.regular_hours) {
          regularHoursFormik.setValues({
            contact_method: mockData.regular_hours.contact_method,
            other_contact_method: mockData.regular_hours.other_contact_method || '',
            contacts: mockData.regular_hours.contacts.map(contact => ({
              priority: contact.priority,
              contact_person: contact.contact_person,
              phone: contact.phone || '',
              email: contact.email || ''
            }))
          });
        }
        
        if (mockData.after_hours) {
          afterHoursFormik.setValues({
            contact_method: mockData.after_hours.contact_method,
            other_contact_method: mockData.after_hours.other_contact_method || '',
            contacts: mockData.after_hours.contacts.map(contact => ({
              priority: contact.priority,
              contact_person: contact.contact_person,
              phone: contact.phone || '',
              email: contact.email || ''
            }))
          });
        }
        
        setLoading(false);
      } catch (err) {
        console.error('連絡体制データの取得に失敗しました', err);
        setError('連絡体制データの取得に失敗しました');
        setLoading(false);
      }
    };

    fetchContactData();
  }, []);

  // 連絡先フォームの描画
  const renderContactForms = (formik: any, isRegularHours: boolean) => {
    return formik.values.contacts.map((contact: any, index: number) => (
      <Card key={index} sx={{ mb: 2 }}>
        <CardHeader 
          title={`第${contact.priority}連絡先`} 
          sx={{ backgroundColor: theme => theme.palette.primary.light, color: 'white' }}
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id={`contacts[${index}].contact_person`}
                name={`contacts[${index}].contact_person`}
                label="担当者名"
                value={contact.contact_person}
                onChange={formik.handleChange}
                error={
                  formik.touched.contacts?.[index]?.contact_person && 
                  Boolean(formik.errors.contacts?.[index]?.contact_person)
                }
                helperText={
                  formik.touched.contacts?.[index]?.contact_person && 
                  formik.errors.contacts?.[index]?.contact_person
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id={`contacts[${index}].phone`}
                name={`contacts[${index}].phone`}
                label="電話番号"
                value={contact.phone}
                onChange={formik.handleChange}
                error={
                  formik.touched.contacts?.[index]?.phone && 
                  Boolean(formik.errors.contacts?.[index]?.phone)
                }
                helperText={
                  formik.touched.contacts?.[index]?.phone && 
                  formik.errors.contacts?.[index]?.phone
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id={`contacts[${index}].email`}
                name={`contacts[${index}].email`}
                label="メールアドレス"
                value={contact.email}
                onChange={formik.handleChange}
                error={
                  formik.touched.contacts?.[index]?.email && 
                  Boolean(formik.errors.contacts?.[index]?.email)
                }
                helperText={
                  formik.touched.contacts?.[index]?.email && 
                  formik.errors.contacts?.[index]?.email
                }
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    ));
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        連絡体制管理
      </Typography>
      
      <Paper sx={{ width: '100%', mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="通常時連絡体制" />
          <Tab label="時間外連絡体制" />
        </Tabs>
        
        {/* 通常時連絡体制タブ */}
        <TabPanel value={tabValue} index={0}>
          {loading && !contactData ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <CircularProgress />
            </Box>
          ) : error && !contactData ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <form onSubmit={regularHoursFormik.handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormControl 
                    fullWidth 
                    error={regularHoursFormik.touched.contact_method && Boolean(regularHoursFormik.errors.contact_method)}
                  >
                    <InputLabel id="regular-contact-method-label">連絡方法</InputLabel>
                    <Select
                      labelId="regular-contact-method-label"
                      id="contact_method"
                      name="contact_method"
                      value={regularHoursFormik.values.contact_method}
                      onChange={regularHoursFormik.handleChange}
                      label="連絡方法"
                    >
                      <MenuItem value="phone">電話</MenuItem>
                      <MenuItem value="email">メール</MenuItem>
                      <MenuItem value="other">その他</MenuItem>
                    </Select>
                    {regularHoursFormik.touched.contact_method && regularHoursFormik.errors.contact_method && (
                      <FormHelperText>{regularHoursFormik.errors.contact_method}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                
                {regularHoursFormik.values.contact_method === 'other' && (
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="other_contact_method"
                      name="other_contact_method"
                      label="その他の連絡方法"
                      value={regularHoursFormik.values.other_contact_method}
                      onChange={regularHoursFormik.handleChange}
                      error={regularHoursFormik.touched.other_contact_method && Boolean(regularHoursFormik.errors.other_contact_method)}
                      helperText={regularHoursFormik.touched.other_contact_method && regularHoursFormik.errors.other_contact_method}
                    />
                  </Grid>
                )}
                
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    連絡先情報
                  </Typography>
                  {renderContactForms(regularHoursFormik, true)}
                </Grid>
                
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button 
                      type="submit" 
                      variant="contained" 
                      color="primary"
                      disabled={loading}
                    >
                      {loading ? <CircularProgress size={24} /> : '保存'}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          )}
        </TabPanel>
        
        {/* 時間外連絡体制タブ */}
        <TabPanel value={tabValue} index={1}>
          {loading && !contactData ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <CircularProgress />
            </Box>
          ) : error && !contactData ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <form onSubmit={afterHoursFormik.handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormControl 
                    fullWidth 
                    error={afterHoursFormik.touched.contact_method && Boolean(afterHoursFormik.errors.contact_method)}
                  >
                    <InputLabel id="after-hours-contact-method-label">連絡方法</InputLabel>
                    <Select
                      labelId="after-hours-contact-method-label"
                      id="contact_method"
                      name="contact_method"
                      value={afterHoursFormik.values.contact_method}
                      onChange={afterHoursFormik.handleChange}
                      label="連絡方法"
                    >
                      <MenuItem value="phone">電話</MenuItem>
                      <MenuItem value="email">メール</MenuItem>
                      <MenuItem value="other">その他</MenuItem>
                    </Select>
                    {afterHoursFormik.touched.contact_method && afterHoursFormik.errors.contact_method && (
                      <FormHelperText>{afterHoursFormik.errors.contact_method}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                
                {afterHoursFormik.values.contact_method === 'other' && (
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="other_contact_method"
                      name="other_contact_method"
                      label="その他の連絡方法"
                      value={afterHoursFormik.values.other_contact_method}
                      onChange={afterHoursFormik.handleChange}
                      error={afterHoursFormik.touched.other_contact_method && Boolean(afterHoursFormik.errors.other_contact_method)}
                      helperText={afterHoursFormik.touched.other_contact_method && afterHoursFormik.errors.other_contact_method}
  
(Content truncated due to size limit. Use line ranges to read in chunks)