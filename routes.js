const tweetController = require("./controllers/tweetController");
const userController = require("./controllers/userController");
const middlewareJwt = require("./middlewareJwt");
const checkJwt = require("express-jwt");
const seeder = require("./seeder");
const routes = (app) => {
  //login
  app.post("/users", userController.store); //Para crear un nuevo usuario
  app.post("/login", userController.login); //Para registrarse
  app.get("/users/:username", userController.show); //Para mostrar un solo usuario
  app.delete("/users/:username", userController.delete); //Para borrar token

  //users
  // app.use([middlewareJwt.checkJwt, middlewareJwt.JwtInUserArray]);
  app.put("/users/:username", userController.updateImg); //Modificar imagen
  app.patch("/users/:username", userController.updateData); //Modificr datos
  app.get("/users/list/:username", userController.all); //Tweets de la home
  app.patch("/users/follow/:username", userController.updateFollow);
  app.patch("/users/unfollow/:username", userController.updateUnfollow);
  app.get("/users/suggestion", userController.allSuggestion);

  //create first data
  app.get("/creardata", seeder.createData);

  //Tweets
  app.post("/tweets", tweetController.store);
  app.delete("/tweets/:tweetid", tweetController.delete);
  app.patch("/tweets/:tweetid", tweetController.updateLike);
};
module.exports = {
  routes,
};

//
