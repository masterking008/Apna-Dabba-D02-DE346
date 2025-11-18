import { apiClient } from './api';
import { authService } from './authService';
import type { User, MenuItem, Order, AdminStats, AdminDashboard } from './interfaces';

class AdminService {
  async getDashboard(): Promise<AdminDashboard> {
    const token = authService.getToken();
    return apiClient.get('/admin/dashboard/', token);
  }

  async getUsers(): Promise<User[]> {
    const token = authService.getToken();
    return apiClient.get('/admin/users/', token);
  }

  async createUser(userData: any): Promise<User> {
    const token = authService.getToken();
    return apiClient.post('/admin/users/', userData, token);
  }

  async getMenuItems(): Promise<MenuItem[]> {
    const token = authService.getToken();
    return apiClient.get('/admin/menu-items/', token);
  }

  async createMenuItem(itemData: any): Promise<MenuItem> {
    const token = authService.getToken();
    return apiClient.post('/admin/menu-items/', itemData, token);
  }
}

export const adminService = new AdminService();