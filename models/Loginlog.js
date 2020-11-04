const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const loginlogSchema = new Schema(
  {
    username: String,
    token: String,
    status: Boolean,
  },
  { timestamps: true }
);
module.exports = loginlogSchema;
