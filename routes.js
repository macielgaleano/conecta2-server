const noteController = require("./controllers/noteController");
const userController = require("./controllers/userController");
const seeder = require("./seeder");
const routes = (app) => {
  //login
  app.post("/registro", userController.createUser);
  app.post("/login", userController.login);

  //create first data
  app.get("/creardata", seeder.createData);

  //notes
  app.post("/note/crear", noteController.createNote);
  app.get("/usuario/:noteId/borrar", noteController.delete);
  app.get("/usuario/:username/like/:note", userController.like);

  //username profile
  app.get("/usuario/:username", userController.userPage);

  //configurate username profile
  app.get("/configuracion", userController.configuracion);
  app.post("/usuario/configuracion/imagen", userController.modifyProfileImage);
  app.post("/usuario/configuracion/datos", userController.modifyProfileData);

  // interactions about followers

  app.get("/usuario/:username/follow", userController.follow);
  app.get("usuario/:username/unfollow", userController.unfollow);
  app.post("/usuario/:username/notes/follow");
  app.get("/suggestionfollowers", userController.suggestionFollowers);

  //delete token

  app.get("/usuario/:username/borrar/key", userController.deleteKey);
};
module.exports = {
  routes,
};
