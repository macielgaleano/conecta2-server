const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const loginlogSchema = newSchema(
  {
    username: String,
    token: String,
    status: Boolean,
  },
  { timestamps: true }
);
module.exports = loginlogSchema;
