const jwt = require("jsonwebtoken");
const db = require("../../models/mongoose");

const validateLoginSubController = async (req, res, header) => {
  const token = header;
  if (!token) {
    return res.status(401).json({
      auth: false,
      messague: "Not auth",
    });
  }
  const decoded = jwt.verify(token, process.env.SECRET);
  const user = await db.User.find(
    {
      tokens: {
        $in: [decoded],
      },
    },
    { password: 0 }
  );
  if (!user) {
    return res.status(404).send("No user found");
  }
  return true;
};

module.exports = validateLoginSubController;
