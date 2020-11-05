const db = require("../models/mongoose");
const { User } = require("../models/mongoose");
const bcrypt = require("bcryptjs");
const path = require("path");

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

  login: async (req, res) => {
    const { userEmail, password } = req.body;
    const user = await db.User.findOne({
      $or: [
        {
          email: userEmail,
        },
        {
          username: userEmail,
        },
      ],
    });
    if (!user) {
      return res.status(404).send({
        auth: false,
      });
    }
    const passwordIsValid = await user.validatePassword(password);
    if (!passwordIsValid) {
      return res.status(401).json({
        auth: false,
      });
    }
    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: 60 * 60 * 60,
    });
    user.tokens.push(token);
    user.save();
    res.json({ auth: true, token });
  },

  show: (req, res) => {
    null;
  },
  delete: (req, res) => {
    null;
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
