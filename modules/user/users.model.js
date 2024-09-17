// models/User.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/database');

class User extends Model {}

User.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'users',
  timestamps: false, // This enables createdAt and updatedAt fields
});

module.exports = User;
