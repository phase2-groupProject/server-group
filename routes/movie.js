const express = require('express')
const router = express.Router()
const movieController = require('../controller/movie')

router.post('/', movieController.getMovie)
// router.get('/:movie', (req,res) => res.send('xxx'))
router.get('/:name', movieController.getYoutube)


module.exports = router