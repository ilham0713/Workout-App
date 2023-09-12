const { response } = require('express')
const express = require('express')
const {
    createUser,
    getUser
} = require('../controllers/userController')



const router = express.Router()

// GET a user
router.get('/', getUser)

// POST a user
router.post('/', createUser)

module.exports = router
