import axios from 'axios';

const UserApi = axios.create({
  baseURL: 'https://userhandlingservice.azurewebsites.net',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

UserApi.interceptors.request.use((req) => {
  const token = localStorage.getItem('access_token');

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});
export default UserApi;
