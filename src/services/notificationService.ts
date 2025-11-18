import { apiClient } from './api';
import { authService } from './authService';
import type { Notification } from './interfaces';

class NotificationService {
  async getNotifications(): Promise<Notification[]> {
    const token = authService.getToken();
    return apiClient.get('/notifications/', token);
  }

  async markAsRead(notificationId: number): Promise<void> {
    const token = authService.getToken();
    return apiClient.patch(`/notifications/${notificationId}/read/`, {}, token);
  }
}

export const notificationService = new NotificationService();