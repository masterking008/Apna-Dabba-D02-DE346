import { apiClient } from './api';
import { authService } from './authService';
import type { Favorite, CreateFavoriteData } from './interfaces';

class FavoriteService {
  async getFavorites(): Promise<Favorite[]> {
    const token = authService.getToken();
    return apiClient.get('/favorites/', token);
  }

  async addFavorite(menuItemId: number): Promise<Favorite> {
    const token = authService.getToken();
    return apiClient.post('/favorites/', { menu_item: menuItemId }, token);
  }

  async removeFavorite(favoriteId: number): Promise<void> {
    const token = authService.getToken();
    return apiClient.patch(`/favorites/${favoriteId}/`, {}, token);
  }
}

export const favoriteService = new FavoriteService();