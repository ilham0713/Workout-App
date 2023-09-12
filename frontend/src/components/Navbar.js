import {Link} from 'react-router-dom'

const Navbar = () => {

    //localStorage.setItem('username', "Arwin");
    const username = localStorage.getItem('username');
    const isLoggedIn = username ? true : false;

    const handleLogout = () => {
        localStorage.removeItem('username');
        window.location.href = '/';
        window.location.reload();
    };

    return(
        <header>
            <div className="container">
                <Link to ="/">
                    <h1>
                        Sweat Tracker
                    </h1>
                </Link>
                <div className="nav-links">
                    
                    {isLoggedIn && (
                      <>
                        <span>Welcome, {username}</span>
                        <button onClick={handleLogout}>Logout</button>
                      </>
                    )}
                    {!isLoggedIn && (
                      <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                      </>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Navbar