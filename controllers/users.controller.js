const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')

const User = require('../models/user.model')

usersRouter.get('/', async (req, res, next) => {
    const response = await User.find({})
        .populate('blogs', {url: true, title: true})

    res.json(response)
})

usersRouter.post('/', async (req, res, next) => {
    const userData = req.body

    const saltRounds = 5
    const passwordHash = await bcrypt.hash(userData.password, saltRounds)

    const user = Object.assign(userData, { passwordHash })

    const newUser = new User(user)
    const savedUser = await newUser.save()

    res.json(savedUser)
})

module.exports = usersRouter

