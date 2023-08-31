const express = require("express");
const viewController = require("../controllers/viewController");
const authController = require("../controllers/authcontroller");

const router = express.Router();

// TODO: will need authentication routes before these for user to log in and properly use
// TODO: update routes with proper types, would previously cause error

router.get("/", (req, res) => {
  console.log(req.oidc.isAuthenticated());
});

router.get("/createAccount", viewController.createAccount);
router.post("/createAccount/newUser", viewController.createNewUser);

// router.get("/login", authController.login);

// TODO: add identifier for users to the routes
router.get("/jobEstimates", viewController.allEstimates);
router.get("/jobEstimates/:jobNumber", viewController.home);
router.post("/add/item", viewController.addItem);
router.post("/jobEstimates/CreateEstimate", viewController.createEstimate);
router.post("/jobEstimate/StartSearching", viewController.startSearching);
// TODO: run test on the delete routes and make sure they work
router.delete("/deleteEstimate/:jobNumber", viewController.deleteEstimate);
router.delete(
  "/estimate/delete-item-estimate/:itemName",
  viewController.deleteItem
);

// FIXME: this shouldnt be a route sense python is the one making and marking the route as finished and no route should be needed for this. Backend work
router.post(
  "/jobEstimates/FinishEstimate/:jobNumber",
  viewController.markEstimateFinished
);
module.exports = router;
