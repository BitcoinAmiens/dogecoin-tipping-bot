const axios = require('axios')
const settings = require('./settings')

const DOGE_NODE_URL = `http://${settings.RPC_HOST}:${settings.RPC_PORT}`
const BASIC_AUTH_DOGE_TOKEN = Buffer.from(`${settings.RPC_USER}:${settings.RPC_PASSWORD}`).toString('base64')

function getAccountAddress (account) {
  return axios.post(DOGE_NODE_URL, {
    jsonrpc: '2.0',
    id: + new Date(),
    method: 'getaccountaddress',
    params: [account]
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${BASIC_AUTH_DOGE_TOKEN}`
    }
  })
  .then(function (result) {
    return result.data.result
  })
}

function getBalance (account) {
  return axios.post(DOGE_NODE_URL, {
    jsonrpc: '2.0',
    id: + new Date(),
    method: 'getbalance',
    params: [account]
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${BASIC_AUTH_DOGE_TOKEN}`
    }
  })
  .then(function (result) {
    return result.data.result
  })
}

function move (fromAccount, toAccount, amount) {
  return axios.post(DOGE_NODE_URL, {
    jsonrpc: '2.0',
    id: + new Date(),
    method: 'move',
    params: [fromAccount, toAccount, amount]
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${BASIC_AUTH_DOGE_TOKEN}`
    }
  })
  .then(function (result) {
    return result.data.result
  })
}

function sendFrom (fromAccount, toAddress, amount) {
  return axios.post(DOGE_NODE_URL, {
    jsonrpc: '2.0',
    id: + new Date(),
    method: 'sendfrom',
    params: [fromAccount, toAddress, amount]
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${BASIC_AUTH_DOGE_TOKEN}`
    }
  })
  .then(function (result) {
    return result.data.result
  })
}

module.exports = {
  getAccountAddress,
  getBalance,
  move,
  sendFrom
}