const mongoose = require('mongoose')
const Schema = mongoose.Schema

const listSchema = new Schema({
  userId: String,
  todo: String,
  status: String
}, {
  timestamps: true
})

module.exports = mongoose.model('List', listSchema)
