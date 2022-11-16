const { OOPS_TEXT } = require('../messages')
const { getAccountAddress } = require('../dogeApi')

const ADDRESS_TEXT = 'You can send dogecoin to this address : '

function address (interaction) {
  const account = interaction.user.username + interaction.user.discriminator

  // Will create a new account if doesn't exist... ? Should we allow this ?
  // Yes
  getAccountAddress(account)
    .then(function (address) {
      interaction.reply(ADDRESS_TEXT + address)
    })
    .catch(function (err) {
      console.log(err)
      interaction.reply(OOPS_TEXT)
    })
}

module.exports = address
