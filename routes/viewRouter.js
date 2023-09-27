const express = require("express");
const viewController = require("../controllers/viewController");
const authController = require("../controllers/authcontroller");
const { auth, requiresAuth } = require("express-openid-connect");

const router = express.Router();

// TODO: will need authentication routes before these for user to log in and properly use
// TODO: update routes with proper types, would previously cause error

// Add the homepage here in this and it'll redirect based off of user being logged in and will show routes based off of that to user
// ie if theyre not logged in they get home page with create acc log in etc, but if they are then theyll be sent to the nav tool display
router.get("/", (req, res) => {
  //checks if email is verified
  if (
    req.oidc.isAuthenticated() === true &&
    req.oidc.user["email_verified"] == true
  ) {
    // PUT IDENTIFIER IN URL TO PASS INFO TO PAGE & DB AND PULL NEEDED INFO/UPDATE
    console.log(req.oidc.user["nickname"]);
    res.redirect("/jobestimates");
  }
  //handles unverified email
  if (
    req.oidc.isAuthenticated() === true &&
    req.oidc.user["email_verified"] == false
  ) {
    // PUT IDENTIFIER IN URL TO PASS INFO TO PAGE & DB AND PULL NEEDED INFO/UPDATE
    // console.log(req.oidc.user);
    // TODO: make verify email page, and user info page
    res.end("verify your email bitch");
    // res.redirect(`/account-setup/${req.oidc.user["sid"]}`);
  }
  //logout
  if (req.oidc.isAuthenticated() === false) {
    res.render("home");
  }
});

router.get("/account-setup/:user_id", (req, res) => {
  res.end(req.params.user_id);
});

// router.get("/createAccount", viewController.createAccount);
// router.post("/createAccount/newUser", viewController.createNewUser);

// router.get("/login", (req, res) => {
//   console.log(req.oidc.isAuthenticated());
// });

// TODO: add identifier for users to the routes
router.get("/jobEstimates", requiresAuth(), viewController.allEstimates);
router.get("/jobEstimates/:jobNumber", requiresAuth(), viewController.home);
router.post("/add/item", viewController.addItem);
router.post(
  "/jobEstimates/CreateEstimate",
  requiresAuth(),
  viewController.createEstimate
);
router.post(
  "/jobEstimate/StartSearching",
  requiresAuth(),
  viewController.startSearching
);
// TODO: run test on the delete routes and make sure they work
router.delete(
  "/deleteEstimate/:jobNumber",
  requiresAuth(),
  viewController.deleteEstimate
);
router.delete(
  "/estimate/delete-item-estimate/:itemName",
  requiresAuth(),
  viewController.deleteItem
);

// FIXME: this shouldnt be a route sense python is the one making and marking the route as finished and no route should be needed for this. Backend work
router.post(
  "/jobEstimates/FinishEstimate/:jobNumber",
  requiresAuth(),
  viewController.markEstimateFinished
);
module.exports = router;
