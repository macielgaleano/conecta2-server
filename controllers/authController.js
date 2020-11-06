const db = require("../models/mongoose");
var jwt = require("jsonwebtoken");

const authController = {
  login: async (req, res) => {
    try {
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
        return res.status(401).send({
          message: "Credenciales invalidas",
        });
      }
      const passwordIsValid = await user.validatePassword(password);

      if (!passwordIsValid) {
        return res.status(401).json({
          message: "Credenciales invalidas",
        });
      }
      const token = jwt.sign({ id: user.id }, process.env.SECRET, {
        expiresIn: 60 * 60 * 60,
      });
      user.tokens.push(token);
      user.save();
      res.json({ auth: true, token });
    } catch (error) {
      console.log(error);
    }
  },
  delete: async (req, res) => {
    if (req.user) {
      let user = await db.User.findOneAndUpdate({ _id: req.user.id }, { tokens: [] });
      if (user) {
        res.status(200).json({ message: "200 OK, token eliminado" });
      } else {
        res.status(404).json({ message: "404, datos invalidos" });
      }
    } else {
      res.status(403).json({ message: "401, no se recibio un token" });
    }
  },
};

module.exports = authController;
