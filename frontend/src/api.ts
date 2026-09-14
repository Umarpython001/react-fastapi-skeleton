import axios from 'axios';

const api: ReturnType<typeof axios.create> = axios.create({
  baseURL: 'http://localhost:8000', // URL of backend server

  // timeout: 10000, // Set a timeout for requests (in milliseconds)

});


export default api