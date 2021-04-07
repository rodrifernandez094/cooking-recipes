//handle errors

const handleErrors = (err) => {
  let errors = { userName: "", email: "", password: "" };

  //incorrect email
  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
    return errors;
  }

  //verify email
  if (err.message === "you need to verify your email") {
    errors.email = "You need to verify your email";
    return errors;
  }

  //incorrect password
  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
    return errors;
  }

  //duplicate email validation
  if (err.code === 11000) {
    errors.email = "Your email or user name is already taken.";
    return errors;
  }

  //error validation
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// create web token

const createToken = (id, jwt) => {
  return jwt.sign({ id }, `${process.env.TOKEN_SECRET}`, {
    expiresIn: "3d",
  });
};

module.exports = {
  handleErrors,
  createToken,
};
