const express = require('express');

const router = express.Router();
const UserRouter = require('./users');

router.use('/user',UserRouter);


module.exports = router;