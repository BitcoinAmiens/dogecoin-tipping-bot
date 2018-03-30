const { OOPS_TEXT } = require('../messages')

const TIP_TEXT = 'Wow. Much coins.'
const PROPER_AMOUNT_TEXT = 'You need provide a proper amount to be send.'
const NO_COMMA_TEXT = 'Please avoid "," in your amount and use "."'
const NEED_USER_TEXT = 'Need a user as a third argument'
const NOT_ENOUGH_FUNDS = 'Not enough funds for this transfer. Please add some dogecoins.'
const CANT_TIP = 'You cant tip yourself!'

function tip (message, dogecoinNode, amount) {
  var to = message.mentions.users.first()

  if (!to) {
    message.reply(NEED_USER_TEXT)
    return
  }

  var amountInt = parseInt(amount)

  if (!amountInt) {
    message.reply(PROPER_AMOUNT_TEXT)
    return
  }

  // If amount has a comma
  if (amount.indexOf(',') >= 0) {
    message.reply(NO_COMMA_TEXT)
    return
  }

  var fromAccount = message.author.tag.replace('#', '')
  var toAccount = to.username + to.discriminator
  
  if (fromAccount === toAccount) {
    message.reply(CANT_TIP)
  }

  dogecoinNode.getBalance(fromAccount, function (err, balance) {
    if (err) {
      console.log(err)
      message.channel.send(OOPS_TEXT)
      return
    }

    // We don't have enough funds...
    if (balance - amountInt <= 0) {
      message.reply(NOT_ENOUGH_FUNDS)
      return
    }

    dogecoinNode.move(fromAccount, toAccount, amountInt, function (err, result) {
      if (err) {
        console.log(err)
        message.channel.send(OOPS_TEXT)
        return
      }

      message.reply(TIP_TEXT)
    })
  })
}

module.exports = tip
