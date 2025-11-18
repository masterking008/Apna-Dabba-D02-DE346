import React, { useState } from 'react';
import MessWorkerDashboard from './MessWorkerDashboard';
import MessWorkerMenuManagement from './MessWorkerMenuManagement';
import MessWorkerProfile from './MessWorkerProfile';

const MessWorkerBottomTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState('orders');

  const tabs = [
    { id: 'orders', label: 'Orders', icon: '📋' },
    { id: 'menu', label: 'Menu', icon: '🍽️' },
    { id: 'analytics', label: 'Analytics', icon: '📊' },
    { id: 'profile', label: 'Profile', icon: '👤' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {activeTab === 'orders' && <MessWorkerDashboard />}
      {activeTab === 'menu' && <MessWorkerMenuManagement />}
      
      {activeTab === 'analytics' && (
        <div className="p-4">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-lg font-semibold text-gray-800">Analytics</h3>
            <p className="text-gray-600">View detailed reports and insights</p>
          </div>
        </div>
      )}

      {activeTab === 'profile' && <MessWorkerProfile />}

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
              <span className="text-2xl mb-1">{tab.icon}</span>
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessWorkerBottomTab;