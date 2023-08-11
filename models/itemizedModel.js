const mongoose = require("mongoose");

// TODO: will need to add ID of whoever created the list when user accounts are created
const itemSchema = new mongoose.Schema({
  jobName: {
    type: String,
    required: true,
    unique: true,
  },
  jobNumber: {
    type: String,
    required: true,
    unique: true,
  },
  itemList: [
    {
      itemName: {
        type: String,
        // required: true,
        trim: true,
      },

      quantity: {
        type: Number,
        // required: true,
        trim: true,
      },
    },
  ],
  completedSearch: {
    type: Boolean,
    required: true,
    default: false,
  },
  finsihedEstimate: {
    required: true,
    type: Boolean,
    default: false,
  },
});

const Items = mongoose.model("ItemSearches", itemSchema);

module.exports = Items;
