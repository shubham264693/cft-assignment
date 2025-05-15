const express = require('express');
const router = express.Router();
const { addUser, login } = require('../controller/users');
const rateLimiter = require('../middleware/rateLimit')
const validate = require('../middleware/validator');
const { registerSchema, loginSchema } = require('../validators/userValidator');


router.post('/', validate(registerSchema), addUser);
router.post('/login', rateLimiter, validate(loginSchema), login);

module.exports = router;