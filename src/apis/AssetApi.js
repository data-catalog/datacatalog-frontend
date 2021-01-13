import axios from 'axios';

const AssetApi = axios.create({
  baseURL: 'https://assethandlingservice.azurewebsites.net',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

const token = localStorage.getItem('access_token');
if (token) {
  AssetApi.defaults.headers.Authorization = `Bearer ${token}`;
}

export default AssetApi;
