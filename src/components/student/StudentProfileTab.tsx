import React, { useState } from 'react';

interface StudentProfileTabProps {
  onLogout?: () => void;
}

const StudentProfileTab: React.FC<StudentProfileTabProps> = ({ onLogout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Rahul Kumar',
    rollNumber: 'CS21B001',
    email: 'rahul.kumar@student.ac.in',
    phone: '+91 9876543210',
    hostel: 'Hostel 1',
    room: 'A-101'
  });

  return (
    <div className="bg-gray-50">
      <div className="bg-white shadow-sm p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-indigo-500 font-medium"
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-3xl">👨‍🎓</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-800">{profile.name}</h2>
            <p className="text-gray-600">Student • {profile.rollNumber}</p>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number</label>
              <input
                type="text"
                value={profile.rollNumber}
                disabled
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
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

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hostel</label>
                <input
                  type="text"
                  value={profile.hostel}
                  disabled
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Room</label>
                <input
                  type="text"
                  value={profile.room}
                  onChange={(e) => setProfile({...profile, room: e.target.value})}
                  disabled={!isEditing}
                  className={`w-full p-3 border border-gray-300 rounded-lg ${
                    isEditing ? 'bg-white' : 'bg-gray-50'
                  }`}
                />
              </div>
            </div>

            {isEditing && (
              <button
                onClick={() => setIsEditing(false)}
                className="w-full bg-indigo-500 text-white py-3 rounded-lg font-semibold"
              >
                Save Changes
              </button>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 space-y-3">
          <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg">
            🔔 Notification Settings
          </button>
          <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg">
            🔒 Change Password
          </button>
          <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg">
            ❓ Help & Support
          </button>
          <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg">
            📋 Terms & Conditions
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <button 
            onClick={onLogout}
            className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileTab;