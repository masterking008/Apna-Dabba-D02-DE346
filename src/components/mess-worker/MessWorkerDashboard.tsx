import React, { useState, useEffect } from 'react';
import { Bell, CheckCircle } from 'lucide-react';
import { orderService } from '../../services';
import type { Order } from '../../services';

const MessWorkerDashboard: React.FC = () => {
  const [sortBy, setSortBy] = useState('time');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await orderService.getMessOrders();
        setOrders(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleOrderAction = async (orderId: number, action: 'accept' | 'decline' | 'ready') => {
    try {
      await orderService.updateOrderStatus(orderId, action);
      const updatedOrders = await orderService.getMessOrders();
      setOrders(Array.isArray(updatedOrders) ? updatedOrders : []);
    } catch (error) {
      console.error('Failed to update order:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-blue-100 text-blue-800';
      case 'ready': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="bg-gray-50">
      <div className="bg-white shadow-sm p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Mess Dashboard</h1>
          <div className="relative">
            <Bell size={24} className="text-gray-600" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {orders.filter(o => o.status === 'pending').length}
            </span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="time">Sort by Time</option>
            <option value="meal">Sort by Meal</option>
            <option value="hostel">Sort by Hostel</option>
          </select>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {orders.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No orders available</div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl shadow-md p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-lg">{order.user?.username || 'Student'}</h3>
                  <p className="text-gray-600 text-sm">{order.meal_type} • {order.hostel || 'Hostel'}</p>
                  <p className="text-gray-500 text-sm">{new Date(order.created_at).toLocaleTimeString()}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                  {order.status.toUpperCase()}
                </span>
              </div>
              
              <div className="flex gap-2">
                {order.status === 'pending' && (
                  <>
                    <button 
                      onClick={() => handleOrderAction(order.id, 'accept')}
                      className="flex-1 bg-green-500 text-white py-2 rounded-lg text-sm font-medium"
                    >
                      Accept
                    </button>
                    <button 
                      onClick={() => handleOrderAction(order.id, 'decline')}
                      className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm font-medium"
                    >
                      Decline
                    </button>
                  </>
                )}
                {order.status === 'accepted' && (
                  <button 
                    onClick={() => handleOrderAction(order.id, 'ready')}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg text-sm font-medium"
                  >
                    Mark Ready
                  </button>
                )}
                {order.status === 'ready' && (
                  <div className="w-full text-center py-2 text-green-600 font-medium flex items-center justify-center gap-2">
                    <CheckCircle size={16} /> Ready for Pickup
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MessWorkerDashboard;