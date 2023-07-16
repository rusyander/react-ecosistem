import axios from 'axios';
import {
  USER_LOCALSTORAGE_KEY,
  USER_LANGUAGE,
  USER_LOCALSTORAGE_HEADER,
} from 'shared/const/localstorage';
const token: any = localStorage.getItem(USER_LOCALSTORAGE_KEY) || '';
const tok = token ? JSON.parse(token) : '';
const language = localStorage.getItem(USER_LANGUAGE) || '';
const sessionHeader = { ...tok, lang: language !== '' ? language : '1' };
localStorage.setItem(USER_LOCALSTORAGE_HEADER, JSON.stringify(sessionHeader));
const session = localStorage.getItem(USER_LOCALSTORAGE_HEADER) || '';

export const $api = axios.create({
  baseURL: __API__,
  headers: {
    'Content-Type': 'application/json',
    session: token !== undefined ? JSON.stringify(sessionHeader) : '',
    // session: session ? session : '',
  },
});

$api.interceptors.request.use(
  (config) => {
    const token: any = localStorage.getItem(USER_LOCALSTORAGE_KEY) || '';
    const tok = token ? JSON.parse(token) : '';
    const language = localStorage.getItem(USER_LANGUAGE) || '';
    const session = { ...tok, lang: language !== '' ? language : '1' };
    if (token) {
      config.headers.session = token ? JSON.stringify(sessionHeader) : '';
      // config.headers.session = session ? session : '';
    }
    return config;
  }
  // (error) => {
  //   return Promise.reject(error);
  // }
);
