import { apiClient } from './api';
import { authService } from './authService';
import type { MenuAnalytics, OrderAnalytics, DeliveryAnalytics } from './interfaces';

class AnalyticsService {
  async getMenuAnalytics(startDate?: string, endDate?: string): Promise<MenuAnalytics[]> {
    const token = authService.getToken();
    const params = new URLSearchParams();
    if (startDate) params.append('start_date', startDate);
    if (endDate) params.append('end_date', endDate);
    const query = params.toString() ? `?${params.toString()}` : '';
    return apiClient.get(`/analytics/menu/${query}`, token);
  }

  async getOrderAnalytics(startDate?: string, endDate?: string): Promise<OrderAnalytics> {
    const token = authService.getToken();
    const params = new URLSearchParams();
    if (startDate) params.append('start_date', startDate);
    if (endDate) params.append('end_date', endDate);
    const query = params.toString() ? `?${params.toString()}` : '';
    return apiClient.get(`/analytics/orders/${query}`, token);
  }

  async getDeliveryAnalytics(startDate?: string, endDate?: string): Promise<DeliveryAnalytics> {
    const token = authService.getToken();
    const params = new URLSearchParams();
    if (startDate) params.append('start_date', startDate);
    if (endDate) params.append('end_date', endDate);
    const query = params.toString() ? `?${params.toString()}` : '';
    return apiClient.get(`/analytics/delivery/${query}`, token);
  }
}

export const analyticsService = new AnalyticsService();