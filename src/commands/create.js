const DOGE_PATH_PREFIX = require('../constants').DOGE_PATH_PREFIX
const { createWallet, deriveNewAddress } = require('../requests')

const SUCCESS_TEXT = 'Your wallet has been created. You can now fill it with some Dogecoin /wow address'

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

  createWallet(data)
    .then(() => {
      var tag = message.author.tag.replace('#', '')

      deriveNewAddress(tag)
        .then(() => {
          message.channel.send(SUCCESS_TEXT)
        }).catch((error) => {
          message.channel.send(error)
        })
    }).catch((error) => {
      message.channel.send(error)
    })
}

module.exports = create
