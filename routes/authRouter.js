const express = require("express");
const authController = require("../controllers/authcontroller");
const { auth, requiresAuth } = require("express-openid-connect");

const router = express.Router();

router.get(
    "/account-setup/:authID/:email",
    requiresAuth(),
    authController.accountSetup
);

router.post(
    "/createAccount/newUser/:authID/:email/employee",
    authController.createNewUserEmployee
);

router.post(
    "/createAccount/newUser/:authID/:email/owner",
    authController.createNewUserOwner
)

module.exports = router;
