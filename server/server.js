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
// DATABASE CONNECTION - DBNAME in MONGO is MyAuth
//--------------------------------------------------------------
mongoose.connect(
    process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true 
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
        res.status(400).json({message: 'user not created', error})
    }
})


app.delete('/deleteMany', (req, res) => {
    UserModel.deleteMany({}).then((res)=> res.json('success'))
    .catch(err => res.json(err))
})
