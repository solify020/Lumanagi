const UserModel = require('../models/user.model');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
let referralCodeGenerator = require('referral-code-generator');
const config = require('../config');
const userModel = require('../models/user.model');
const fetch = require('node-fetch')
const CryptoJS = require("crypto-js");
const ethUtil = require('ethereumjs-util');
const Web3 = require('web3');
var keySize = 256;
var iterations = 100;



const verifyWalletAddress = async (publicAddress, signature) => {
    try {
        var web3 = new Web3();
        let msg = web3.utils.fromUtf8("Login Quant Fund");
        const msgBuffer = await ethUtil.toBuffer(msg);

        const msgHash = ethUtil.hashPersonalMessage(msgBuffer);
        const signatureBuffer = ethUtil.toBuffer(signature);
        const signatureParams = ethUtil.fromRpcSig(signatureBuffer);
        const publicKey = ethUtil.ecrecover(
            msgHash,
            signatureParams.v,
            signatureParams.r,
            signatureParams.s
        );
        const addressBuffer = ethUtil.publicToAddress(publicKey);
        const address = ethUtil.bufferToHex(addressBuffer);

        // The signature verification is successful if the address found with
        // ecrecover matches the initial publicAddress
        if (address.toLowerCase() === publicAddress.toLowerCase()) {
            return {
                status: true,
            }
        } else {
            return {
                status: false,
                message: "Wallet signature verification failed!"
            }
        }
    } catch (err) {
        return {
            status: false,
            message: err.toString()
        }
    }
}





exports.userRegister = async (req, res) => {

    try {
        if (!req.body.address) {
            return res.status(200).send({
                success: false,
                msg: "Wallet address required!!"
            });
        }

        const varifyAddress = await verifyWalletAddress(req.body.address, req.body.signature);

        if (!varifyAddress.status) {
            return res.status(200).send({
                success: false,
                msg: varifyAddress.message
            });
        }

        let arrAddress = ['0x91db0dbd7ee9ea405852f65f044739c90cd076d5']
        for (let i = 0; i < arrAddress.length; i++) {

            if (arrAddress[i] == req.body.address) {
                return res.status(200).send({
                    success: false,
                    msg: "Your are block from admin Side!!"
                });
            }

        }

        let getUsersaddress = await UserModel.getUsersDetailsAddress(req.body);

        let saveUserDetails;
        if (getUsersaddress.length > 0) {
            const jwtToken = jwt.sign({
                id: getUsersaddress[0].id,
                address: getUsersaddress[0].address

            }, config.JWT_SECRET_KEY, {
                expiresIn: config.SESSION_EXPIRES_IN
            });
            return res.status(200).send({
                success: true,
                msg: "Login successfully!!",
                data: {
                    id: getUsersaddress[0].id,
                    address: getUsersaddress[0].address,
                    referral_code: getUsersaddress[0].referral_code,
                    authToken: jwtToken,
                    is_admin: getUsersaddress[0].is_admin,
                }
            });
        }
        else if (getUsersaddress.length == 0) {
            let referral_address = "";
            let referral_id = "";

            let referral_code = referralCodeGenerator.alphaNumeric('uppercase', 3, 2);
            if (req.body.referral_address) {
                referral_address = req.body.referral_address;

                let getRefUsersDetails = await UserModel.getUserDetailsByAddress(req.body.referral_address);

                if (getRefUsersDetails.length == 0) {
                    return res.status(200).send({
                        success: false,
                        msg: "Refferal code not valid please enter valid code!!"
                    });
                }
                referral_id = getRefUsersDetails[0].id;
            }
            req.body.referral_id = referral_id;
            req.body.referral_code = referral_code;
            saveUserDetails = await UserModel.saveUserAddressDetails(req.body);
            console.log("saveUserDetails", saveUserDetails.insertId)
            if (saveUserDetails) {
                const jwtToken = jwt.sign({
                    id: saveUserDetails.insertId,
                    address: req.body.address

                }, config.JWT_SECRET_KEY, {
                    expiresIn: config.SESSION_EXPIRES_IN
                });

                return res.status(200).send({
                    success: true,
                    msg: "User register successfully!!",
                    data: {
                        id: saveUserDetails.insertId,
                        address: req.body.address,
                        referral_code: req.body.referral_code,
                        authToken: jwtToken
                    }
                });
            } else {
                return res.status(200).send({
                    success: false,
                    msg: "Something went wrong please try again."
                });
            }
        }
    } catch (err) {
        // console.log('err',err)
        return res.status(200).send({
            success: false,
            msg: "User not registered due to internal error",
            err
        });
    }
}
















exports.getTransactionHistory = async (req, res) => {
    try {
        req.body.user_id = req.user_id
        let getTransactionDetail = await UserModel.getTransactionHistory(req.body);

        if (getTransactionDetail.length > 0) {

            return res.status(200).send({
                success: true,
                msg: "Get Transaction History !!",
                data: getTransactionDetail
            });
        } else {
            return res.status(200).send({
                success: false,
                msg: "No Data Found !!"
            });
        }

    } catch (err) {
        return res.status(200).send({
            success: false,
            msg: "User not registered due to internal error",
            err
        });
    }
}

exports.getWithdrawHistory = async (req, res) => {
    try {

        req.body.user_id = req.user_id;
        let getTransactionDetail = await UserModel.getwithdrawHistory(req.body);

        if (getTransactionDetail.length > 0) {

            return res.status(200).send({
                success: true,
                msg: "Get Withdraw History !!",
                data: getTransactionDetail
            });
        } else {
            return res.status(200).send({
                success: false,
                msg: "No Data Found !!"
            });
        }

    } catch (err) {
        return res.status(200).send({
            success: false,
            msg: "User not registered due to internal error",
            err
        });
    }
}


exports.getReferralUsersList = async (req, res) => {
    console.log('referral')
    try {

        let getUsersaddress = await UserModel.getReferralUsersList(req.body);
        //     let referral_address = "";

        if (getUsersaddress.length > 0) {


            return res.status(200).send({
                success: true,
                msg: "Referral List!!",
                data: getUsersaddress
            });
        } else {
            return res.status(200).send({
                success: false,
                msg: "Something went wrong please try again."
            });
        }

    } catch (err) {
        return res.status(200).send({
            success: false,
            msg: "User not registered due to internal error",
            err
        });
    }
}

exports.getPlanDetails = async (req, res) => {
    try {

        let getplandetail = await UserModel.getPlanDetails();
        //     let referral_address = "";

        if (getplandetail.length > 0) {


            return res.status(200).send({
                success: true,
                msg: "Plan List!!",
                data: getplandetail
            });
        } else {
            return res.status(200).send({
                success: false,
                msg: "Something went wrong please try again."
            });
        }

    } catch (err) {
        return res.status(200).send({
            success: false,
            msg: "User not registered due to internal error",
            err
        });
    }
}


exports.depositBUSD = async (req, res) => {
    try {
        req.body.user_id = req.user_id;
        req.body.address = req.address;
        req.body.from_address = req.address;
        req.body.to_address = config.clientDepositAddress;
        req.body.token = parseFloat(req.body.busd_amount) * 10;

        let checkHash = await UserModel.checkHash(req.body);
        if (checkHash.length > 0) {
            return res.status(403).send({
                success: false,
                msg: "Forbidden!!."
            });
        }

        let busdDeposit = await UserModel.saveDepositBUSDDetails(req.body);


        if (busdDeposit) {

            return res.status(200).send({
                success: true,
                msg: "Congratulations your deposit request is successful, once it will confirm by blockchain then the amount will reflect your wallet!!",
            });
        } else {
            return res.status(200).send({
                success: false,
                msg: "Something went wrong please try again."
            });
        }

    } catch (err) {
        return res.status(200).send({
            success: false,
            msg: "User not registered due to internal error",
            err
        });
    }
}


exports.addStaking = async (req, res) => {
    try {

        req.body.user_id = req.user_id;
        req.body.address = req.address;

        let checkPeriodId = await UserModel.checkPeriodId(req.body);
        let deductAmount = parseFloat(checkPeriodId[0].price) * req.body.quantity;
        req.body.token_amount = checkPeriodId[0].price;


        let checkBalance = await UserModel.checkBalanceFromStaking(req.body);
        if (parseFloat(deductAmount) > parseFloat(checkBalance[0].MBUSD_balance)) {
            return res.status(200).send({
                success: false,
                msg: "You don't have sufficient balance for buy Plan!"
            });
        } else {


            req.body.reward_token = checkPeriodId[0].token;
            let stakingDetail = await UserModel.addStaking(req.body);


            if (stakingDetail) {

                return res.status(200).send({
                    success: true,
                    msg: "Plan  Successfully Buy!!",
                });
            } else {
                return res.status(200).send({
                    success: false,
                    msg: "Something went wrong please try again."
                });
            }
        }
    } catch (err) {
        console.log('err', err)
        return res.status(200).send({
            success: false,
            msg: "User not registered due to internal error",
            err
        });
    }
}


exports.usersStakingIncome = async (db, req, res) => {
    console.log(" in usersStakingIncome");
    let data = await UserModel.usersStakingIncome();

}



exports.getStakingHistory = async (req, res) => {
    try {
        //
        req.body.user_id = req.user_id;
        let getStakingDetail = await UserModel.getstakingHistory(req.body);

        if (getStakingDetail.length > 0) {

            return res.status(200).send({
                success: true,
                msg: "Get Staking History !!",
                data: getStakingDetail
            });
        } else {
            return res.status(200).send({
                success: false,
                msg: "No Data Found !!"
            });
        }

    } catch (err) {
        return res.status(200).send({
            success: false,
            msg: "User not registered due to internal error",
            err
        });
    }
}




exports.SingalClaimReward = async (req, res) => {
    try {
        req.body.user_id = req.user_id;
        let rewardCheck = await UserModel.RewardClaimCheck(req.body);

        if (rewardCheck.length == 0) {
            return res.status(200).send({
                success: false,
                msg: "Something went wrong, Please try again later."
            });
        }

        if (rewardCheck[0].isClaimAvailable == 0) {
            return res.status(200).send({
                success: false,
                msg: "You need to wait sometime for claiming the reward!."
            });
        } else {


            let stakingQuantity = await UserModel.stakingQuantity(req.body);
            if (stakingQuantity.length == 0) {
                return res.status(200).send({
                    success: false,
                    msg: "Something went wrong, Please try again later."
                });
            }
            const myToken = parseFloat(stakingQuantity[0].reward_token) * parseFloat(stakingQuantity[0].remaining_quantity);
            if (myToken == 0) {
                return res.status(200).send({
                    success: false,
                    msg: "Reward token should be greater than zero!"
                });
            }

            req.body.token = myToken;
            let stakingDetail = await UserModel.SingalRewardClaim(req.body);


            if (stakingDetail) {

                return res.status(200).send({
                    success: true,
                    msg: "Claim Reward Successfully!!",
                });
            } else {
                return res.status(200).send({
                    success: false,
                    msg: "Something went wrong please try again."
                });
            }
        }
    } catch (err) {

        return res.status(200).send({
            success: false,
            msg: "Something went wrong please try again."
        });
    }
}

exports.SellPlan = async (req, res) => {
    try {
        req.body.user_id = req.user_id;

        let checkSellPlan = await UserModel.checkSellPlan(req.body);

        if (checkSellPlan.length == 0) {
            return res.status(200).send({
                success: false,
                msg: "Invalid staking details!",
            });
        }

        req.body.reward_token = parseFloat(checkSellPlan[0].reward_token) * parseFloat(checkSellPlan[0].remaining_quantity);

        let stakingDetail = await UserModel.SellPlan(req.body);


        if (stakingDetail) {

            return res.status(200).send({
                success: true,
                msg: "Sell Plan Successfully!!",
            });
        } else {
            return res.status(200).send({
                success: false,
                msg: "Something went wrong please try again."
            });
        }

    } catch (err) {
        console.log('err', err)
        return res.status(200).send({
            success: false,
            msg: "User not registered due to internal error",
            err
        });
    }
}

exports.getTotalBalance = async (req, res) => {
    try {
        req.body.user_id = req.user_id;
        let totalBalanceDetail = await UserModel.getTotalBalance(req.body);

        if (totalBalanceDetail.length > 0) {

            return res.status(200).send({
                success: true,
                msg: "Get Transaction History !!",
                data: totalBalanceDetail[0].total_balance,
                data1: totalBalanceDetail[0].MBUSD_total_balance

            });
        } else {
            return res.status(200).send({
                success: false,
                msg: "No Data Found !!"
            });
        }

    } catch (err) {
        return res.status(200).send({
            success: false,
            msg: "User not registered due to internal error",
            err
        });
    }
}

exports.getTotalInvested = async (req, res) => {
    try {

        let totalinvastedDetail = await UserModel.getTotalInvested();

        if (totalinvastedDetail.length > 0) {

            return res.status(200).send({
                success: true,
                msg: "Get Transaction History !!",
                data: totalinvastedDetail[0]

            });
        } else {
            return res.status(200).send({
                success: false,
                msg: "No Data Found !!"
            });
        }

    } catch (err) {
        return res.status(200).send({
            success: false,
            msg: "User not registered due to internal error",
            err
        });
    }
}



exports.WithdrawCrypto = async (req, res) => {
    try {

        req.body.user_id = req.user_id;
        req.body.withdrawal_address = req.address;

        let totalBalanceDetail = await UserModel.getTotalBalance(req.body);

        if (parseFloat(req.body.token) < 0) {
            return res.status(200).send({
                success: false,
                msg: "Amount not validate!!"
            });
        }

        if (parseFloat(req.body.token) > parseFloat(totalBalanceDetail[0].total_balance)) {
            return res.status(200).send({
                success: false,
                msg: "You don't have sufficient balance."
            });
        }

        const busd_amount = (parseFloat(req.body.token) * 0.000166) - 0.3;

        if (parseFloat(busd_amount) < 1) {
            return res.status(200).send({
                success: false,
                msg: "Mininmum withdraw amount : 10,000 Token (1 BUSD)"
            });
        }



        const response1 = await fetch(`http://blockchainexpert.co.in:7003/api/bep20/mainnet/transfer`, {
            method: 'POST', headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "from_address": process.env.WalletADDRESS, // from_address,
                "from_private_key": openWallet(process.env.WalletPRIVATEKEY),  //from_private_key,
                "to_address": req.body.withdrawal_address,
                "amount": busd_amount.toFixed(6),
                "contract_address": config.contractAddress //contractAddress
            })
        });



        const trx_hash = await response1.json();

        if (!trx_hash.hash) {
            return res.status(200).send({
                success: false,
                msg: "Something went wrong please try again."
            });
        } else {


            req.body.hash = trx_hash.hash;
            req.body.busd_amount = busd_amount;
            req.body.fee = 0.3;


            let busdDeposit = await UserModel.WithdrawCrypto(req.body);

            if (busdDeposit) {

                await UserModel.balanceupdate(req.body);
                return res.status(200).send({
                    success: true,
                    msg: "Congratulations Your Withdraw Successfully!!",
                });
            } else {
                return res.status(200).send({
                    success: false,
                    msg: "Something went wrong please try again."
                });
            }

        }
    } catch (err) {
        console.log(err)
        return res.status(200).send({
            success: false,
            msg: "User not registered due to internal error",
            err
        });
    }

}

function openWallet(code) {
    // console.log("code ", code);
    var salt = CryptoJS.enc.Hex.parse(code.substr(0, 32));
    var iv = CryptoJS.enc.Hex.parse(code.substr(32, 32))
    var encrypted = code.substring(64);
    var pass = process.env.EKEY;

    var key = CryptoJS.PBKDF2(pass, salt, {
        keySize: keySize / 32,
        iterations: iterations
    });

    //  console.log('keykey',key)

    var decrypted = CryptoJS.AES.decrypt(encrypted, key, {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC

    })
    //  console.log('decrypteddecrypted',decrypted)
    decrypted = decrypted.toString(CryptoJS.enc.Utf8);

    // console.log('decrypteddecrypted',decrypted)
    return decrypted;
}


exports.userBUSDDepositCheck = async (db, req, res) => {
    console.log(" in userBUSDDepositCheck");

    let data = await userModel.userBUSDDepositCheck();
    // await userModel.userBalanceUpdate

    if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            try {
                var web3 = new Web3(new Web3.providers.HttpProvider('https://bsc-dataseed.binance.org'));

                let newhash = await web3.eth.getTransactionReceipt(data[i].hash)
                const from = newhash.from; // jisne bhej
                const to = newhash.to; // busd
                const BUSDContract = '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56' //Mainnet
                // const BUSDContract ='0x98Ff86eD5B0dDd3C85115845A90A6066C25bedf91' //Testnet

                const clientAddress = await web3.eth.abi.decodeParameter('address', newhash.logs[0].topics[2]) // client desposit address
                let busdToken = await web3.eth.abi.decodeParameter('uint', newhash.logs[0].data) // token more then 0
                busdToken = parseInt(busdToken) / 10 ** 18;

                if (from.toUpperCase() == data[i].from_address.toUpperCase() && to.toUpperCase() == BUSDContract.toUpperCase() && clientAddress.toUpperCase() == data[i].to_address.toUpperCase()) {

                    let newData = {
                        busd_amount: busdToken,
                        token: busdToken * 10,
                        id: data[i].id,
                        user_id: data[i].user_id,
                        address: data[i].address
                    }
                    await userModel.userBalanceUpdate(newData)



                    let getUsersaddress = await UserModel.getUsersAddress(newData);

                    if (getUsersaddress[0].referral_id > 0) {
                        let getReferralUser = await UserModel.getReferralUser(getUsersaddress[0].referral_id);
                        // req.body.user_id = getReferralUser[0].id;
                        // req.body.address = getReferralUser[0].address
                        // req.body.referred_by = getUsersaddress[0].id

                        let refTransaction = {
                            user_id: getReferralUser[0].id,
                            address: getReferralUser[0].address,
                            referred_by: getUsersaddress[0].id,
                            busd_amount: busdToken,
                            token: parseFloat(busdToken * 10)
                        }

                        await UserModel.saveReferralIncome(refTransaction);
                        let Reftoken = parseFloat((busdToken * 10) * 5 / 100)
                        //  req.body.token =ref_amount *6000;
                        let newToken = {
                            token: Reftoken,
                            user_id: getReferralUser[0].id
                        }

                        await UserModel.addbalance(newToken);

                    }


                } else {
                    console.log('datasdsdsds', data[i].id)
                    let newData = {
                        id: data[i].id
                    }

                    await userModel.userBalanceRejct(newData)

                }

            } catch (err) {
                let newData = {
                    id: data[i].id
                }
                await userModel.userBalanceRejct(newData)
            }
        }
    }
    return;



}