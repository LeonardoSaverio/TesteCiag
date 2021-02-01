import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ciag-assets.s3.amazonaws.com/produtos.json',
})

export default api;