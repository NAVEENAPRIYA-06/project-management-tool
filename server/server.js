require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;
const host = '0.0.0.0';

connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/tasks', require('./routes/taskRoutes'));

app.listen(port, host, () => {
  console.log(`Server is running on port ${port}`);
});