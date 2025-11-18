import React, { ReactNode } from 'react';

interface Tab {
  id: string;
  label: string;
  icon: string;
}

interface BottomTabLayoutProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  children: ReactNode;
}

const BottomTabLayout: React.FC<BottomTabLayoutProps> = ({ tabs, activeTab, onTabChange, children }) => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {children}

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
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

export default BottomTabLayout;