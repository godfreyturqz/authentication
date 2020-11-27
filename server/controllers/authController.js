const UserModel = require('../models/UserModel')
const jwt = require('jsonwebtoken')
const utils = require('../utils')


module.exports.createUser = async (req,res) => {

    try {
        const userData = await UserModel.create(req.body)
        const token = utils.createToken(userData._id)
        res.cookie('jwt', token, { httpOnly:true, maxAge: 3 * 24 * 60 * 60 * 1000})
        res.status(201).json({userId: userData._id})

    } catch (error) {
        const errors = utils.handleErrors(error)
        res.status(400).json({message: 'user not created', errors})
    }
}

module.exports.getUsers = async (req,res) => {
    const data = await UserModel.find()
    res.json(data)
}

module.exports.logout = (req, res) => {
    res.cookie('jwt', '', { httpOnly:true, maxAge: 1}).send()
}

module.exports.requireAuth = (req,res)=>{
    // const token = req.headers.cookie.split('=')[1]
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token, process.env.ACCESS_TOKEN, (error, decodedToken) => {
            if (error) return res.sendStatus(403)
            res.json(decodedToken)
            console.log('authentication success')
        })
    }
    else {
        res.sendStatus(401)
    }
}


// for dev purposes
module.exports.deleteAllUsers = (req, res) => {
    UserModel.deleteMany({}).then((res)=> res.json('success'))
    .catch(err => res.json(err))
}
