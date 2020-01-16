const { Router } = require('express')
const DevController = require('./controllers/DevController')
const SearchController = require('./controllers/SearchController')
const SessionController = require('./controllers/SessionController')
const ProximitySearchController = require('./controllers/ProximitySearchController')
const checkAuth = require('./middleware/CheckAuth')
const routes = Router()

routes.get('/devs', DevController.index)
routes.post('/signup', DevController.store)
routes.delete('/devs/:id', checkAuth,DevController.destroy) //protected
routes.put('/devs/:id', checkAuth, DevController.update) //protected
routes.get('/search', SearchController.index)
routes.post('/login', SessionController.store)
routes.get('/nearSearch', ProximitySearchController.index)

module.exports = routes