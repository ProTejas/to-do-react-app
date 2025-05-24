const express = require('express');
const cors = require('cors');
const { connectMongoDb } = require('./connection');
const { logReqRes } = require('./middlewares');
const userRouter = require('./routes/usersRoute');

const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logReqRes('log.txt'));

// Routes
app.use('/api/users', userRouter);

// MongoDB Connection
connectMongoDb('mongodb://127.0.0.1:27017/to-do-app')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Start server
app.listen(8000, () => console.log('Server connected on port 8000'));
