const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");

router.post("/create/", UserController.CreateUser);

router.get("/delete/", UserController.DeleteUser);

module.exports = router;
