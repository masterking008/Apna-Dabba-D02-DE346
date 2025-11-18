import { apiClient } from './api';
import { authService } from './authService';
import type { MenuItem, Order, SearchResults } from './interfaces';

class SearchService {
  async searchMenuItems(query: string, mealType?: string, hostel?: number): Promise<MenuItem[]> {
    const token = authService.getToken();
    const params = new URLSearchParams();
    params.append('q', query);
    if (mealType) params.append('meal_type', mealType);
    if (hostel) params.append('hostel', hostel.toString());
    return apiClient.get(`/search/menu-items/?${params.toString()}`, token);
  }

  async searchOrders(query: string, status?: string): Promise<Order[]> {
    const token = authService.getToken();
    const params = new URLSearchParams();
    params.append('q', query);
    if (status) params.append('status', status);
    return apiClient.get(`/search/orders/?${params.toString()}`, token);
  }

  async globalSearch(query: string): Promise<SearchResults> {
    const token = authService.getToken();
    return apiClient.get(`/search/?q=${encodeURIComponent(query)}`, token);
  }
}

export const searchService = new SearchService();