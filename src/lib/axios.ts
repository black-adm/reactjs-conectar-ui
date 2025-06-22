import axios from "axios";

import { storageKeys } from "../config/storageKeys";

export const token = localStorage.getItem(storageKeys.accessToken);

export const httpClient = axios.create({
  baseURL: `${import.meta.env.VITE_APP_API_URL}`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  },
});