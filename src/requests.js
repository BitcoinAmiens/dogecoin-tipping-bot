const request = require('request')
const { RATE_URL } = require('./constants')
const { OOPS_TEXT } = require('./messages')

/**
 * Give the rate of one dogecoin in euro.
 * @return rate
 **/
function rateDogeEur () {
  return new Promise((resolve, reject) => {
    request.get(RATE_URL, function (error, response, body) {
      if (error) {
        reject(OOPS_TEXT)
        return
      }

      var result = JSON.parse(body)
      resolve(result[0].price_eur)
    })
  })
}

module.exports = { rateDogeEur }
