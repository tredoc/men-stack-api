const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const blogsRouter = require('./controllers/blogs.controller')
const usersRouter = require('./controllers/users.controller')
const loginRouter = require('./controllers/login.controller')
const errorHandler = require('./middlewares/errorHandler')
const unknownEndpoint = require('./middlewares/unknownEndpoint')

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/login', loginRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app