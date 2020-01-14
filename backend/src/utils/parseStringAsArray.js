const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = function parseStringAsArray(arrayString) {
   return arrayString.split(',').map(item => item.trim())
}