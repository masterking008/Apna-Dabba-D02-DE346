import { apiClient } from './api';
import { authService } from './authService';
import type { StudentProfile, MessWorkerProfile, DeliveryPartnerProfile, UpdateProfileData } from './interfaces';

class ProfileService {
  async getProfile(): Promise<any> {
    const token = authService.getToken();
    const user = authService.getUser();
    
    if (user?.user_type === 'student') {
      return apiClient.get('/profile/student/', token);
    } else if (user?.user_type === 'mess_worker') {
      return apiClient.get('/profile/mess-worker/', token);
    } else if (user?.user_type === 'delivery_partner') {
      return apiClient.get('/profile/delivery-partner/', token);
    }
    
    return Promise.reject('Invalid user type');
  }

  async updateProfile(data: UpdateProfileData): Promise<any> {
    const token = authService.getToken();
    const user = authService.getUser();
    
    if (user?.user_type === 'student') {
      return apiClient.patch('/profile/student/', data, token);
    } else if (user?.user_type === 'mess_worker') {
      return apiClient.patch('/profile/mess-worker/', data, token);
    } else if (user?.user_type === 'delivery_partner') {
      return apiClient.patch('/profile/delivery-partner/', data, token);
    }
    
    return Promise.reject('Invalid user type');
  }

  async updateAvailability(isAvailable: boolean): Promise<DeliveryPartnerProfile> {
    const token = authService.getToken();
    return apiClient.patch('/profile/delivery-partner/', { is_available: isAvailable }, token);
  }
}

export const profileService = new ProfileService();