import type { AuthProvider } from "@refinedev/core";
import { IUser } from "../interfaces";
import { client, TOKEN_KEY } from "./httpClient";
import { Cookie } from "../utils";

type ResWithError<T> = T & {
  error: string;
  message: string;
  statusCode: number;
};

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    const res = await client.post<{ token: string }>("auth/login", { email, password });

    if (res.data.token) {
      Cookie.setCookie(TOKEN_KEY, res.data.token);
      return {
        success: true,
        redirectTo: "/phishing",
      };
    }

    return {
      success: false,
      error: {
        name: "LoginError",
        message: "Invalid username or password",
      },
    };
  },
  register: async (payload) => {
    const res = await client.post<ResWithError<{ token: string }>>("auth/register", payload);

    if (res.data.token) {
      Cookie.setCookie(TOKEN_KEY, res.data.token);
      return {
        success: true,
        redirectTo: "/phishing",
      };
    }

    return {
      success: false,
      redirectTo: "/register",
      error: {
        name: "RegistrationError",
        message: "Something went wrong",
      },
    };
  },
  logout: async () => {
    Cookie.removeCookie(TOKEN_KEY);

    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    try {
      const token = Cookie.getCookie(TOKEN_KEY);

      if (!token) throw new Error("No token");

      await client.get<IUser>("auth/identity");

      return { authenticated: true };
    } catch {
      Cookie.removeCookie(TOKEN_KEY);
      return { authenticated: false };
    }
  },
  getIdentity: async () => {
    try {
      const res = await client.get<IUser>("auth/identity");

      return res.data;
    } catch {
      Cookie.removeCookie(TOKEN_KEY);
      return null;
    }
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
