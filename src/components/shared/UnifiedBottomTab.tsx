import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ClipboardList, CreditCard, User, UtensilsCrossed, BarChart3, Truck, DollarSign, Map } from 'lucide-react';
import BottomTabLayout from './BottomTabLayout';

// Student components
import StudentDashboard from '../student/StudentDashboard';
import StudentHistoryTab from '../student/StudentHistoryTab';
import StudentProfileTab from '../student/StudentProfileTab';
import OrderTrackingScreen from '../student/OrderTrackingScreen';

// Mess Worker components
import MessWorkerDashboard from '../mess-worker/MessWorkerDashboard';
import MessWorkerMenuManagement from '../mess-worker/MessWorkerMenuManagement';
import MessWorkerProfile from '../mess-worker/MessWorkerProfile';

// Delivery Partner components
import DeliveryPartnerDashboard from '../delivery-partner/DeliveryPartnerDashboard';
import DeliveryPartnerProfile from '../delivery-partner/DeliveryPartnerProfile';

// Shared components
import WalletScreen from './WalletScreen';
import ChatbotScreen from './ChatbotScreen';
import FloatingChatButton from './FloatingChatButton';
import PaymentGateway from './PaymentGateway';

type UserType = 'Student' | 'Mess Worker' | 'Delivery Partner';

interface UnifiedBottomTabProps {
  userType: UserType;
  onMealSelect?: (meal: string) => void;
  onLogout?: () => void;
}

const UnifiedBottomTab: React.FC<UnifiedBottomTabProps> = ({ userType, onMealSelect, onLogout }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(getDefaultTab(userType));
  const [showChatbot, setShowChatbot] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showTracking, setShowTracking] = useState(false);

  const handleMealSelect = (meal: string) => {
    onMealSelect?.(meal);
    navigate('/meal-customize');
  };

  const handleLogout = () => {
    onLogout?.();
    navigate('/login');
  };

  function getDefaultTab(type: UserType) {
    switch (type) {
      case 'Student': return 'home';
      case 'Mess Worker': return 'orders';
      case 'Delivery Partner': return 'deliveries';
    }
  }

  function getTabs(type: UserType) {
    switch (type) {
      case 'Student':
        return [
          { id: 'home', label: 'Home', icon: <Home size={20} /> },
          { id: 'orders', label: 'Orders', icon: <ClipboardList size={20} /> },
          { id: 'wallet', label: 'Wallet', icon: <CreditCard size={20} /> },
          { id: 'profile', label: 'Profile', icon: <User size={20} /> }
        ];
      case 'Mess Worker':
        return [
          { id: 'orders', label: 'Orders', icon: <ClipboardList size={20} /> },
          { id: 'menu', label: 'Menu', icon: <UtensilsCrossed size={20} /> },
          { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={20} /> },
          { id: 'profile', label: 'Profile', icon: <User size={20} /> }
        ];
      case 'Delivery Partner':
        return [
          { id: 'deliveries', label: 'Deliveries', icon: <Truck size={20} /> },
          { id: 'earnings', label: 'Earnings', icon: <DollarSign size={20} /> },
          { id: 'map', label: 'Map', icon: <Map size={20} /> },
          { id: 'profile', label: 'Profile', icon: <User size={20} /> }
        ];
    }
  }

  const renderContent = () => {
    if (userType === 'Student') {
      switch (activeTab) {
        case 'home': return <StudentDashboard onMealSelect={handleMealSelect} />;
        case 'orders': return <StudentHistoryTab onTrackOrder={() => setShowTracking(true)} />;
        case 'wallet': return <WalletScreen onPayment={() => setShowPayment(true)} />;
        case 'profile': return <StudentProfileTab onLogout={handleLogout} />;
      }
    }

    if (userType === 'Mess Worker') {
      switch (activeTab) {
        case 'orders': return <MessWorkerDashboard />;
        case 'menu': return <MessWorkerMenuManagement />;
        case 'analytics': return (
          <div className="p-4">
            <div className="card text-center">
              <div className="flex justify-center mb-4"><BarChart3 size={48} className="text-primary-500" /></div>
              <h3 className="text-lg font-semibold text-heading">Analytics</h3>
              <p className="text-subtext">View detailed reports and insights</p>
            </div>
          </div>
        );
        case 'profile': return <MessWorkerProfile />;
      }
    }

    if (userType === 'Delivery Partner') {
      switch (activeTab) {
        case 'deliveries': return <DeliveryPartnerDashboard />;
        case 'earnings': return (
          <div className="p-4">
            <div className="card text-center">
              <div className="flex justify-center mb-4"><DollarSign size={48} className="text-primary-500" /></div>
              <h3 className="text-lg font-semibold text-heading">Earnings</h3>
              <p className="text-subtext">Detailed earnings and payout history</p>
            </div>
          </div>
        );
        case 'map': return (
          <div className="p-4">
            <div className="card text-center">
              <div className="flex justify-center mb-4"><Map size={48} className="text-primary-500" /></div>
              <h3 className="text-lg font-semibold text-heading">Live Map</h3>
              <p className="text-subtext">Real-time delivery tracking and navigation</p>
            </div>
          </div>
        );
        case 'profile': return <DeliveryPartnerProfile />;
      }
    }
  };

  return (
    <BottomTabLayout tabs={getTabs(userType)} activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}

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

export default UnifiedBottomTab;