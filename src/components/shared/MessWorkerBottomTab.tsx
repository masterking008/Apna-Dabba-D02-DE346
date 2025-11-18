import React, { useState } from 'react';
import { ClipboardList, UtensilsCrossed, BarChart3, User } from 'lucide-react';
import MessWorkerDashboard from './MessWorkerDashboard';
import MessWorkerMenuManagement from './MessWorkerMenuManagement';
import MessWorkerProfile from './MessWorkerProfile';

const MessWorkerBottomTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState('orders');

  const tabs = [
    { id: 'orders', label: 'Orders', icon: <ClipboardList size={20} /> },
    { id: 'menu', label: 'Menu', icon: <UtensilsCrossed size={20} /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={20} /> },
    { id: 'profile', label: 'Profile', icon: <User size={20} /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {activeTab === 'orders' && <MessWorkerDashboard />}
      {activeTab === 'menu' && <MessWorkerMenuManagement />}
      
      {activeTab === 'analytics' && (
        <div className="p-4">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="flex justify-center mb-4"><BarChart3 size={48} className="text-indigo-500" /></div>
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
              <div className="mb-1">{tab.icon}</div>
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessWorkerBottomTab;