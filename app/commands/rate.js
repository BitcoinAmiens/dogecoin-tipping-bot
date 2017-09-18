const request = require('request')

const RATE_URL = 'https://api.coinmarketcap.com/v1/ticker/dogecoin/?convert=EUR'

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
