const { OOPS_TEXT } = require('../messages')
const { getAccountAddress } = require('../dogeApi') 

const ADDRESS_TEXT = 'You can send dogecoin to this address : '

function address (message, dogecoinNode) {
  var account = message.author.tag.replace('#', '')

  // Will create a new account if doesn't exist... ? Should we allow this ?
  // Yes
  getAccountAddress(account)
    .then(function (address) {
      message.channel.send(ADDRESS_TEXT + address)
    })
    .catch(function (err) {
      console.log(err)
      message.channel.send(OOPS_TEXT)
    })
}

module.exports = address
