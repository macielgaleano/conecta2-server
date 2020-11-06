const db = require("../models/mongoose");
const { User } = require("../models/mongoose");
const bcrypt = require("bcryptjs");
const path = require("path");
var jwt = require("jsonwebtoken");

const userController = {
  //Static
  store: async (req, res) => {
    const user = await new db.User({
      name: req.body.name,
      lastname: req.body.lastname,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      avatar: "/images/anonimo.png",
      description: "Suba una nueva descripcion en configuracion",
    });
    user.save();
    res.json(user);
  },

  show: async (req, res) => {
    const user = await db.User.findOne(
      { username: req.params.username },
      { token: 0, password: 0 }
    );
    res.json(
      await db.Tweet.find({ author: user._id }).sort({
        date_created: "desc",
      })
    );
  },

  //Users
  updateImg: (req, res) => {
    null;
  },
  updateData: (req, res) => {
    null;
  },
  all: (req, res) => {
    null;
  },
  updateFollow: (req, res) => {
    null;
  },
  updateUnfollow: (req, res) => {
    null;
  },
  allSuggestion: (req, res) => {
    null;
  },
};
module.exports = userController;
