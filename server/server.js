require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const app = express();
const cors = require('cors'); // Add this line
const port = process.env.PORT || 5000;
const userRoutes = require('./routes/userRoutes');
connectDB();

app.use(cors()); // Add this line
app.use(express.json());
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});