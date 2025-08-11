import axios from "axios";

const baseURL = process.env.NODE_ENV === 'development'
  ? 'http://127.0.0.1:8000/api'
  : 'https://my-domain.com/api';

const iaxios = axios.create({
  baseURL: baseURL,
});

export default iaxios;

/**
 * Set token to Axios instance for authenticated requests
 * @param {string} token
 */
export function setTokenToAxios(token) {
  iaxios.defaults.headers.common['Authorization'] = `Token ${token}`;
}
