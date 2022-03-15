const express = require('express')
const app = express()
require('dotenv').config()
// const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log("Connected"))

const indexRouter = require('./routes/index')

app.use('/', indexRouter)

app.listen(process.env.PORT || 5000)