import '../index.css'
import PropTypes from 'prop-types'
import { useState } from 'react'

const Blog = ({ values }) => {
  const { blog, user, handleLike, confirm } = values

  const [visibility, setVisibility] = useState(false)

  const updatedBlog = {
    id: blog.id,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes + 1,
    user: blog.user
  }

  const hideContents = () => {
    setVisibility(false)
  }

  const showContents = () => {
    setVisibility(true)
  }


  return(
    <div>
      <div className="container" style = {{ display: visibility ? 'none' : '' }}>
        {blog.title} {blog.author}&nbsp;
        <button onClick={() => showContents()}>show</button>
      </div>
      <div className="regular" style = {{ display: visibility ? '' : 'none' }}>
        <div className="container">
          {blog.title} {blog.author}&nbsp;
          <button onClick={() => hideContents()}>hide</button>
        </div>
        <div>
          <strong>url: </strong>{blog.url}
        </div>
        <div>
          <strong>likes: </strong> {blog.likes}&nbsp;<button onClick={() => handleLike(updatedBlog)}> like</button>
        </div>
        <div>
          <strong>The blog was added by: </strong> {blog.user.username}
        </div>
        <div style = {{ display: blog.user.id === user.id ? '' : 'none' }}>
          <button onClick={() => confirm(blog)}>remove</button>
        </div>
      </div>
    </div>

  )}

Blog.propTypes = {
  values: PropTypes.object.isRequired,
}

export default Blog