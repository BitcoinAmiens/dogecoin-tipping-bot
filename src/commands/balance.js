const { OOPS_TEXT } = require('../messages')
const { getBalance } = require('../dogeApi')

const BALANCE_TEXT = 'Wow. Balance : '

function balance (message) {
  const account = message.author.tag.replace('#', '')

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
