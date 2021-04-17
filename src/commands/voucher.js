const { OOPS_TEXT } = require('../messages')
const path = require('path')
const jsonfile = require('jsonfile')
const settings = require('../settings')
const fs = require('fs')
const { getBalance } = require('../dogeApi')

var vouchersFile = path.join(__dirname, '..', '..', settings.VOUCHERS_FILENAME)


// TODO: We could deactivate the vouchers instead of this
if (!fs.existsSync(vouchersFile)) {
  console.error('NO VOUCHERS FILE !!!')
  process.exit()
}

const ERROR_NOT_DM_MESSAGE = 'Carefull ! Yoou need to give your voucher code to the bot in a private message !'
const INVALID_VOUCHER = 'Invalid voucher code'
const VOUCHER_SUCCESS = 'WOW much money'

const VOUCHER_AMOUNT = 10

async function voucher (message, voucherCode) {
  var account = message.author.tag.replace('#', '')

  if (message.channel.type === 'dm') {
    var data = jsonfile.readFileSync(vouchersFile)

    var validVoucher = data.vouchers.find(function (element) {
      return element === voucherCode
    })

    if (validVoucher) {
      try {
        const balance = await getBalance('')
  
        // We don't have enough funds...
        if (balance - VOUCHER_AMOUNT <= 0) {
          message.reply(OOPS_TEXT)
          return
        }
  
        await move('', account, VOUCHER_AMOUNT)
  
        const index = data.vouchers.indexOf(validVoucher)
        data.vouchers.splice(index, 1)
  
        jsonfile.writeFileSync(vouchersFile, data)
  
        message.reply(VOUCHER_SUCCESS)
        return
      } catch (err) {
        message.reply(OOPS_TEXT)
        return
      }

    }

    message.reply(INVALID_VOUCHER)
    return
  }
  message.reply(ERROR_NOT_DM_MESSAGE)
}

module.exports = voucher
