const { rateDogeEur } = require('../requests')

function rate (message) {
  rateDogeEur().then((rate) => {
    message.channel.send('1 DGE = ' + rate + ' EUR')
  }).catch((error) => {
    message.channel.send(error)
  })
}

module.exports = rate
