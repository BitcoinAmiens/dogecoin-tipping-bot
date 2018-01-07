const config = require('../config.json')

var settings = {}

settings.DISCORD_ID = process.env.DISCORD_ID || config.discord.id
settings.DISCORD_SECRET = process.env.DISCORD_SECRET || config.discord.secret
settings.DISCORD_TOKEN = process.env.DISCORD_TOKEN || config.discord.token
settings.RPC_HOST = process.env.RPC_HOST || config.rpc.host
settings.RPC_PORT = process.env.RPC_PORT || config.rpc.port
settings.RPC_USER = process.env.RPC_USER || config.rpc.user
settings.RPC_PASSWORD = process.env.RPC_PASSWORD || config.rpc.password
settings.GIPHY_KEY = process.env.GIPHY_KEY || config.giphy.key

module.exports = settings
