const db = require("../models/mongoose");
const { User } = require("../models/mongoose");
const bcrypt = require("bcryptjs");
const path = require("path");

const userController = {
  //Static
  login: (req, res) => {
    null;
  },
  show: (req, res) => {
    null;
  },
  delete: (req, res) => {
    null;
  },
  store: (req, res) => {
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
