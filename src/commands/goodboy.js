const { OOPS_TEXT } = require('../messages')
const request = require('request')

const tags = 'shiba-inu-doge-coin-dogecoin'
const giphyUrl = 'http://api.giphy.com/v1/gifs/random?tag=' + tags + '&rating=g&api_key='

function goodboy(message, apiKey) {
  request(giphyUrl + apiKey, { json: true }, (err, res, body) => {
    if (err) {
      console.log(err)
      message.channel.send(OOPS_TEXT)
      return
    }

    message.channel.send('Who\'s the good boy ??? (Powered By GIPHY)\n' + body.data.url)
  })
}

module.exports = goodboy
