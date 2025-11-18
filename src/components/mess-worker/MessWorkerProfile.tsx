import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { profileService, authService } from '../../services';
import type { UserProfile } from '../../services';

const MessWorkerProfile: React.FC = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await profileService.getProfile();
        setProfile(data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    if (!profile) return;
    try {
      await profileService.updateProfile(profile);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (!profile) {
    return <div className="text-center py-8 text-gray-500">Profile not found</div>;
  }

  return (
    <div className="bg-gray-50">
      <div className="bg-white shadow-sm p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Profile & Settings</h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-indigo-500 font-medium"
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="bg-white rounded-xl shadow-md p-6 mb-4">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-3xl">👨‍🍳</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-800">{profile.username}</h2>
            <p className="text-gray-600">Mess Worker</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={profile.username}
                onChange={(e) => setProfile({...profile, username: e.target.value})}
                disabled={!isEditing}
                className={`w-full p-3 border border-gray-300 rounded-lg ${
                  isEditing ? 'bg-white' : 'bg-gray-50'
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({...profile, email: e.target.value})}
                disabled={!isEditing}
                className={`w-full p-3 border border-gray-300 rounded-lg ${
                  isEditing ? 'bg-white' : 'bg-gray-50'
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                value={profile.phone_number || ''}
                onChange={(e) => setProfile({...profile, phone_number: e.target.value})}
                disabled={!isEditing}
                className={`w-full p-3 border border-gray-300 rounded-lg ${
                  isEditing ? 'bg-white' : 'bg-gray-50'
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hostel</label>
              <input
                type="text"
                value={profile.hostel || 'Not assigned'}
                disabled
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>

            {isEditing && (
              <button
                onClick={handleSave}
                className="w-full bg-indigo-500 text-white py-3 rounded-lg font-semibold hover:bg-indigo-600 transition-colors"
              >
                Save Changes
              </button>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-4">
          <h3 className="text-lg font-semibold mb-4">Security</h3>
          <button
            onClick={() => setShowPasswordModal(true)}
            className="w-full bg-gray-100 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Change Password
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-4">Change Password</h3>
            <div className="space-y-3">
              <input
                type="password"
                placeholder="Current Password"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              <input
                type="password"
                placeholder="New Password"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="flex-1 py-2 border border-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="flex-1 py-2 bg-indigo-500 text-white rounded-lg"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessWorkerProfile;