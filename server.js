const express = require('express')
const app = express()
// const expressLayouts = require('express-ejs-layouts')


const indexRouter = require('./routes/index')

app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)