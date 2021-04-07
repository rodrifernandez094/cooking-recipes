const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "please enter your username"],
    unique: true,
    minlength: [4, "Your username needs to be at least 4 characters long"],
  },
  email: {
    type: String,
    required: [true, "please enter your email."],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "please enter your password."],
    minlength: [6, "Your password needs to be at least 6 characters long."],
  },
  activated: Boolean,
  emailToken: String,
});

//hash password before saving the doc
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//static method login user

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });

  if (!user) {
    throw Error("incorrect email");
  }

  if (!user.activated) {
    throw Error("you need to verify your email");
  }

  const auth = await bcrypt.compare(password, user.password);

  if (auth) {
    return user;
  }
  throw Error("incorrect password");
};

const User = mongoose.model("user", userSchema);

module.exports = User;
