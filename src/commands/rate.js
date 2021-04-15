const { RATE_URL } = require('../constants')
const { OOPS_TEXT } = require('../messages')
const axios = require('axios')

function rate (message) {
  return axios.get(RATE_URL)
  .then(function (result) {
    message.channel.send(`1 DOGE = ${result.data.prices[0].price}`)
  })
  .catch(function () {
    message.channel.send(OOPS_TEXT)
  })
}

module.exports = rate
