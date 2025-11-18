import { apiClient } from './api';
import { authService } from './authService';
import type { Feedback, CreateFeedbackData } from './interfaces';

class FeedbackService {
  async getFeedbacks(): Promise<Feedback[]> {
    const token = authService.getToken();
    return apiClient.get('/feedbacks/', token);
  }

  async createFeedback(data: CreateFeedbackData): Promise<Feedback> {
    const token = authService.getToken();
    return apiClient.post('/feedbacks/', data, token);
  }

  async getFeedbackByOrder(orderId: string): Promise<Feedback[]> {
    const token = authService.getToken();
    return apiClient.get(`/feedbacks/?order_id=${orderId}`, token);
  }
}

export const feedbackService = new FeedbackService();