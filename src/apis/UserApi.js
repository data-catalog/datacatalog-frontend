import axios from 'axios';

const UserApi = axios.create({
  baseURL: 'https://datacatalogregistryuserhandletest.azurewebsites.net',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

const token = localStorage.getItem('access_token');
if (token) {
  UserApi.defaults.headers.Authorization = `Bearer ${token}`;
}

export default UserApi;
