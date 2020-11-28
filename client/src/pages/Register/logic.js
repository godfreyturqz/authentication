import {useState} from 'react'
import axios from "axios";

function Logic(props) {
    const [user, setUser] = useState({email: '', password: ''})
    const [errors, setErrors] = useState({email: '', password: ''})

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
        .then(({data}) => {
            // if success, data returns a userId - check variable in backend authcontroller
            console.log(data.userId)
            if(data){
                setUser({email: '', password:''})
                props.history.push('/profile')
            }
        })
        .catch(error => {
            console.log(error)
            const err = Object.values(error)[2].data.errors
            if(err){
                setErrors({
                    email: err.email,
                    password: err.password
                })
            }
        })     
    }

    
    return {user, handleInputs, handleSubmit, errors}
}

export default Logic
