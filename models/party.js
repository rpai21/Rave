const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');
let party = new Schema({
  name: String,
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  description: String,
  going: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  drinks: Boolean,
  pay: Boolean,
  date: Date,
  drinks: Boolean
});
let partyModel = mongoose.model('Party', party);

module.exports = partyModel;