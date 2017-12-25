const { OOPS_TEXT } = require('../messages')
const { rateDogeEur } = require('../requests')

const BALANCE_TEXT = 'Wow. Balance : '

function balance (message, dogecoinNode) {
  var account = message.author.tag.replace('#', '')

  dogecoinNode.getBalance(account, function (err, balance) {
    if (err) {
      console.log(err)
      message.channel.send(OOPS_TEXT)
      return
    }

    rateDogeEur().then((rate) => {
      message.channel.send(BALANCE_TEXT + (balance).toFixed(2) + ' DOGE ( ' + (balance * rate).toFixed(2) + ' EUR )')
    }).catch((error) => {
      message.channel.send(error)
    })
  })
}

module.exports = balance
