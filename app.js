const viewRouter = require("./routes/viewRouter");
const timeClockRouter = require("./routes/timeClockRouter");
const pug = require("pug");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { auth, requiresAuth } = require("express-openid-connect");

// Below are AUTH0 callback URL's
// , https://iet.onrender.com, https://iet.onrender.com/jobEstimates, https://iet.onrender.com/login, https://iet.onrender.com/callback
// baseURL: "http://localhost:3000",

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: "a long, randomly-generated string stored in env",
  baseURL: "https://iet.onrender.com",
  clientID: "DbIQU4pabkjxucqerUJpqhfPKh0Oxt0N",
  issuerBaseURL: "https://dev-2nzpe3olofuxkog8.us.auth0.com",
};

const express = require("express");

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(auth(config));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(`${__dirname}/public`));

app.use("/", viewRouter);
app.use("/timeclock", timeClockRouter);

module.exports = app;
