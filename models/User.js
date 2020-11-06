const mongoose = require("mongoose");
const Schema = mongoose.Schema;
bcrypt = require("bcryptjs");
SALT_WORK_FACTOR = 10;

const userSchema = new Schema(
  {
    name: String,
    lastname: String,
    username: String,
    email: String,
    password: String,
    description: String,
    avatar: String,
    list_tweets: [{ type: Schema.Types.ObjectId, ref: "Tweet" }],
    list_users_following: [{ type: Schema.Types.ObjectId, ref: "User" }],
    list_users_followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    tokens: [],
  },
  { timestamps: true }
);

userSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.hashPassword = async function (password) {
  return bcrypt.hashSync(password, 10);
};

userSchema.pre("save", function (next) {
  var user = this;
  if (!user.isModified("password")) return next();
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});
module.exports = userSchema;
