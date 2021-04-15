const { OOPS_TEXT } = require('../messages')
const axios = require('axios')

const tags = 'shiba-inu-doge-coin-dogecoin'
const giphyUrl = 'http://api.giphy.com/v1/gifs/random?tag=' + tags + '&rating=g&api_key='

function goodboy(message, apiKey) {
  axios.get(giphyUrl + apiKey)
    .then(function (result) {
      message.channel.send('Who\'s the good boy ??? (Powered By GIPHY)\n' + result.data.data.url)
    })
    .catch(function (err) {
      console.log(err)
      message.channel.send(OOPS_TEXT)
    })
}

module.exports = goodboy
