const noteController = require("./controllers/noteController");
const userController = require("./controllers/userController");
const checkJwt = require("express-jwt");
const seeder = require("./seeder");
const routes = (app) => {
  //Api

  app.get("/api/list/users", (req, res) => userController.listUsers(req, res));

  //login
  app.post("/registro", userController.createUser);
  app.post("/login", userController.login);

  //create first data
  app.get("/creardata", seeder.createData);

  //notes
  app.post(
    "/note/crear",
    checkJwt({ secret: process.env.SECRET }),
    (req, res) => noteController.createNote(req, res)
  );
  app.get("/usuario/:noteId/borrar", noteController.delete);
  app.get("/usuario/:username/like/:note", (req, res) =>
    userController.like(req, res)
  );
  app.post("/usuario/:username/notes/follow");

  //username profile
  app.get("/usuario/:username", (req, res) =>
    userController.userPage(req, res)
  );

  //configurate username profile
  app.post("/usuario/configuracion/imagen", (req, res) =>
    userController.modifyProfileImage(req, res)
  );
  app.post("/usuario/configuracion/datos", (req, res) =>
    userController.modifyProfileData(req, res)
  );

  // interactions about followers
  app.get("/usuario/:username/follow", (req, res) =>
    userController.follow(req, res)
  );
  app.get("usuario/:username/unfollow", (req, res) =>
    userController.unfollow(req, res)
  );
  app.get("/suggestionfollowers", (req, res) =>
    userController.suggestionFollowers(req, res)
  );

  //delete token
  app.get("/usuario/:username/borrar/key", (req, res) =>
    userController.deleteKey(req, res)
  );
};
module.exports = {
  routes,
};
