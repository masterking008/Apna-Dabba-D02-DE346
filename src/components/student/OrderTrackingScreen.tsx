import React, { useState, useEffect } from 'react';
import { orderService } from '../../services';
import type { Order } from '../../services';

interface OrderTrackingScreenProps {
  orderId?: string;
  onBack?: () => void;
}

const OrderTrackingScreen: React.FC<OrderTrackingScreenProps> = ({ orderId, onBack }) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) return;
      try {
        const orders = await orderService.getOrders();
        const foundOrder = orders.find(o => o.order_id === orderId);
        setOrder(foundOrder || null);
      } catch (error) {
        console.error('Failed to fetch order:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (!order) {
    return <div className="flex justify-center items-center h-64">Order not found</div>;
  }

  const statusSteps = [
    { status: 'Placed', completed: true, time: '12:30 PM' },
    { status: 'Accepted', completed: true, time: '12:32 PM' },
    { status: 'Preparing', completed: true, time: '12:35 PM' },
    { status: 'Ready', completed: true, time: '12:50 PM' },
    { status: 'Out for Delivery', completed: true, time: '1:00 PM' },
    { status: 'Delivered', completed: false, time: '' }
  ];

  const getStatusColor = (status: string, completed: boolean) => {
    if (!completed) return 'bg-gray-300';
    switch (status) {
      case 'Placed': return 'bg-blue-500';
      case 'Accepted': return 'bg-green-500';
      case 'Preparing': return 'bg-yellow-500';
      case 'Ready': return 'bg-blue-500';
      case 'Out for Delivery': return 'bg-orange-500';
      case 'Delivered': return 'bg-green-500';
      default: return 'bg-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center mb-4">
          <button onClick={onBack} className="text-indigo-500 mr-4">← Back</button>
          <h1 className="text-xl font-bold">Track Order</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="text-center mb-6">
            <h2 className="text-lg font-semibold">Order #{order.order_id}</h2>
            <p className="text-2xl font-bold text-orange-600 mt-2 capitalize">{order.status}</p>
            <p className="text-gray-600">ETA: {order.estimated_delivery_time}</p>
          </div>

          <div className="space-y-4">
            {statusSteps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-4 h-4 rounded-full ${getStatusColor(step.status, step.completed)} flex-shrink-0`}></div>
                <div className="ml-4 flex-1">
                  <div className="flex justify-between items-center">
                    <span className={`font-medium ${step.completed ? 'text-gray-800' : 'text-gray-400'}`}>
                      {step.status}
                    </span>
                    <span className="text-sm text-gray-500">{step.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Delivery Partner</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-2xl">🏍️</span>
              </div>
              <div>
                <div className="font-medium">Delivery Partner</div>
                <div className="text-sm text-gray-600">Contact via app</div>
              </div>
            </div>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm">
              Call
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold">
            🗺️ Live Location
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingScreen;