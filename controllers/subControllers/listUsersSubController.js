const validateLoginSubController = require("./validateLoginSubController");
const db = require("../../models/mongoose");

const listUSersSubController = async (req, res) => {
  if (
    (await validateLoginSubController(req, res, req.headers["x-access-token"])) === true
  ) {
    res.json(await db.User.find({}, { tokens: 0, password: 0 }));
  }
  res.status(401).json({ auth: false, messague: "Not auth" });
};
module.exports = listUSersSubController;
