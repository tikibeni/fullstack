const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
      .find({}).populate('user', { username: 1, name: 1 })

    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.json(blog.toJSON())
    } else {
        response.status(404).end()
    }
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(body.userId)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        user: user._id,
        url: body.url,
        likes: body.likes,
        comments: body.comments,
    })

    if (blog.likes === undefined) {
        blog.likes = 0
    }

    if (blog.comments === undefined) {
        blog.comments = []
    }

    if (blog.title === undefined && blog.url === undefined) {
        response.status(400).end()
    } else {
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

        response.json(savedBlog.toJSON())
    }
})

blogsRouter.post('/:id/comments', async (request, response) => {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const comment = body.content

    if (comment === undefined || comment === '') {
        response.status(400).end()
    } else {
        let blog = await Blog.findById(body.blogId)
        blog.comments = blog.comments.concat(comment)
        const savedBlog = await blog.save()
        response.json(savedBlog.toJSON())
    }
})

// Metodi, joka päivittää tiedot tietokantaan, mikäli formaatti ja token ovat ok.
blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(body.user.id)
    const blog = {
        title: body.title,
        author: body.author,
        user: user.id,
        url: body.url,
        likes: body.likes,
        comments: body.comments,
    }

    if (blog.likes === undefined) {
        blog.likes = 0
    }

    if (blog.comments === undefined) {
        blog.comments = []
    }

    if (blog.title === (undefined || '') && blog.url === (undefined || '')) {
        response.status(400).end()
    } else {
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new:true})
        // Jotta frontti osaa näyttää blogin tekijän nimen muutosten jälkeenkin!
        updatedBlog.user = user
        response.json(updatedBlog.toJSON())
    }
})

// Uusi versio:
// - Poisto onnistuu ainoastaan jos blogin tekijä poistaa blogin
// - Ei onnistu ilman tokenia
// - Ei onnistu väärän käyttäjän toimesta
//   * Palauttaa asiallisen statuskoodin (Unauthorized)
blogsRouter.delete('/:id', async (request, response) => {
    // Session tokeni
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    // Kyseessäoleva blogi
    const blog = await Blog.findById(request.params.id)

    // Poistoa yrittävä käyttäjä
    const activeUser = await User.findById(decodedToken.id)

    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    if (blog.user.toString() !== activeUser._id.toString()) {
        return response.status(401).json({ error: 'unauthorized user' })
    }

    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

module.exports = blogsRouter
