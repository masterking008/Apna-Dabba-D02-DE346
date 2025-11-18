import React, { useState } from 'react';
import { searchService, MenuItem, Order } from '../../services';

const SearchScreen: React.FC = () => {
  const [query, setQuery] = useState('');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'menu' | 'orders'>('menu');

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      if (activeTab === 'menu') {
        const results = await searchService.searchMenuItems(query);
        setMenuItems(results);
      } else {
        const results = await searchService.searchOrders(query);
        setOrders(results);
      }
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white shadow-sm p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Search</h1>
        
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Search menu items or orders..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1 p-3 border border-gray-300 rounded-lg"
          />
          <button
            onClick={handleSearch}
            className="px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
          >
            Search
          </button>
        </div>

        <div className="flex gap-4">
          {['menu', 'orders'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as 'menu' | 'orders')}
              className={`px-4 py-2 rounded-lg font-medium capitalize ${
                activeTab === tab ? 'bg-indigo-500 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4">
        {loading ? (
          <div className="flex justify-center py-8">Loading...</div>
        ) : (
          <div className="space-y-3">
            {activeTab === 'menu' ? (
              menuItems.length > 0 ? (
                menuItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.meal_type.name} • {item.hostel.name}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.is_available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {item.is_available ? 'Available' : 'Not Available'}
                    </span>
                  </div>
                ))
              ) : query && (
                <div className="text-center py-8 text-gray-500">No menu items found</div>
              )
            ) : (
              orders.length > 0 ? (
                orders.map((order) => (
                  <div key={order.id} className="bg-white rounded-lg shadow-md p-4">
                    <h3 className="font-semibold">Order #{order.order_id}</h3>
                    <p className="text-sm text-gray-600">{order.meal_type.name} • ₹{order.total_amount}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                ))
              ) : query && (
                <div className="text-center py-8 text-gray-500">No orders found</div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchScreen;