const router = require('express').Router()
const controller = require('./product.controller')

router.get('/', controller.getProduct)

module.exports = router