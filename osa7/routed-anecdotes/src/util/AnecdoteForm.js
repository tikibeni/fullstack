import React from "react";
import { useField } from "../hooks";
import { useHistory } from "react-router-dom";

const AnecdoteForm = ({ addNew, setNotification }) => {
    const history = useHistory()
    const contentListener = useField('text')
    const authorListener = useField('text')
    const infoListener = useField('text')

    const handleReset = (event) => {
        event.preventDefault()
        contentListener.reset()
        authorListener.reset()
        infoListener.reset()
    }

    // eslint-disable-next-line
    var {reset, ...contentInput} = contentListener
    // eslint-disable-next-line
    var {reset, ...authorInput} = authorListener
    // eslint-disable-next-line
    var {reset, ...infoInput} = infoListener


    const handleSubmit = (e) => {
        e.preventDefault()

        const content = contentInput.value
        const author = authorInput.value
        const info = infoInput.value

        addNew({
            content,
            author,
            info,
            votes: 0
        })
        setNotification('a new anecdote, ' + content + ' created!')
        setTimeout(() => {
            setNotification('')
        }, 10000)
        history.push('/')
    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input {...contentInput} />
                </div>
                <div>
                    author
                    <input {...authorInput} />
                </div>
                <div>
                    url for more info
                    <input {...infoInput} />
                </div>
                <button>create</button>
                <button onClick={handleReset}>reset</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
