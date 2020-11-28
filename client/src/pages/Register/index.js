import React from 'react'
import '../../App.css'
import Logic from "./logic";


function Register(props) {
    const {user, handleInputs, handleSubmit, errors} = Logic(props)

    return (
        <div className="form-container">
            <div className="form-wrapper">
                <h2>Create account</h2>
                <form onSubmit={handleSubmit}>
                    <input placeholder="Email" type="text" value={user.email} name="email" onChange={handleInputs} autoComplete="off"/>
                    <p className="error-message">{errors.email}</p>
                    <input placeholder="Password" type="password" value={user.password} name="password" onChange={handleInputs}/>
                    <p className="error-message">{errors.password}</p>
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    )
}

export default Register
