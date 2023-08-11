const express = require("express");
const timeClockController = require("../controllers/timeClockController");

const router = express.Router();

router.get("/", timeClockController.TimeClockHomePage);

module.exports = router;
