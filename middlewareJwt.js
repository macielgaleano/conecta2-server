const checkJwt = require("express-jwt");
const db = require("./models/mongoose");

const middlewareJwt = {
  checkJwt: (req, res, next) => {
    checkJwt({ secret: process.env.SECRET, algorithms: ["HS256"] });
    next();
  },
  JwtInUserArray: (req, res, next) => {
    let response = db.User.find(
      {
        tokens: {
          $in: [req.user.tokens],
        },
      },
      { password: 0 }
    );
    if (!response) {
      res.status(401).json({ messague: "No existe un token valido" });
    }
    next();
  },
};
module.exports = middlewareJwt;
