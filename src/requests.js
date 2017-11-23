const request = require('request')
const Dotenv = require('dotenv')
const Blockcy = require('blockcypher')
const { RATE_URL } = require('./constants')

const OOPS_TEXT = 'Oops ! Something went wrong. Contact Lola.'
const NO_WALLET_TEXT = 'You need to create a wallet !'

// Load the .env file
Dotenv.config()

// Init BlockCypher api
const bcapi = new Blockcy('doge', 'main', process.env.BLOCKCYPHER_TOKEN)

/**
 * Give the rate of one dogecoin in euro.
 * @return rate
 **/
function rateDogeEur () {
  return new Promise((resolve, reject) => {
    request.get(RATE_URL, function (error, response, body) {
      if (error) {
        reject(OOPS_TEXT)
        return
      }

      var result = JSON.parse(body)
      resolve(result[0].price_eur)
    })
  })
}

/**
 * Give the rate of one dogecoin in euro.
 * @return dogecoin address
 **/
function getUnusedAddress (account) {
  return new Promise((resolve, reject) => {
    bcapi.getAddrsHDWallet(account, {used: false}, function (error, body) {
      if (error) {
        reject(OOPS_TEXT)
        console.error(error)
        return
      }

      if (body.error) {
        if (body.error === 'Error: wallet not found') {
          reject(NO_WALLET_TEXT)
        } else {
          reject(OOPS_TEXT)
          console.error(body.error)
        }
        return
      }

      if (body.chains[0].chain_addresses.length > 0) {
        resolve(body.chains[0].chain_addresses[0].address)
      } else {
        deriveNewAddress(account).then((address) => {
          resolve(address)
        }).catch((error) => {
          reject(error)
        })
      }
    })
  })
}

/**
 * Derive a new address on the wallet
 * @return address
 **/
function deriveNewAddress (account) {
  return new Promise((resolve, reject) => {
    bcapi.deriveAddrHDWallet(account, function (error, body) {
      if (error) {
        reject(OOPS_TEXT)
        console.error(error)
        return
      }

      resolve(body.chains[0].chain_addresses[0].address)
    })
  })
}

/**
 * Get the balance in dogecoin of an account
 **/
function getBalance (account) {
  return new Promise((resolve, reject) => {
    bcapi.getAddrBal(account, {}, function (error, body) {
      if (error) {
        reject(OOPS_TEXT)
        console.error(error)
        return
      }

      if (body.error) {
        if (body.error === 'Wallet ' + account + ' not found') {
          reject(NO_WALLET_TEXT)
        } else {
          reject(OOPS_TEXT)
        }
        return
      }

      resolve(body.final_balance)
    })
  })
}

module.exports = {
  rateDogeEur,
  getUnusedAddress,
  getBalance
}
