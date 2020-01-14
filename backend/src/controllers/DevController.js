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
      let { name , avatar_url, bio } = api_response.data
      if(name === null) name = api_response.data.login
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

   async destroy(request, response) {
      const id = mongoose.Types.ObjectId(request.params.id)
      const dev = await Dev.findByIdAndRemove(id, {
         useFindAndModify: false
      })
      return response.json(dev)
   },

   async update(request, response) {

      const id = mongoose.Types.ObjectId(request.params.id)
      const {techs} = request.body

      if(techs) {
         const techs_array = parseStringAsArray(techs)
         const dataToUpdate = {...request.body, techs: techs_array}
      }

      const dev = await Dev.findByIdAndUpdate(id, dataToUpdate, {
         new: true,
         useFindAndModify: false
      })

      return response.json(dev)

   }

}