import React from 'react'
import '../../App.css'
import Logic from "./logic";


function Register() {
    const {user, handleInputs, handleSubmit} = Logic()

    return (
        <div className="form-container">
            <div className="form-wrapper">
                <h2>Create account</h2>
                <form onSubmit={handleSubmit}>
                    <input placeholder="Email" type="text" value={user.email} name="email" onChange={handleInputs} autoComplete="off"/>
                    <p className="error-message">Email already exists</p>
                    <input placeholder="Password" type="password" value={user.password} name="password" onChange={handleInputs}/>
                    <p className="error-message">Wrong password</p>
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    )
}

export default Register
