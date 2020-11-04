const db = require("../../models/mongoose");
const jwt = require("jsonwebtoken");

const loginSubController = async (req, res) => {
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
      status: 404,
      messaggue: "El usuario o el mail que usted esta colocando no exste",
    });
  }
  const passwordIsValid = await user.validatePassword(password);
  if (!passwordIsValid) {
    return res.status(401).json({
      auth: false,
      status: 401,
      token: null,
      messaggue: "La password no es valida",
    });
  }
  const token = jwt.sign({ id: user._id }, process.env.SECRET, {
    expiresIn: 60 * 60 * 60,
  });
  db.User.update({ _id: user._id }, { $push: { tokens: token } });
  res.json({ auth: true, token });
};
module.exports = loginSubController;
