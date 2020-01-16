const jwt = require('jsonwebtoken')

module.exports = (request, response, next) => {
   try {
      const token = request.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_KEY)
      request.userData = decoded
      console.log(request.userData._id === request.params.id)
      if(request.userData._id == request.params.id) {
         next()
         return
      } 
      return response.status(401).json({
         message: 'Auth failed'
      })

   } catch(err) {
      return response.status(401).json({
         message: 'Auth failed'
      })
   }
}