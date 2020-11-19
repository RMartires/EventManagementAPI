const Sequelize = require("sequelize");
const database = require("../configs/database");
const Event = require("../models/Event");
const User = require("../models/User");

exports.CreateEvent = async (req, res, next) => {
  const event = req.body.event || {};
  const requiredKeys = [
    "title",
    "description",
    "image",
    "date",
    "location",
    "allowed_attendees",
    "waitlist",
    "startTime",
    "endTime",
  ];
  let keyNotPresent = [];
  requiredKeys.forEach((el) => {
    if (!event.hasOwnProperty(el)) {
      keyNotPresent.push(el);
    }
  });

  if (keyNotPresent.length === 0) {
    try {
      let response = await Event.create(event);
      response = response.toJSON();
      res.status(200).json({
        msg: "Event Creaed",
        event: response,
      });
    } catch (err) {
      res.status(500).json({
        error: err,
      });
    }
  } else {
    res.status(400).json({
      error: "params error",
      msg: `params missign: ${keyNotPresent}`,
    });
  }
};

exports.AttendEvent = async (req, res, next) => {
  const eventId = req.query.eventId;
  try {
    let user = await User.findOne({ where: { name: req.token.name } });
    let event = await Event.findOne({ where: { id: eventId } });
    if (user && event) {
      const attendees = await database.model("attendees");
      let allattendees = await attendees.findAll({
        where: {
          eventId: eventId,
        },
      });

      if (allattendees.length < event.allowed_attendees) {
        let response = await attendees.create({
          UserId: user.id,
          EventId: eventId,
        });
        res.status(200).json({
          msg: "Done",
          response: response,
        });
      } else {
        res.status(501).json({
          msg: "attendees at capacity",
        });
      }
    } else {
      if (!user) {
        res.status(500).json({
          error: "no user found, token error",
        });
      } else {
        res.status(500).json({
          error: "no event found",
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
};

exports.DeleteEvent = async (req, res, next) => {
  const id = req.query.id;
  try {
    let event = await Event.findOne({ where: { id: id } });
    if (event) {
      await event.destroy();
      res.status(200).json({
        msg: "Deleted successful",
      });
    } else {
      res.status(300).json({
        msg: `no event found with id: ${id}`,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
};

exports.GetUpcomingEvent = async (req, res, next) => {
  try {
    let response = await Event.findAll({
      where: {
        startTime: {
          [Sequelize.Op.gte]: new Date(),
        },
      },
    });
    res.status(200).json({
      upcomingEvents: response,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

exports.GetAttendes = async (req, res, next) => {
  const eventId = req.query.eventId;
  try {
    const attendees = await database.model("attendees");
    let response = await attendees.findAll({
      where: {
        eventId: eventId,
      },
    });
    res.status(200).json({
      attendees: response,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err,
    });
  }
};
