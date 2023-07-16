import axios from 'axios';
import {
  USER_LOCALSTORAGE_KEY,
  USER_LANGUAGE,
} from 'shared/const/localstorage';
const token: any = localStorage.getItem(USER_LOCALSTORAGE_KEY) || '';
const tok = token ? JSON.parse(token) : '';
const language = localStorage.getItem(USER_LANGUAGE) || '';
const session = { ...tok, lang: language !== '' ? language : '1' };

export const $api = axios.create({
  baseURL: __API__,
  headers: {
    'Content-Type': 'application/json',
    // session: token !== undefined ? JSON.stringify(session) : '',
    session: token ? JSON.stringify(session) : '',
  },
});

$api.interceptors.request.use(
  (config) => {
    const token: any = localStorage.getItem(USER_LOCALSTORAGE_KEY) || '';
    const tok = token ? JSON.parse(token) : '';
    const language = localStorage.getItem(USER_LANGUAGE) || '';
    const session = { ...tok, lang: language !== '' ? language : '1' };
    if (token) {
      config.headers.session = token ? JSON.stringify(session) : '';
    }
    return config;
  }
  // (error) => {
  //   return Promise.reject(error);
  // }
);
