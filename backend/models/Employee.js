const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Employee = sequelize.define(
  'Employee',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Name is required' },
        notEmpty: { msg: 'Name is required' },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: 'Email is already in use' },
      validate: {
        notNull: { msg: 'Email is required' },
        isEmail: { msg: 'Email must be a valid email address' },
      },
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Department is required' },
        notEmpty: { msg: 'Department is required' },
      },
    },
  },
  {
    tableName: 'employees',
  }
);

module.exports = Employee;
