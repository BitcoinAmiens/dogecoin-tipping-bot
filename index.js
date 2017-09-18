const request = require('request')

const RATE_URL = 'https://api.coinmarketcap.com/v1/ticker/dogecoin/?convert=EUR'

async function getRate(ok = 1) {
  return new Promise((resolve, reject) => {
    request.get(RATE_URL, function (error, response, body) {
      if (error) reject(error)

      resolve(body)
    })
  })
}

async function main() {
  var rate = await getRate()
  console.log(rate)
}

main()
