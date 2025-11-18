import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { favoriteService } from '../../services';
import type { Favorite } from '../../services';

const FavoritesScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState('favorites');
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await favoriteService.getFavorites();
        setFavorites(data);
      } catch (error) {
        console.error('Failed to fetch favorites:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, []);

  const removeFavorite = async (favoriteId: number) => {
    try {
      await favoriteService.removeFavorite(favoriteId);
      setFavorites(prev => prev.filter(f => f.id !== favoriteId));
    } catch (error) {
      console.error('Failed to remove favorite:', error);
    }
  };

  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    favoriteAvailable: true,
    paymentAlerts: true,
    deliveryUpdates: true,
    promotions: false
  });

  const handleNotificationToggle = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  return (
    <div className="bg-gray-50">
      <div className="bg-white shadow-sm p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Favorites & Settings</h1>
        
        <div className="flex gap-4">
          {['favorites', 'notifications'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg font-medium transition-colors capitalize ${
                activeTab === tab ? 'bg-indigo-500 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'favorites' && (
        <div className="p-4 space-y-4">
          <div className="bg-white rounded-xl shadow-md p-4">
            <h3 className="text-lg font-semibold mb-4">Favorite Meals</h3>
            {loading ? (
              <div className="flex justify-center py-8">Loading...</div>
            ) : favorites.length > 0 ? (
              <div className="space-y-3">
                {favorites.map((favorite) => (
                  <div key={favorite.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{favorite.menu_item.name}</h4>
                      <p className="text-sm text-gray-600">{favorite.menu_item.meal_type.name} • {favorite.menu_item.hostel.name}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        favorite.menu_item.is_available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {favorite.menu_item.is_available ? 'Available' : 'Not Available'}
                      </span>
                      <button 
                        onClick={() => removeFavorite(favorite.id)}
                        className="text-red-500 text-sm hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="flex justify-center mb-4"><Heart size={48} className="text-red-500" /></div>
                <p className="text-gray-600">No favorite meals yet</p>
                <p className="text-sm text-gray-500">Add meals to favorites while ordering</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'notifications' && (
        <div className="p-4 space-y-4">
          <div className="bg-white rounded-xl shadow-md p-4">
            <h3 className="text-lg font-semibold mb-4">Notification Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Order Updates</h4>
                  <p className="text-sm text-gray-600">Notifications about order status</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.orderUpdates}
                    onChange={() => handleNotificationToggle('orderUpdates')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Favorite Available</h4>
                  <p className="text-sm text-gray-600">When your favorite meals are available</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.favoriteAvailable}
                    onChange={() => handleNotificationToggle('favoriteAvailable')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Payment Alerts</h4>
                  <p className="text-sm text-gray-600">Payment confirmations and failures</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.paymentAlerts}
                    onChange={() => handleNotificationToggle('paymentAlerts')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Delivery Updates</h4>
                  <p className="text-sm text-gray-600">Real-time delivery tracking</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.deliveryUpdates}
                    onChange={() => handleNotificationToggle('deliveryUpdates')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Promotions</h4>
                  <p className="text-sm text-gray-600">Special offers and discounts</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.promotions}
                    onChange={() => handleNotificationToggle('promotions')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoritesScreen;