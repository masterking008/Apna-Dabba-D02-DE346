import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, menuService } from '../../services';
import type { Hostel } from '../../services';
import Swal from 'sweetalert2';

type UserType = 'Student' | 'Mess Worker' | 'Delivery Partner';

interface RegisterScreenProps {
  onLogin?: () => void;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<UserType>('Student');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    rollNumber: '',
    hostelId: '',
    roomNumber: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [hostels, setHostels] = useState<Hostel[]>([]);

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const data = await menuService.getHostels();
        setHostels(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to fetch hostels:', error);
      }
    };
    fetchHostels();
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      Swal.fire('Error', 'Passwords do not match', 'error');
      return;
    }

    setLoading(true);
    try {
      const userData = {
        username: formData.email,
        email: formData.email,
        password: formData.password,
        first_name: formData.firstName,
        last_name: formData.lastName,
        user_type: userType === 'Student' ? 'student' : userType === 'Mess Worker' ? 'mess_worker' : 'delivery_partner',
        phone: formData.phone,
        ...(userType === 'Student' && {
          roll_number: formData.rollNumber,
          ...(formData.hostelId && { hostel_id: parseInt(formData.hostelId) }),
          room_number: formData.roomNumber
        })
      };

      console.log('Sending userData:', userData);
      await authService.register(userData);
      Swal.fire('Success!', 'Account created successfully. Please login.', 'success');
      navigate('/login');
    } catch (error: any) {
      console.error('Registration error:', error);
      const errorMessage = error?.message || 'Please check your information and try again.';
      Swal.fire('Registration Failed', errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-neutral-50 p-4">
      <div className="card max-w-sm w-full">
        <h1 className="text-3xl text-heading mb-2 text-center">Create Account</h1>
        <p className="text-subtext text-center mb-6">Join Apna Dabba today</p>
        
        <div className="flex gap-2 mb-6">
          {(['Student', 'Mess Worker', 'Delivery Partner'] as UserType[]).map((type) => (
            <button
              key={type}
              onClick={() => setUserType(type)}
              className={`flex-1 py-2 px-3 text-xs rounded-lg transition-colors ${
                userType === type ? 'bg-primary-500 text-white' : 'bg-neutral-100 text-neutral-600'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              className="flex-1 p-4 border border-gray-300 rounded-xl text-base"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              className="flex-1 p-4 border border-gray-300 rounded-xl text-base"
              required
            />
          </div>
          {userType === 'Student' && (
            <input
              type="text"
              placeholder="Roll Number"
              value={formData.rollNumber}
              onChange={(e) => setFormData({...formData, rollNumber: e.target.value})}
              className="p-4 border border-gray-300 rounded-xl text-base"
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="p-4 border border-gray-300 rounded-xl text-base"
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="p-4 border border-gray-300 rounded-xl text-base"
            required
          />
          {userType === 'Student' && (
            <>
              <select 
                value={formData.hostelId}
                onChange={(e) => setFormData({...formData, hostelId: e.target.value})}
                className="p-4 border border-gray-300 rounded-xl text-base"
              >
                <option value="">Select Hostel</option>
                {hostels.map((hostel) => (
                  <option key={hostel.id} value={hostel.id}>
                    {hostel.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Room Number"
                value={formData.roomNumber}
                onChange={(e) => setFormData({...formData, roomNumber: e.target.value})}
                className="p-4 border border-gray-300 rounded-xl text-base"
                required
              />
            </>
          )}
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            className="p-4 border border-gray-300 rounded-xl text-base"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            className="p-4 border border-gray-300 rounded-xl text-base"
            required
          />
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>
        
        <p className="text-center mt-4 text-subtext">
          Already have an account? <button onClick={() => navigate('/login')} className="text-primary-500">Login</button>
        </p>
      </div>
    </div>
  );
};

export default RegisterScreen;