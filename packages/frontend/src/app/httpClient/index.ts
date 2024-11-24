import axios from "axios";
import { Cookie } from "../../utils";

export const API_URL =
  process.env.NODE_ENV === "production"
    ? `${import.meta.env.VITE_API_URL}`
    : "http://localhost:5000";

export const TOKEN_KEY = "auth";

export const client = axios.create({
  baseURL: API_URL,
});

client.interceptors.request.use(
  async (config: any) => {
    const token = Cookie.getCookie(TOKEN_KEY);

    config.headers = {
      Authorization: `Bearer ${token}`,
    };

    return config;
  },
  (error) => Promise.reject(error),
);
