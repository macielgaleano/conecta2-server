const mongoose = require("mongoose");
const noteSchema = require("./Note");
const userSchema = require("./User");
const loginlogSchema = require("./Loginlog");

mongoose.connect(
  "mongodb+srv://conecta2:1234@cluster0.h9yty.mongodb.net/<conecta2>?authSource=admin&replicaSet=atlas-akyu8h-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true",
  { useNewUrlParser: true }
);

mongoose.connection
  .once("open", () =>
    console.log("¡Conexión con la base de datos establecida!")
  )
  .on("error", (error) => console.log(error));

const Note = mongoose.model("Note", noteSchema);
const User = mongoose.model("User", userSchema);
const Loginlog = mongoose.model("Loginlog", loginlogSchema);

module.exports = {
  mongoose,
  Note,
  User,
  Loginlog,
};
