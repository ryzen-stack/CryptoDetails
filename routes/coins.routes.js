const express = require('express');
const { Allcoins, Searchcoins } = require('../controller/coins.controller');
const auth = require('../helpers/auth');

let router = express.Router()

router.get('/getcoins',auth,Allcoins)
router.get('/searchcoins',auth,Searchcoins)


module.exports = router
