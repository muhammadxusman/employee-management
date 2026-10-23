const { Sequelize } = require('sequelize');

// All connection details come from environment variables (see .env.example)
const sequelize = new Sequelize(
  process.env.DB_NAME || 'employee_db',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false,
  }
);

module.exports = sequelize;
