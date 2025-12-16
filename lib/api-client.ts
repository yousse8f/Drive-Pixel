const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://www.drivepixel.com/api';

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('admin_token');
    }
  }

  setToken(token: string | null) {
    this.token = token;
    if (token && typeof window !== 'undefined') {
      localStorage.setItem('admin_token', token);
    } else if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_token');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...headers,
          ...options.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Request failed');
      }

      return data;
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Network error',
        error: error.message,
      };
    }
  }

  // Auth
  async login(email: string, password: string) {
    const response = await this.request<{ user: any; token: string }>(
      '/auth/login',
      {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }
    );
    if (response.success && response.data?.token) {
      this.setToken(response.data.token);
    }
    return response;
  }

  async signup(firstName: string, lastName: string, email: string, password: string) {
    return this.request<{ user: any; token?: string }>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ firstName, lastName, email, password }),
    });
  }

  async logout() {
    this.setToken(null);
  }

  // Users
  async getUsers(page = 1, limit = 50) {
    return this.request<{ users: any[]; pagination: any }>(`/users?page=${page}&limit=${limit}`);
  }

  async getUser(id: string) {
    return this.request(`/users/${id}`);
  }

  async updateUser(id: string, data: any) {
    return this.request(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteUser(id: string) {
    return this.request(`/users/${id}`, {
      method: 'DELETE',
    });
  }

  // Admin - Products
  async getProducts(includeInactive = true) {
    return this.request<any[]>(`/admin/products?includeInactive=${includeInactive}`);
  }

  async getProduct(id: string) {
    return this.request<any>(`/admin/products/${id}`);
  }

  async createProduct(data: any) {
    return this.request('/admin/products', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateProduct(id: string, data: any) {
    return this.request(`/admin/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteProduct(id: string) {
    return this.request(`/admin/products/${id}`, {
      method: 'DELETE',
    });
  }

  // Analytics
  async getDashboardStats() {
    return this.request('/admin/analytics/dashboard');
  }

  async getLeadsAnalytics(period = '30') {
    return this.request(`/admin/analytics/leads?period=${period}`);
  }

  async getContentAnalytics() {
    return this.request('/admin/analytics/content');
  }

  // Content - Services
  async getServices(includeInactive = false) {
    return this.request<any[]>(`/admin/content/services?includeInactive=${includeInactive}`);
  }

  async createService(data: any) {
    return this.request('/admin/content/services', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateService(id: string, data: any) {
    return this.request(`/admin/content/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteService(id: string) {
    return this.request(`/admin/content/services/${id}`, {
      method: 'DELETE',
    });
  }

  // Content - Portfolio
  async getPortfolio(includeInactive = false) {
    return this.request<any[]>(`/admin/content/portfolio?includeInactive=${includeInactive}`);
  }

  async createPortfolio(data: any) {
    return this.request('/admin/content/portfolio', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updatePortfolio(id: string, data: any) {
    return this.request(`/admin/content/portfolio/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deletePortfolio(id: string) {
    return this.request(`/admin/content/portfolio/${id}`, {
      method: 'DELETE',
    });
  }

  // Content - Blog
  async getBlogPosts(includeUnpublished = false) {
    return this.request<any[]>(`/admin/content/blog?includeUnpublished=${includeUnpublished}`);
  }

  async createBlogPost(data: any) {
    return this.request('/admin/content/blog', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateBlogPost(id: string, data: any) {
    return this.request(`/admin/content/blog/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteBlogPost(id: string) {
    return this.request(`/admin/content/blog/${id}`, {
      method: 'DELETE',
    });
  }

  // Content - Testimonials
  async getTestimonials(includeInactive = false) {
    return this.request<any[]>(`/admin/content/testimonials?includeInactive=${includeInactive}`);
  }

  async createTestimonial(data: any) {
    return this.request('/admin/content/testimonials', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateTestimonial(id: string, data: any) {
    return this.request(`/admin/content/testimonials/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteTestimonial(id: string) {
    return this.request(`/admin/content/testimonials/${id}`, {
      method: 'DELETE',
    });
  }

  // Chatbot (admin)
  async getChatSessions(params?: { page?: number; limit?: number; email?: string; dateFrom?: string; dateTo?: string }) {
    const search = new URLSearchParams();
    if (params?.page) search.append('page', String(params.page));
    if (params?.limit) search.append('limit', String(params.limit));
    if (params?.email) search.append('email', params.email);
    if (params?.dateFrom) search.append('dateFrom', params.dateFrom);
    if (params?.dateTo) search.append('dateTo', params.dateTo);
    const query = search.toString() ? `?${search.toString()}` : '';
    return this.request(`/admin/chat/sessions${query}`);
  }

  async getChatMessages(sessionId: string) {
    return this.request(`/admin/chat/sessions/${sessionId}/messages`);
  }

  // Admin - Orders
  async getOrders() {
    return this.request<any[]>(`/admin/orders`);
  }

  async getOrder(id: string) {
    return this.request(`/admin/orders/${id}`);
  }

  async updateOrderStatus(id: string, data: { status?: string; paymentStatus?: string }) {
    return this.request(`/admin/orders/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Content - Hero Texts
  async getHeroTexts(includeInactive = false) {
    return this.request<any[]>(`/admin/content/hero-texts?includeInactive=${includeInactive}`);
  }

  async createHeroText(data: any) {
    return this.request('/admin/content/hero-texts', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateHeroText(id: string, data: any) {
    return this.request(`/admin/content/hero-texts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteHeroText(id: string) {
    return this.request(`/admin/content/hero-texts/${id}`, {
      method: 'DELETE',
    });
  }

  // Settings
  async getSettings(key?: string) {
    return this.request<any[]>(key ? `/admin/settings?key=${key}` : '/admin/settings');
  }

  async createSetting(data: any) {
    return this.request('/admin/settings', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateSetting(key: string, data: any) {
    return this.request(`/admin/settings/${key}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteSetting(key: string) {
    return this.request(`/admin/settings/${key}`, {
      method: 'DELETE',
    });
  }

  // Logs
  async getLogs(params: any = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request<{ logs: any[]; pagination: any }>(`/admin/logs?${queryString}`);
  }

  async getLog(id: string) {
    return this.request(`/admin/logs/${id}`);
  }

  async deleteLog(id: string) {
    return this.request(`/admin/logs/${id}`, {
      method: 'DELETE',
    });
  }

  // Leads
  async getLeads() {
    return this.request<any[]>('/leads');
  }

  async createLead(data: any) {
    return this.request('/leads', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateLead(id: string, data: any) {
    return this.request(`/leads/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteLead(id: string) {
    return this.request(`/leads/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);

