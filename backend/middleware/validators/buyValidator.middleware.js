const { check } = require('express-validator');

exports.buyTokenSchema = [
    check('amount')
        .not().isEmpty()
        .withMessage('BNB Amount field is required.')
        .isFloat( { gt : 0} )
        .withMessage('BNB amount should be greater than 0'),

        check('token')
        .not().isEmpty()
        .withMessage('Token field is required.')
        .isFloat( { gt : 0} )
        .withMessage('Token should be greater than 0'),

        check('transactionHash')
        .not().isEmpty()
        .withMessage('Transaction failed')
];
