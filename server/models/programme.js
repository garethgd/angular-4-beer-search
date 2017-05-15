const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const programmeSchema = new Schema({
  title: String,
  url: String,
  description: String,
  rating: Number
})
module.exports = mongoose.model('programme', programmeSchema)
