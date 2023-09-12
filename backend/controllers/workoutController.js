// includes
const Workout = require( '../models/workoutmodel' )
const mongoose = require( 'mongoose' )

// Gets all workouts for current user. If a title is given, only gets workouts with given title.
// HTTP GET /api/workouts?username=[username]&title=[title]
const getWorkouts = async( req, res ) => {

    // pull username from query
    const username = req.query.username

    const title = req.query.title
    
    if (title=="") {
        // if a title is given, pull workouts with title. Otherwise, pull all workouts for user
        await Workout.find( { username : username }, function(err, workouts)
        {
            if (err) {
                return res.status(404).json( { error: 'No such workout, dummy' } )
            } else {
                return res.status(200).json( workouts )
            }
        })
    } else {
        await Workout.find( { username : username, title : {$regex : title} }, function(err, workouts)
        {
            if (err) {
                return res.status(404).json( { error: 'No such workout, dummy' } )
            } else {
                return res.status(200).json( workouts )
            }
        })
    }
}

// Creates a new workout with the given specifications
// HTTP POST /api/workouts
// JSON FORMAT:
//    {
//      "username" : [username],
//      "title" : [title],
//      "load" : [load],
//      "reps" : [reps]
//    }
const createWorkout = async ( req, res ) => {
    
    // pull json data from request
    const { username, title, load, reps } = req.body
    console.log(username)
    // Add workout to the db
    const workout =  await Workout.create( {
        username : username,
        title : title,
        load : load,
        reps : reps
    } )
    console.log("successfully created")
    // respond with new workout
    res.status(200).json( workout )
}

// Creates a new workout with the given specifications
// HTTP POST /api/workouts
// JSON FORMAT:
//    {
//      "_id" : [username]
//    }
const deleteWorkout = async(req, res) => {

    // pull json data from request
    const { _id } = req.body

    // ensure id is a valid id token before sending to mongod
    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({error: 'No such workout, dummy'})
    }
    
    // remove workout from db
    const workout = await Workout.findOneAndDelete( { _id : _id } )
    
    // respond with 404 if no workouts found
    if(!workout){
        return res.status(404).json( { error: 'No such workout, dummy' } )
    }

    // respond with deleted workout
    res.status(200).json(workout)
}

// Creates a new workout with the given specifications
// HTTP POST /api/workouts
// JSON FORMAT:
//    {
//      "_id" : [id]
//      "title" : [title],
//      "load" : [load],
//      "reps" : [reps]
//    }
const updateWorkout = async(req, res) => {

    // pull json data from request
    const { _id, title, reps, load } = req.body

    // ensure id is a valid id token before sending to mongod
    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({error: "ID " + _id + " is invalid."})
    }

    // update workout in db
    const workout = await Workout.findOneAndUpdate( { _id : _id }, {
        title : title,
        reps : reps,
        load : load
    })

    // respond with 404 if no workout found
    if(!workout){
        return res.status(404).json({error: 'Oopsie'})
    }

    // respond with OLD WORKOUT, NOT UPDATED
    res.status(200).json(workout)

}

module.exports = {
    createWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout
}
