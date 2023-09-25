const { request } = require("express");
const ItemModel = require("../models/itemizedModel");
const UserModel = require("../models/userModel");
const authController = require("./authcontroller");


//TODO: try importing the auth0 here and using it as a module
exports.createNewUser = async (req, res) => {
  const newUser = await UserModel.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passConfirm,
  });

  authController.createSendToken(newUser, res);

  res.redirect("/createAccount");
};

// TODO: Home page controller get it out of this file and work on making it its own controller
exports.createAccount = (req, res) => {
  res.status(200).render("createAccount");
};

// TODO: this controller should be renamed at some point to estimate controller, and the router name changed to estimate router

exports.home = async (req, res) => {
  // console.log(req.params.jobNumber);

  let current_items = await ItemModel.findOne({
    jobNumber: req.params.jobNumber,
  });
  // console.log(current_items["itemList"]);
  // console.log(current_items);

  res.cookie("current_estimate_id", req.params.jobNumber);

  res.status(200).render("itemizedSearching", {
    jobName: current_items.jobName,
    jobNumber: current_items.jobNumber,
    itemList: current_items.itemList,
  });
};

// Will have to change job name to job number
exports.allEstimates = async (req, res) => {
  let job_details = [];

  const all_estimates = await ItemModel.find();

  //   grabs all the data by job names, sorts it into array of objects to make sure none are double made, and sends to page
  for (let x = 0; x <= all_estimates.length - 1; x += 1) {
    let array = all_estimates[x];
    if (job_details.some((name) => name.jobName === array.jobName)) {
      //   console.log("In list already");
    } else {
      let new_dict = {};
      new_dict.jobName = array.jobName;
      new_dict.jobNumber = array.jobNumber;
      job_details.push(new_dict);
    }
    // return job_details;
  }

  // console.log(all_estimates);
  res.status(200).render("allEstimates", {
    estimates: job_details,
  });
};

// TODO: update to match the new model
exports.addItem = async (req, res) => {
  // console.log(req.body.itemInput, req.cookies.current_estimate_id);
  // const new_item = await ItemModel.create({
  //   itemName: req.body.itemInput,
  //   quantity: 1,
  // });
  let update_estimate_list = await ItemModel.updateOne(
    { jobNumber: req.cookies.current_estimate_id },
    {
      $push: {
        itemList: {
          itemName: req.body.itemInput,
          quantity: 1,
        },
      },
    }
  );
  // console.log(update_estimate_list);
  res.redirect(`/jobEstimates/${req.cookies.current_estimate_id}`);
};

exports.createEstimate = async (req, res) => {
  // console.log(req.body.jobName);
  let new_estimate = await ItemModel.create({
    jobName: req.body.jobName,
    jobNumber: req.body.jobNumber,
  });
  res.redirect("/jobEstimates");
};

exports.startSearching = async (req, res) => {
  console.log("Starting search");
  let prepare_to_search = await ItemModel.findOneAndUpdate(
    { jobNumber: req.cookies.current_estimate_id },
    { finsihedEstimate: true }
  );
  res.redirect("/jobEstimates");
};

exports.deleteEstimate = async (req, res) => {
  const delete_estimate = await ItemModel.findOneAndDelete({
    jobNumber: req.params.jobNumber,
  });
  res.redirect("/jobEstimates");
};

exports.deleteItem = async (req, res) => {
  const delete_item = await ItemModel.updateOne(
    { jobNumber: req.cookies.current_estimate_id },
    { $pull: { itemList: { itemName: req.params.itemName } } }
  );
  // console.log(delete_item);
  res.redirect(`/jobEstimates/${req.cookies.current_estimate_id}`);
};

exports.markEstimateFinished = async (req, res) => {
  console.log(req.params.jobNumber);
  let start_event = await ItemModel.findOneAndUpdate(
    { jobNumber: req.params.jobNumber },
    { finsihedEstimate: true }
  );
  res.redirect("/jobEstimates");
};
