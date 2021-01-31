import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './Blog'

// Testi, joka varmistaa, että lomake kutsuu propseina saamaansa
// takaisinkutsufunktiota oikeilla tiedoilla siinä vaiheessa kun
// blogi luodaan

describe('Testing BlogForm Blog.js', () => {
    test('calling handler with correct info while creating blog', () => {
        const createBlog = jest.fn()

        const component = render(
            <BlogForm createBlog={createBlog} />
        )

        const titleInput = component.container.querySelector('#title')
        const authorInput = component.container.querySelector('#author')
        const urlInput = component.container.querySelector('#url')

        fireEvent.change(titleInput, {
            target: { value: 'Form Testing 101' }
        })

        fireEvent.change(authorInput, {
            target: { value: 'FS-Team' }
        })

        fireEvent.change(urlInput, {
            target: { value: 'www.fullstackopen.com' }
        })

        const form = component.container.querySelector('form')

        fireEvent.submit(form)

        expect(createBlog.mock.calls).toHaveLength(1)
        expect(createBlog.mock.calls[0][0].title).toBe('Form Testing 101')
        expect(createBlog.mock.calls[0][0].author).toBe('FS-Team')
        expect(createBlog.mock.calls[0][0].url).toBe('www.fullstackopen.com')
    })
})