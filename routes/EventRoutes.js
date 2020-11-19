const express = require("express");
const router = express.Router();
const auth = require("../services/auth.services");

const EventController = require("../controllers/EventController");

router.all("/private/*", auth.auth);

router.post("/create/", EventController.CreateEvent);

router.put("/private/attend/", EventController.AttendEvent);

router.delete("/delete/", EventController.DeleteEvent);

router.get("/upcoming/", EventController.GetUpcomingEvent);

router.get("/attendes/", EventController.GetAttendes);

module.exports = router;
