const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');
let party = new Schema({
  name: String,
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  description: String,
  going: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  alc: Boolean,
  pay: Boolean,
  startDate: Date,
  endDate: Date,
  startTime: String,
  endTime: String,
  alc: Boolean,
  age: Boolean,
  count: Number,
  address: String,
  up: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  upCount: Number,
  down: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  downCount: Number
});
let partyModel = mongoose.model('Party', party);

module.exports = partyModel;