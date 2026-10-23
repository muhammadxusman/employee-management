require('dotenv').config({ quiet: true });

const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/employees', employeeRoutes);

// Unknown routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Fallback error handler (e.g. invalid JSON in the request body)
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

async function startServer() {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // creates the employees table if it doesn't exist
    console.log('Connected to MySQL');

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
    process.exit(1);
  }
}

startServer();
