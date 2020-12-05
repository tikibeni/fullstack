const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

// Cypress-testausta varten
router.post('/reset', async (request, response) => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    response.status(204).end()
})

module.exports = router