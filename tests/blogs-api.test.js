const mongoose = require('mongoose')
const supertest = require('supertest')

const Blog = require('../models/blog.model')
const User = require('../models/user.model')

const app = require('../app')
const api = supertest(app)

const initialBlogs = [
    {
        title: 'HTML is easy',
        author: 'Me',
        url: 'unknown',
        userId: 'sdfsdfs32wesd',
        likes: 100
    },
    {
        title: 'HTML is very easy, like js',
        author: 'Them',
        url: 'https://copyright.co',
        userId: 'sdfsdfs32wesd',
        likes: 200
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogsArr = initialBlogs.map((blog) => {
        return new Blog(blog)
    })
    const promiseArray = blogsArr.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('notes being two', async () => {
    const res = await api.get('/api/blogs')

    expect(res.body).toHaveLength(initialBlogs.length)
})

test('response should contain specific content', async () => {
    const res = await api.get('/api/blogs')
    const titles = res.body.map(blog => blog.title)

    const requiredContent = 'HTML is very easy, like js'

    expect(titles).toContain(requiredContent)
})

describe('add blog by post /api/blogs', () => {
    const blog = {
        title: 'HTML is not for programming',
        author: 'Whoelse Domain',
        url: 'unknown.com',
        likes: 999
    }

    // test('check response for correct', async () => {
    //     const user = await User.find({})
        
    //     blog.userId = user[0]['_id']

    //     const res = await api.post('/api/blogs')
    //     .send(blog)    
    
    //     expect(res.body).toMatchObject(blog)
    // })

    // test('check if blog added correctly', async () => {
    //     const user = await User.find({})
    //     blog.userId = user._id

    //     await api.post('/api/blogs')
    //     .send(blog)
        
    //     const res = await api.get('/api/blogs')
    //     const blogs = res.body
    //     const lastBlog = blogs[blogs.length - 1]
    //     expect(lastBlog).toMatchObject(blog)
    // })
    
    // test('check if main data filled', async () => {
    //     await api.post('/api/blogs')
    //         .send({
    //             url: 'asdsadsad.com',
    //             likes: 1000
    //         })
    //         .expect(401)
    // })
})

// describe('check if delete by id', () => {
//     test('reduce by one', async () => {
//         const allBlogs = await api.get('/api/blogs')
//         const id = allBlogs.body[0]._id
//         await api.delete(`/api/blogs/${id}`)

//         const finalResponse = await api.get('/api/blogs')

//         expect(finalResponse.body).toHaveLength(1)
//     })  
// })

afterAll(() => {
  mongoose.connection.close()
})