const { OOPS_TEXT, QRCODE_TEXT } = require('../messages')
const { getAccountAddress } = require('../dogeApi')
const Discord = require('discord.js')

function qrcode (message) {
  // Transform account to recover address
  let account = message.author.tag.replace('#', '')

  // Call dogecoin node to have the public address
  getAccountAddress(account)
    .then(function (address) {
    // Use goqr.me API to make a beautiful QRCode
    let qrcodeurl = 'https://api.qrserver.com/v1/create-qr-code/?size=300&bgcolor=F4ECDA&color=BA9F33&margin=10&data='+address;

    // Make an amazing rich embed message with direct image
    const embed = new Discord.MessageEmbed()
      .setTitle(QRCODE_TEXT)
      .setAuthor(message.author.username, message.author.avatarURL)
      .setColor('#BA9F33') // Color of left border
      .setDescription(address)
      .setImage(qrcodeurl)

    // Display message
    message.channel.send({embed});
    })
    .catch(function (err) {
      console.log(err)
      message.channel.send(OOPS_TEXT)
    })
}

// Display
module.exports = qrcode
