const { OOPS_TEXT } = require('../messages')
const { sendFrom, getBalance } = require('../dogeApi')

const WITHDRAW_TEXT = 'Wow. Successful withdrawal.'
const PROPER_AMOUNT_TEXT = 'You need provide a proper amount to be send.'
const NO_COMMA_TEXT = 'Please avoid "," in your amount and use "."'
const NEED_ADDRESS_TEXT = 'Need an address as a third argument'
const NO_FUNDS = 'You dont have doge to transfer.'
const NOT_ENOUGH_FUNDS = 'Not enough funds for this transfer. Please add some dogecoins.'

async function withdraw (message, amount, toAddress) {
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

  if (!toAddress) {
    message.reply(NEED_ADDRESS_TEXT)
    return
  }

  const fromAccount = message.author.tag.replace('#', '')

  try {
    const balance = await getBalance(fromAccount)
    // We don't have funds...
    if (balance === 0) {
      message.reply(NO_FUNDS)
      return
    }
    // We don't have enough funds...
    if (balance - amountInt <= 0) {
      message.reply(NOT_ENOUGH_FUNDS)
      return
    }
    
    await sendfrom(fromAccount, toAddress, amountInt)
    message.reply(WITHDRAW_TEXT)

  } catch (err) {
    console.log(err)
    message.channel.send(OOPS_TEXT)
    return
  }
}

module.exports = withdraw
