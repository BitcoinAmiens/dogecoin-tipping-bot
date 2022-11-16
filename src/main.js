const { Client, GatewayIntentBits, REST, Routes, Events } = require('discord.js')
const settings = require('./settings')
const Commands = require('./commands')

// Register commands

const rest = new REST({ version: '10' })
rest.setToken(settings.DISCORD_TOKEN)

const client = new Client({ intents: [GatewayIntentBits.Guilds] })
const giphyApiKey = settings.GIPHY_KEY

const registerCommands = async () => {
  try {
    console.log('Started refreshing application (/) commands.')

    await rest.put(Routes.applicationCommands(settings.DISCORD_ID), { body: [Commands.commands] })

    console.log('Successfully reloaded application (/) commands.')
  } catch (error) {
    console.error(error)
  }
}

async function main () {
  // Register commands
  await registerCommands()

  client.on(Events.ClientReady, () => {
    console.log('I am ready!')
  })

  client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return

    console.log(interaction.commandName)

    const command = interaction.options.getSubcommand()

    switch (command) {
      case 'help':
        Commands.help(interaction)
        break
      case 'tip':
        Commands.tip(interaction)
        break
      case 'balance':
        Commands.balance(interaction)
        break
      case 'rate':
        interaction.reply('1 DOGE = 1 DOGE')
        break
      case 'address':
        Commands.address(interaction)
        break
      case 'withdraw':
        Commands.withdraw(interaction)
        break
      case 'adopt':
        interaction.reply('Wow wow')
        break
      case 'goodboy':
        if (giphyApiKey !== null && giphyApiKey !== '') {
          Commands.goodboy(interaction, giphyApiKey)
        }
        break
      case 'qrcode':
        Commands.qrcode(interaction)
        break
      case 'voucher':
        Commands.voucher(interaction)
        break
      default:
        interaction.reply('To the MOOoooooooOOOOOOOOOOnnNNN !!')
    }
  })

  client.login(settings.DISCORD_TOKEN)
}

main()
