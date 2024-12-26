const { check } = require('express-validator');

exports.withdrawSchema = [
    check('tokenAmount')
        .not().isEmpty()
        .withMessage('Token field is required.')
        .isFloat( { gt : 99} )
        // .withMessage('Token should be greater than or equal to 100.')
];
