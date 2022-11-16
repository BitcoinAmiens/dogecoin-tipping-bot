const { OOPS_TEXT, QRCODE_TEXT } = require('../messages')
const { getAccountAddress } = require('../dogeApi')
const { EmbedBuilder } = require('discord.js')

function qrcode (interaction) {
  // Transform account to recover address
  const account = interaction.user.username + interaction.user.discriminator

  // Call dogecoin node to have the public address
  getAccountAddress(account)
    .then(function (address) {
    // Use goqr.me API to make a beautiful QRCode
      const qrcodeurl = 'https://api.qrserver.com/v1/create-qr-code/?size=300&bgcolor=F4ECDA&color=BA9F33&margin=10&data=' + address

      // Make an amazing rich embed message with direct image
      const embed = new EmbedBuilder()
        .setTitle(QRCODE_TEXT)
        .setColor('#BA9F33') // Color of left border
        .setDescription(address)
        .setImage(qrcodeurl)

      // Display message
      interaction.reply({ embeds: [embed] })
    })
    .catch(function (err) {
      console.log(err)
      interaction.reply(OOPS_TEXT)
    })
}

// Display
module.exports = qrcode
