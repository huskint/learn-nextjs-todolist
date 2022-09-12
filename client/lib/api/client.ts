import axios, { AxiosInstance } from 'axios';

const API_DEFAULT_TIMEOUT = 30 * 1000;

export const client: AxiosInstance = axios.create({
  baseURL: 'http://localhost:9052',
});
