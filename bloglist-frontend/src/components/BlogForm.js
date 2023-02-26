import { useState } from 'react'
//import blogService from '../services/blogs'

const BlogForm = ({
  createBlog
}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = async (event) => {
    event.preventDefault()
    try {
      await createBlog(title, author, url)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      //
    }
  }

  return (
    <form onSubmit={handleNewBlog}>
      <div>
            title:
        <input
          aria-label="title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
            author:
        <input
          aria-label="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
            url:
        <input
          aria-label="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>

      <button type="submit">add</button>
    </form>
  )
}

export default BlogForm
