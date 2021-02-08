import blogService from './../services/blogs'

const blogReducer = (state = [], action) => {
    switch(action.type) {
        case 'LIKE':
            const id = action.data.id
            const likedBlog = state.find(b => b.id === id)
            const changedBlog = {
                ...likedBlog,
                likes: likedBlog.likes + 1
            }
            return state.map(blog =>
                blog.id !== id ? blog : changedBlog
            )
        case 'NEW_BLOG':
            return [...state, action.data]
        case 'DELETE_BLOG':
            return state.filter(b => b.id !== action.data.id)
        case 'COMMENT_BLOG':
            const blogId = action.data.id
            const commentedBlog = state.find(b => b.id === blogId)
            const commentedAndChangedBlog = {
                ...commentedBlog,
                comments: action.data.comments
            }

            return state.map(blog =>
                blog.id !== blogId ? blog : commentedAndChangedBlog
            )

        case 'INIT_BLOGS':
            return action.data
        default:
            return state
    }
}

export const likeBlog = (blog) => {
    const likedBlog = {
        ...blog,
        likes: blog.likes + 1
    }

    const id = blog.id
    return async dispatch => {
        await blogService.update(likedBlog)
        dispatch({
            type: 'LIKE',
            data: { id }
        })
    }
}

export const createBlog = content => {
    return async dispatch => {
        const newBlog = await blogService.create(content)
        dispatch({
            type: 'NEW_BLOG',
            data: newBlog,
        })
    }
}

export const deleteBlog = (blog) => {
    const id = blog.id
    return async dispatch => {
        await blogService.remove(id)
        dispatch({
            type: 'DELETE_BLOG',
            data: { id }
        })
    }
}

export const commentBlog = comment => {
    return async dispatch => {
        const newComment = await blogService.comment(comment)
        dispatch({
            type: 'COMMENT_BLOG',
            data: newComment
        })
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs,
        })
    }
}

export default blogReducer
