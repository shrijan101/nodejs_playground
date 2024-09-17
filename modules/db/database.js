const { Sequelize } = require("sequelize");

// Initialize Sequelize
const sequelize = new Sequelize("Test", "postgres", "shrijan123", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;
