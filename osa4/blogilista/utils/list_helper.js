const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return _.sumBy(blogs, 'likes')
}

const favoriteBlog = (blogs) => {
    return _.maxBy(blogs, 'likes')
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    let correctForm = 
      _.map(
        _.countBy(blogs, 'author'), 
        (val, key) => ({ author: key, blogs: val }))
    
    return _.maxBy(correctForm, 'blogs')
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    let correctForm = 
      _(blogs)
        .groupBy('author')
        .map((objs, key) => ({
            'author': key,
            'likes': _.sumBy(objs, 'likes') }))
        .value()

    return _.maxBy(correctForm, 'likes')
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}