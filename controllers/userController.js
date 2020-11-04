const db = require("../models/mongoose");
const { User } = require("../models/mongoose");
const bcrypt = require("bcryptjs");
const path = require("path");
const createUserSubController = require("./subControllers/createUserSubController");
const loginSubController = require("./subControllers/loginSubController");
const likeSubController = require("./subControllers/likeSubController");
const userPageSubController = require("./subControllers/userPageSubController");
const modifyProfileImageSubController = require("./subControllers/modifyProfileImageSubController");
const modifyProfileDataSubController = require("./subControllers/modifyProfileDataSubController");
const followSubController = require("./subControllers/followSubController");
const unfollowSubController = require("./subControllers/unfollowSubController");
const suggestionFollowersSubController = require("./subControllers/suggestionFollowersSubController");
const deleteKeySubController = require("./subControllers/deleteKeySubController");

const userController = {
  createUser: (req, res) => createUserSubController(req, res),
  login: (req, res) => loginSubController(req, res),
  like: (req, res) => likeSubController(req, res),
  userPage: (req, res) => userPageSubController(req, res),
  modifyProfileImage: (req, res) => modifyProfileImageSubController(req, res),
  modifyProfileData: (req, res) => modifyProfileDataSubController(req, res),
  follow: (req, res) => followSubController(req, res),
  unfollow: (req, res) => unfollowSubController(req, res),
  suggestionFollowers: (req, res) => suggestionFollowersSubController(req, res),
  deleteKey: (req, res) => deleteKeySubController(req, res),
};
module.exports = userController;
