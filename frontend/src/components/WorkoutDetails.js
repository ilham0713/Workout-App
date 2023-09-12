import { useState, } from "react"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
const WorkoutDetails = ({workout}) => {

    const [visible, setVisible] = useState(true);

    const handleDelete = async (e) => {
        e.preventDefault()
        // Delete Workout
        const response = await fetch('api/workouts', {
            method: 'DELETE',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type' : 'application/json'
            }
        })

        const json = await response.json()

        if(!response.ok)
        {
            console.log("Cannot Delete.")
        }

        // Set state for updated data
        else
        {
            console.log("Delete Successful. Reloading Components...")
            window.location.reload()
        }
    }
    
    const handleUpdate = async (e) => {

        console.log("we here")
      
        console.log(workout._id)
        console.log(e.target.title.value)
        console.log(e.target.load.value)
        console.log(e.target.reps.value)
        
        const response = await fetch('api/workouts', {
            method: 'PATCH',
            body: JSON.stringify({
                "_id" : workout._id,
                "title" : e.target.title.value,
                "load" : e.target.load.value,
                "reps" : e.target.reps.value
            }),
            headers: {
                'Content-Type' : 'application/json'
            }
        })

        const json = await response.json()

        if(!response.ok)
        {
            console.log("Cannot Update.")
        }

        // Set state for updated data
        else
        {
            console.log("Update Successful. Reloading Components...")
            window.location.reload()
        }
    }

    return (
        
        <div className="workout-details">
            
            <h4>{workout.title}</h4>
            <p><strong>Load(kg): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{workout.createdAt}</p>
            <button class="button delete" onClick={handleDelete}>Delete Workout</button>
            <Popup trigger= {<button>Edit Workout</button>} position="top center">
                <div>
                    <form className="update" onSubmit={handleUpdate}>
                        <h3>Update Workout</h3>
                        <label>Exercise Title: </label>
                        <input type="text" id="title" defaultValue={workout.title}/>
                        <label>Load(in kg): </label>
                        <input type="number" id="load" defaultValue={workout.load}/>
                        <label>Reps: </label>
                        <input type="number" id="reps" defaultValue={workout.reps}/>
                        <button type="submit">Update Workout</button>
                    </form>
                </div>
            </Popup>
        </div>
    )
}

export default WorkoutDetails