const axios = require('axios')
const Dev = require('../models/Dev')
const mongoose = require('mongoose');
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {



   async index(request, response) {
      const devs = await Dev.find()

      return response.json(devs)
   },


   async store(request, response) {

      const { github_username, techs, latitude, longitude } = request.body
      const api_response = await axios.get(`https://api.github.com/users/${github_username}`)
      const { name = login, avatar_url, bio } = api_response.data
      const techs_array = parseStringAsArray(techs)
      const location = {
         type: 'Point',
         coordinates: [longitude, latitude]
      }

      const dataToUpsert = {
         github_username,
         techs: techs_array,
         location,
         name,
         avatar_url, bio
      }

      const filter = { github_username }


      const dev = await Dev.findOneAndUpdate(filter, dataToUpsert, {
         new: true,
         upsert: true,
         useFindAndModify: false
      })
      return response.json(dev)
   },


   //TODO: implementar update apenas name, techs, location

   async destroy(request, response) {
      const id = mongoose.Types.ObjectId(request.params.id)
      const dev = await Dev.findByIdAndRemove(id, {
         useFindAndModify: false
      })
      return response.json(dev)
   }
}