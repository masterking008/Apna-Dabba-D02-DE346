import React, { useState } from 'react';

const DeliveryPartnerDashboard: React.FC = () => {
  const [deliveryRequests] = useState([
    { id: 'ORD001', hostel: 'Hostel 1', address: 'LHC Block A', type: 'Hub Delivery', status: 'pending', amount: 5 },
    { id: 'ORD002', hostel: 'Hostel 2', address: 'SOM Building', type: 'Hand-on Delivery', status: 'accepted', amount: 10 },
    { id: 'ORD003', hostel: 'Hostel 1', address: 'Library', type: 'Hand-on Delivery', status: 'pickup', amount: 10 }
  ]);

  const earnings = {
    currentWeek: 450,
    total: 2850,
    pending: 120
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-blue-100 text-blue-800';
      case 'pickup': return 'bg-orange-100 text-orange-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-gray-50">
      <div className="bg-white shadow-sm p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Delivery Dashboard</h1>
        
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-green-50 p-3 rounded-lg text-center">
            <div className="text-lg font-bold text-green-600">₹{earnings.currentWeek}</div>
            <div className="text-xs text-green-600">This Week</div>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg text-center">
            <div className="text-lg font-bold text-blue-600">₹{earnings.total}</div>
            <div className="text-xs text-blue-600">Total Earned</div>
          </div>
          <div className="bg-orange-50 p-3 rounded-lg text-center">
            <div className="text-lg font-bold text-orange-600">₹{earnings.pending}</div>
            <div className="text-xs text-orange-600">Pending</div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {deliveryRequests.map((request) => (
          <div key={request.id} className="bg-white rounded-xl shadow-md p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-lg">Order #{request.id}</h3>
                <p className="text-gray-600 text-sm">{request.hostel} → {request.address}</p>
                <p className="text-gray-500 text-sm">{request.type} • ₹{request.amount}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                {request.status.toUpperCase()}
              </span>
            </div>
            
            <div className="flex gap-2 mb-3">
              <button className="flex-1 bg-blue-500 text-white py-2 rounded-lg text-sm font-medium flex items-center justify-center">
                🗺️ Navigate
              </button>
            </div>

            <div className="flex gap-2">
              {request.status === 'pending' && (
                <>
                  <button className="flex-1 bg-green-500 text-white py-2 rounded-lg text-sm font-medium">
                    Accept
                  </button>
                  <button className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm font-medium">
                    Decline
                  </button>
                </>
              )}
              {request.status === 'accepted' && (
                <button className="w-full bg-orange-500 text-white py-2 rounded-lg text-sm font-medium">
                  Mark Pickup
                </button>
              )}
              {request.status === 'pickup' && (
                <button className="w-full bg-green-500 text-white py-2 rounded-lg text-sm font-medium">
                  Mark Drop-off
                </button>
              )}
              {request.status === 'delivered' && (
                <div className="w-full text-center py-2 text-green-600 font-medium">
                  ✅ Delivered
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeliveryPartnerDashboard;