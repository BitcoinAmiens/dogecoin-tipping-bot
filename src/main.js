const Discord = require('discord.js')
const settings = require('./settings')
const Commands = require('./commands')

// Init the Discord client
const client = new Discord.Client()

const giphyApiKey = settings.GIPHY_KEY

client.on('ready', () => {
  console.log('I am ready!')
})

client.on('message', message => {
  // If message has been emitted by a bot do nothing
  if (message.author.bot) return

  if (message.content.startsWith('/wow')) {
    const args = message.content.substring(1).split(' ')
    const command = args[1]

    switch (command) {
      case 'help':
        Commands.help(message)
        break
      case 'tip':
        Commands.tip(message, args[2])
        break
      case 'balance':
        Commands.balance(message)
        break
      case 'rate':
        message.channel.send('1 DOGE = 1 DOGE')
        break
      case 'address':
        Commands.address(message)
        break
      case 'withdraw':
        Commands.withdraw(message, args[2], args[3])
        break
      case 'adopt':
        message.reply('Wow wow')
        break
      case 'goodboy':
        if (giphyApiKey !== null && giphyApiKey !== '') {
          Commands.goodboy(message, giphyApiKey)
        }
        break
      case 'qrcode':
        Commands.qrcode(message)
        break
      case 'voucher':
        Commands.voucher(message, args[2])
        break
      default:
        message.reply('pong')
    }
  } else {
    // Special maxslayer44
    if (message.content.indexOf('wow') >= 0) {
      message.reply('To the MOOoooooooOOOOOOOOOOnnNNN !!')
    }
  }
})

client.login(settings.DISCORD_TOKEN)
