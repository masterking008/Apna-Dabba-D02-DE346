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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-primary-500 to-primary-700 p-4">
      <div className="card-elevated max-w-md w-full animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-heading-1 mb-2">Welcome Back</h1>
          <p className="text-body-sm text-subtext">Sign in to continue to Apna Dabba</p>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-6">
          {(['Student', 'Mess Worker', 'Delivery Partner'] as UserType[]).map((type) => (
            <button
              key={type}
              onClick={() => setUserType(type)}
              className={`btn btn-sm text-xs ${
                userType === type ? 'btn-primary' : 'btn-secondary'
              }`}
            >
              {type === 'Delivery Partner' ? 'Delivery' : type}
            </button>
          ))}
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="username" className="sr-only">
              {getPlaceholder()}
            </label>
            <input
              id="username"
              type="text"
              placeholder={getPlaceholder()}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input"
              required
              aria-required="true"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              required
              aria-required="true"
            />
          </div>
          <div className="space-y-3">
            <button 
              type="submit" 
              disabled={loading} 
              className="btn btn-primary w-full"
              aria-describedby={loading ? 'loading-message' : undefined}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
            {loading && <span id="loading-message" className="sr-only">Please wait while we sign you in</span>}
            <button 
              type="button" 
              className="btn btn-outline w-full"
              aria-label="Sign in using one-time password"
            >
              Sign in with OTP
            </button>
          </div>
        </form>
        
        <div className="text-center mt-6 space-y-3">
          <button 
            onClick={() => navigate('/forgot-password')} 
            className="btn btn-ghost text-sm"
          >
            Forgot Password?
          </button>
          <p className="text-body-sm text-subtext">
            Don't have an account?{' '}
            <button 
              onClick={() => navigate('/register')} 
              className="text-primary-500 font-medium hover:text-primary-600 transition-colors"
            >
              Register Now
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;