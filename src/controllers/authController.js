// src/controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { sendResetPasswordEmail } = require('../services/emailService');
const crypto = require('crypto');

// ログイン処理
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // ユーザーの検索
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'ユーザー名またはパスワードが正しくありません' });
    }
    
    // パスワードの検証
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'ユーザー名またはパスワードが正しくありません' });
    }
    
    // JWTトークンの生成
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '30m' } // 30分の有効期限
    );
    
    // ユーザー情報からパスワードを除外
    const userWithoutPassword = {
      _id: user._id,
      username: user.username,
      email: user.email,
      company: user.company,
      role: user.role
    };
    
    res.json({
      message: 'ログインに成功しました',
      token,
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('ログイン処理中にエラーが発生しました:', error);
    res.status(500).json({ message: 'サーバーエラーが発生しました', error: error.message });
  }
};

// ログアウト処理
exports.logout = (req, res) => {
  // JWTはステートレスなので、サーバー側でのログアウト処理は特にない
  // クライアント側でトークンを削除する
  res.json({ message: 'ログアウトに成功しました' });
};

// パスワードリセットリクエスト
exports.requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    
    // メールアドレスでユーザーを検索
    const user = await User.findOne({ email });
    if (!user) {
      // セキュリティ上、ユーザーが存在しない場合でも成功メッセージを返す
      return res.json({ message: 'パスワードリセットリンクが送信されました（存在する場合）' });
    }
    
    // リセットトークンの生成
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // 1時間の有効期限
    
    // ユーザーにリセットトークンを保存
    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();
    
    // リセットリンクをメールで送信
    await sendResetPasswordEmail(user.email, resetToken);
    
    res.json({ message: 'パスワードリセットリンクが送信されました' });
  } catch (error) {
    console.error('パスワードリセットリクエスト中にエラーが発生しました:', error);
    res.status(500).json({ message: 'サーバーエラーが発生しました', error: error.message });
  }
};

// パスワードリセット実行
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    
    // トークンでユーザーを検索
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() } // トークンの有効期限をチェック
    });
    
    if (!user) {
      return res.status(400).json({ message: '無効または期限切れのトークンです' });
    }
    
    // パスワードポリシーの検証
    if (!validatePassword(newPassword)) {
      return res.status(400).json({
        message: 'パスワードは12文字以上で、大文字・小文字・数字・特殊文字を含む必要があります'
      });
    }
    
    // 新しいパスワードのハッシュ化
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // ユーザー情報の更新
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();
    
    res.json({ message: 'パスワードが正常にリセットされました' });
  } catch (error) {
    console.error('パスワードリセット中にエラーが発生しました:', error);
    res.status(500).json({ message: 'サーバーエラーが発生しました', error: error.message });
  }
};

// セッション検証
exports.verifySession = async (req, res) => {
  try {
    // 認証ミドルウェアを通過していれば、ユーザーは認証済み
    const user = await User.findById(req.user.id).select('-password -resetToken -resetTokenExpiry');
    
    if (!user) {
      return res.status(404).json({ message: 'ユーザーが見つかりません' });
    }
    
    res.json({
      message: 'セッションは有効です',
      user
    });
  } catch (error) {
    console.error('セッション検証中にエラーが発生しました:', error);
    res.status(500).json({ message: 'サーバーエラーが発生しました', error: error.message });
  }
};

// パスワードポリシーの検証
function validatePassword(password) {
  // 12文字以上
  if (password.length < 12) {
    return false;
  }
  
  // 大文字を含む
  if (!/[A-Z]/.test(password)) {
    return false;
  }
  
  // 小文字を含む
  if (!/[a-z]/.test(password)) {
    return false;
  }
  
  // 数字を含む
  if (!/[0-9]/.test(password)) {
    return false;
  }
  
  // 特殊文字を含む
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return false;
  }
  
  return true;
}
