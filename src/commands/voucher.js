const { OOPS_TEXT } = require('../messages')
const path = require('path')
const jsonfile = require('jsonfile')
const settings = require('../settings')
const fs = require('fs')
const { getBalance, move } = require('../dogeApi')

const vouchersFile = path.join(__dirname, '..', '..', settings.VOUCHERS_FILENAME)

// TODO: We could deactivate the vouchers instead of this
if (!fs.existsSync(vouchersFile)) {
  console.error('NO VOUCHERS FILE !!!')
  process.exit()
}

const ERROR_NOT_DM_MESSAGE = 'Carefull ! Yoou need to give your voucher code to the bot in a private message !'
const INVALID_VOUCHER = 'Invalid voucher code'
const VOUCHER_SUCCESS = 'WOW much money'

const VOUCHER_AMOUNT = 10

async function voucher (interaction) {
  const account = interaction.user.username + interaction.user.discriminator
  const voucherCode = interaction.options.getString('voucher')

  console.log(interaction)

  if (interaction.channel.type === 'dm') {
    const data = jsonfile.readFileSync(vouchersFile)

    const validVoucher = data.vouchers.find(function (element) {
      return element === voucherCode
    })

    if (validVoucher) {
      try {
        const balance = await getBalance('')

        // We don't have enough funds...
        if (balance - VOUCHER_AMOUNT <= 0) {
          interaction.reply(OOPS_TEXT)
          return
        }

        await move('', account, VOUCHER_AMOUNT)

        const index = data.vouchers.indexOf(validVoucher)
        data.vouchers.splice(index, 1)

        jsonfile.writeFileSync(vouchersFile, data)

        interaction.reply(VOUCHER_SUCCESS)
        return
      } catch (err) {
        interaction.reply(OOPS_TEXT)
        return
      }
    }

    interaction.reply(INVALID_VOUCHER)
    return
  }
  interaction.reply(ERROR_NOT_DM_MESSAGE)
}

module.exports = voucher
