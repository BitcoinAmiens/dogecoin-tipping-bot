const { GIPHY_KEY } = require('../settings')

const HELP_TEXT = '```Wow. DogeCoin to moon. \n \
Command list : \n \
  - **help** : Get help ! \n \
  - **tip** : Tip someone some dogecoin \n \
  - **balance** : Get your balance \n \
  - **rate** : Get current value \n \
  - **address** : Show an used wallet so you can refill your wallet \n \
  - **withdraw** : Move coins to an external address \n \
  - **qrcode** : Show your qrcode to receive much money \n \
  - **voucher** : Get your dogecoins from your voucher card !! (Only work in private message with the bot) \n \
' + ((GIPHY_KEY !== null && GIPHY_KEY !== '') ? '  - **goodboy** : Wow, much doggo, such reward, wow \n' : '') + ' \
```'

function help(message) {
  message.channel.send(HELP_TEXT)
}

module.exports = help
