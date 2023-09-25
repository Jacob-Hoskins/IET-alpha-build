const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  firstName: {
    required: [true, "A user must have a first name"],
    type: String,
  },
  lastName: {
    required: [true, "A user must have a last name"],
    type: String,
  },
  email: {
    required: [true, "A user must have a email address"],
    unique: true,
    type: String,
  },
  authPID: {
    required: [true],
    type: String,
    unique: true,
  },
  // password: {
  //   type: String,
  //   required: [true, "A user must have a password"],
  //   minlength: 8,
  //   select: false,
  // },
  // passwordConfirm: {
  //   type: String,
  //   required: [true, "Passwords must match"],
  //   validate: {
  //     //This will only work on CREATE and SAVE!!
  //     validator: function (el) {
  //       return el === this.password;
  //     },
  //     message: "Passwords are not the same",
  //   },
  // },
  // passwordChangedAt: Date,
  // passwordResetToken: String,
  // passwordResetExpires: Date,
  // active: {
  //   type: Boolean,
  //   default: true,
  //   select: false,
  // },
});

// // TODO: encrypt password before it goes into DB
// userSchema.pre(/^find/, async function (next) {
//   // this is query middlewear and points to current query
//   //   this.password = await bcrypt.hash(this.password, 12);
//   this.find({ active: { $ne: false } });
//   next();
// });

// userSchema.pre("save", async function (next) {
//   // this is query middlewear and points to current query
//   this.password = await bcrypt.hash(this.password, 12);
//   this.passwordConfirm = undefined;
//   next();
// });

// userSchema.methods.correctPassword = async function (
//   candidatePassword,
//   userPassword
// ) {
//   return await bcrypt.compare(candidatePassword, userPassword);
// };

const User = mongoose.model("Users", userSchema);

module.exports = User;
