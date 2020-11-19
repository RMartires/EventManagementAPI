const Sequelize = require("sequelize");
const sequelize = require("../configs/database");

const tableName = "Users";

const User = sequelize.define(
  "User",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
  },
  { tableName }
);

module.exports = User;
