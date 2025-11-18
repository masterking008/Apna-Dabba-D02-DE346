import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { authService } from '../../services';

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Auto-redirect if already authenticated
    if (authService.isAuthenticated()) {
      const timer = setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [navigate]);
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-['Plus_Jakarta_Sans']">
      {/* Header Text */}
      <div className="flex-1 flex flex-col justify-center px-8 pt-16">
        <div className="max-w-sm">
          <h1 className="text-4xl font-light text-gray-800 leading-tight mb-4 font-['Plus_Jakarta_Sans']">
            Personal<br />
            <span className="font-medium text-green-600">Meals</span> in<br />
            Your Mobile<br />
            Anytime. 🍀
          </h1>
          <p className="text-gray-600 text-sm leading-relaxed">
            Your favorite homemade meals, now just a tap away. Fresh, fast, and always ready when you are.
          </p>
        </div>
      </div>
      
      {/* Food Bowl Image */}
      <div className="flex-1 relative">
        <div className="absolute bottom-0 right-0 w-80 h-80">
          <div className="w-full h-full bg-gradient-to-br from-orange-100 to-green-100 rounded-full flex items-center justify-center">
            <div className="w-64 h-64 bg-white rounded-full shadow-lg flex items-center justify-center">
              <div className="text-6xl">🥗</div>
            </div>
          </div>
        </div>
        
        {/* Navigation Button */}
        <div className="absolute bottom-32 right-8">
          <button 
            className="p-4 rounded-full shadow-lg transition-colors text-white"
            style={{ backgroundColor: '#002122' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#001a1b'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#002122'} 
            onClick={() => navigate('/dashboard')}
            aria-label="Get started"
          >
            <ArrowRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;