const { request } = require("express");
const ItemModel = require("../models/itemizedModel");
const UserModel = require("../models/userModel");
const authController = require("./authcontroller");
const { auth, requiresAuth } = require("express-openid-connect");

// //TODO: try importing the auth0 here and using it as a module
// exports.createNewUser = async (req, res) => {
//   const newUser = await UserModel.create({
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     email: req.body.email,
//     password: req.body.password,
//     passwordConfirm: req.body.passConfirm,
//   });

//   authController.createSendToken(newUser, res);

//   res.redirect("/createAccount");
// };

// // TODO: Home page controller get it out of this file and work on making it its own controller
// exports.createAccount = (req, res) => {
//   res.status(200).render("createAccount");
// };

// TODO: this controller should be renamed at some point to estimate controller, and the router name changed to estimate router

exports.homehandle = async (req, res) => {
  //checks if email is verified
  // TODO: put this if block below in auth controller as login funciton
  if (req.oidc.isAuthenticated() === true) {
    try {
      let user_email = req.oidc.user["sid"];
      let search_for_user = await UserModel.findOne({ authPID: user_email });
      res.redirect(
        `/jobestimates/${req.oidc.user["sid"]}/${search_for_user["id"]}`
      );
    } catch (err) {
      console.log(err);
      res.redirect(
        `/account-setup/${req.oidc.user["sid"]}/${req.oidc.user["email"]}`
      );
    }
  }

  //handles unverified email
  // if (
  //   req.oidc.isAuthenticated() === true &&
  //   req.oidc.user["email_verified"] == false
  // ) {
  //   // PUT IDENTIFIER IN URL TO PASS INFO TO PAGE & DB AND PULL NEEDED INFO/UPDATE
  //   // console.log(req.oidc.user);
  //   // TODO: make verify email page, and user info page
  //   res.end("verify your email bitch");
  //   // res.redirect(`/account-setup/${req.oidc.user["sid"]}`);
  // }
  //logout and or homepage
  if (req.oidc.isAuthenticated() === false) {
    res.render("home");
  }
};

exports.accountSetup = async (req, res) => {
  res.render("createAccount", {
    email: req.oidc.user["email"],
    authID: req.params.authID,
  });
};

exports.itemizedEstimatePage = async (req, res) => {
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
  // let job_details = [];

  // const all_estimates = await ItemModel.find();

  // //   grabs all the data by job names, sorts it into array of objects to make sure none are double made, and sends to page
  // for (let x = 0; x <= all_estimates.length - 1; x += 1) {
  //   let array = all_estimates[x];
  //   if (job_details.some((name) => name.jobName === array.jobName)) {
  //     //   console.log("In list already");
  //   } else {
  //     let new_dict = {};
  //     new_dict.jobName = array.jobName;
  //     new_dict.jobNumber = array.jobNumber;
  //     job_details.push(new_dict);
  //   }
  //   // return job_details;
  // }

  // // console.log(all_estimates);
  // res.status(200).render("allEstimates", {
  //   estimates: job_details,
  // });

  try {
    const all_estimates = await ItemModel.find({
      createdBy: req.params.MongoID,
    });
    console.log(all_estimates);
    res.render("allEstimates", { estimates: all_estimates });
  } catch (err) {
    console.log(err);
    res.render("allEstimates", { estimates: false });
  }
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
