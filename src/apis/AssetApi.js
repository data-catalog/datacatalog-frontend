import axios from 'axios';

const AssetApi = axios.create({
  baseURL: 'https://datacatalogassethandler.azurewebsites.net',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

export default AssetApi;
