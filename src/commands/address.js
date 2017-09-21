const NO_WALLET_TEXT = 'You need to create a wallet !'
const ADDRESS_TEXT = 'You can send dogecoin to this address : '
const OOPS_TEXT = 'Oops ! Something went wrong. Contact Lola.'

function address (message, bcapi) {
  var tag = message.author.tag.replace('#', '')

  bcapi.getAddrsHDWallet(tag, {used: false}, function (error, body) {
    if (error) {
      message.channel.send(OOPS_TEXT)
      return
    }

    if (body.error) {
      if (body.error === 'Error: wallet not found') {
        message.channel.send(NO_WALLET_TEXT)
      } else {
        message.channel.send(OOPS_TEXT)
      }
      return
    }

    if (body.chains[0].chain_addresses.length > 0) {
      message.channel.send(ADDRESS_TEXT + body.chains[0].chain_addresses[0].address)

      if (body.chains[0].chain_addresses.length === 1) {
        // we create a new one just in case
        bcapi.deriveAddrHDWallet(tag)
      }

      return
    }

    bcapi.deriveAddrHDWallet(tag, function (error, body) {
      if (error) {
        message.channel.send(OOPS_TEXT)
        return
      }
      message.channel.send(ADDRESS_TEXT + body.chains[0].chain_addresses[0].address)
    })
  })
}

module.exports = address
