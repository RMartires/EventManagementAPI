const Sequelize = require("sequelize");
const sequelize = require("../configs/database");

const User = require("./User");

const tableName = "Events";

const Event = sequelize.define(
  "Event",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    image: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    location: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    allowed_attendees: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    waitlist: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    startTime: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    endTime: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  },
  { tableName }
);

Event.belongsToMany(User, { through: "attendees" });
User.belongsToMany(Event, { through: "attendees" });

module.exports = Event;
