const Discord = require('discord.js')
const Dotenv = require('dotenv')
const dogecoin = require('node-dogecoin')()

const Commands = require('./commands')

// Init the Discord client
const client = new Discord.Client()

// Load the .env file
Dotenv.config()

// Set our dogecoin node IP
dogecoin.set('host', '163.172.156.174')

// Register auth value
dogecoin.auth(process.env.RPC_USER, process.env.RPC_PASSWORD)

client.on('ready', () => {
  console.log('I am ready!')
})

client.on('message', message => {
  // If message has been emitted by a bot do nothing
  if (message.author.bot) return

  if (message.content.startsWith('/wow')) {
    var args = message.content.substring(1).split(' ')
    var command = args[1]

    switch (command) {

      case 'help':
        Commands.help(message)
        break
      case 'tip':
        Commands.tip(message, dogecoin, args[2])
        break
      case 'balance':
        Commands.balance(message, dogecoin)
        break
      case 'rate':
        Commands.rate(message)
        break
      case 'address':
        Commands.address(message, dogecoin)
        break
      case 'adopt':
        message.reply('Wow wow')
        break
      default :
        message.reply('pong')
    }
  } else {
    // Special maxslayer44
    if (message.content.indexOf('wow') >= 0) {
      message.reply('To the MOOoooooooOOOOOOOOOOnnNNN !!')
    }
  }
})

client.login(process.env.DISCORD_TOKEN)
