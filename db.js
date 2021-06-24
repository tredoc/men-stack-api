const mongoose = require('mongoose')
const { info, error } = require('./utils/logger')
const { MONGODB_URI } = require('./config')

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => info('Connected to DB'))
    .catch(err => error('Connection to DB failed', err.message))

module.exports = mongoose
