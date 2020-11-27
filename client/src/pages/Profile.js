import React, {useContext, useEffect} from 'react'
import { SessionContext } from "../context";
import axios from 'axios';

function Profile() {
    const [isUser, setIsUser] = useContext(SessionContext)

    useEffect( ()=> {
        axios.get('/requireAuth')
        .then(({data}) => {
            // data returns decodedtoken
            if(data.userId) setIsUser(true) 
        })
        .catch(error => console.log(error))
    }, [setIsUser])

    return (
        isUser &&
        <>
            <h1>PROFILE PAGE</h1>
            <h1>Welcome</h1>
        </>
        
        
    )
}

export default Profile
