import {
  mockMealTypes, mockMenuItems, mockExtraItems, mockHostels, mockOrders,
  mockUsers, mockWallet, mockTransactions, mockAddresses, mockNotifications,
  mockFavorites, mockDeliveryRequests, mockUserProfile, mockStudentProfile,
  mockMessWorkerProfile, mockDeliveryPartnerProfile, mockMenuAnalytics,
  mockOrderAnalytics, mockDeliveryAnalytics, mockFeedback, mockAdminStats
} from './mockData';

const API_BASE_URL = '/apnadabba';
const USE_MOCK_DATA = true; // Set to false to use real API

// Mock API responses
const mockResponses: Record<string, any> = {
  '/meal-types/': mockMealTypes,
  '/menu-items/': mockMenuItems,
  '/extra-items/': mockExtraItems,
  '/hostels/': mockHostels,
  '/orders/': mockOrders,
  '/wallet/': mockWallet,
  '/wallet/transactions/': mockTransactions,
  '/addresses/': mockAddresses,
  '/notifications/': mockNotifications,
  '/favorites/': mockFavorites,
  '/delivery-requests/': mockDeliveryRequests,
  '/profile/': mockUserProfile,
  '/profile/student/': mockStudentProfile,
  '/profile/mess-worker/': mockMessWorkerProfile,
  '/profile/delivery-partner/': mockDeliveryPartnerProfile,
  '/analytics/menu/': mockMenuAnalytics,
  '/analytics/orders/': mockOrderAnalytics,
  '/analytics/delivery/': mockDeliveryAnalytics,
  '/feedback/': mockFeedback,
  '/admin/stats/': mockAdminStats,
  '/auth/login/': { token: 'mock-token-123', user: mockUsers[0] },
  '/auth/register/': { token: 'mock-token-123', user: mockUsers[0] },
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const apiClient = {
  get: async (endpoint: string, token?: string) => {
    if (USE_MOCK_DATA) {
      await delay(300); // Simulate network delay
      const cleanEndpoint = endpoint.split('?')[0]; // Remove query params for mock lookup
      const mockData = mockResponses[cleanEndpoint];
      if (mockData !== undefined) {
        return mockData;
      }
      throw new Error(`Mock data not found for endpoint: ${endpoint}`);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Token ${token}` }),
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
    }
    
    return response.json();
  },

  post: async (endpoint: string, data: any, token?: string) => {
    if (USE_MOCK_DATA) {
      await delay(500); // Simulate network delay
      const mockData = mockResponses[endpoint];
      if (mockData !== undefined) {
        return mockData;
      }
      // For POST requests, return success response
      return { success: true, message: 'Operation completed successfully', data };
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Token ${token}` }),
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
    }
    
    return response.json();
  },

  patch: async (endpoint: string, data: any, token?: string) => {
    if (USE_MOCK_DATA) {
      await delay(400); // Simulate network delay
      return { success: true, message: 'Updated successfully', data };
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Token ${token}` }),
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  delete: async (endpoint: string, token?: string) => {
    if (USE_MOCK_DATA) {
      await delay(300);
      return { success: true, message: 'Deleted successfully' };
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Token ${token}` }),
      },
    });
    return response.json();
  },
};