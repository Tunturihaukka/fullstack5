import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'


test('renders title and author, but no content', () => {
  const initBlog = (blog) => {
    const values = {
      blog: blog,
      user: true,
      //hidefunc: handleCancelClick,
      handleLike: true,
      confirm: true
    }
    return (
      <Blog values={values}/>
    )
  }

  const testBlog = {
    id: '283uc582379n8v523985n9283m239v5u',
    title: 'ad Catilinam',
    author: 'Cicero',
    url: 'cicerurl',
    likes: '1000',
    user: 'CiceroUser'
  }


  const { container } = render(initBlog(testBlog))


  const div = container.querySelector('.container')
  expect(div).toHaveTextContent('ad Catilinam Cicero')


})