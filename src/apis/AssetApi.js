import axios from 'axios';

const AssetApi = axios.create({
  baseURL: process.env.REACT_APP_ASSET_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

AssetApi.interceptors.request.use((req) => {
  const token = localStorage.getItem('access_token');

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default AssetApi;
