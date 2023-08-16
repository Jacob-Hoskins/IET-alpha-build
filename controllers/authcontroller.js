const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, "shhhh", { expiresIn: "90d" });
};

exports.createSendToken = (user, res) => {
  const token = signToken(user);

  const cookieOptions = {
    expiresIn: new Date(Date.now() + "90d" * 20 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res.cookie("jwt", token, cookieOptions);
  user.password = undefined;
  //   res.status(200).json({
  //     status: "success",
  //     token,
  //     date: {
  //       user,
  //     },
  //   });
};

exports.login = async (req, res, next) => {
  res.render("login");
};
