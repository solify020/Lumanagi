const { body, check } = require('express-validator');

exports.submitStackingSchema = [
    check('wallet')
        .not().isEmpty()
        .withMessage('Wallet is required'),
    check('amount')
        .not().isEmpty()
        .withMessage('Token amount is required')
        .notEmpty()
        .isFloat({ gt:0})
        .withMessage('Token amount should be greater then 0'),
    check('period')
        .not().isEmpty()
        .withMessage('Stacking period is required')
];