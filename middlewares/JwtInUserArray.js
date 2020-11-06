const db = require("../models/mongoose");

const JwtInUserArray = (req, res, next) => {
  let response = db.User.find(
    {
      tokens: {
        $in: [req.user.tokens],
      },
    },
    { password: 0 }
  );
  if (!response) {
    res.status(401).json({ message: "No existe un token valido" });
  }
  next();
};

module.exports = JwtInUserArray;
