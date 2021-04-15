const { OOPS_TEXT } = require('../messages')
const { RATE_URL } = require('../constants')
const { getBalance } = require('../dogeApi')
const axios = require('axios')

const BALANCE_TEXT = 'Wow. Balance : '

function balance (message) {
  var account = message.author.tag.replace('#', '')

  getBalance(account)
    .then(function (balance) {
      message.channel.send(BALANCE_TEXT + (balance).toFixed(2) + ' DOGE')
    })
    .catch(function (err) {
      console.log(err)
      message.channel.send(OOPS_TEXT)
    })
}

module.exports = balance
