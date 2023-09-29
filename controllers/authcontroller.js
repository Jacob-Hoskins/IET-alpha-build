const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");
const appError = require("../utils/appError");
const { auth, requiresAuth } = require("express-openid-connect");

exports.accountSetup = async (req, res) => {
  res.render("createAccount", {
    email: req.oidc.user["email"],
    authID: req.params.authID,
  });
};

const signToken = (id) => {
  return jwt.sign({ id }, "shhhh", { expiresIn: "90d" });
};

exports.createSendToken = (user, statusCode, res) => {
  const token = signToken(user);

  const cookieOptions = {
    expiresIn: new Date(Date.now() + "90d" * 20 * 60 * 60 * 1000),
    httpOnly: true,
  };

  cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  // res.cookie("test", "test");

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);

  if (!email || password) {
    res.status(400).json({
      status: "Failure",
    });
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    res.status(401).json({
      status: "Incorrect Email or Password",
    });
    // return next(new appError("Incorrect Email or Password", 401));
  }

  this.createSendToken(user, 200, res);
  // res.end("cool");
};

exports.createNewUser = async (req, res) => {
  const newUser = await UserModel.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.params.email,
    authPID: req.params.authID,
  });

  console.log(req.params.authID, newUser["id"]);
  res.redirect(`/jobEstimates/${req.params.authID}/${newUser["id"]}`);
};
