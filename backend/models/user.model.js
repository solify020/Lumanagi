
const config = require('../config');
const mysql = require('mysql2');
const pool = mysql.createPool({ host: config.mysqlHost, user: config.user, password: process.env.DB_PASS || config.password, database: config.database, port: config.mysqlPort });
const promisePool = pool.promise();

class UserModel {

    getUsersDetailsAddress = async (data) => {
        let sql = `SELECT * FROM users where address = '${data.address}'`;
        const [result, fields] = await promisePool.query(sql);

        return result;
    }

    getUserDetailsByAddress = async (referral_code) => {
        let sql = `SELECT * FROM users where referral_code = '${referral_code}'`;
        const [result, fields] = await promisePool.query(sql);

        return result;
    }


    getUsersAddress = async (data) => {
        let sql = `SELECT * FROM users where address = '${data.address}'`;
        const [result, fields] = await promisePool.query(sql);

        return result;
    }

    checkBalanceFromStaking = async (data) => {
        // console.log('getUsersAddress123data', data);

        let sql = `SELECT * FROM users WHERE id = ${data.user_id}`;
        const [result, fields] = await promisePool.query(sql);

        return result;
    }


    saveUserAddressDetails = async (data) => {
        let date = new Date()
        let sql = `INSERT INTO users (address,referral_code,referral_id,is_admin) VALUES('${data.address}','${data.referral_code}','${data.referral_id}', '0')`;
        const [result, fields] = await promisePool.query(sql);

        return result;
    }

    savereferraltransaction = async (data, address) => {
        let date = new Date()
        let ref_balance = parseFloat(data.amount * 5 / 100).toFixed(2)
        let sql = `INSERT INTO referral_transaction(address, to_address,amount,ref_balance,percentage,datetime) VALUES('${data.address}','${address}','${data.amount}','${ref_balance}','5', '${date}')`;
        const [result, fields] = await promisePool.query(sql);

        return result;
    }



    getPlanDetails = async () => {
        let sql = `SELECT *  FROM staking_period ORDER BY id ASC`;
        const [result, fields] = await promisePool.query(sql);

        return result;
    }

    checkHash = async (data) => {
        let sql = `SELECT id from transaction WHERE upper(hash)=upper('${data.hash}')`;
        const [result, fields] = await promisePool.query(sql);
        return result;
    }

    saveDepositBUSDDetails = async (data) => {

        let sql = `INSERT INTO transaction (user_id,address,from_address,to_address,hash,busd_amount,token,transaction_type_id,status) VALUES    ('${data.user_id}','${data.address}','${data.from_address}','${data.to_address}','${data.hash}','${data.busd_amount}','${data.token}','1','1')`;
        const [result, fields] = await promisePool.query(sql);

        return result;
    }


    checkBalanceFromStaking = async (data) => {
        // console.log('getUsersAddress123data', data);

        let sql = `SELECT * FROM users WHERE id = ${data.user_id}`;
        const [result, fields] = await promisePool.query(sql);

        return result;
    }



    checkPeriodId = async (data) => {
        // console.log('getUsersAddress123data', data);
        let sql = `select id,price,duration,token from staking_period where id = ${data.staking_period_id}`;
        const [result, fields] = await promisePool.query(sql);
        return result;
    }

    stakingQuantity = async (data) => {
        // console.log('getUsersAddress123data', data);
        let sql = `SELECT id, reward_token, remaining_quantity FROM staking WHERE id = ${data.staking_id} AND staking_period_id = ${data.staking_period_id} AND user_id = ${data.user_id}`;
        const [result, fields] = await promisePool.query(sql);
        return result;
    }


    addStaking = async (data) => {

        let sql = `INSERT INTO staking (user_id,token_amount,busd_amount,staking_period_id,staking_duration,staking_percentage,reward_token,trx_hash,is_claim,status,quantity,remaining_quantity) VALUES('${data.user_id}','${data.token_amount}','${data.busd_amount}','${data.staking_period_id}', '${data.staking_duration}','${data.staking_percentage}','${data.reward_token}',
        '${data.hash}','1','1',${data.quantity},${data.quantity})`;
        const [result, fields] = await promisePool.query(sql);


        let sql1 = `INSERT INTO transaction (user_id,address,staking_id,from_address,to_address,hash,busd_amount,token,transaction_type_id,status) VALUES    ('${data.user_id}','${data.address}','${result.insertId}','${data.from_address}','${data.to_address}','${data.hash}','${data.busd_amount}','${data.token_amount}','9','1')`;
        const [result1, fields1] = await promisePool.query(sql1);

        let MBUSD_balance = parseFloat(data.token_amount * data.quantity)
        console.log('result1', MBUSD_balance, data.token_amount, data.quantity)

        let sql2 = `UPDATE users SET MBUSD_balance=MBUSD_balance-'${MBUSD_balance}' WHERE id=${data.user_id}`;
        const [result2, fields2] = await promisePool.query(sql2);

        return result;
    }




    saveReferralIncome = async (data) => {
        let newToken = parseFloat(data.token * 5 / 100);
        let sql = `INSERT INTO transaction (user_id,address,referred_by,busd_amount,token,referral_level,referral_trx_id,referral_percent,transaction_type_id,status) VALUES    ('${data.user_id}','${data.address}','${data.referred_by}','${data.busd_amount}','${newToken}','1','${data.referred_by}','5','4','1')`;
        const [result, fields] = await promisePool.query(sql);

        return result;
    }

    getReferralUser = async (data) => {
        let sql = `SELECT *  FROM users where id=${data} ORDER BY id ASC`;
        const [result, fields] = await promisePool.query(sql);

        return result;
    }

    getTransactionHistory = async (data) => {
        let sql = `SELECT *  FROM transaction where user_id=${data.user_id} and transaction_type_id=1 ORDER BY id DESC`;
        const [result, fields] = await promisePool.query(sql);


        return result;
    }

    getwithdrawHistory = async (data) => {
        let sql = `SELECT w.*,u.address  FROM withdraw_request as w LEFT JOIN users as u on u.id=w.user_id WHERE w.user_id=${data.user_id} ORDER BY id DESC`;
        const [result, fields] = await promisePool.query(sql);

        return result;
    }

    getstakingHistory = async (data) => {
        let sql = `SELECT *,COALESCE(totalReward(${data.user_id},id),0) as totalreward,DATE_ADD(created_date, INTERVAL 1 DAY) as unstakeDate,getRemeiningSeconds(id) as remaining_second FROM staking WHERE user_id=${data.user_id}  ORDER BY id DESC;`;

        const [result, fields] = await promisePool.query(sql);

        return result;
    }



    usersStakingIncome = async () => {
        let sql = `insert into staking_earning (staking_id,user_id,staking_period_id,reward_token,is_claim,status)SELECT id,user_id,staking_period_id,reward_token*remaining_quantity,is_claim,status FROM staking where status=1 and is_claim=1 `;
        console.log(sql);
        const [result, fields] = await promisePool.query(sql);

        return result;
    }


    RewardClaimCheck = async (data) => {
        let sql = `SELECT se.datetime,s.created_date,case when date_add(COALESCE(se.datetime,s.created_date),INTERVAL 24 HOUR)<now() then 1 else 0 end as isClaimAvailable FROM staking as s left join staking_earning as se on se.staking_id=s.id where s.user_id='${data.user_id}' and s.id='${data.staking_id}' and s.staking_period_id='${data.staking_period_id}' order by s.id desc,se.id desc limit 1`

        const [result, fields] = await promisePool.query(sql);

        return result;
    }

    SingalRewardClaim = async (data) => {

        let sql = `insert into staking_earning (staking_id,user_id,staking_period_id,reward_token,is_claim,status) VALUES ('${data.staking_id}','${data.user_id}','${data.staking_period_id}','${data.token}','1','1')`;


        // let sql = `UPDATE staking_earning SET is_claim=0 WHERE user_id=${data.user_id} and staking_id=${data.staking_id}`;

        let sql1 = `UPDATE users SET token_balance=COALESCE(token_balance,0)+${parseFloat(data.token)} WHERE id=${data.user_id}`;

        const [result1, fields1] = await promisePool.query(sql1);

        const [result, fields] = await promisePool.query(sql);

        return result;
    }




    addbalance = async (data) => {

        let sql = `UPDATE users SET MBUSD_balance=MBUSD_balance+${data.token} WHERE id=${data.user_id}`;

        const [result, fields] = await promisePool.query(sql);

        return result;
    }

    checkSellPlan = async (data) => {
        let sql = `SELECT id,reward_token,remaining_quantity FROM staking WHERE user_id = ${data.user_id} AND id = ${data.staking_id} AND staking_period_id = ${data.staking_period_id}  AND status = 1 AND date(created_date) < CURRENT_DATE `;
        console.log(sql,data)
        const [result, fields1] = await promisePool.query(sql);
        return result;
    }

    SellPlan = async (data) => {
        let newToken = (data.reward_token * 14)

        let sql = `UPDATE staking SET is_claim=0,status=0,plan_sell_date = now() WHERE user_id=${data.user_id} and id=${data.staking_id}`;

        let sql1 = `UPDATE users SET token_balance =COALESCE(token_balance,0) +${parseFloat(newToken)} WHERE id=${data.user_id}`;

        const [result1, fields1] = await promisePool.query(sql1);

        const [result, fields] = await promisePool.query(sql);

        return result;
    }


    getTotalBalance = async (data) => {
        let sql = `SELECT COALESCE(sum(token_balance),0) as total_balance,COALESCE(sum(MBUSD_balance),0) as MBUSD_total_balance FROM users WHERE id=${data.user_id}  ORDER BY id DESC`;
        const [result, fields] = await promisePool.query(sql);

        return result;
    }


    insertWithdrawRequest = async (data) => {
        let sql = `INSERT INTO withdraw_request (user_id,withdrawal_address,token,busd_amount,status) VALUES ('${data.user_id}','${data.withdrawal_address}','${data.token}','${data.busd_amount}','0')`;
        const [result, fields] = await promisePool.query(sql);

        return result;
    }

    WithdrawCrypto = async (data) => {
        let sql = `INSERT INTO withdraw_request (user_id,withdrawal_address,token,busd_amount,fee,hash,status) VALUES ('${data.user_id}','${data.withdrawal_address}','${data.token}','${data.busd_amount}','${data.fee}','${data.hash}','1')`;
        const [result, fields] = await promisePool.query(sql);

        return result;
    }

    balanceupdate = async (data) => {
        let sql = `UPDATE users SET token_balance=COALESCE(token_balance,0) - ${parseFloat(data.token)} WHERE id=${data.user_id}`;
        const [result, fields1] = await promisePool.query(sql);
        return result;
    }

    getReferralUsersList = async (data) => {
        let sql = `SELECT u.id as referral_user,u.address,u.datetime,COALESCE(sum(t.token),0) as token FROM users as u left join transaction as t on t.referred_by=u.id where u.referral_id=${data.user_id} GROUP BY u.id,u.address`;
        const [result, fields] = await promisePool.query(sql);

        return result;
    }



    getTotalInvested = async () => {
        let sql = `SELECT COALESCE(sum(case when transaction_type_id=1 AND isblockchainConfirm = 1 then busd_amount else 0 end),0) as invested,(select COALESCE(COUNT(address),0) from users) as investors,(select COALESCE(sum(reward_token),0) from staking_earning) as reward FROM transaction`;
        const [result, fields] = await promisePool.query(sql);

        return result;
    }

    userBalanceUpdate = async (data) => {
        let sql1 = `UPDATE  transaction SET busd_amount = ${data.busd_amount} , token = ${data.token} , isblockchainConfirm=1 WHERE id=${data.id} AND transaction_type_id=1 `;

        const [result1, fields1] = await promisePool.query(sql1);

        let sql2 = `UPDATE users SET MBUSD_balance=COALESCE(MBUSD_balance,0)+${data.token} WHERE id=${data.user_id}`
        const [result2, fields] = await promisePool.query(sql2);


        return result1;
    }

    userBalanceRejct = async (data) => {

        let sql1 = `UPDATE  transaction SET isblockchainConfirm=2 WHERE id=${data.id} `;

        const [result1, fields1] = await promisePool.query(sql1);


        return result1;
    }

    userBUSDDepositCheck = async () => {
        let sql = `SELECT * FROM transaction WHERE transaction_type_id=1 and  isblockchainConfirm=0`;
        // console.log(sql);
        const [result, fields] = await promisePool.query(sql);

        return result;
    }
}

module.exports = new UserModel;