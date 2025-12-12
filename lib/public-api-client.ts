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

  private async request<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`);
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
}

export const publicApiClient = new PublicApiClient(API_BASE_URL);

