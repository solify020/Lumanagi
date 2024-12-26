var express = require("express");
var router = express.Router();
const Web3 = require("web3");
const web3 = new Web3();
const ethUtil = require("ethereumjs-util");
const ethereum_address = require("ethereum-address");

web3.setProvider(
    new web3.providers.HttpProvider('https://bsc-dataseed1.binance.org:443')
);


var abi =[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"string","name":"hash","type":"string"},{"internalType":"string","name":"metadata","type":"string"}],"name":"awardItem","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"}]
//let contractAddress ='old  0x96A0EFE54eF96C7acE6F38060D89EFf8990C3da8';
// new 0x04bdfE82A5F1367688EC832f58Bf981F522dc9A3 



exports.mint = async (request, response) => {

  let fromAddress = request.body.from_address;
  let privateKey = request.body.from_private_key;
  let hash = request.body.hash;
  let contractAddress = request.body.contract_address;
  let to_address = request.body.to_address;
  let tokenMetaData = request.body.tokenMetaData;


  try {
    const bbal = await web3.eth.getBalance(fromAddress);

    if (bbal == "0") {
      response.status(400).json("You do not have insufficient balance");
    }

    const contract = await new web3.eth.Contract(abi, contractAddress);
    let count = await web3.eth.getTransactionCount(fromAddress);

    web3.eth.defaultAccount = fromAddress;


  
    const tx_builder = await contract.methods.awardItem(to_address,hash,tokenMetaData);

    let encoded_tx = tx_builder.encodeABI();

    let gasPrice = await web3.eth.getGasPrice();
    let gasLimit = 500000;
    let transactionObject = {
      nonce: web3.utils.toHex(count),
      from: fromAddress,
      gasPrice: web3.utils.toHex(gasPrice),
      gasLimit: web3.utils.toHex(gasLimit),
      to: contractAddress,
      data: encoded_tx,
      chainId: web3.utils.toHex(56),
    };

    


    // console.log('transaction ', transactionObject)
    web3.eth.accounts
      .signTransaction(transactionObject, privateKey)
      .then(async (signedTx) => {
          try{
            var newTokenID= await contract.methods.awardItem(to_address,hash,tokenMetaData).call();
            console.log('newTokenID',newTokenID)
          }catch(funErr){
              return response.status(400).json({
                msg: `Bad Request - Hash already exists`
                });
          }

        web3.eth.sendSignedTransaction(signedTx.rawTransaction, async function (
          err,
          hash
        ) {
          if (!err) {
            console.log("hash is : ", hash);
            return response.status(200).json({
              msg: "Transaction is in mining state. For more info please watch transaction hash on ropsten explorer",
              hash: hash,
              newTokenID:parseInt(newTokenID)
            });
          } else {
            return response.status(400).json({
              msg: `Bad Request ${err}`,
            });
          }
        });
      })
      .catch((err) => {
        return response.status(400).json({
          msg: `Your contract parameters are not correct:  ${err}`,
        });
      });
  } catch (e) {
    return response.status(400).json({
      msg: "invalid transaction signing",
      e,
      statuscode: 4,
    });
  }
}





exports.approve = async (request, response) => {

  let fromAddress = request.body.from_address;
  let privateKey = request.body.from_private_key;
  let tokenId = request.body.tokenId;
  let contractAddress = request.body.contract_address;
  let to_address = request.body.to_address;
  


  try {
    const bbal = await web3.eth.getBalance(fromAddress);

    if (bbal == "0") {
      response.status(400).json("You do not have insufficient balance");
    }

    const contract = await new web3.eth.Contract(abi, contractAddress);
    let count = await web3.eth.getTransactionCount(fromAddress);

    web3.eth.defaultAccount = fromAddress;
  
    const tx_builder = await contract.methods.approve(to_address,tokenId);

    let encoded_tx = tx_builder.encodeABI();

    let gasPrice = await web3.eth.getGasPrice();
    let gasLimit = 500000;
    let transactionObject = {
      nonce: web3.utils.toHex(count),
      from: fromAddress,
      gasPrice: web3.utils.toHex(gasPrice),
      gasLimit: web3.utils.toHex(gasLimit),
      to: contractAddress,
      data: encoded_tx,
      chainId: web3.utils.toHex(56),
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
            return response.status(200).json({
              msg: "Transaction is in mining state. For more info please watch transaction hash on ropsten explorer",
              hash: hash,
            });
          } else {
            return response.status(400).json({
              msg: `Bad Request ${err}`,
            });
          }
        });
      })
      .catch((err) => {
        return response.status(400).json({
          msg: `Your contract parameters are not correct:  ${err}`,
        });
      });
  } catch (e) {
    return response.status(400).json({
      msg: "invalid transaction signing",
      e,
      statuscode: 4,
    });
  }
}





exports.getApprove = async (request, response) => {
  let tokenId = request.body.tokenId;
  let contractAddress = request.body.contract_address;


  try {

    const contract = await new web3.eth.Contract(abi, contractAddress);
    const resData = await contract.methods.getApproved(tokenId).call();
    
      console.log(resData);
      return response.status(200).json({
        res:resData 
      });
  } catch (e) {
    return response.status(400).json({
      msg: "invalid transaction signing",
      e:e,
      statuscode: 4,
    });
  }
}




exports.ownerOf = async (request, response) => {
  let tokenId = request.body.tokenId;
  let contractAddress = request.body.contract_address;


  try {

    const contract = await new web3.eth.Contract(abi, contractAddress);
    const resData = await contract.methods.ownerOf(tokenId).call();
    
      console.log(resData);
      return response.status(200).json({
        res:resData 
      });
  } catch (e) {
    return response.status(400).json({
      msg: "invalid transaction signing",
      e:e,
      statuscode: 4,
    });
  }
}



exports.transfer = async (request, response) => {

  let fromAddress = request.body.from_address;
  let privateKey = request.body.from_private_key;
  let tokenId = request.body.tokenId;
  let contractAddress = request.body.contract_address;
  let to_address = request.body.to_address;
  


  try {
    const bbal = await web3.eth.getBalance(fromAddress);

    if (bbal == "0") {
      response.status(400).json("You do not have insufficient balance");
    }

    const contract = await new web3.eth.Contract(abi, contractAddress);
    let count = await web3.eth.getTransactionCount(fromAddress);

    web3.eth.defaultAccount = fromAddress;
    
    const tx_builder = await contract.methods.transferFrom(fromAddress,to_address,tokenId);

    let encoded_tx = tx_builder.encodeABI();

    let gasPrice = await web3.eth.getGasPrice();
    let gasLimit = 300000;
    let transactionObject = {
      nonce: web3.utils.toHex(count),
      from: fromAddress,
      gasPrice: web3.utils.toHex(gasPrice),
      gasLimit: web3.utils.toHex(gasLimit),
      to: contractAddress,
      data: encoded_tx,
      chainId: web3.utils.toHex(56),
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
            return response.status(200).json({
              msg: "Transaction is in mining state. For more info please watch transaction hash on ropsten explorer",
              hash: hash,
            });
          } else {
            return response.status(400).json({
              msg: `Bad Request ${err}`,
            });
          }
        });
      })
      .catch((err) => {
        return response.status(400).json({
          msg: `Your contract parameters are not correct:  ${err}`,
        });
      });
  } catch (e) {
    return response.status(400).json({
      msg: "invalid transaction signing",
      e,
      statuscode: 4,
    });
  }
}










exports.createWallet = async (request, response) => {

   try {

    const account =  web3.eth.accounts.create();
    console.log(account);

      return response.status(200).json({
        wallet:account 
      });
  } catch (e) {
    return response.status(400).json({
      msg: "something went wrong",
      e:e,
    });
  }
}


exports.getBalance = async (request, response) => {

    let address = request.body.address;
   try {

    const balance =  await web3.eth.getBalance(address);;
    console.log(balance);

      return response.status(200).json({
        balance:balance/1000000000000000000,
        currency:'BNB' 
      });
  } catch (e) {
    return response.status(400).json({
      msg: "something went wrong",
      e:e,
    });
  }
}
