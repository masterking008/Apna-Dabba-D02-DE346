import React from 'react';
import { useNavigate } from 'react-router-dom';

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-8">
      <div className="text-center max-w-sm w-full">
        <div className="mb-16">
          <div className="mb-4">
            <span className="text-5xl font-bold text-white drop-shadow-lg">Apna Dabba</span>
          </div>
          <p className="text-xl text-white/90 font-light">Your prepaid mess meals, delivered!</p>
        </div>
        
        <button 
          className="bg-white text-indigo-500 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300" 
          onClick={() => navigate('/login')}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default SplashScreen;