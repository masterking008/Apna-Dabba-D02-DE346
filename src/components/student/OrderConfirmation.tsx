import React, { useState, useEffect } from 'react';
import { orderService } from '../../services';
import type { Order } from '../../services';
import { useNavigate } from 'react-router-dom';

interface OrderConfirmationProps {
  onTrackOrder?: () => void;
  onReorder?: (orderId: string) => void;
  onHome?: () => void;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ onTrackOrder, onReorder, onHome }) => {
  const navigate = useNavigate();
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentOrders = async () => {
      try {
        const orders = await orderService.getOrders();
        setRecentOrders(orders.slice(0, 3));
      } catch (error) {
        console.error('Failed to fetch recent orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecentOrders();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Preparing': return 'bg-yellow-500';
      case 'Ready': return 'bg-blue-500';
      case 'Out for Delivery': return 'bg-orange-500';
      case 'Delivered': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="bg-white rounded-xl shadow-md p-6 text-center mb-6">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Order Confirmed!</h1>
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="text-lg font-semibold">Order ID: #{recentOrders[0]?.order_id || 'Loading...'}</div>
          <div className="text-gray-600">ETA: {recentOrders[0]?.estimated_delivery_time || '25-30 minutes'}</div>
        </div>
        
        <div className="flex items-center justify-center mb-6">
          <div className={`w-3 h-3 rounded-full mr-2 ${
            recentOrders[0]?.status === 'preparing' ? 'bg-yellow-500' :
            recentOrders[0]?.status === 'ready' ? 'bg-blue-500' :
            recentOrders[0]?.status === 'out_for_delivery' ? 'bg-orange-500' :
            recentOrders[0]?.status === 'delivered' ? 'bg-green-500' : 'bg-gray-500'
          }`}></div>
          <span className="text-sm font-medium capitalize">{recentOrders[0]?.status || 'Preparing'}</span>
        </div>

        <div className="space-y-3">
          <button
            onClick={onTrackOrder}
            className="w-full bg-indigo-500 text-white py-3 rounded-lg font-semibold hover:bg-indigo-600 transition-colors"
          >
            Track Order
          </button>
          <button
            onClick={onHome}
            className="w-full border border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Re-order</h3>
        {loading ? (
          <div className="flex justify-center py-4">Loading...</div>
        ) : (
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">{order.meal_type.name}</div>
                  <div className="text-sm text-gray-600">{new Date(order.created_at).toLocaleDateString()}</div>
                  <div className="text-sm text-gray-500">₹{order.total_amount}</div>
                </div>
                <button
                  onClick={() => onReorder?.(order.order_id)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
                >
                  Reorder
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderConfirmation;