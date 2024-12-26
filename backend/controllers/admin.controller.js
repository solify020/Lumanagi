const AdminModel = require('../models/admin.model');
const { validationResult } = require('express-validator');

let referralCodeGenerator = require('referral-code-generator');
const config = require('../config');


exports.getwithdrawrequest = async (req, res) => {
    try {
        //
        let getwithdrawrequest = await AdminModel.getwithdrawrequest(req.body);

        if (getwithdrawrequest.length > 0) {

            return res.status(200).send({
                success: true,
                msg: "Withdraw History !!",
                data: getwithdrawrequest
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
            msg: "Internal error",
            err
        });
    }
}

exports.approvewithdrawrequest = async (req, res) => {
    try {
        let approvewithdrawrequest = await AdminModel.approvewithdrawrequest(req.body);
        if (approvewithdrawrequest) {
            return res.status(200).send({
                success: true,
                msg: "Withdraw Request submit  Successfully!!",
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
            msg: "Internal error",
            err
        });
    }
}

exports.rejectwithdrawrequest = async (req, res) => {
    try {
        console.log(req.body);
        let rejectwithdrawrequest = await AdminModel.rejectwithdrawrequest(req.body);
        if (rejectwithdrawrequest) {
            await AdminModel.balanceupdate(req.body);
            return res.status(200).send({
                success: true,
                msg: "Withdraw Request reject Successfully!!",
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
            msg: "Internal error",
            err
        });
    }
}




exports.getUserList = async (req, res) => {
    try {
        //
        let userList = await AdminModel.getUserList(req.body);

        if (userList.length > 0) {

            return res.status(200).send({
                success: true,
                msg: "User List Detail !!",
                data: userList
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
            msg: "Internal error",
            err
        });
    }
}



exports.getStakingDetail = async (req, res) => {
    try {
        //
        let stakingDetail = await AdminModel.getStakingDetail(req.body);

        if (stakingDetail.length > 0) {

            return res.status(200).send({
                success: true,
                msg: "Staking Detail !!",
                data: stakingDetail
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
            msg: "Internal error",
            err
        });
    }
}


exports.getStakingEarningDetail = async (req, res) => {
    try {
        //
        let stakingEarningDetail = await AdminModel.getStakingEarningDetail(req.body);

        if (stakingEarningDetail.length > 0) {

            return res.status(200).send({
                success: true,
                msg: "Staking Earning Detail !!",
                data: stakingEarningDetail
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
            msg: "Internal error",
            err
        });
    }
}


exports.getdepositBUSDDetail = async (req, res) => {
    try {
        //
        let depositBUSDDetail = await AdminModel.getdepositBUSDDetail(req.body);

        if (depositBUSDDetail.length > 0) {

            return res.status(200).send({
                success: true,
                msg: "Deposit BUSD Detail !!",
                data: depositBUSDDetail
            });
        } else {
            return res.status(200).send({
                success: false,
                msg: "No Data Found !!"
            });
        }

    } catch (err) {
        console.log('err',err)
        return res.status(200).send({
            success: false,
            msg: "Internal error",
            err
        });
    }
}