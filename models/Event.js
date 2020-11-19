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
    },
    description: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
    date: {
      type: Sequelize.DATE,
    },
    location: {
      type: Sequelize.STRING,
    },
    allowed_attendees: {
      type: Sequelize.INTEGER,
    },
    waitlist: {
      type: Sequelize.STRING,
    },
    startTime: {
      type: Sequelize.DATE,
    },
    endTime: {
      type: Sequelize.DATE,
    },
  },
  { tableName }
);

Event.belongsToMany(User, { through: "attendees" });
User.belongsToMany(Event, { through: "attendees" });

module.exports = Event;
