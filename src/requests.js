const request = require('request')
const Dotenv = require('dotenv')
const Blockcy = require('blockcypher')
const { RATE_URL, DOGE_PATH_PREFIX } = require('./constants')

const OOPS_TEXT = 'Oops ! Something went wrong. Contact Lola.'
const NO_WALLET_TEXT = 'You need to create a wallet !'
const HAS_WALLET_TEXT = 'You already have a wallet !'

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
        return
      }

      if (body.error) {
        if (body.error === 'Error: wallet not found') {
          reject(NO_WALLET_TEXT)
        } else {
          reject(OOPS_TEXT)
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
        return
      }

      resolve(body.chains[0].chain_addresses[0].address)
    })
  })
}

/**
 * Get the balance in dogecoin of an account
 * @return balance
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

/**
 * Create a new wallet
 **/
function createWallet (data) {
  return new Promise((resolve, reject) => {
    bcapi.createHDWallet(data, function (error, body) {
      if (error) {
        reject(OOPS_TEXT)
        return
      }

      if (body.error) {
        if (body.error === 'Error: wallet exists') {
          reject(HAS_WALLET_TEXT)
        } else {
          reject(OOPS_TEXT)
        }
        return
      }

      resolve()
    })
  })
}

/**
 * Create and send a trancation transaction
 * @return address
 **/
function createTransaction (tx, hd, account) {
  return new Promise((resolve, reject) => {
    // Prepare tx !
    bcapi.newTX(tx, function (error, body) {
      if (error) {
        reject(OOPS_TEXT)
        return
      }

      if (body.errors || body.error) {
        // Need to do it for the 3 differents error code...
        reject(OOPS_TEXT)
        return
      }

      // Get path
      var path = DOGE_PATH_PREFIX + account + "'"

      const hdAuthor = hd.derivePath(path)

      const signatures = []
      const pubkeys = []

      for (var i in body.tx.inputs) {
        var hdInput = hdAuthor.derivePath(body.tx.inputs[i].hd_path.substr(2))

        var hashBuffer = new Buffer(body.tosign[i], 'hex')
        signatures.push(hdInput.sign(hashBuffer).toDER().toString('hex'))
        pubkeys.push(hdInput.getPublicKeyBuffer().toString('hex'))
      }

      var txskel = Object.assign(body, {signatures: signatures, pubkeys: pubkeys})

      // Send tx
      bcapi.sendTX(txskel, function (error, body) {
        if (error) {
          reject(OOPS_TEXT)
          return
        }

        if (body.errors) {
          reject(OOPS_TEXT)
          return
        }

        resolve()
      })
    })
  })
}

module.exports = {
  rateDogeEur,
  getUnusedAddress,
  getBalance,
  createWallet,
  createTransaction
}
