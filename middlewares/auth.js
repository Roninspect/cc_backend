const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = async (req, res, next) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) {
      return res.status(401).json({ msg: 'no auth token, access denied' });
    }
    const isVerified = jwt.verify(token, process.env.MY_SECRET);
    if (!isVerified) {
      return res
        .status(401)
        .json({ msg: ' auth token invalid, access denied' });
    }

    req.user = isVerified.id;
    req.token = token;
    next();
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = auth;
