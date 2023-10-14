const express = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth');
require('dotenv').config();

const authRouter = express.Router();

//** user register route */

authRouter.post('/signup', async function (req, res) {
  try {
    //* getting the user info sent through the request
    const { name, email, password, number } = req.body;

    //* saving the user data to Mongodb database
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        msg: 'User with this email already exist',
      });
    }
    const encryptedPass = await bcryptjs.hash(password, 10);
    let newUser = new User({
      name,
      email,
      number,
      password: encryptedPass,
    });

    newUser = await newUser.save();

    //* returning a response
    res.json(newUser);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

//** user login route */

authRouter.post('/signIn', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ msg: 'User with this email does not exist!' });
    }
    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Incorrect Password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.MY_SECRET, {});

    res.json({ token, ...user._doc });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//** is token valid */

authRouter.post('/tokenIsValid', async (req, res) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) return res.json(false);
    const verified = jwt.verify(token, process.env.MY_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);
    res.json(true);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//* get user data
authRouter.get('/getUserData', auth, async (req, res) => {
  const user = await User.findById(req.user)
    .populate({
      path: 'cart',
      populate: {
        path: 'instructor',
      },
    })
    .exec();
  res.json({ ...user._doc, token: req.token });
});

module.exports = authRouter;
