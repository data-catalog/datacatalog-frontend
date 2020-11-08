import axios from 'axios';

const Api = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

const token = localStorage.getItem('access_token');
if (token) {
  Api.defaults.headers.Authorization = `Bearer ${token}`;
}

export default Api;
