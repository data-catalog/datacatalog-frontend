import axios from 'axios';

const UserApi = axios.create({
  baseURL: 'https://userhandlingservice.azurewebsites.net',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

const token = localStorage.getItem('access_token');

UserApi.defaults.headers.Authorization = token ? `Bearer ${token}` : undefined;

export default UserApi;
