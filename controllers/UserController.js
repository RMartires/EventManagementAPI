const Sequelize = require("sequelize");
const User = require("../models/User");

exports.CreateUser = async (req, res, next) => {
  let user = req.body.user;
  try {
    let response = await User.create(user);
    response = response.toJSON();
    res.status(200).json({
      msg: "User Created",
      user: response,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

exports.DeleteUser = async (req, res, next) => {
  let id = req.query.id;
  try {
    let user = await User.findOne({ id: id });
    await user.destroy();
    res.status(200).json({
      msg: "Deleted successful",
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};
