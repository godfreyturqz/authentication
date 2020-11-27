const UserModel = require('../models/UserModel')
const jwt = require('jsonwebtoken')
const utils = require('../utils')
const bcrypt = require('bcrypt')


//------------------------------------
// SIGNUP
//------------------------------------
module.exports.createUser = async (req,res) => {
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const user = { email: req.body.email, password: hashedPassword}

    try {
        const userData = await UserModel.create(user)
        const token = utils.createToken(userData._id)
        // add { secure: true } in production
        res.cookie('jwt', token, { httpOnly:true, maxAge: 3 * 24 * 60 * 60 * 1000})
        res.status(201).json({userId: userData._id})

    } catch (error) {
        const errors = utils.handleErrors(error)
        res.status(400).json({message: 'user not created', errors})
    }
}

//------------------------------------
// GET ALL USERS
//------------------------------------
module.exports.getUsers = async (req,res) => {
    const data = await UserModel.find()
    res.json(data)
}

//------------------------------------
// LOGIN
//------------------------------------
module.exports.loginUser = async (req,res) => {
    
    try {
        const userData = await UserModel.findOne({email: req.body.email})
        if(userData === null) return res.status(400).json({email: 'Account does not exists'})

        const isAuth = await bcrypt.compare(req.body.password, userData.password)
        if(isAuth) {
            const token = utils.createToken(userData._id)
            res.cookie('jwt', token, { httpOnly:true, maxAge: 3 * 24 * 60 * 60 * 1000})
            res.status(200).json({userId: userData._id}) 
        }
        else {
            res.status(400).json({password: 'Authentication error'})
        }

    } catch (error) {
        console.log(error)
        res.status(400).json({message: 'login failed', error})
    }
}

//------------------------------------
// LOGOUT
//------------------------------------
module.exports.logout = (req, res) => {
    res.cookie('jwt', '', { httpOnly:true, maxAge: 1}).send()
}

//------------------------------------
// ROUTE AUTHENTICATION
//------------------------------------
module.exports.requireAuth = (req,res)=>{
    // const token = req.headers.cookie.split('=')[1]
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token, process.env.ACCESS_TOKEN, (error, decodedToken) => {
            if (error) return res.sendStatus(403)
            res.status(200).json(decodedToken)
            console.log('authentication success')
        })
    }
    else {
        res.status(401).json({message: 'Not Authenticated'})
    }
}


// for dev purposes
module.exports.deleteAllUsers = (req, res) => {
    UserModel.deleteMany({}).then((res)=> res.json('success'))
    .catch(err => res.json(err))
}