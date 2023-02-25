import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const create = async newObject => {
  try {
    const config = {
      headers: { Authorization: token }
    }
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
  } catch (exception) {
    //
  }
}

const deleteBlog = async (blog) => {
  try {
    const config = {
      headers: { Authorization: token }
    }
    const response = await axios.delete(`${baseUrl}/${blog.id}`, config)
    return response.data
  } catch (exception) {
    //
  }
}

const addLike = async (blog) => {
  try {
    const response = await axios.put(`${baseUrl}/${blog.id}`, blog)
    return response.data
  } catch (exception) {
    //
  }
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { getAll, create, setToken, addLike, deleteBlog }