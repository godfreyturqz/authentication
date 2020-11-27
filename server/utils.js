const jwt = require('jsonwebtoken')

module.exports.handleErrors = (error) => {
    let errors = { email: '', password: '' }

    // signup duplicate error
    if(error.code === 11000){
        errors.email = 'Email already exists'
        return errors
    }

    // signup errors
    if(error.errors.email) {
        if(error.errors.email.name === 'ValidatorError'){
            // error message can be customized in UserModel
            errors.email = error.errors.email.properties.message
        }
    }
    if(error.errors.password){
        if(error.errors.password.name === 'ValidatorError'){
            // error message can be customized in UserModel
            errors.password = error.errors.password.properties.message
        }
    }
    
    return errors
}

module.exports.createToken = (userId) => {
    return jwt.sign(
        {userId}, 
        process.env.ACCESS_TOKEN, 
        { expiresIn: 3 * 24 * 60 * 60 }
    )
}