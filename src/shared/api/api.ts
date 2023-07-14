import axios from 'axios';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

export const $api = axios.create({
  baseURL: __API__,
  headers: {
    'Content-Type': 'application/json',
    // authorization: localStorage.getItem(USER_LOCALSTORAGE_KEY) || '',
    // user: localStorage.getItem(USER_LOCALSTORAGE_KEY[1]) || '',
    // session: localStorage.getItem(USER_LOCALSTORAGE_KEY) || '',
    session: localStorage.getItem(USER_LOCALSTORAGE_KEY) || '',
  },
});

$api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(USER_LOCALSTORAGE_KEY);
    if (token) {
      config.headers.session = token;
    }
    return config;
  }
  // (error) => {
  //   return Promise.reject(error);
  // }
);
