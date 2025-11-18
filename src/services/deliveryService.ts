import { apiClient } from './api';
import { authService } from './authService';
import type { DeliveryRequest } from './interfaces';

class DeliveryService {
  async getDeliveryRequests(): Promise<DeliveryRequest[]> {
    const token = authService.getToken();
    return apiClient.get('/delivery-requests/', token);
  }

  async updateDeliveryStatus(deliveryId: number, status: string): Promise<DeliveryRequest> {
    const token = authService.getToken();
    return apiClient.patch(`/delivery-requests/${deliveryId}/status/`, { status }, token);
  }

  async acceptDelivery(deliveryId: number): Promise<DeliveryRequest> {
    return this.updateDeliveryStatus(deliveryId, 'accepted');
  }

  async markPickup(deliveryId: number): Promise<DeliveryRequest> {
    return this.updateDeliveryStatus(deliveryId, 'pickup');
  }

  async markDelivered(deliveryId: number): Promise<DeliveryRequest> {
    return this.updateDeliveryStatus(deliveryId, 'delivered');
  }
}

export const deliveryService = new DeliveryService();