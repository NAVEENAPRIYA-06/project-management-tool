require('dotenv').config();
const taskRoutes = require('./routes/taskRoutes');
const express = require('express');
const connectDB = require('./config/db');
const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.get('/', (req, res) => {
  res.send('Hello from the server!');
});
app.use(express.json());
app.use('/api/tasks', taskRoutes);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});