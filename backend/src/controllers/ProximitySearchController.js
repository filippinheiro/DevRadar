const Dev = require('../models/Dev')

module.exports = {

   async index(request, response) {
      const { latitude, longitude } = request.query

      const devs = await Dev.find({
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

      return response.json({ devs })
   }
}