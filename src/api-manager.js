import axios from 'axios'
const key = "4KF2rKFNdJveQHmJMauagz6e4IldVSyz9I9Z26DR"

export default {

    APOD: async () => await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${key}`).then(data => data),
    search: async query => await axios.get(`https://images-api.nasa.gov/search?q=${query}&media_type=image`).then(data => data),

    addPost: async post => await axios.post(`http://localhost:3001/image`, post),
    getPosts: async () => await axios.get(`http://localhost:3001/images`).then(data => data.data),
    deletePost: async id => await axios.delete(`http://localhost:3001/image/${id}`)
}