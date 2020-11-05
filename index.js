require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const { routes } = require("./routes");

// Configuracion app

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

routes(app);

app.listen(process.env.APP_PORT, () =>
  console.log(`App on: ${path.join(__dirname, process.env.APP_PORT)}`)
);
