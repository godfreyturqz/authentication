const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const authController = require('./controllers/authController')
require('dotenv/config')


const app = express()

//--------------------------------------------------------------
// MIDDLEWARES
//--------------------------------------------------------------
app.use(express.json({extended: true}))
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(cookieParser())

//--------------------------------------------------------------
// DATABASE CONNECTION - DBNAME is authentication
//--------------------------------------------------------------
mongoose.connect(
    process.env.DB_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }   
)
.then(() => app.listen(5000, ()=> console.log('connected to server')))
.catch(error => console.log(error))

//--------------------------------------------------------------
// ROUTES
//--------------------------------------------------------------
app.post('/signup', authController.createUser)
app.get('/signup', authController.getUsers)

app.get('/logout', authController.logout)
app.get('/requireAuth', authController.requireAuth)

// for dev purposes
app.delete('/deleteAll', authController.deleteAllUsers)
