const config = require('../config');
const mysql = require('mysql2');
const pool = mysql.createPool({ host: config.mysqlHost, user: config.user, password: process.env.DB_PASS || config.password, database: config.database, port: config.mysqlPort });
const promisePool = pool.promise();

class AdminModel {
    getwithdrawrequest = async (data) => {
        let sql = `SELECT * FROM withdraw_request   ORDER BY id DESC`;
        const [result, fields] = await promisePool.query(sql);

        return result;
    }

    approvewithdrawrequest = async (data) => {
        let sql = `UPDATE withdraw_request SET status=1 , hash = '${data.hash}' WHERE id='${data.id}' `;
        const [result, fields1] = await promisePool.query(sql);
        return result;
    }


    rejectwithdrawrequest = async (data) => {
        let sql = `UPDATE withdraw_request SET status=2 WHERE id='${data.request_id}'`;
        const [result, fields1] = await promisePool.query(sql);
        return result;
    }

    balanceupdate = async (data) => {
        let sql = `UPDATE users SET token_balance=token_balance+${data.token_amount} WHERE id=${data.user_id}`;
        const [result, fields1] = await promisePool.query(sql);
        return result;
    }

    
      getUserList = async (data) => {
        let sql = `SELECT id,address,referral_code,token_balance,MBUSD_balance,datetime FROM users WHERE is_admin=0 ORDER BY id DESC`;
        const [result, fields] = await promisePool.query(sql);

        return result;
    }

    getStakingDetail = async (data) => {
        let sql = `SELECT s.token_amount,s.staking_period_id,s.staking_percentage,s.staking_duration,s.reward_token,s.remaining_quantity,s.is_claim,s.status,u.address,s.created_date, sp.plan_name FROM staking as s LEFT JOIN users as u on u.id=s.user_id LEFT JOIN staking_period as sp on sp.id=s.staking_period_id ORDER BY s.created_date DESC`;
        const [result, fields] = await promisePool.query(sql);

        return result;
    }


    getStakingEarningDetail = async (data) => {
        let sql = `SELECT se.reward_token,se.is_claim,se.status,se.datetime,s.staking_period_id,u.address,s.staking_duration,s.token_amount,s.remaining_quantity,s.reward_token as perreward,sp.plan_name FROM staking_earning as se LEFT JOIN users as u on u.id=se.user_id LEFT JOIN staking as s on s.id=se.staking_id LEFT JOIN staking_period as sp on sp.id=s.staking_period_id ORDER BY se.id DESC`;
        const [result, fields] = await promisePool.query(sql);

        return result;
    }
   
    getdepositBUSDDetail = async (data) => {
        let sql = `SELECT address,from_address,to_address,hash,busd_amount,token,status, datetime  FROM transaction WHERE transaction_type_id=1 ORDER BY id DESC`;
        const [result, fields] = await promisePool.query(sql);

        return result;
    }
}

module.exports = new AdminModel;