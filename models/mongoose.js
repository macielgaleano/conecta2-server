const mongoose = require("mongoose");
const tweetSchema = require("./Tweet");
const userSchema = require("./User");

mongoose.connect(
  "mongodb+srv://conecta2:1234@cluster0.h9yty.mongodb.net/<conecta2>?authSource=admin&replicaSet=atlas-akyu8h-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true",
  { useNewUrlParser: true }
);

mongoose.connection
  .once("open", () =>
    console.log("¡Conexión con la base de datos establecida!")
  )
  .on("error", (error) => console.log(error));

const Tweet = mongoose.model("Tweet", tweetSchema);
const User = mongoose.model("User", userSchema);

module.exports = {
  mongoose,
  Tweet,
  User,
};
