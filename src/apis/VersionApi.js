import axios from 'axios';

const VersionApi = axios.create({
  baseURL: 'https://versioningservice.azurewebsites.net',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

VersionApi.interceptors.request.use((req) => {
  const token = localStorage.getItem('access_token');

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default VersionApi;
