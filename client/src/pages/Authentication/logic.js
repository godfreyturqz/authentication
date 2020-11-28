import {useState} from 'react'
import axios from "axios";
import { useLocation } from "react-router-dom";

function Logic(props) {
    const [user, setUser] = useState({email: '', password: ''})
    const [errors, setErrors] = useState({email: '', password: ''})
    const currentUrl = useLocation()

    const handleInputs = (e)=>{
        e.preventDefault()
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        if(currentUrl.pathname === '/register'){

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
                    const err = Object.values(error)[2].data.errors
                    if(err) setErrors({email: err.email, password: err.password})
                }) 

        }
        else {

            axios.post('/login', user)
                .then(({data}) => {
                    // if success, data returns a userId - check variable in backend authcontroller
                    console.log(data.userId)
                    if(data){
                        setUser({email: '', password:''})
                        props.history.push('/profile')
                    }
                })
                .catch(error => {
                    const err = Object.values(error)[2].data
                    if(err) setErrors({email: err.email, password: err.password})
                }) 
        }
            
    }

    
    return {user, handleInputs, handleSubmit, errors, currentUrl}
}

export default Logic
