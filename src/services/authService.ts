import { apiClient } from './api';

import type { LoginData, RegisterData, User, AuthResponse } from './interfaces';

class AuthService {
  private token: string | null = null;
  private user: User | null = null;

  constructor() {
    this.token = localStorage.getItem('token') || 'mock-token-123';
    const userData = localStorage.getItem('user');
    this.user = userData ? JSON.parse(userData) : null;
    
    // Auto-login with mock user for development
    if (!this.user) {
      this.user = {
        id: 1,
        username: 'student1',
        email: 'student1@example.com',
        first_name: 'Rahul',
        last_name: 'Sharma',
        user_type: 'student',
        phone: '+91 9876543210',
        is_verified: true
      };
      localStorage.setItem('user', JSON.stringify(this.user));
      localStorage.setItem('token', this.token);
    }
  }

  async login(data: LoginData): Promise<AuthResponse> {
    const response = await apiClient.post('/auth/login/', data);
    if (response.token) {
      this.token = response.token;
      this.user = response.user;
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    return response;
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiClient.post('/auth/register/', data);
    if (response.token) {
      this.token = response.token;
      this.user = response.user;
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    return response;
  }

  logout(): void {
    this.token = null;
    this.user = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getToken(): string | null {
    return this.token;
  }

  getUser(): User | null {
    return this.user;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }
}

export const authService = new AuthService();