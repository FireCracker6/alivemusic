import axios from "axios";

const instance = axios.create({
baseURL: 'http://localhost:5053/api/',
timeout: 5000, 
headers: {'Content-Type' : 'application/json'},
})

export default instance;