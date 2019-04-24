import axios from 'axios'

const server = axios.create({
    baseURL: 'http://35.247.191.104'
})

export default server