import React, { useState } from 'react';

type UserType = 'Student' | 'Mess Worker' | 'Delivery Partner';

interface RegisterScreenProps {
  onLogin?: () => void;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ onLogin }) => {
  const [userType, setUserType] = useState<UserType>('Student');

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-500 to-pink-600 p-8">
      <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-sm w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">Create Account</h1>
        <p className="text-gray-600 text-center mb-6">Join Apna Dabba today</p>
        
        <div className="flex gap-2 mb-6">
          {(['Student', 'Mess Worker', 'Delivery Partner'] as UserType[]).map((type) => (
            <button
              key={type}
              onClick={() => setUserType(type)}
              className={`flex-1 py-2 px-3 text-xs rounded-lg transition-colors ${
                userType === type ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="p-4 border border-gray-300 rounded-xl text-base"
          />
          {userType === 'Student' && (
            <input
              type="text"
              placeholder="Roll Number"
              className="p-4 border border-gray-300 rounded-xl text-base"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="p-4 border border-gray-300 rounded-xl text-base"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="p-4 border border-gray-300 rounded-xl text-base"
          />
          {userType === 'Student' && (
            <select className="p-4 border border-gray-300 rounded-xl text-base">
              <option value="">Select Hostel</option>
              <option value="1">Hostel 1</option>
              <option value="2">Hostel 2</option>
              <option value="3">Hostel 3</option>
            </select>
          )}
          <input
            type="password"
            placeholder="Password"
            className="p-4 border border-gray-300 rounded-xl text-base"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="p-4 border border-gray-300 rounded-xl text-base"
          />
          <button type="submit" className="bg-purple-500 text-white p-4 rounded-xl text-lg font-semibold hover:bg-purple-600 transition-colors">
            Register
          </button>
        </form>
        
        <p className="text-center mt-4 text-gray-600">
          Already have an account? <button onClick={onLogin} className="text-purple-500">Login</button>
        </p>
      </div>
    </div>
  );
};

export default RegisterScreen;