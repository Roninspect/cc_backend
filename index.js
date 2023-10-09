const express = require('express');
require('dotenv').config();
const app = express();
const connectDB = require('./db/connect');
const courseRouter = require('./routes/courses');
const adminRouter = require('./routes/admin');
const notFound = require('./middlewares/not-found');
const errorHandlerMiddleware = require('./middlewares/error-handler');
const authRouter = require('./routes/auth');

app.use(express.json());
app.use('/api/v1/user', authRouter);
app.use('/api/v1/courses', courseRouter);
app.use('/api/v1/admin', adminRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    // connectDB
    await connectDB(process.env.MONGO_URI);
    app.listen(process.env.PORT || 3000, () =>
      console.log(`Server is listening port ${process.env.PORT}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
