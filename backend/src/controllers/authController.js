const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || '123456';

exports.register = async (req, res) => {
  try {
    const { full_name, name, phone_number, phone, password, role } = req.body; 
    const finalName = full_name || name;
    const finalPhone = phone_number || phone;

    if (!finalName || !finalPhone || !password) {
      return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin!' });
    }

    const existingUser = await db('Users').where({ phone_number: finalPhone }).first();
    if (existingUser) {
      return res.status(400).json({ message: 'Số điện thoại này đã được đăng ký!' });
    }

    // Băm mật khẩu bằng bcrypt để bảo mật
    const hashedPassword = await bcrypt.hash(password, 10);

    const [newUser] = await db('Users').insert({
      full_name: finalName,
      phone_number: finalPhone,
      password_hash: hashedPassword,
      role: role || 'Guest',
      wallet_balance: 0.00
    }).returning(['user_id', 'full_name', 'phone_number', 'wallet_balance', 'role']);

    res.status(201).json({
      message: 'Đăng ký tài khoản thành công!',
      user: newUser
    });

  } catch (error) {
    console.error("Lỗi Đăng Ký:", error);
    res.status(500).json({ message: 'Lỗi server khi đăng ký.' });
  }
};

exports.login = async (req, res) => {
  const { email, phone, phone_number, password } = req.body; 
  const loginId = phone_number || phone || email;

  if (!loginId || !password) {
    return res.status(400).json({ message: 'Vui lòng nhập đầy đủ Số điện thoại và Mật khẩu!' });
  }

  try {
    const user = await db('Users').where({ phone_number: loginId }).first();

    if (!user) return res.status(404).json({ message: 'Tài khoản không tồn tại!' });

    // Hỗ trợ kiểm tra cả plain-text (tài khoản cũ/seed) và bcrypt (tài khoản đăng ký mới)
    let isMatch = (password === user.password_hash);
    if (!isMatch && user.password_hash && user.password_hash.startsWith('$2')) {
      isMatch = await bcrypt.compare(password, user.password_hash).catch(() => false);
    }

    if (!isMatch) return res.status(400).json({ message: 'Sai mật khẩu!' });

    const token = jwt.sign(
      { userId: user.user_id, role: user.role || 'Guest' }, 
      JWT_SECRET, 
      { expiresIn: '7d' }
    );

    res.status(200).json({ 
      message: 'Đăng nhập thành công!', 
      token: token,
      user: {
        id: user.user_id,
        full_name: user.full_name,
        email: user.phone_number,
        phone_number: user.phone_number,
        role: user.role,
        wallet_balance: user.wallet_balance
      }
    });
  } catch (error) {
    console.error("Lỗi Đăng Nhập:", error);
    res.status(500).json({ message: 'Lỗi server khi đăng nhập.' });
  }
};
