import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blogs from './Blogs'

const user = {
    id: '1',
    username: 'tikibeni',
    name: 'Benjyy'
}

const blogs = [
    {
      id: '1',
      title: 'Test Blog',
      author: 'Me trying',
      likes: 1,
      url: 'www.tietoturva.fi',
      user: {
        id: '1',
        username: 'tikibeni',
        name: 'Benjyy'
      }
    }
]

describe('Testing Blogs.js', () => {
    let component
    const mockHandler = jest.fn()

    beforeEach(() => {
        component = render(
            <Blogs blogs={blogs} currentUser={user} updateBlog={mockHandler} />
        )
    })

    test('renders blog title & author initially', () => {
        const div = component.container.querySelector('.blogRender')
        expect(div).toHaveTextContent(
            'Test Blog',
            'Me trying'
        )
      })
      
      test('renders also url & likes when pressed the show-button', () => {
          const button = component.getByText('show')
          fireEvent.click(button)
      
          const div = component.container.querySelector('.togglableContent')
          expect(div).toHaveTextContent(
              'Test Blog',
              'Me trying',
              'www.tietoturva.fi'
          )
          expect(div).not.toHaveStyle('display: none')
      })
      
      test('eventhandler is called upon correct amount of times when clicking', async () => {
          const button = component.getByText('show')
          fireEvent.click(button)

          const likebutton = component.getByText('like')
          fireEvent.click(likebutton)
          fireEvent.click(likebutton)

          expect(mockHandler.mock.calls).toHaveLength(2)
      })
})


