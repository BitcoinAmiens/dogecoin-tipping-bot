const { OOPS_TEXT } = require('../messages')
const { getBalance, move } = require('../dogeApi')

const TIP_TEXT = 'Wow. Much coins.'
const PROPER_AMOUNT_TEXT = 'You need provide a proper amount to be send.'
const NEED_USER_TEXT = 'Need a user as a third argument'
const NOT_ENOUGH_FUNDS = 'Not enough funds for this transfer. Please add some dogecoins.'

async function tip (interaction) {
  const to = interaction.options.getUser('to')

  if (!to) {
    interaction.reply(NEED_USER_TEXT)
    return
  }

  const amount = interaction.options.getInteger('amount')

  if (!amount) {
    interaction.reply(PROPER_AMOUNT_TEXT)
    return
  }

  const fromAccount = interaction.user.username + interaction.user.discriminator
  const toAccount = to.username + to.discriminator

  try {
    const balance = await getBalance(fromAccount)

    // We don't have enough funds...
    if (balance - amount <= 0) {
      interaction.reply(NOT_ENOUGH_FUNDS)
      return
    }

    await move(fromAccount, toAccount, amount)
    interaction.reply(TIP_TEXT)
  } catch (err) {
    console.log(err)
    interaction.reply(OOPS_TEXT)
  }
}

module.exports = tip
