import { apiClient } from './api';
import { authService } from './authService';
import type { MealType, MenuItem, ExtraItem, Hostel } from './interfaces';

class MenuService {
  async getMealTypes(): Promise<MealType[]> {
    const token = authService.getToken();
    return apiClient.get('/meal-types/', token);
  }

  async getMenuItems(mealType?: string, hostel?: number): Promise<MenuItem[]> {
    const token = authService.getToken();
    const params = new URLSearchParams();
    if (mealType) params.append('meal_type', mealType);
    if (hostel) params.append('hostel', hostel.toString());
    const query = params.toString() ? `?${params.toString()}` : '';
    return apiClient.get(`/menu-items/${query}`, token);
  }

  async getExtraItems(hostel?: number): Promise<ExtraItem[]> {
    const token = authService.getToken();
    const query = hostel ? `?hostel=${hostel}` : '';
    return apiClient.get(`/extra-items/${query}`, token);
  }

  async getHostels(): Promise<Hostel[]> {
    return apiClient.get('/hostels/');
  }
}

export const menuService = new MenuService();