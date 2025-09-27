import { body, validationResult } from 'express-validator';

// Validation rules
const signupValidation = [
  body('email')
    .isEmail().withMessage('Invalid email format'),

  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

// Common validation handler
const validate = (req, res, next) => {
    console.log('validton -> ', req.body)
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export { signupValidation, validate };
