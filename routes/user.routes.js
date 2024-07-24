const express = require('express');
const { RegisterUser, LogUser, getUser } = require('../controller/user.controller');


let router = express.Router()

router.post('/register',RegisterUser)
router.post('/login',LogUser)
router.put('/edit/:pid',getUser)


module.exports = router 