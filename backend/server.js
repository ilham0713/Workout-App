require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/users')

const port = 3001

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})


// routes
app.use('/api/workouts',workoutRoutes)
app.use('/api/users',userRoutes)

// connect to database
mongoose.connect("mongodb://127.0.0.1:27017/workouts")
    .then(() => {
        // listen for requests
        app.listen(3001, () => {
            console.log('connected to db, listening on port 3001')
        })
    })
    .catch((error) => {
        console.log(error)
    })
