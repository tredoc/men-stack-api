const mongoose = require('mongoose')
const { MONGODB_URI } = require('./config')

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => console.log('Connected to DB'))
    .catch(err => console.log('Connection to DB failed', err.message))

module.exports = mongoose
