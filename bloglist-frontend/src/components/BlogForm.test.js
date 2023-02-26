import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> submits correct information', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()

  render(<BlogForm createBlog={createBlog}/>)

  const input1 = screen.getByRole('textbox', {
    name: /title/i
  })
  const input2 = screen.getByRole('textbox', {
    name: /author/i
  })
  const input3 = screen.getByRole('textbox', {
    name: /url/i
  })
  const sendButton = screen.getByText('add')

  await user.type(input1, 'Ulixes')
  await user.type(input2, 'Livius Andronicus')
  await user.type(input3, 'odusia')
  await user.click(sendButton)

  //console.log(createBlog.mock.calls)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toBe('Ulixes')
  expect(createBlog.mock.calls[0][1]).toBe('Livius Andronicus')
  expect(createBlog.mock.calls[0][2]).toBe('odusia')
})