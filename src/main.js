const Discord = require('discord.js')
const Dotenv = require('dotenv')
const {HDNode, networks} = require('bitcoinjs-lib')

const Commands = require('./commands')

// Init the Discord client
const client = new Discord.Client()

// Load the .env file
Dotenv.config()

// Init HDnode
const hd = HDNode.fromSeedHex(process.env.MASTER_SEED_HEX, networks.dogecoin)

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
        Commands.tip(message, bcapi, hd, args[2], message.mentions.users.first())
        break
      case 'balance':
        Commands.balance(message)
        break
      case 'rate':
        Commands.rate(message)
        break
      case 'create':
        Commands.create(message, bcapi, hd)
        break
      case 'address':
        Commands.address(message)
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
