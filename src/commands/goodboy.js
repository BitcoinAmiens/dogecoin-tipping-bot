const { OOPS_TEXT } = require('../messages')

function goodboy (message) {
  message.channel.send('Who\'s the good boy ?')
}

module.exports = goodboy
