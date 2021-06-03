const express = require('express')
const router = express.Router()

const userController = require('../controller/userController')

router.get('/getAllUsers', userController.getAllUsers)

router.post('/signup', userController.signup)

module.exports = router