const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let party = new Schema({
  name: String,
  description: String,
  //going: [Users],
  drinks: Boolean,
  pay: Boolean,
  date: Date,
  drinks: Boolean
});
let partyModel = mongoose.model('Party', party);

module.exports = partyModel;