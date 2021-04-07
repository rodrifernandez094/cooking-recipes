const User = require("../models/User");
const { handleErrors, createToken } = require("../misc/controllerUtilities");
const jwt = require("jsonwebtoken");
const randomstring = require("randomstring");
const { sendEmail } = require("../misc/mailer");

//get requests
module.exports.signup_get = (req, res) => {
  res.locals.title = "Sign up";
  res.render("signup");
};
module.exports.login_get = (req, res) => {
  res.locals.title = "Login";

  res.render("login");
};

//post requests

module.exports.signup_post = async (req, res) => {
  const { userName, email, password } = req.body;
  const emailToken = randomstring.generate();

  try {
    const user = await User.create({
      userName,
      email,
      password,
      activated: false,
      emailToken,
    });
    const url = `https://easy-cooking-recipes.herokuapp.com/${emailToken}`;

    //email confirmation content
    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: user.email,
      subject: "Verify your email to complete your registration",
      html: `please verify your email clicking in this link: <a href="${url}">${url}</a>`,
    };
    await sendEmail(mailOptions);

    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json(errors);
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id, jwt);
    res.cookie("jwt", token, { httpOnly: true, maxAge: 3000 * 60 * 60 * 24, SameSite: "None", secure: true });

    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    console.log(err);
    res.status(400).json(errors);
  }
};

module.exports.logout_get = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};

module.exports.verifyEmail = async (req, res) => {
  const emailToken = req.params.emailToken;

  try {
    const user = await User.findOne({ emailToken: emailToken });

    if (user) {
      await user.updateOne({ activated: true }, { where: { emailToken: emailToken } });
    }
    res.redirect("/login");
  } catch (err) {
    console.log(err);
  }
};
