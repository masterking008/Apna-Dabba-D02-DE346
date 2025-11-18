import React, { useState } from 'react';

const MessWorkerProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@mess.com',
    phone: '+91 9876543210',
    hostelMess: 'Hostel 1 Mess'
  });

  const handleSave = () => {
    setIsEditing(false);
  };

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
            <h2 className="text-xl font-semibold text-gray-800">{profile.name}</h2>
            <p className="text-gray-600">Mess Worker</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
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
                value={profile.phone}
                onChange={(e) => setProfile({...profile, phone: e.target.value})}
                disabled={!isEditing}
                className={`w-full p-3 border border-gray-300 rounded-lg ${
                  isEditing ? 'bg-white' : 'bg-gray-50'
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hostel Mess</label>
              {isEditing ? (
                <select
                  value={profile.hostelMess}
                  onChange={(e) => setProfile({...profile, hostelMess: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                >
                  <option value="Hostel 1 Mess">Hostel 1 Mess</option>
                  <option value="Hostel 2 Mess">Hostel 2 Mess</option>
                  <option value="Hostel 3 Mess">Hostel 3 Mess</option>
                </select>
              ) : (
                <input
                  type="text"
                  value={profile.hostelMess}
                  disabled
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
                />
              )}
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

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Security</h3>
          <button
            onClick={() => setShowPasswordModal(true)}
            className="w-full bg-gray-100 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Change Password
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