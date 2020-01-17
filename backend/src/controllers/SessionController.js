const Dev = require('../models/Dev')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


module.exports = {


   async store(request, response) {
      const { github_username, password} = request.body
      const user = await Dev.findOne({ github_username }, {
         useFindAndModify: false
      })

      if (user) {
         bcrypt.compare(password, user.password, (err, res) => {
            if (err) {
               return response.status(401).json({
                  message: 'Auth failed'
               })
            }
            if (res) {
               const token = jwt.sign({
                  username: user.github_username,
                  _id: user._id
               }, 
               process.env.JWT_KEY
               ,
                  {
                     expiresIn: '1h'
                  })
               
               return response.status(200).json({
                  message: 'Auth succesful',
                  token
               })
            }
            return response.status(401).json({
               message: 'Auth failed',
            })
         })
      }
      return
   }


}
