const Blog = require('../models/blog')
const User = require('../models/user')

// Nämä pitäisi muuttaa uuteen versioon, jotta deleten testaus toimii.
const initialBlogs = [
    {
        url: 'Nope',
        title: '100 ways to utilize the course Lama',
        author: 'Non-existent',
        likes: 0
    },
    {
        url: 'https://fullstackopen.com',
        title: 'Full-Stack Development 101',
        author: 'FS-Team',
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
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1})
    return blogs.map(blog => blog.toJSON())
}

const usersInDatabase = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDatabase, usersInDatabase
}