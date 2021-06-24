const db = require('../db')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new db.Schema({
    username: {
        type: String,
        unique: true
    },
    name: String,
    passwordHash: String,
    blogs: [
        {
            type: db.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

const User = db.model('User', userSchema, 'users')

module.exports = User

