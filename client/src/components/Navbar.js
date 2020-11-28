import { Link } from "react-router-dom";
import React, {useContext} from 'react'
import { SessionContext } from "../context";
import axios from 'axios';



function Navbar() {
    const [isUser, setIsUser] = useContext(SessionContext)

    const handleLogout = ()=>{
        axios.get('/logout')
        .then(() => setIsUser(false))
        .catch(error => console.log(error))
    }

    return (
        <div className="navbar-container">
            <div className="navbar-wrapper">
            <Link to="/">Home</Link>
            {
                isUser ? 
                <div>
                    <Link to="/profile">Profile</Link>
                    <Link to="/" onClick={handleLogout}>Logout</Link>
                </div>
                :
                <div>
                    <Link to="/register">Register</Link>
                    <Link to="/login">Login</Link>
                </div>
            }
            </div>
        </div>
    )
}

export default Navbar
