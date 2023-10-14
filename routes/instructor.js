const express = require('express');
const auth = require('../middlewares/auth');

const instructorRouter = express.Router();

instructorRouter.use(auth);

instructorRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.body;

    res.json({ id: id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = instructorRouter;
