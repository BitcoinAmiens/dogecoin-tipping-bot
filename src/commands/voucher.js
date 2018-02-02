const { OOPS_TEXT } = require('../messages')
const path = require('path')
const jsonfile = require('jsonfile')

var vouchersFile = path.join(__dirname, '../vouchers.json')

const ERROR_NOT_DM_MESSAGE = 'Carefull ! Yoou need to give your voucher code to the bot in a private message !'
const INVALID_VOUCHER = 'Invalid voucher code'

function voucher (message, dogecoinNode, voucherCode) {
  var account = message.author.tag.replace('#', '')

  if (message.channel.type === 'dm') {
    var data = jsonfile.readFileSync(vouchersFile)

    var validVoucher = data.vouchers.find(function (element) {
      return element === voucherCode
    })

    if (validVoucher) {
      dogecoinNode.getBalance('', function (err, balance) {
        if (err) {
          console.log(err)
          message.channel.send(OOPS_TEXT)
          return
        }

        // We don't have enough funds...
        if (balance - 30 <= 0) {
          message.reply(OOPS_TEXT)
          return
        }

        dogecoinNode.move('', account, 30, function (err, result) {
          if (err) {
            console.log(err)
            message.channel.send(OOPS_TEXT)
            return
          }

          var index = data.vouchers.indexOf(validVoucher)
          data.vouchers.splice(index, 1)

          jsonfile.writeFileSync(vouchersFile, data)

          message.reply('WOUH much money')
        })
      })
      return
    }

    message.reply(INVALID_VOUCHER)
    return
  }
  message.reply(ERROR_NOT_DM_MESSAGE)
}

module.exports = voucher
