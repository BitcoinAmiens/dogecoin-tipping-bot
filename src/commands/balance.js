const { DOGE_SATOSHI } = require('../constants')
const { getBalance, rateDogeEur } = require('../requests')

const BALANCE_TEXT = 'Wow. Balance : '

async function balance (message, bcapi) {
  var tag = message.author.tag.replace('#', '')

  getBalance(tag)
    .then((balance) => {
      // It is a bit messy here but yeah whatever
      rateDogeEur().then((rate) => {
        message.channel.send(BALANCE_TEXT + (balance / DOGE_SATOSHI).toFixed(2) + ' DOGE ( ' + (balance / DOGE_SATOSHI * rate).toFixed(2) + ' EUR )')
      }).catch((error) => {
        message.channel.send(error)
      })
    })
    .catch((error) => {
      message.channel.send(error)
    })
}

module.exports = balance
