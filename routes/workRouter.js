const express = require("express");
const workcontroller = require("../controllers/workController")
const { requiresAuth } = require("express-openid-connect");


const router = express.Router();

router.get("/allJobs/:authID/:mongoID", requiresAuth(), workcontroller.workHomePage);
// router.post
router.get("/allJobs/Job/:authID/:mongoID/:jobID/:compID", requiresAuth(), workcontroller.WorkJobDetailView)
router.post("/allJobs/createJob/:authID/:mongoID", requiresAuth(), workcontroller.createJobHandler)

module.exports = router;
