const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
  },
  year: {
    type: String,
  },
  lastOilChange: {
    type: String,
  },
  keys: {
    type: String,
  },
  notes: {
    type: String,
  },
});

module.exports = Car = mongoose.model('car', CarSchema);
