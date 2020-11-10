const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')

// HUOM! ÄLÄ KOVAKOODAA TÄNNE USERID:TÄ TAI BLOGIEN ID:TÄ - vaihtuvat usein ja johtavat status code 500 jos olet tyhmä t. 3h bugfixailua
describe('Routetesting', () => {
    let token = null
    let decodedToken = null

    // Järjestelmän alustus blogien testaamista varten
    beforeEach(async () => {
        // Tokenin hakeminen kirjautumisen kautta
        const response = await api
          .post('/api/login')
          .send({
              username: 'testUser',
              password: 'secret'
          })

        token = response.body.token

        decodedToken = jwt.verify(token, process.env.SECRET)

        // Blogikannan alustus
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialBlogs)
    })
    
    describe('General GET-Method', () => {
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
        
        test('returns specific blogtitle from db', async () => {
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
    })

    describe('Specific GET-Method', () => {
        test('GET with valid id works correctly', async () => {
            const blogsAtStart = await helper.blogsInDatabase()

            const blogToView = blogsAtStart[0]

            const resultBlog = await api
              .get(`/api/blogs/${blogToView.id}`)
              .expect(200)
              .expect('Content-Type', /application\/json/)

            const jsonblogToView = JSON.parse(JSON.stringify(blogToView))

            expect(resultBlog.body).toEqual(jsonblogToView)
        })

        test('GET with non-existing id returns 404', async () => {
            const nonExistingId = await helper.nonExistingId()

            await api
              .get(`/api/blogs/${nonExistingId}`)
              .expect(404)
        })
    })

    describe('POST-Method', () => {
        test('blog can be added with valid pieces of info', async () => {
            const newBlog = {
                title: 'Node Testing 101',
                author: 'FS-Team',
                userId: decodedToken.id,
                url: 'https://fullstackopen.com',
                likes: 5000
            }
        
            await api
              .post('/api/blogs')
              .set('Authorization', `bearer ${token}`)
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
                userId: decodedToken.id,
                url: 'Nope'
            }
        
            await api
              .post('/api/blogs')
              .set('Authorization', `bearer ${token}`)
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
                author: 'Mr. Error',
                userId: decodedToken.id
            }
        
            await api
              .post('/api/blogs')
              .set('Authorization', `bearer ${token}`)
              .send(newBlog)
              .expect(400)
        
            const blogsAtEnd = await helper.blogsInDatabase()
            expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
        })

        test('blog post returns 401 if token not found', async () => {
            const newBlog = {
                title: 'TTK91',
                author: 'Mr. Error',
                userId: decodedToken.id,
                url: 'nope'
            }

            await api
              .post('/api/blogs')
              .send(newBlog)
              .expect(401)

            const blogsAtEnd = await helper.blogsInDatabase()
            expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
        })
    })

    // Tämä testi on rikki. Jostain syystä ajaa status code 500:sta liian monessa
    describe('DELETE-method', () => {
        test('method returns status code 204 if id & info valid', async () => {
            const blogsAtStart = await helper.blogsInDatabase()
            const blogToDelete = blogsAtStart[0]

            await api
              .delete(`/api/blogs/${blogToDelete.id}`)
              .set('Authorization', `bearer ${token}`)
              .send(decodedToken.id)
              .expect(204)

            const blogsAtEnd = await helper.blogsInDatabase()

            expect(blogsAtEnd).toHaveLength(
                helper.initialBlogs.length - 1
            )

            const titles = blogsAtEnd.map(r => r.title)

            expect(titles).not.toContain(blogToDelete.title)
        })
    })

    describe('PUT-method', () => {
        test('updating blog with correct id works correctly', async () => {
            const blogsAtStart = await helper.blogsInDatabase()

            const blogToUpdate = blogsAtStart[0]
            blogToUpdate.author = 'P=NP'

            await api
              .put(`/api/blogs/${blogToUpdate.id}`)
              .send(blogToUpdate)
              .expect(200)
              .expect('Content-Type', /application\/json/)

            const blogsAtEnd = await helper.blogsInDatabase()

            expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

            const authors = blogsAtEnd.map(r => r.author)

            expect(authors).toContain('P=NP')
        }) 

        test('updating blog to contain no url and title leads to error', async () => {
            const blogsAtStart = await helper.blogsInDatabase()

            const blogToUpdate = blogsAtStart[0]
            blogToUpdate.title = ''
            blogToUpdate.url = ''

            await api
              .put(`/api/blogs/${blogToUpdate.id}`)
              .send(blogToUpdate)
              .expect(400)

            const blogsAtEnd = await helper.blogsInDatabase()
            const titles = blogsAtEnd.map(r => r.title)

            expect(titles).not.toContain('')
        })

        test('updating likes works as intended', async () => {
            const blogsAtStart = await helper.blogsInDatabase()

            const blogToUpdate = blogsAtStart[0]
            blogToUpdate.likes = 99928264528

            await api
              .put(`/api/blogs/${blogToUpdate.id}`)
              .send(blogToUpdate)
              .expect(200)

            const blogsAtEnd = await helper.blogsInDatabase()
            const likes = blogsAtEnd.map(r => r.likes)

            expect(likes).toContain(blogToUpdate.likes)
        })
    })
})


afterAll(() => {
    mongoose.connection.close()
})