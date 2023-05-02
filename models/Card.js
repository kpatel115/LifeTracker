const mongoose = require('mongoose')

const CardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  meals: {
    type: String,
    required: true
  },
  macros: {
    type: String,
    required: true
  },
  calories: {
    type: String,
    required: true
  },
  water: {
    type: String,
    required: true
  },  
  workout: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    default: Date.now,
  }
})

module.exports = mongoose.model('Card', CardSchema)