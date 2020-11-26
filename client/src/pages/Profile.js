import React, { useEffect, useState} from 'react'
import axios from 'axios';

function Profile(props) {
    const [isUser, setIsUser] = useState(false)
    
    useEffect( ()=> {
        axios.get('/requireAuth')
        .then(({data}) => {
            // data returns decodedtoken
            if(data.userId) setIsUser(true) 
        })
        .catch(error => console.log(error))
    }, [])
    

    return (
        isUser &&
        <div>
            <h1>PROFILE PAGE</h1>
            <h1>Welcome {isUser}</h1>
        </div>
    )
}

export default Profile
