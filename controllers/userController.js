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
  createUser: createUserSubController(req, res),
  login: loginSubController(req, res),
  like: likeSubController(req, res),
  userPage: userPageSubController(req, res),
  modifyProfileImage: modifyProfileImageSubController(req, res),
  modifyProfileData: modifyProfileDataSubController(req, res),
  follow: followSubController(req, res),
  unfollow: unfollowSubController(req, res),
  suggestionFollowers: suggestionFollowersSubController(req, res),
  deleteKey: deleteKeySubController(req, res),
};
module.exports = userController;
