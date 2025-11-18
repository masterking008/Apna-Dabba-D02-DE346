import React from 'react';

interface ForgotPasswordEnterProps {
  onNext?: () => void;
  onBack?: () => void;
}

const ForgotPasswordEnter: React.FC<ForgotPasswordEnterProps> = ({ onNext, onBack }) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 p-8">
      <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-sm w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">Forgot Password</h1>
        <p className="text-gray-600 text-center mb-8">Enter your email or phone to reset password</p>
        
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Email or Phone Number"
            className="p-4 border border-gray-300 rounded-xl text-base"
          />
          <button type="submit" onClick={onNext} className="bg-blue-500 text-white p-4 rounded-xl text-lg font-semibold hover:bg-blue-600 transition-colors">
            Next
          </button>
        </form>
        
        <button onClick={onBack} className="w-full text-center mt-4 text-blue-500">
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordEnter;