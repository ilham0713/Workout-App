const User = require('../models/usermodel')
const mongoose = require('mongoose')


// get a single user
const getUser = async(req, res) => {
    // HTTP GET request gives username and password
    const username = req.query.username
    const password = req.query.password
    // Retrieves a user with the given username and password, if present
    const user = await User.findOne( { username : username, password : password } )
    
    if (!user) {
        return res.status(404).json({error: 'No user found'})
    }

    res.status(200).json(user)
}

// create a new user
const createUser = async (req, res) => {
    const {username, password} = req.body
    // Add user to the db
    try {
        const user =  await User.create( { username : username, password : password } )
        console.log('Successfully created user')
        res.status(200).json(user)
    } catch(error) {
        console.log(error.message)
        res.status(400).json({error: error.message})
    }

}


module.exports = {
    createUser,
    getUser
}
