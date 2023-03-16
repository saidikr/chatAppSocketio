import axios from 'axios'

const instance = axios.create({
 //baseURL: "http://localhost:3555",
 baseURL: 'https://chatapp1007.onrender.com'
});

export default instance