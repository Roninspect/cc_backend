const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
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

const admin = async (req, res, next) => {
  try {
    const token = req.header('x-auth-token');

    if (!token) {
      return res.status(401).json({ msg: 'Access Denied' });
    }

    const isVerified = jwt.verify(token, process.env.MY_SECRET);
    if (!isVerified) {
      return res
        .status(401)
        .json({ msg: ' auth token invalid, access denied' });
    }

    const isAdmin = await Admin.findById(isVerified.id);

    if (!isAdmin) {
      return res.status(401).json({ msg: 'Admin access Denied' });
    }
    req.admin = isVerified.id;
    req.token = token;
    next();
  } catch (error) {
    s.status(500).json({
      error: error.message,
    });
  }
};

module.exports = auth;
