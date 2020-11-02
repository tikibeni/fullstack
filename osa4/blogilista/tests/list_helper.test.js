const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

const testblog = [
    {
        _id: '123456789',
        title: 'Lama can be utilized',
        author: 'Unknown',
        url: 'not found',
        likes: 1,
        __v: 0
    }
]

const largerTest = [
    {
        _id: '1',
        title: 'First',
        author: 'yes',
        url: 'no',
        likes: 32,
        __v: 1
    },
    {
        _id: '2',
        title: '2nd',
        author: 'yes',
        url: 'no',
        likes: 2,
        __v: 2
    },
    {
        _id: '3',
        title: 'thörd',
        author: 'yes',
        url: 'no',
        likes: 90,
        __v: 3
    },
    {
        _id: '4',
        title: 'neljäs',
        author: 'different',
        url: 'no',
        likes: 43,
        __v: 4
    }
]

describe('total likes', () => {
    test('of empty list is zero', () => {
        expect(listHelper.totalLikes([])).toBe(0)
    })    

    test('when list has only one blog equals the likes of that', () => {
        expect(listHelper.totalLikes(testblog)).toBe(1)
    })

    test('of a bigger list is calculated right', () => {
        expect(listHelper.totalLikes(largerTest)).toBe(167)
    })
})

describe('favorite blog', () => {
    test('returns undefined if empty array', () => {
        expect(listHelper.favoriteBlog([])).toBe(undefined)
    })

    test('returns the only one if array size 1', () => {
        expect(listHelper.favoriteBlog(testblog)).toEqual(testblog[0])
    })

    test('return correct blog when multiple blogs', () => {
        expect(listHelper.favoriteBlog(largerTest)).toEqual(largerTest[2])
    })

})

describe('most blogs', () => {
    test('returns null if empty array', () => {
        expect(listHelper.mostBlogs([])).toBe(null)
    })

    const corResult = {
        author: 'Unknown',
        blogs: 1
    }

    const corResultLarge = {
        author: 'yes',
        blogs: 3
    }

    test('returns the only one if array size 1', () => {
        expect(listHelper.mostBlogs(testblog)).toEqual(corResult)
    })

    test('returns correct from a larger sample', () => {
        expect(listHelper.mostBlogs(largerTest)).toEqual(corResultLarge)
    })
})

describe('most likes', () => {
    test('returns null if empty array', () => {
        expect(listHelper.mostLikes([])).toBe(null)
    })

    const corResultSingleSample = {
        author: 'Unknown',
        likes: 1
    }

    const corResultLargerSample = {
        author: 'yes',
        likes: 124
    }

    test('returns value from single sample array', () => {
        expect(listHelper.mostLikes(testblog)).toEqual(corResultSingleSample)
    }) 

    test('returns correct object from a larger sample', () => {
        expect(listHelper.mostLikes(largerTest)).toEqual(corResultLargerSample)
    })
})