const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user.model')
const { secret } = require('../config')

const loginRouter = require('express').Router()

loginRouter.post('/', async (req, res, next) => {
    const { username, password } = req.body

    const user = await User.findOne({ username })

    const passwordCorrect = !user
        ? false
        : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        return res.status(401).json({error: 'invalid username or password'})
    }

    const userForToken = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(userForToken, secret)

    res.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter