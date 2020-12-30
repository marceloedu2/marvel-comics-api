import axios from 'axios';
import md5 from 'md5';

const api = axios.create({
  baseURL: process.env.MARVEL_API_URL,
  params: {
    ts: 1,
    apikey: process.env.MARVEL_API_PUBLIC_KEY,
    hash: md5(
      `1${process.env.MARVEL_API_PRIVATE_KEY}${process.env.MARVEL_API_PUBLIC_KEY}`,
    ),
  },
});

export default api;
