const {DOGE_SATOSHI} = require('../constants')
const { createTransaction, getUnusedAddress } = require('../requests')

const TIP_TEXT = 'Wow. Much coins.'
const PROPER_AMOUNT_TEXT = 'You need provide a proper amount to be send.'
const NO_COMMA_TEXT = 'Please avoid "," in your amount and use "."'
const NEED_USER_TEXT = 'Need a user as a third argument'
// const USER_NO_WALLET_TEXT = 'This user dont have a wallet yet.'

function tip (message, hd, amount, to) {
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

  getUnusedAddress(tagTo)
    .then((address) => {
      var tag = message.author.tag.replace('#', '')
      var account = message.author.id % Math.pow(2, 31)

      var tx = {
        inputs: [
          {
            wallet_name: tag,
            wallet_token: process.env.BLOCKCYPHER_TOKEN
          }
        ],
        outputs: [
          {
            addresses: [address],
            value: amount * DOGE_SATOSHI
          }
        ]
      }

      // Prepare tx !
      createTransaction(tx, hd, account)
        .then((response) => {
          message.channel.send(TIP_TEXT)
        })
        .catch((error) => {
          message.channel.send(error)
        })
    })
    .catch((error) => {
      message.channel.send(error)
    })
}

module.exports = tip
