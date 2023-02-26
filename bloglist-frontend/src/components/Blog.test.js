import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

const testBlog = {
  id: '283uc582379n8v523985n9283m239v5u',
  title: 'ad Catilinam',
  author: 'Cicero',
  url: 'cicerurl',
  likes: '1000',
  user: 'CiceroUser'
}

const initBlog = (blog) => {
  const values = {
    blog: blog,
    user: true,
    handleLike: true,
    confirm: true
  }
  return (
    <Blog values={values}/>
  )
}

let container

beforeEach(() => {
  container = render(initBlog(testBlog)).container
})

test('clicking the "show" button shows the content', async () => {

  const testUser = userEvent.setup()
  expect(screen.getByRole('button', {
    name: /show/i
  })).toBeDefined()
  expect(() => screen.getByRole('button', {
    name: /hide/i
  })).toThrow()

  const button = screen.getByRole('button', {
    name: /show/i
  })
  await testUser.click(button)

  const div = container.querySelector('.regular')
  expect(div).not.toHaveStyle('display: none')
  const div2 = container.querySelector('.container')
  expect(div2).toHaveStyle('display: none')
})

test('title and author are visible, other content is hidden', () => {

  const div = container.querySelector('.container')
  expect(div).not.toHaveStyle('display: none')

  const div2 = container.querySelector('.regular')
  expect(div2).toHaveStyle('display: none')

})