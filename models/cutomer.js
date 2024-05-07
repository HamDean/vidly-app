const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    isGold: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
      lowercase: true,
    },
    phone: {
      type: String,
      minlength: 10,
      maxlength: 10,
      unique: true,
    },
  });
  
  const Customer = mongoose.model("Customer", customerSchema);

  module.exports = Customer;