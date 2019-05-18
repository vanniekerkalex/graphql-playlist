const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema = new Schema({
  street: String,
  suburb: String,
  code: String
});

module.exports = mongoose.model("Address", addressSchema);
