import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';


function Navbar(props) {
    const [isUser, setIsUser] = useState(false)

    const handleLogout = (e)=>{
        e.preventDefault()
        axios.get('/logout')
        .then(()=> console.log('logging out..'))
        .catch(error => console.log(error))
    }

    useEffect( ()=> {
        axios.get('/requireAuth')
        .then(({data}) => {
            // data returns decodedtoken
            if(data.userId) setIsUser(true) 
        })
        .catch(error => console.log(error))
    }, [])

    return (
        <div className="navbar-container">
            <div className="navbar-wrapper">
            <Link to="/">Home</Link>
            {
                isUser ? 
                <div>
                    <Link to="/profile">Profile</Link>
                    <a href="/" onClick={handleLogout}>Logout</a>
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
