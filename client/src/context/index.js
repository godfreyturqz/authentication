import React, {useState, createContext} from 'react'

export const SessionContext = createContext()

export const SessionProvider = (props) => {
    const [isUser, setIsUser] = useState(false)

    return (
        <SessionContext.Provider value ={[isUser, setIsUser]}>
            {props.children}
        </SessionContext.Provider>
    )
}
