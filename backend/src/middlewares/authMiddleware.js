const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || '123456';

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Từ chối truy cập: Không có Token!' });
  }

  try {
    const splitToken = token.startsWith('Bearer ') ? token.slice(7, token.length).trimLeft() : token;
    const verified = jwt.verify(splitToken, JWT_SECRET); 
    req.user = verified;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Token không hợp lệ hoặc đã hết hạn!' });
  }
};

module.exports = authMiddleware;