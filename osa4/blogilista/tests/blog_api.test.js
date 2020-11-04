const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

// GET-ALL-LOHKO
test('returns blogs as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
})

test('returns correct amount of blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('returns specific blog from db', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)
    expect(titles).toContain(
        'Full-Stack Development 101'
    )
})

test('returned blogs are identified by id', async () => {
    const response = await api.get('/api/blogs')

    const ids = response.body.map(r => r.id)
    expect(ids).toBeDefined()
})
// GET-ALL-LOHKO

// POST-LOHKO
test('valid blog can be added', async () => {
    const newBlog = {
        title: 'Node Testing 101',
        author: 'FS-Team',
        url: 'https://fullstackopen.com',
        likes: 5000
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDatabase()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).toContain(
        'Node Testing 101'
    )
})

test('blog post without defined likes returns zero likes', async () => {
    const newBlog = {
        title: 'TTK91',
        author: 'Tito',
        url: 'Nope'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDatabase()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const addedBlog = blogsAtEnd.find(blog => blog.title === newBlog.title)
    expect(addedBlog.likes).toBe(0)
})

test('blog post without defined title and url returns error 400', async () => {
    const newBlog = {
        author: 'Mr. Error'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDatabase()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})
// POST-LOHKO

// DELETE-LOHKO



// DELETE-LOHKO

afterAll(() => {
    mongoose.connection.close()
})