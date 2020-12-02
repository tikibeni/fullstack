import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

// Tarvitsee siis koko alkuperäisobjektin, muutetun kentän, objektin id:n ja userId:n
// - newobject on samalla alkper objekti ja uusi objekti
// - userId:n voi kaivaa objektin sisältä kohdasta userid
// - objektin id luulisi olevan newobjektin sisällä.
const update = async updatedObject => {
  const config = {
    headers: { Authorization: token }, 
  }

  const response = await axios.put(`${ baseUrl }/${updatedObject.id}`, updatedObject, config)
  return response.data
}

export default { getAll, create, update, setToken }