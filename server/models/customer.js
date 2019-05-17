const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  fname: String,
  sname: String,
  addressId: String
});

module.exports = mongoose.model("Customer", customerSchema);
