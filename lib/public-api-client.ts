const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://drivepixel.com/api';

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

class PublicApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers || {}),
        },
      });
      const data = await response.json();
      return data;
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Network error',
        error: error.message,
      };
    }
  }

  async getServices() {
    return this.request<any[]>('/public/services');
  }

  async getPortfolio() {
    return this.request<any[]>('/public/portfolio');
  }

  async getBlogPosts() {
    return this.request<any[]>('/public/blog');
  }

  async getBlogPost(slug: string) {
    return this.request(`/public/blog/${slug}`);
  }

  async getTestimonials() {
    return this.request<any[]>('/public/testimonials');
  }

  async getHeroTexts() {
    return this.request<any[]>('/public/hero-texts');
  }

  // Products (public)
  async getProducts(params?: { category?: string; search?: string }) {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.append('category', params.category);
    if (params?.search) searchParams.append('search', params.search);
    const query = searchParams.toString() ? `?${searchParams.toString()}` : '';
    return this.request<any[]>(`/public/products${query}`);
  }

  async getProduct(id: string) {
    return this.request(`/public/products/${id}`);
  }

  // Cart and checkout (public, session-based)
  private getSessionId() {
    if (typeof window === 'undefined') return undefined;
    return localStorage.getItem('cart_session_id') || undefined;
  }

  private persistSessionId(sessionId?: string) {
    if (typeof window === 'undefined') return;
    if (sessionId) {
      localStorage.setItem('cart_session_id', sessionId);
    }
  }

  async getCart() {
    const sessionId = this.getSessionId();
    const response = await this.request('/cart', {
      headers: sessionId ? { 'x-session-id': sessionId } : undefined,
    });
    if ((response as any)?.data?.sessionId) this.persistSessionId((response as any).data.sessionId);
    return response;
  }

  async addToCart(productId: string, quantity: number = 1) {
    const sessionId = this.getSessionId();
    const response = await this.request('/cart/add', {
      method: 'POST',
      headers: sessionId ? { 'x-session-id': sessionId } : undefined,
      body: JSON.stringify({ productId, quantity }),
    });
    if ((response as any)?.data?.sessionId) this.persistSessionId((response as any).data.sessionId);
    return response;
  }

  async updateCartItem(itemId: string, quantity: number) {
    const sessionId = this.getSessionId();
    const response = await this.request(`/cart/item/${itemId}`, {
      method: 'PUT',
      headers: sessionId ? { 'x-session-id': sessionId } : undefined,
      body: JSON.stringify({ quantity }),
    });
    if ((response as any)?.data?.sessionId) this.persistSessionId((response as any).data.sessionId);
    return response;
  }

  async removeCartItem(itemId: string) {
    const sessionId = this.getSessionId();
    const response = await this.request(`/cart/item/${itemId}`, {
      method: 'DELETE',
      headers: sessionId ? { 'x-session-id': sessionId } : undefined,
    });
    if ((response as any)?.data?.sessionId) this.persistSessionId((response as any).data.sessionId);
    return response;
  }

  async checkoutCart(payload: {
    customerName: string;
    customerEmail: string;
    customerPhone?: string;
    customerAddress: string;
    paymentProvider?: string;
  }) {
    const sessionId = this.getSessionId();
    const response = await this.request(`/cart/checkout`, {
      method: 'POST',
      headers: sessionId ? { 'x-session-id': sessionId } : undefined,
      body: JSON.stringify(payload),
    });
    if ((response as any)?.data?.sessionId) this.persistSessionId((response as any).data.sessionId);
    return response;
  }
}

export const publicApiClient = new PublicApiClient(API_BASE_URL);

