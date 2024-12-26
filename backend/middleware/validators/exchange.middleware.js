const { body, check } = require('express-validator');

exports.ticketSchema = [
    check('title')
        .not().isEmpty()
        .withMessage('title is required'),
    check('reason')
        .not().isEmpty()
        .withMessage('reason is required')
];