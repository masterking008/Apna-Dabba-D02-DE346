import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services';
import Swal from 'sweetalert2';

type UserType = 'Student' | 'Mess Worker' | 'Delivery Partner';

interface LoginScreenProps {
  onLogin?: (userType: UserType) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<UserType>('Student');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const getPlaceholder = () => {
    switch (userType) {
      case 'Student': return 'Email or Roll Number';
      case 'Mess Worker': return 'Employee ID or Email';
      case 'Delivery Partner': return 'Partner ID or Phone';
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.login({
        username,
        password,
        user_type: userType === 'Student' ? 'student' : userType === 'Mess Worker' ? 'mess_worker' : 'delivery_partner'
      });
      onLogin?.(userType);
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Login error:', error);
      const errorMessage = error?.message || 'Please check your credentials.';
      Swal.fire('Login Failed', errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-8">
      <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-sm w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">Welcome Back</h1>
        <p className="text-gray-600 text-center mb-6">Sign in to continue to Apna Dabba</p>
        
        <div className="flex gap-2 mb-6">
          {(['Student', 'Mess Worker', 'Delivery Partner'] as UserType[]).map((type) => (
            <button
              key={type}
              onClick={() => setUserType(type)}
              className={`flex-1 py-2 px-3 text-xs rounded-lg transition-colors ${
                userType === type ? 'bg-indigo-500 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder={getPlaceholder()}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-4 border border-gray-300 rounded-xl text-base"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-4 border border-gray-300 rounded-xl text-base"
            required
          />
          <button type="submit" disabled={loading} className="bg-indigo-500 text-white p-4 rounded-xl text-lg font-semibold hover:bg-indigo-600 transition-colors disabled:opacity-50">
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <button type="button" className="bg-green-500 text-white p-4 rounded-xl text-lg font-semibold hover:bg-green-600 transition-colors">
            Login with OTP
          </button>
        </form>
        
        <div className="text-center mt-4 space-y-2">
          <button onClick={() => navigate('/forgot-password')} className="text-indigo-500 text-sm">Forgot Password?</button>
          <p className="text-gray-600">
            Don't have an account? <button onClick={() => navigate('/register')} className="text-indigo-500">Register Now</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;