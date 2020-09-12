const express = require('express');
const router = express.Router();

const formRouter = require('./form.routes')

router.use('/form', formRouter)

module.exports = router;
