import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/', // Note a barra no final
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;