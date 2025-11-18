import React, { useState, useEffect } from 'react';
import { orderService } from '../../services';
import type { Order } from '../../services';

interface StudentHistoryTabProps {
  onTrackOrder?: (orderId: string) => void;
}

const StudentHistoryTab: React.FC<StudentHistoryTabProps> = ({ onTrackOrder }) => {
  const [filter, setFilter] = useState('all');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await orderService.getOrders();
        setOrders(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOrders = filter === 'all' ? orders : orders.filter(order => order.status === filter);

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="bg-gray-50">
      <div className="bg-white shadow-sm p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Order History</h1>
        
        <div className="flex gap-2 overflow-x-auto">
          {['all', 'delivered', 'cancelled'].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap capitalize ${
                filter === filterType ? 'bg-indigo-500 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              {filterType}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl shadow-md p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-lg">Order #{order.order_id}</h3>
                  <p className="text-gray-600 text-sm">{order.meal_type?.name || 'N/A'} • {new Date(order.created_at).toLocaleDateString()}</p>
                  <div className="text-sm text-gray-500 mt-1">
                    {order.items?.map(item => item.name).join(', ') || 'No items'}
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status.toUpperCase()}
                  </span>
                  <div className="text-lg font-bold text-gray-800 mt-1">₹{order.total_amount}</div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => onTrackOrder?.(order.order_id)}
                  className="flex-1 bg-indigo-500 text-white py-2 rounded-lg text-sm font-medium"
                >
                  Reorder
                </button>
                {order.status === 'delivered' && (
                  <button className="flex-1 border border-gray-300 py-2 rounded-lg text-sm font-medium">
                    Rate Order
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="text-4xl mb-4">📋</div>
            <h3 className="text-lg font-semibold text-gray-800">No Orders Found</h3>
            <p className="text-gray-600">No orders match the selected filter</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentHistoryTab;