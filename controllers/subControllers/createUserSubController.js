const User = require("../../models/User");
const jwt = require("jsonwebtoken");

const createUserSubController = async (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  const user = await new User({
    name: req.body.name,
    lastname: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword, //?
    avatar: "/images/anonimo.png",
    list_tweets: [],
    list_users_following: [],
    list_users_followers: [],
    description: "Suba una nueva descripcion en configuracion",
  });
  user.save();
  const token = jwt.sign({ id: user._id }, process.env.SECRET, {
    expiresIn: 60 * 60 * 60,
  });
  res.json({ auth: true, token });
  /* .then((user) => req.login(user, () => res.redirect("/login-registro")))
          .catch((error) => res.redirect("/login-registro"));
        */
};
module.exports = createUserSubController;
