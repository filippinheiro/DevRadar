const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {

   async index(request, response) {
      const { latitude, longitude, techs } = request.query
      const techs_array = parseStringAsArray(techs)

      const api_devs = await Dev.find({
         techs: {
            $in: techs_array
         },
         location: {
            $near: {
               $geometry: {
                  type: 'Point',
                  coordinates: [longitude, latitude]
               },
               $maxDistance: 10000
            }
         }
      })

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

      return response.json(devs)
   }
}
