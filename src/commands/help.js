const HELP_TEXT =
  '```Wow. DogeCoin to moon. \n \
Command list : \n \
  - **help** : Get help ! \n \
  - **tip** : Tip someone some dogecoin \n \
  - **balance** : Get your balance \n \
  - **rate** : Get current value \n \
  - **address** : Show an used wallet so you can refill your wallet \n \
  - **withdraw** : Move coins to an external address \n \
```'

function help (message) {
  message.channel.send(HELP_TEXT)
}

module.exports = help
