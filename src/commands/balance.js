const { OOPS_TEXT } = require('../messages')
const { getBalance } = require('../dogeApi')

const BALANCE_TEXT = 'Wow. Balance : '

function balance (interaction) {
  const account = interaction.user.username + interaction.user.discriminator

  getBalance(account)
    .then(function (balance) {
      interaction.reply(BALANCE_TEXT + (balance).toFixed(2) + ' DOGE')
    })
    .catch(function (err) {
      console.log(err)
      interaction.reply(OOPS_TEXT)
    })
}

module.exports = balance
