const router = require('express').Router()
const controller = require('./email.controller')

router.post('/send', controller.sendEamil)

module.exports = router