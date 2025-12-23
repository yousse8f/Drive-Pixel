import { getUserToken, setUserToken, clearUserToken } from "./client-auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://www.drivepixel.com/api";

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

const authHeaders = (): Record<string, string> => {
  const token = getUserToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const buildHeaders = (options?: RequestInit): HeadersInit => {
  const headers = new Headers();
  headers.set("Content-Type", "application/json");

  const auth = authHeaders();
  Object.entries(auth).forEach(([k, v]) => headers.set(k, v));

  if (options?.headers) {
    const opt = options.headers;
    if (opt instanceof Headers) {
      opt.forEach((v, k) => headers.set(k, v));
    } else if (Array.isArray(opt)) {
      opt.forEach(([k, v]) => headers.set(k, v));
    } else {
      Object.entries(opt as Record<string, string>).forEach(([k, v]) => headers.set(k, v as string));
    }
  }
  return headers;
};

const request = async <T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> => {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: buildHeaders(options),
  });
  const data = await res.json();
  return data;
};

export const customerApi = {
  login: async (email: string, password: string) => {
    const resp = await request<{ user: any; token: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    if (resp.success && resp.data?.token) {
      setUserToken(resp.data.token);
    }
    return resp;
  },
  logout: () => {
    clearUserToken();
  },
  validateFirstLogin: async (token: string) =>
    request<{ email: string }>("/auth/first-login/validate?token=" + encodeURIComponent(token)),
  completeFirstLogin: async (token: string, password: string) => {
    const resp = await request<{ token: string; user: any }>("/auth/first-login", {
      method: "POST",
      body: JSON.stringify({ token, password }),
    });
    if (resp.success && resp.data?.token) {
      setUserToken(resp.data.token);
    }
    return resp;
  },
  me: async () => request<{ id: string; email: string; firstName: string; lastName: string; role: string }>("/me"),
  orders: async () =>
    request<
      {
        id: string;
        total: number;
        paymentStatus: string;
        status: string;
        subscriptionType: string;
        createdAt: string;
        items: { name: string; quantity: number; priceEach: number }[];
      }[]
    >("/me/orders"),
  billing: async () =>
    request<
      { id: string; amount: number; status: string; provider: string; reference: string; createdAt: string }[]
    >("/me/billing"),
  updatePassword: async (currentPassword: string, newPassword: string) =>
    request("/me/password", {
      method: "POST",
      body: JSON.stringify({ currentPassword, newPassword }),
    }),
};
