const request = require('request')
const { RATE_URL } = require('../constants')

function rate (message) {
  request.get(RATE_URL, function (error, response, body) {
    if (error) {
      console.error(error)
      return
    }

    var result = JSON.parse(body)

    // Can be improved !
    message.channel.send('1 DGE = ' + result[0].price_eur + ' EUR')
  })
}

module.exports = rate
