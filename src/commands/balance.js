const { DOGE_SATOSHI, RATE_URL } = require('../constants')
const request = require('request')

const NO_WALLET_TEXT = 'No balance. Wow. No DogeCoin wallet.'
const BALANCE_TEXT = 'Wow. Balance : '
const OOPS_TEXT = 'Oops ! Something went wrong. Contact Lola.'

async function balance (message, bcapi) {
  var tag = message.author.tag.replace('#', '')

  bcapi.getAddrBal(tag, {}, function (error, body) {
    if (error) {
      message.reply(OOPS_TEXT)
      return
    }

    if (body.error) {
      if (body.error === 'Wallet ' + tag + ' not found') {
        message.channel.send(NO_WALLET_TEXT)
      } else {
        message.channel.send(OOPS_TEXT)
      }
      return
    }

    var finalBalance = body.final_balance

    request.get(RATE_URL, function (error, response, body) {
      if (error) {
        message.reply(OOPS_TEXT)
        return
      }

      var result = JSON.parse(body)
      var priceEur = result[0].price_eur

      message.channel.send(BALANCE_TEXT + (finalBalance / DOGE_SATOSHI).toFixed(2) + ' DOGE ( ' + (finalBalance / DOGE_SATOSHI * priceEur).toFixed(2) + ' EUR )')
    })
  })
}

module.exports = balance
