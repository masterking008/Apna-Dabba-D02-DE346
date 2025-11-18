import React, { useState } from 'react';

const MessWorkerDashboard: React.FC = () => {
  const [sortBy, setSortBy] = useState('time');
  const [orders] = useState([
    { id: 'ORD001', student: 'Rahul Kumar', meal: 'Lunch', hostel: 'Hostel 1', time: '12:30 PM', status: 'pending' },
    { id: 'ORD002', student: 'Priya Singh', meal: 'Breakfast', hostel: 'Hostel 2', time: '8:00 AM', status: 'accepted' },
    { id: 'ORD003', student: 'Amit Sharma', meal: 'Dinner', hostel: 'Hostel 1', time: '7:00 PM', status: 'ready' }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-blue-100 text-blue-800';
      case 'ready': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-gray-50">
      <div className="bg-white shadow-sm p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Mess Dashboard</h1>
          <div className="relative">
            <span className="text-2xl">🔔</span>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
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
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-xl shadow-md p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-lg">{order.student}</h3>
                <p className="text-gray-600 text-sm">{order.meal} • {order.hostel}</p>
                <p className="text-gray-500 text-sm">{order.time}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                {order.status.toUpperCase()}
              </span>
            </div>
            
            <div className="flex gap-2">
              {order.status === 'pending' && (
                <>
                  <button className="flex-1 bg-green-500 text-white py-2 rounded-lg text-sm font-medium">
                    Accept
                  </button>
                  <button className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm font-medium">
                    Decline
                  </button>
                </>
              )}
              {order.status === 'accepted' && (
                <button className="w-full bg-blue-500 text-white py-2 rounded-lg text-sm font-medium">
                  Mark Ready
                </button>
              )}
              {order.status === 'ready' && (
                <div className="w-full text-center py-2 text-green-600 font-medium">
                  ✅ Ready for Pickup
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessWorkerDashboard;