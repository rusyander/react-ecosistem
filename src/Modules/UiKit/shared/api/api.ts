import axios from "axios";

export const $api = axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "application/json",
    // authorization: localStorage.getItem(USER_LOCALSTORAGE_KEY) || '',
    authorization: "",
  },
});
