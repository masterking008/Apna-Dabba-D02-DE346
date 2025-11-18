import React, { useState } from 'react';
import BottomTabLayout from '../shared/BottomTabLayout';
import StudentDashboard from './StudentDashboard';
import StudentHistoryTab from './StudentHistoryTab';
import StudentProfileTab from './StudentProfileTab';
import WalletScreen from '../shared/WalletScreen';
import ChatbotScreen from '../shared/ChatbotScreen';
import FloatingChatButton from '../shared/FloatingChatButton';
import PaymentGateway from '../shared/PaymentGateway';
import OrderTrackingScreen from './OrderTrackingScreen';

interface BottomTabNavigatorProps {
  onMealSelect?: (meal: string) => void;
  onLogout?: () => void;
}

const BottomTabNavigator: React.FC<BottomTabNavigatorProps> = ({ onMealSelect, onLogout }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [showChatbot, setShowChatbot] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showTracking, setShowTracking] = useState(false);

  const tabs = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'orders', label: 'Orders', icon: '📋' },
    { id: 'wallet', label: 'Wallet', icon: '💳' },
    { id: 'profile', label: 'Profile', icon: '👤' }
  ];

  return (
    <BottomTabLayout tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === 'home' && <StudentDashboard onMealSelect={onMealSelect} />}
      
      {activeTab === 'orders' && (
        <StudentHistoryTab onTrackOrder={() => setShowTracking(true)} />
      )}

      {activeTab === 'wallet' && (
        <WalletScreen onPayment={() => setShowPayment(true)} />
      )}

      {activeTab === 'profile' && (
        <StudentProfileTab onLogout={onLogout} />
      )}

      <FloatingChatButton onClick={() => setShowChatbot(true)} />
      
      {showChatbot && (
        <ChatbotScreen onClose={() => setShowChatbot(false)} />
      )}
      
      {showPayment && (
        <PaymentGateway 
          amount={500}
          onSuccess={() => setShowPayment(false)}
          onCancel={() => setShowPayment(false)}
        />
      )}
      
      {showTracking && (
        <OrderTrackingScreen onBack={() => setShowTracking(false)} />
      )}
    </BottomTabLayout>
  );
};

export default BottomTabNavigator;