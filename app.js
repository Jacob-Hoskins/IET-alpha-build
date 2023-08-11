const viewRouter = require("./routes/viewRouter");
const timeClockRouter = require("./routes/timeClockRouter");
const pug = require("pug");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const express = require("express");

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(`${__dirname}/public`));

app.use("/", viewRouter);
app.use("/timeclock", timeClockRouter);

module.exports = app;
