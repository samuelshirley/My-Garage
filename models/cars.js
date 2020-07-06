const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
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
