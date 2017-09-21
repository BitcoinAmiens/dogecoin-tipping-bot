const {DOGE_SATOSHI} = require('../constants')

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

    message.channel.send(BALANCE_TEXT + body.final_balance / DOGE_SATOSHI + ' DOGE')
  })
}

module.exports = balance
