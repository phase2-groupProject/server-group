const express = require('express')
const router = express.Router()
const user = require('../routes/user')
const movie = require('../routes/movie')
const authentication = require('../middlewares/authentication')

router.use('/user', user)
router.use(authentication)
router.use('/movie', movie)






module.exports = router;