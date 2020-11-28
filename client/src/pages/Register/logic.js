import {useState} from 'react'
import axios from "axios";

function Logic(props) {
    const [user, setUser] = useState({email: '', password: ''})

    const handleInputs = (e)=>{
        e.preventDefault()
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        axios.post('/signup', user)
        .then(data => {
            // data returns a userId
            if(data){
                setUser({email: '', password:''})
                props.history.push('/profile')
            }
        })
        .catch(error => console.log(error))     
    }

    
    return {user, handleInputs, handleSubmit}
}

export default Logic
