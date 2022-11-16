const help = require('./help')
const tip = require('./tip')
const balance = require('./balance')
const address = require('./address')
const withdraw = require('./withdraw')
const goodboy = require('./goodboy')
const qrcode = require('./qrcode')
const voucher = require('./voucher')

const { SlashCommandBuilder } = require('discord.js')

const commands = new SlashCommandBuilder()
  .setName('wow')
  .setDescription('Dogecoin bot prefix command')
  .addSubcommand(subcommand =>
    subcommand
      .setName('help')
      .setDescription('show help!'))
  .addSubcommand(subcommand =>
    subcommand
      .setName('tip')
      .setDescription('Tip someone some dogecoins')
      .addIntegerOption(option =>
        option.setName('amount')
          .setDescription('Amount of Dogecoin to tip')
          .setRequired(true))
      .addUserOption(option =>
        option.setName('to')
          .setDescription('The handler of the person to tip')
          .setRequired(true)))
  .addSubcommand(subcommand =>
    subcommand
      .setName('balance')
      .setDescription('Show your balance'))
  .addSubcommand(subcommand =>
    subcommand
      .setName('rate')
      .setDescription('Get current rate'))
  .addSubcommand(subcommand =>
    subcommand
      .setName('address')
      .setDescription('Show an address so you can refill your wallet with some dogecoins'))
  .addSubcommand(subcommand =>
    subcommand
      .setName('withdraw')
      .setDescription('Move your coins to an external address')
      .addIntegerOption(option =>
        option.setName('amount')
          .setDescription('Amount of Dogecoin to move')
          .setRequired(true))
      .addStringOption(option =>
        option.setName('address')
          .setDescription('The Dogecoin address to send the dogecoins to')
          .setRequired(true)))
  .addSubcommand(subcommand =>
    subcommand
      .setName('goodboy')
      .setDescription('Wow, much doggo, such reward, wow'))
  .addSubcommand(subcommand =>
    subcommand
      .setName('qrcode')
      .setDescription('Show your qrcode to receive much money'))
  .addSubcommand(subcommand =>
    subcommand
      .setName('voucher')
      .setDescription('Get your dogecoins from your voucher card !! (Only work in private message with the bot)')
      .addStringOption(option =>
        option.setName('voucher')
          .setDescription('The voucher code to retrieve dogecoins')
          .setRequired(true)))

module.exports = { commands, help, tip, balance, address, withdraw, goodboy, qrcode, voucher }
