const DOGE_PATH_PREFIX = require('../constants').DOGE_PATH_PREFIX

const SUCCESS_TEXT = 'Your wallet has been created. You can now fill it with some Dogecoin /wow address'
const HAS_WALLET_TEXT = 'You already have a wallet !'
const OOPS_TEXT = 'Oops ! Something went wrong. Contact Lola.'

async function create (message, bcapi, hd) {
  var account = message.author.id % Math.pow(2, 31)

  // Get path
  var path = DOGE_PATH_PREFIX + account + "'"
  const hdAuthor = hd.derivePath(path)

  // Respect BIP44
  var data = {
    name: message.author.tag.replace('#', ''),
    extended_public_key: hdAuthor.neutered().toBase58(),
    subchain_indexes: [0, 1]
  }

  bcapi.createHDWallet(data, function (error, body) {
    if (error) {
      message.channel.send(OOPS_TEXT)
      return
    }

    if (body.error) {
      if (body.error === 'Error: wallet exists') {
        message.channel.send(HAS_WALLET_TEXT)
      } else {
        message.channel.send(OOPS_TEXT)
      }
      return
    }

    bcapi.deriveAddrHDWallet(tag, function (error, body) {
      if (error) {
        message.channel.send(OOPS_TEXT)
        return
      }
      message.channel.send(SUCCESS_TEXT)
    })

  })
}

module.exports = create
