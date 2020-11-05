const db = require("../../models/mongoose");

const createUserSubController = async (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  const user = await new db.User({
    name: req.body.name,
    lastname: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    avatar: "/images/anonimo.png",
    list_tweets: [],
    list_users_following: [],
    list_users_followers: [],
    description: "Suba una nueva descripcion en configuracion",
  });
  res.json(user);
};
module.exports = createUserSubController;
