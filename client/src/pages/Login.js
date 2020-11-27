import React, {useState} from 'react'
import axios from "axios";
import '../App.css'
import { Link } from 'react-router-dom';

function Login(props) {
    const [user, setUser] = useState({email: '', password: ''})

    const handleSubmit = (e)=>{
        e.preventDefault()
        axios.post('/signup', user)
        .then(data => {
            // data returns a token
            // console.log(data)
            if(data){
                setUser({email: '', password:''})
                props.history.push('/profile')
            }
        })
        .catch(error => console.log(error))     
    }

    const handleInputs = (e)=>{
        e.preventDefault()
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="form-container">
            <Link to="/profile">profile</Link>
            <div className="form-wrapper">
                <h2>Log in to continue</h2>
                <form onSubmit={handleSubmit}>
                    <input placeholder="Email" type="text" value={user.email} name="email" onChange={handleInputs} autoComplete="off"/>
                    <p className="error-message">Email already exists</p>
                    <input placeholder="Password" type="password" value={user.password} name="password" onChange={handleInputs}/>
                    <p className="error-message">Wrong password</p>
                    <button>Log In</button>
                </form>
            </div>
        </div>
    )
}

export default Login
