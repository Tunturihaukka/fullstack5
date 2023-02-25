import '../index.css'
import PropTypes from 'prop-types'

const Blog = ({ values }) => {
  const { blog, hidefunc, handleLike } = values

  const updatedBlog = {
    id: blog.id,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes + 1,
    user: blog.user
  }

  return(
    <div>
      <div className="container">
        {blog.title} {blog.author}&nbsp;
        <button onClick={() => hidefunc(blog.id)}>hide</button>
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
    </div>

  )}

Blog.propTypes = {
  values: PropTypes.object.isRequired,
}

export default Blog