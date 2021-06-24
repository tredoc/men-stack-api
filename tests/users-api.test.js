const mongoose = require('mongoose')
const supertest = require('supertest')

const User = require('../models/user.model')

const app = require('../app')
const api = supertest(app)

const usersUrl = '/api/users'

const users = [
    {
        username: 'dodge',
        name: 'Who Cares',
        password: 'ololo'
    },
    {
        username: 'olimp',
        name: 'Nobody Cares',
        password: 'thesame'
    }
]

const singleUser = {
    username: 'lmao',
    name: 'No one cares',
    password: 'supersecret'
}

beforeEach(async () => {
    await User.deleteMany({})

    const usersArr = users.map(user => {
        return new User(user)
    })
    
    const promises = usersArr.map(user => {
        return user.save()
    })

    await Promise.all(promises)
})

describe('get all users api', () => {
    test('response is ok and json', async () => {
        await api.get(usersUrl)
            .expect(200)
            .expect('Content-type', /application\/json/)
    })

    test('initial length is users.length', async () => {
        const res = await api.get(usersUrl)

        expect(res.body).toHaveLength(users.length)
    })

    test('post one more user', async () => {
        await api.post(usersUrl)
            .send(singleUser)

        const res = await User.find({})

        expect(res).toHaveLength(users.length + 1)
    })

    // test('check for username unique', async () => {
    //     await api.post(usersUrl)
    //         .send(singleUser)

    //     const res = await api.post(usersUrl)
    //         .send(singleUser)
    //         .expect(400)
    //         .expect('Content-Type', /application\/json/)
            
    //         expect(res.body.error).toContain('`username` to be unique')
    // })
})

afterAll(() => {
    mongoose.connection.close()
})