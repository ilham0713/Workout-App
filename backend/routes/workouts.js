const { response } = require('express')
const express = require('express')
const {
    createWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController')


const router = express.Router()

// GET all workouts
router.get('/',getWorkouts)

// POST a new workout
router.post('/', createWorkout)

// DELETE a workout
router.delete('/', deleteWorkout)

// UPDATE a workout
router.patch('/', updateWorkout)

module.exports = router
