import axios from "axios";

import { storageKeys } from "../config/storageKeys";

export const token = localStorage.getItem(storageKeys.accessToken);

export const authClient = axios.create({
  baseURL: `${import.meta.env.VITE_APP_API_URL}`,
});

export const dataClient = axios.create({
  baseURL: `${import.meta.env.VITE_APP_API_URL}`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  },
});