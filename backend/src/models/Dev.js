const mongoose = require('mongoose')
const PointSchema = require('./utils/PointSchema')

const DevSchema = new mongoose.Schema({
   name: String,
   github_username: {
      type: String,
      immutable: true,
      unique: true
   },
   bio: String,
   avatar_url: String,
   techs: [String],
   createdAt: {
      type: Date,
      default: Date.now,
      immutable: true
   },
   location: {
      type: PointSchema,
      index: '2dsphere'
   }
}) 

module.exports = mongoose.model('Dev', DevSchema)