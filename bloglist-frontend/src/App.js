import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const [message, setMessage] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  const [blogVisible, setBlogVisible] = useState (false)

  //const [visibilityMap, setVisibilityMap] = useState(new Map())

  useEffect(() => {
    const fetchBlogs = async () => {
      const fetchedBlogs = await blogService.getAll()
      const blogCompar = (a, b) => {
        if (a.likes < b.likes) {
          return 1
        }
        if (b.likes < a.likes) {
          return -1
        }
        return 0
      }

      setBlogs( fetchedBlogs.sort(blogCompar) )
      //setVisibilityMap(new Map(mapBlogs(blogs)))
    }
    fetchBlogs()
      .catch(console.exception)
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  /*
  const mapBlogs = (blogsToMap) => {
    const blogMap = blogsToMap.reduce(
      (mappedBlogs, blog) => {
        mappedBlogs.set(blog.id, false)
        return mappedBlogs
      },
      new Map()
    )
    return blogMap
  }
  */

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const userResponse = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(userResponse)
      )
      setUser(userResponse)
      blogService.setToken(userResponse.token)
      setMessage(`successfully logged in as ${userResponse.username}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setUsername('')
      setPassword('')
    } catch (error) {
      setMessage('wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async () => {
    try {
      window.localStorage.clear()
      setMessage('successfully logged out')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setUser(null)
      loginService.setToken(null)
    } catch (exception) {
      //next(exception)
    }
  }

  const updateBlogs = async () => {
    const updatedblogs = await blogService.getAll()
    const blogCompar = (a, b) => {
      if (a.likes < b.likes) {
        return 1
      }
      if (b.likes < a.likes) {
        return -1
      }
      return 0
    }

    setBlogs( updatedblogs.sort(blogCompar) )


  }

  /*
  const createBlogForm = () => {
    const formObject = {
      setMessage : setMessage,
      setBlogVisible : setBlogVisible,
      updateBlogs : updateBlogs
    }
    return (
      formObject
    )
  }
  */

  const createLoginForm = () => {
    const formObject = {
      setUsername : setUsername,
      setPassword : setPassword,
      handleLogin : handleLogin,
      username : username,
      password : password
    }
    return (
      formObject
    )
  }

  /*
  const handleViewClick = (id) => {
    setVisibilityMap(new Map(visibilityMap.set(id, true)))
  }

  const handleCancelClick = (id) => {
    setVisibilityMap(new Map(visibilityMap.set(id, false)))
  }
  */

  const initBlog = (blog) => {
    const values = {
      blog: blog,
      user: user,
      //hidefunc: handleCancelClick,
      handleLike: handleLike,
      confirm: confirm
    }
    return (
      <Blog values={values}/>
    )
  }

  const handleLike = async (blog) => {
    try {
      await blogService.addLike(blog)
      await updateBlogs()
    } catch (exception) {
      //
    }
  }

  const confirm = async (blog) => {
    try {
      if (window.confirm(`Delete blog ${blog.title} ?`)) {
        await blogService.deleteBlog(blog)
      }
      await updateBlogs()
    } catch (exception) {
      //
    }
  }

  const createBlog = async (title, author, url) => {
    //console.log(props)
    const result = await blogService.create({
      title: title,
      author: author,
      url: url
      //likes: 1000
    })
    setMessage(
      `a new blog: ${title} by: ${author} was added`
    )
    setBlogVisible(false)
    updateBlogs()
    setTimeout(() => {
      setMessage(null)
    }, 5000)
    return result
  }


  if (user === null) {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }
    return (
      <div>
        <div style={hideWhenVisible}>
          <Notification message={message} />
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style = {showWhenVisible}>
          <div>
            <h2>Log in to application</h2>
            <Notification message={message} />
            <LoginForm {...createLoginForm()}/>
          </div>
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>

    )
  }
  const hideWhenVisible = { display: blogVisible ? 'none' : '' }
  const showWhenVisible = { display: blogVisible ? '' : 'none' }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <p>
        {user.username} logged in &nbsp;
        <button onClick={() => handleLogout(user)}> logout</button>
      </p>
      <ul>
        {blogs.map(blog =>
          <li key={blog.id}>
            {initBlog(blog)}
          </li>
        )}
      </ul>
      <h2>create new</h2>
      <div style={hideWhenVisible}>
        <button onClick={() => setBlogVisible(true)}>create new blog</button>
      </div>
      <div style={showWhenVisible}>
        <BlogForm createBlog = {createBlog}/>
        <button onClick={() => setBlogVisible(false)}>cancel</button>
      </div>
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="message">
      {message}
    </div>
  )
}


export default App