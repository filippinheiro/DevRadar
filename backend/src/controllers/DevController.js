const axios = require('axios')
const Dev = require('../models/Dev')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const parseStringAsArray = require('../utils/parseStringAsArray')
const {findConnections, sendMessage} = require('../websocket')


module.exports = {

   async index(request, response) {
      const api_devs = await Dev.find()
      const devs = api_devs.map(api_dev => ({
         github_username: api_dev.github_username,
         name: api_dev.name,
         avatar_url: api_dev.avatar_url,
         location: api_dev.location,
         techs: api_dev.techs,
         bio: api_dev.bio,
         _id: api_dev._id,
      })
      )
      return response.status(200).json(devs)
   },

   async store(request, response) {
      const { github_username, techs, latitude, longitude, password } = request.body
      try {
         const api_response = await axios.get(`https://api.github.com/users/${github_username}`)
         let { name, avatar_url, bio } = api_response.data
         if (name === null) name = api_response.data.login
         const techs_array = parseStringAsArray(techs)

         const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
         }

         const filter = { github_username }

         bcrypt.hash(password, 10, async (err, hash) => {

            if (err) {
               return response.status(500).json({ error: err })
            }


            const dataToUpsert = {
               github_username,
               techs: techs_array,
               password: hash,
               location,
               name,
               avatar_url, bio
            }

            const dev = await Dev.findOneAndUpdate(filter, dataToUpsert, {
               new: true,
               upsert: true,
               useFindAndModify: false
            })

            const sendSocketMessageTo = findConnections(
               {longitude, latitude},
               techs_array
            )

            sendMessage(sendSocketMessageTo, 'new-dev', dev)

            return response.status(201).json(dev)
         })
      } catch {
         return response.status(404).send('user not found on github')
      }
   },

   async destroy(request, response) {
      const id = mongoose.Types.ObjectId(request.params.id)
      const dev = await Dev.findByIdAndRemove(id, {
         useFindAndModify: false
      })
      if (!dev) return response.status(404).send('Id not found')
      return response.json(dev)
   },

   async update(request, response) {

      const id = mongoose.Types.ObjectId(request.params.id)
      let dev = await Dev.findById(id, {
         useFindAndModify: false
      })

      if (!dev) return response.status(404).send('User not found')

      const {
         name = dev.name,
         avatar_url = dev.avatar_url,
         bio = dev.bio,
      } = request.body

      const techs = request.body.techs ? parseStringAsArray(request.body.techs) : dev.techs

      const dataToUpdate = {
         name, avatar_url, bio, techs
      }

      dev = await Dev.findByIdAndUpdate(id, dataToUpdate, {
         new: true,
         useFindAndModify: false
      })

      return response.json(dev)

   }

}