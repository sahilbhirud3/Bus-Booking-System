import axios from 'axios';

// Create an Axios instance with the specified baseURL
const axiosInst = axios.create({
  baseURL: 'https://192.168.0.109:7071', // Set your base URL here
});

export { axiosInst }; // Export the axiosInstance for use in other files
