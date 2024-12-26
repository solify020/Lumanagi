const { body, check } = require('express-validator');

exports.adminLoginSchema = [
    check('username')
        .not().isEmpty()
        .withMessage('Username is required'),
    check('password')
        .not().isEmpty()
        .withMessage('Password is required')
];

exports.changePasswordSchema = [
    check('currentPassword')
        .not().isEmpty()
        .withMessage('Current password is required'),
    check('newPassword')
        .not().isEmpty()
        .withMessage('New password is required')
        .isLength({ min: 6 })
        .withMessage('Password should be atleast six character!'),
    check('confirmPassword')
        .not().isEmpty()
        .withMessage('Confirm password is required'),      
];
exports.blogvalidation=[
  check('image')
  .not().isEmpty()
  .withMessage('Image is Required!!'),
  check('title')
  .not().isEmpty()
  .withMessage('Title is Required!!'),
  check('description')
  .not().isEmpty()
  .withMessage('Description Is Required'),  
];
exports.insertachieverSchema=[
    check('name')
    .not().isEmpty()
    .withMessage('Name is Required'),
    check('designation')
    .not().isEmpty()
    .withMessage('Designation is Required!'),
    check('bio')
    .not().isEmpty()
    .withMessage('Description Is Required'),
];