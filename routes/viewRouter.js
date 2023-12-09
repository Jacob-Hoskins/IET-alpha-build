const express = require("express");
const viewController = require("../controllers/viewController");
const { auth, requiresAuth } = require("express-openid-connect");

const router = express.Router();

// TODO: update routes with proper identifiers and their coresponding controllers and pug templates

router.get("/", viewController.homehandle);

// TODO: add identifier for users to the routes
router.get(
  "/jobEstimates/:id/:MongoID/",
  requiresAuth(),
  viewController.allEstimates
);
router.get(
  "/jobEstimates/:jobNumber/:authID/:MongoID",
  requiresAuth(),
  viewController.itemizedEstimatePage
);
router.post("/add/item", viewController.addItem);
router.post(
  "/jobEstimates/CreateEstimate",
  requiresAuth(),
  viewController.createEstimate
);
router.post(
  "/jobEstimate/StartSearching/:jobNumber/:mongoID",
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
// router.post(
//   "/jobEstimates/FinishEstimate/:jobNumber/:mongoID",
//   requiresAuth(),
//   viewController.markEstimateFinished
// );
module.exports = router;
