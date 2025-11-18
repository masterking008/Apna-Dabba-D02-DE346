import { apiClient } from './api';
import { authService } from './authService';
import type { Wallet, Transaction } from './interfaces';

class WalletService {
  async getWallet(): Promise<Wallet> {
    const token = authService.getToken();
    return apiClient.get('/wallet/', token);
  }

  async addMoney(amount: number): Promise<Wallet> {
    const token = authService.getToken();
    return apiClient.post('/wallet/add-money/', { amount }, token);
  }

  async getTransactions(): Promise<Transaction[]> {
    const token = authService.getToken();
    return apiClient.get('/transactions/', token);
  }
}

export const walletService = new WalletService();