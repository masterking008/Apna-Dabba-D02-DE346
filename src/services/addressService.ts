import { apiClient } from './api';
import { authService } from './authService';
import type { Address, CreateAddressData } from './interfaces';

class AddressService {
  async getAddresses(): Promise<Address[]> {
    const token = authService.getToken();
    return apiClient.get('/addresses/', token);
  }

  async createAddress(data: CreateAddressData): Promise<Address> {
    const token = authService.getToken();
    return apiClient.post('/addresses/', data, token);
  }
}

export const addressService = new AddressService();