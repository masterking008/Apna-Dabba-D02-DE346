import { apiClient } from './api';
import { authService } from './authService';
import type { Order, CreateOrderData } from './interfaces';

class OrderService {
  async getOrders(): Promise<Order[]> {
    const token = authService.getToken();
    return apiClient.get('/orders/', token);
  }

  async createOrder(data: CreateOrderData): Promise<Order> {
    const token = authService.getToken();
    return apiClient.post('/orders/', data, token);
  }

  async updateOrderStatus(orderId: number | string, status: string): Promise<Order> {
    const token = authService.getToken();
    return apiClient.patch(`/orders/${orderId}/status/`, { status }, token);
  }

  async getMessOrders(): Promise<Order[]> {
    const token = authService.getToken();
    return apiClient.get('/orders/mess/', token);
  }
}

export const orderService = new OrderService();