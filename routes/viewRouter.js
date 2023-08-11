const express = require("express");
const viewController = require("../controllers/viewController");

const router = express.Router();

// TODO: will need authentication routes before these for user to log in and properly use
// TODO: update routes with proper types, would previously cause error
router.get("/jobEstimates", viewController.allEstimates);
router.get("/jobEstimates/:jobNumber", viewController.home);
router.post("/add/item", viewController.addItem);
router.post("/jobEstimates/CreateEstimate", viewController.createEstimate);
router.post("/jobEstimate/StartSearching", viewController.startSearching);
router.post("/deleteEstimate/:jobNumber", viewController.deleteEstimate);
router.post(
  "/estimate/delete-item-estimate/:itemName",
  viewController.deleteItem
);
router.post(
  "/jobEstimates/FinishEstimate/:jobNumber",
  viewController.markEstimateFinished
);
module.exports = router;
