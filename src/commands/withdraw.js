const { OOPS_TEXT } = require('../messages')
const { sendFrom, getBalance } = require('../dogeApi')

const WITHDRAW_TEXT = 'Wow. Successful withdrawal.'
const PROPER_AMOUNT_TEXT = 'You need provide a proper amount to be send.'
const NEED_ADDRESS_TEXT = 'Need an address as a third argument'
const NO_FUNDS = 'You dont have doge to transfer.'
const NOT_ENOUGH_FUNDS = 'Not enough funds for this transfer. Please add some dogecoins.'

async function withdraw (interaction) {
  const amount = interaction.options.getInteger('amount')

  if (!amount) {
    interaction.reply(PROPER_AMOUNT_TEXT)
    return
  }

  const toAddress = interaction.options.getString('address')

  if (!toAddress) {
    interaction.reply(NEED_ADDRESS_TEXT)
    return
  }

  const fromAccount = interaction.user.username + interaction.user.discriminator

  try {
    const balance = await getBalance(fromAccount)
    // We don't have funds...
    if (balance === 0) {
      interaction.reply(NO_FUNDS)
      return
    }
    // We don't have enough funds...
    if (balance - amount <= 0) {
      interaction.reply(NOT_ENOUGH_FUNDS)
      return
    }

    await sendFrom(fromAccount, toAddress, amount)
    interaction.reply(WITHDRAW_TEXT)
  } catch (err) {
    console.log(err)
    interaction.reply(OOPS_TEXT)
  }
}

module.exports = withdraw
