const db = require("../../models/mongoose");

const deleteKeySubController = async (req, res) => {
  res.json(await db.User.find({}));
};
module.exports = deleteKeySubController;
