import React, {useState} from 'react'
import axios from "axios";


function Register(props) {
    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const handleSubmit = (e)=>{
        e.preventDefault()
        axios.post('/signup', user)
        .then(data => {
            // data returns a token
            console.log(data)
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
        <>
            Register
            {JSON.stringify(user)}
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input type="text" value={user.email} name="email" onChange={handleInputs}/>
                <label>Password</label>
                <input type="password" value={user.password} name="password" onChange={handleInputs}/>
                <button>Submit</button>
            </form>
        </>
    )
}

export default Register
