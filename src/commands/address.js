const { getUnusedAddress } = require('../requests')

const ADDRESS_TEXT = 'You can send dogecoin to this address : '

function address (message) {
  var tag = message.author.tag.replace('#', '')

  getUnusedAddress(tag).then((address) => {
    message.channel.send(ADDRESS_TEXT + address)
  }).catch((error) => {
    message.channel.send(error)
  })
}

module.exports = address
