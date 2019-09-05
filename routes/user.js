const express = require('express')
const router = express.Router()
const userController = require('../controller/user')

router.post('/signIn', userController.signIn)
router.post('/gsignIn', userController.GsignIn)
router.post('/register', userController.register)



module.exports = router;