const mongoose = require('mongoose');

const MotorcycleSchema = new mongoose.Schema({
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

module.exports = Motorcycle = mongoose.model('motorcycle', MotorcycleSchema);
