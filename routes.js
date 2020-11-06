const tweetController = require("./controllers/tweetController");
const userController = require("./controllers/userController");
const authController = require("./controllers/authController");
const JwtInUserArray = require("./middlewares/JwtInUserArray");
const checkJwt = require("express-jwt");
const cors = require("cors");
const seeder = require("./seeder");
const routes = (app) => {
  //create first data
  app.get("/creardata", seeder.createData);

  //login
  app.post("/users", userController.store); //Para crear un nuevo usuario
  app.post("/login", authController.login); //Para registrarse
  app.get("/users/:username", userController.show); //Para mostrar un solo usuario

  //users
  app.use(checkJwt({ secret: process.env.SECRET, algorithms: ["HS256"] }));
  // app.use(cors);
  app.use(JwtInUserArray);
  app.get("/users/suggestion", userController.allSuggestion);
  app.get("/users", userController.all); //Tweets de la home
  app.delete("/users/:username", authController.delete); //Para borrar token'
  app.put("/users/:username", userController.updateImg); //Modificar imagen
  app.patch("/users/:username", userController.updateData); //Modificr datos

  app.patch("/users/follow/:username", userController.updateFollow);

  //Tweets
  app.post("/tweets", tweetController.store);
  app.delete("/tweets/:tweetid", tweetController.delete);
  app.patch("/tweets/:tweetid", tweetController.updateLike);
};
module.exports = {
  routes,
};

//
