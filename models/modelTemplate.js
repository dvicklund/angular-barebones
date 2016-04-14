var mongoose = require('mongoose')

var templateSchema = new mongoose.Schema({
  name: String,
  serialNumber: Number
})

module.exports = mongoose.model('Template', templateSchema)
