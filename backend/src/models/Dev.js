const mongoose = require('mongoose')
const PointSchema = require('./utils/PointSchema')

const DevSchema = new mongoose.Schema({
   name: String,
   github_username: String,
   bio: String,
   avatar_url: String,
   techs: [String],
   createdAt: {
      type: Date,
      default: Date.now
   },
   location: {
      type: PointSchema,
      index: '2dsphere'
   }
}) 

module.exports = mongoose.model('Dev', DevSchema)