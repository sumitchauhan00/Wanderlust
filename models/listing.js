const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  image: {
    filename: {
      type: String,
      default: "listingimage",
    },

    url: {
  type: String,

  default:
    "https://images.unsplash.com/photo-1778468241711-b6795c3712f0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEwfEpyNmZBTXRmY2lVfHxlbnwwfHx8fHw%3D",

  set: (v) =>
    !v
      ? "https://images.unsplash.com/photo-1778468241711-b6795c3712f0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEwfEpyNmZBTXRmY2lVfHxlbnwwfHx8fHw%3D"
      : v,
},
  },

  price: {
    type: Number,
  },

  location: {
    type: String,
  },

  country: {
    type: String,
  },
});

const listing = mongoose.model("listing", listingSchema);

module.exports = listing;