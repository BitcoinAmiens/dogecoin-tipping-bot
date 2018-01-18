const { OOPS_TEXT, QRCODE_TEXT } = require('../messages')

function qrcode (message, dogecoinNode, Discord) {
  // Transform account to recover address
  let account = message.author.tag.replace('#', '')

  // Call dogecoin node to have the public address
  dogecoinNode.getAccountAddress(account, function (err, address) {
    // Fuck, we've got a problem
    if (err) {
      console.log(err)
      message.channel.send(OOPS_TEXT)
      return
    }

    // Use goqr.me API to make a beautiful QRCode
    let qrcodeurl = 'https://api.qrserver.com/v1/create-qr-code/?size=300&bgcolor=F4ECDA&color=BA9F33&margin=10&data='+address;

    // Make an amazing rich embed message with direct image
    const embed = new Discord.RichEmbed()
      .setTitle(QRCODE_TEXT)
      .setAuthor(message.author.username, message.author.avatarURL)
      .setColor('#BA9F33') // Color of left border
      .setDescription(address)
      .setImage(qrcodeurl)

    // Display message
    message.channel.send({embed});
  })
}

// Display
module.exports = qrcode
