const {DOGE_SATOSHI, DOGE_PATH_PREFIX} = require('../constants')

const TIP_TEXT = 'Wow. Much coins.'
const NO_WALLET_TEXT = 'You dont have a wallet yet... Do "/wow create"'
const OOPS_TEXT = 'Oops ! Something went wrong. Contact Lola.'
const PROPER_AMOUNT_TEXT = 'You need provide a proper amount to be send.'
const NO_COMMA_TEXT = 'Please avoid "," in your amount and use "."'
const NEED_USER_TEXT = 'Need a user as a third argument'
const USER_NO_WALLET_TEXT = 'This user dont have a wallet yet.'

function tip (message, bcapi, hd, amount, to) {
  if (!to) {
    message.reply(NEED_USER_TEXT)
    return
  }

  var amountInt = parseInt(amount)

  if (!amountInt) {
    message.reply(PROPER_AMOUNT_TEXT)
    return
  }

  // If amount has a comma
  if (amount.indexOf(',') >= 0) {
    message.reply(NO_COMMA_TEXT)
    return
  }

  var tagTo = to.username + to.discriminator

  bcapi.getAddrsHDWallet(tagTo, {used: false}, function (error, body) {
    if (error) {
      message.channel.send(OOPS_TEXT)
      return
    }

    if (body.error) {
      if (body.error === 'Error: wallet not found') {
        message.channel.send(USER_NO_WALLET_TEXT)
      } else {
        message.channel.send(OOPS_TEXT)
      }
      return
    }

    if (body.chains[0].chain_addresses.length > 0) {
      var tag = message.author.tag.replace('#', '')

      var tx = {
        inputs: [
          {
            wallet_name: tag,
            wallet_token: process.env.BLOCKCYPHER_TOKEN
          }
        ],
        outputs: [
          {
            addresses: [body.chains[0].chain_addresses[0].address],
            value: amount * DOGE_SATOSHI
          }
        ]
      }

      // Prepare tx !
      bcapi.newTX(tx, function (error, body) {
        if (error) {
          message.channel.send(OOPS_TEXT)
          return
        }

        if (body.errors || body.error) {
          // Need to do it for the 3 differents error code...
          message.channel.send(OOPS_TEXT)
          return
        }

        var account = message.author.id % Math.pow(2, 31)

        // Get path
        var path = DOGE_PATH_PREFIX + account + "'"
        const hdAuthor = hd.derivePath(path)

        const signatures = []
        const pubkeys = []

        for (var i in body.tx.inputs) {
          var hdInput = hdAuthor.derivePath(body.tx.inputs[i].hd_path.substr(2))

          var hashBuffer = new Buffer(body.tosign[i], 'hex')
          signatures.push(hdInput.sign(hashBuffer).toDER().toString('hex'))
          pubkeys.push(hdInput.getPublicKeyBuffer().toString('hex'))
        }

        var txskel = Object.assign(body, {signatures: signatures, pubkeys: pubkeys})

        // Send tx
        bcapi.sendTX(txskel, function (error, body) {
          if (error) {
            message.channel.send(OOPS_TEXT)
            return
          }

          if (body.errors) {
            message.channel.send(OOPS_TEXT)
            return
          }

          message.reply(TIP_TEXT)
        })
      })

      return
    } else {
      message.channel.send(OOPS_TEXT)
    }
  })
}

module.exports = tip
