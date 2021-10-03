import axios from 'axios';

const UserApi = axios.create({
  baseURL: process.env.REACT_APP_USER_API_ENDPOINT,
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
