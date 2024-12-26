var express = require("express");
var router = express.Router();
const Web3 = require("web3");
const web3 = new Web3();
const ethUtil = require("ethereumjs-util");
const ethereum_address = require("ethereum-address");
const request = require("request");
const { response } = require("express");
var fetch = require('node-fetch');
web3.setProvider(
  new web3.providers.HttpProvider(
    // "wss://data-prebsc-1-s2.binance.org:8546"
    "https://data-seed-prebsc-1-s1.binance.org:8545"
  )
);


var abi = [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "unpause", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "account", "type": "address" }, { "name": "amount", "type": "uint256" }], "name": "mint", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_value", "type": "uint256" }], "name": "burn", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "paused", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_subtractedValue", "type": "uint256" }], "name": "decreaseApproval", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "balance", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "listAddress", "type": "address" }, { "name": "isBlackListed", "type": "bool" }], "name": "blackListAddress", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "pause", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_addedValue", "type": "uint256" }], "name": "increaseApproval", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "name": "_name", "type": "string" }, { "name": "_symbol", "type": "string" }, { "name": "_decimals", "type": "uint256" }, { "name": "_supply", "type": "uint256" }, { "name": "tokenOwner", "type": "address" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Mint", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "burner", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Burn", "type": "event" }, { "anonymous": false, "inputs": [], "name": "Pause", "type": "event" }, { "anonymous": false, "inputs": [], "name": "Unpause", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "previousOwner", "type": "address" }, { "indexed": true, "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "blackListed", "type": "address" }, { "indexed": false, "name": "value", "type": "bool" }], "name": "Blacklist", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "owner", "type": "address" }, { "indexed": true, "name": "spender", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }]
//let contractAddress ='old  0x96A0EFE54eF96C7acE6F38060D89EFf8990C3da8';
// new 0x04bdfE82A5F1367688EC832f58Bf981F522dc9A3 

exports.addressCheck = async (request, response) => {
  let address = request.params.address;
  var status = web3.utils.isAddress(address);

  return response.status(200).json({
    status: status
  });
}

exports.transfer = async (data) => {
   let fromAddress = data.from_address;
  let privateKey = data.from_private_key;
  let amount = data.amount;
  let contractAddress = data.contract_address;
  let to_address = data.to_address;

  var tokenValue = web3.utils.toWei(amount.toString(), "ether");
console.log('DATA',data)
  try {
    const bbal = await web3.eth.getBalance(fromAddress);
    if (bbal == "0") {
      response.status(400).json("You have insufficient balance");
    }

    const contract = await new web3.eth.Contract(abi, contractAddress);

    let decimals = await contract.methods.decimals().call();
    let token = await contract.methods.balanceOf(fromAddress).call();
    if (token / (10 ** decimals) < amount) {
      return response.status(400).json({
        msg: `You have insufficient token balance`,
      });
    }

    let count = await web3.eth.getTransactionCount(fromAddress);
    web3.eth.defaultAccount = fromAddress;

    const tx_builder = await contract.methods.transfer(to_address, tokenValue.toString());

    let encoded_tx = tx_builder.encodeABI();

    let gasPrice = await web3.eth.getGasPrice();
    // var gasLimit = 600000
    let gasLimit = await web3.eth.estimateGas({
      from: fromAddress,
      nonce: web3.utils.toHex(count),
      gasPrice: web3.utils.toHex(gasPrice),
      to: contractAddress,
      data: encoded_tx,
      chainId: web3.utils.toHex(97),
    });
    // if(gasLimit < 54872){
    //   gasLimit = 550000;
    // }
    console.log(gasLimit, gasPrice)
    let transactionObject = {
      nonce: web3.utils.toHex(count),
      from: fromAddress,
      gasPrice: web3.utils.toHex(gasPrice),
      gasLimit: web3.utils.toHex(gasLimit),
      to: contractAddress,
      data: encoded_tx,
      chainId: web3.utils.toHex(97),
    };
    // console.log('transaction ', transactionObject)
    web3.eth.accounts
      .signTransaction(transactionObject, privateKey)
      
      .then((signedTx) => {
        web3.eth.sendSignedTransaction(signedTx.rawTransaction, async function (
          err,
          hash
        ) {
          if (!err) {
            console.log("hash is : ", hash);
          return hash;
            // return response.status(200).json({
            //   msg: "Transaction is in mining state. For more info please watch transaction hash on ropsten explorer",
            //   hash: hash,
            // });
          } else {
            return `Bad Request ${err}` 
            // response.status(400).json({
            //   msg: `Bad Request ${err}`,
            // });
          }
        });
      })
      .catch((err) => {
        console.log('e',err)
        // return response.status(400).json({
        //   msg: `Your contract parameters are not correct:  ${err}`,
        // });
      });

  } catch (e) {
    console.log('e',e)
    // return response.status(400).json({
    //   msg: "invalid transaction signing",
    //   e,
    //   statuscode: 4,
    // });
  }
}



exports.getTokenBalance = async (request, response) => {

  let address = request.body.address;
  let contractAddress = request.body.contract_address;
  try {

    const contract = await new web3.eth.Contract(abi, contractAddress);
    let decimals = await contract.methods.decimals().call();
    let token = await contract.methods.balanceOf(address).call();
    return response.status(200).json({
      balance: token / 10 ** decimals,
    });
  } catch (e) {
    return response.status(400).json({
      msg: "something went wrong",
      e: e,
    });
  }
}







exports.createWallet = async (request, response) => {
  // const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
  // const loader = setupLoader({ provider: web3 }).web3;

  try {

    const account = web3.eth.accounts.create();
    console.log(account);

    return response.status(200).json({
      wallet: account
    });
  } catch (e) {
    return response.status(400).json({
      msg: "something went wrong",
      e: e,
    });
  }
}


exports.getBalance = async (request, response) => {

  let address = request.params.address;
  try {

    const balance = await web3.eth.getBalance(address);;
    console.log(balance);

    return response.status(200).json({
      balance: balance / 1000000000000000000,
      currency: 'BNB'
    });
  } catch (e) {
    return response.status(400).json({
      msg: "something went wrong",
      e: e,
    });
  }
}




exports.getTransactionByAddress = async (request, response) => {

  let fromAddress = request.body.from_address;
  let to_address = request.body.to_address;
  let amount = request.body.amount;
  console.log(request.body)
  try {
    var reqData =  {"query":"query MyQuery {\n  ethereum(network: bsc_testnet) {\n    transactions(\n      options: {limit: 10, desc: \"block.timestamp.time\"}\n      amount: {is: "+amount+"}\n    ) {\n      success(success: true)\n      sender(txSender: {is: \""+fromAddress+"\"}) {\n        address\n      }\n      to(txTo: {is: \""+to_address+"\"}) {\n        address\n      }\n      amount\n      gasValue\n      gas\n      gasPrice\n      hash\n      block {\n        timestamp {\n          time\n        }\n      }\n      currency {\n        symbol\n      }\n    }\n  }\n}\n","variables":"{}"};
    var resData =await fetch("https://graphql.bitquery.io/", {
      method: 'POST', headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        reqData
      )
    });
    const resData1 = await resData.json();
    
    var transactions = resData1.data.ethereum.transactions;
    return response.status(200).json({
      transactions
    });
  } catch (e) {
    return response.status(400).json({
      msg: "something went wrong",
      e: e,
    });
  }
}
