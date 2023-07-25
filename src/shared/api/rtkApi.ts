import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  USER_LANGUAGE,
  USER_LOCALSTORAGE_KEY,
} from 'shared/const/localstorage';

export const rtkApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: __API__,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    prepareHeaders: (headers) => {
      const token: any = localStorage.getItem(USER_LOCALSTORAGE_KEY) || '';
      const tok = token ? JSON.parse(token) : '';
      const language = localStorage.getItem(USER_LANGUAGE) || '';
      const session = { ...tok, lang: language !== '' ? language : '1' };
      // 'Content-Type': 'application/json',
      // Accept: 'application/json',

      if (token) {
        headers.set('session', JSON.stringify(session));
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({}),
});
