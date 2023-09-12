import { useEffect, useState } from "react";
import WorkoutDetails from "../components/WorkoutDetails.js";
import WorkoutForm from "../components/WorkoutForm.js";
import { useContext } from "react";

const Home = () => {
    const [workouts, setWorkouts] = useState(null);
    const [title, setTitle] = useState("");
    const isLoggedIn = localStorage.getItem("username") ? true : false;
    const username = localStorage.getItem('username');

    
    useEffect(() => {
        const fetchWorkouts = async () => {
        const response = await fetch(`/api/workouts?username=${username}&title=${title}`);
        const json = await response.json();

        if (response.ok) {
            setWorkouts(json);
        }
        };

        fetchWorkouts();
    }, [title, username]);

    const handleSearch = (event) => {
        setTitle(event.target.value);
    };

    return (
        <>
        {isLoggedIn ? (
            <div className="home">
            <div className="search-bar">
                <WorkoutForm />
                <br />
                <input type="text" placeholder="Search" value={title} onChange={handleSearch} />
            </div>
            
            <div className="workouts">
                {workouts &&
                workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>
            </div>
        ) : (
            <div className="landing">
                <img className="profile-photo" src={require("../img/WorkoutStock.jpg")} alt={"Carlie Anglemire"}/>
                <header>
                    <h1>Track your workouts</h1>
                    <p>Create an account to begin!</p>
                </header>
            </div>
        )}
        </>
    );
};

export default Home;