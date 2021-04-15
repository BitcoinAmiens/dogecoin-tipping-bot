const { OOPS_TEXT } = require('../messages')
const { getBalance, move } = require('../dogeApi')

const TIP_TEXT = 'Wow. Much coins.'
const PROPER_AMOUNT_TEXT = 'You need provide a proper amount to be send.'
const NO_COMMA_TEXT = 'Please avoid "," in your amount and use "."'
const NEED_USER_TEXT = 'Need a user as a third argument'
const NOT_ENOUGH_FUNDS = 'Not enough funds for this transfer. Please add some dogecoins.'

async function tip (message, amount) {
  const to = message.mentions.users.first()

  if (!to) {
    message.reply(NEED_USER_TEXT)
    return
  }

  const amountInt = parseInt(amount)

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

  try {
    const balance  = await getBalance(fromAccount)

    // We don't have enough funds...
    if (balance - amountInt <= 0) {
      message.reply(NOT_ENOUGH_FUNDS)
      return
    }

    await move(fromAccount, toAccount, amountInt)
    message.reply(TIP_TEXT)
  } catch (err) {
    console.log(err)
    message.channel.send(OOPS_TEXT)
  }
}

module.exports = tip
