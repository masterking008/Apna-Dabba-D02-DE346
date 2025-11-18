import React, { useState } from 'react';
import { Truck, DollarSign, Map, User } from 'lucide-react';
import DeliveryPartnerDashboard from './DeliveryPartnerDashboard';
import DeliveryPartnerProfile from './DeliveryPartnerProfile';

const DeliveryPartnerBottomTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState('deliveries');

  const tabs = [
    { id: 'deliveries', label: 'Deliveries', icon: <Truck size={20} /> },
    { id: 'earnings', label: 'Earnings', icon: <DollarSign size={20} /> },
    { id: 'map', label: 'Map', icon: <Map size={20} /> },
    { id: 'profile', label: 'Profile', icon: <User size={20} /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {activeTab === 'deliveries' && <DeliveryPartnerDashboard />}
      
      {activeTab === 'earnings' && (
        <div className="p-4">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="flex justify-center mb-4"><DollarSign size={48} className="text-green-500" /></div>
            <h3 className="text-lg font-semibold text-gray-800">Earnings</h3>
            <p className="text-gray-600">Detailed earnings and payout history</p>
          </div>
        </div>
      )}

      {activeTab === 'map' && (
        <div className="p-4">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="flex justify-center mb-4"><Map size={48} className="text-blue-500" /></div>
            <h3 className="text-lg font-semibold text-gray-800">Live Map</h3>
            <p className="text-gray-600">Real-time delivery tracking and navigation</p>
          </div>
        </div>
      )}

      {activeTab === 'profile' && <DeliveryPartnerProfile />}

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors ${
                activeTab === tab.id ? 'text-indigo-500' : 'text-gray-500'
              }`}
            >
              <div className="mb-1">{tab.icon}</div>
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeliveryPartnerBottomTab;