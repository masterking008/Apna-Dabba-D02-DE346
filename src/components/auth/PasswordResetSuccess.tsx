import React from 'react';

interface PasswordResetSuccessProps {
  onLogin?: () => void;
}

const PasswordResetSuccess: React.FC<PasswordResetSuccessProps> = ({ onLogin }) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-500 to-emerald-600 p-8">
      <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center">
        <div className="text-6xl mb-6">✅</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Password Reset Successfully</h1>
        <p className="text-gray-600 mb-8">Your password has been updated successfully</p>
        
        <button 
          onClick={onLogin} 
          className="bg-green-500 text-white p-4 rounded-xl text-lg font-semibold hover:bg-green-600 transition-colors w-full"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default PasswordResetSuccess;