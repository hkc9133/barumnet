const router = require('express').Router()
const product = require('./product')
const auth = require('./auth')
const upload = require('./upload')
const email = require('./email')
const popup = require('./popup')

router.use('/product', product)
router.use('/auth', auth)
router.use('/upload', upload)
router.use('/email', email)
router.use('/popup', popup)


module.exports = router