const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: '100 ways to utilize the course Lama',
        author: 'Non-existent',
        url: 'Nope',
        likes: 0
    },
    {
        title: 'Full-Stack Development 101',
        author: 'FS-Team',
        url: 'https://fullstackopen.com',
        likes: 10000
    },
]

const nonExistingId = async () => {
    const blog = new Blog({ title: 'TBA', author: 'Test', url: 'No', likes: 0 })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDatabase = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDatabase
}