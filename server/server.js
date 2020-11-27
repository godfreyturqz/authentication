const express = require('express')
const mongoose = require('mongoose')
require('dotenv/config')
const cors = require('cors')
const cookieParser = require('cookie-parser')

// controller folder
const UserModel = require('./models/UserModel')
const jwt = require('jsonwebtoken')

const app = express()

//--------------------------------------------------------------
// MIDDLEWARES
//--------------------------------------------------------------
app.use(express.json({extended: true}))
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(cookieParser())

//--------------------------------------------------------------
// DATABASE CONNECTION - MONGO DBNAME is authentication
//--------------------------------------------------------------
mongoose.connect(
    process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }   
)
.then(() => app.listen(5000, ()=> console.log('connected to server')))
.catch(error => console.log(error))

//--------------------------------------------------------------
// ROUTES AND CONTROLLERS
//--------------------------------------------------------------
app.get('/signup', async (req,res)=>{
    const data = await UserModel.find()
    res.json(data)
})

app.get('/requireAuth', (req,res)=>{
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
})
app.get('/logout', (req, res)=>{
    res.cookie('jwt', '', { httpOnly:true, maxAge: 1}).send()
})

app.post('/signup', async (req,res)=>{
    try {
        const userData = await UserModel.create(req.body)
        const token = jwt.sign({userId: userData._id}, process.env.ACCESS_TOKEN, {expiresIn: 3 * 24 * 60 * 60})
        res.cookie('jwt', token, { httpOnly:true, maxAge: 3 * 24 * 60 * 60 * 1000})
        res.status(201).json({token})
    } catch (error) {
        const errors = handleErrors(error)
        res.status(400).json({message: 'user not created', errors})
    }
})


app.delete('/deleteMany', (req, res) => {
    UserModel.deleteMany({}).then((res)=> res.json('success'))
    .catch(err => res.json(err))
})

const handleErrors = (error) => {
    let errors = { email: '', password: '' }

    // duplicate error
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