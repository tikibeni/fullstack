import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const comment = async comment => {
  const config = {
    headers: { Authorization: token },
  }

  const res = await axios.post(`${baseUrl}/${comment.blogId}/comments`, comment, config)
  return res.data
}

const update = async updatedObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${ baseUrl }/${updatedObject.id}`, updatedObject, config)
  return response.data
}

const remove = async objectId => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.delete(`${baseUrl}/${objectId}`, config)
  return response.data
}

export default { getAll, create, update, remove, comment, setToken }
