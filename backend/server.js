require('dotenv').config()
const express = require('express');
const app = express()

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true})

const loginroutes = require('./routes/login')
const postroutes = require('./routes/post')
const session = require('express-session')
// const SESSION_COOKIE_EXPIRY = 1000 * 60 * 60 * 24 * 7
// const SESSION_COOKIE_EXPIRY = 1000 * 10
const MongoDBStore = require('connect-mongodb-session')(session);

const store = new MongoDBStore({
  uri: process.env.MONGODB_URL,
  collection: 'user_sessions'
});


const cors = require('cors')
var cookieParser = require('cookie-parser')
const path = require('path')
app.use(cookieParser())

app.listen(process.env.PORT)

app.use(cors())

app.use(express.json())
app.use(
  express.static(path.join(__dirname, '../dist/client'))
)

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store,
  cookie: {
    secure: false,
    sameSite: false,
    httpOnly: true
  }
}))

app.use(loginroutes)
app.use(postroutes)

app.get(
  '/*',
  (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/client/index.html'))
  }
)


app.use(
  (req, res) => {
    res
      .status(404)
      .send(
        {
          status: 0,
          msg: '404 error'
        }
      )
  }
)
