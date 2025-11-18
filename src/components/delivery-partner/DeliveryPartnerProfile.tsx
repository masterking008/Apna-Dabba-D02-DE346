import React, { useState } from 'react';
import { Bike, Zap, Star, Trophy } from 'lucide-react';

const DeliveryPartnerProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [isOnShift, setIsOnShift] = useState(true);
  
  const [profile, setProfile] = useState({
    name: 'Suresh Patel',
    email: 'suresh.patel@delivery.com',
    phone: '+91 9876543210',
    vehicleType: 'Motorcycle',
    capacity: '2 orders'
  });

  const badges = [
    { name: 'Speed Demon', icon: <Zap size={24} />, earned: true },
    { name: 'Customer Favorite', icon: <Star size={24} />, earned: true },
    { name: 'Perfect Week', icon: <Trophy size={24} />, earned: false }
  ];

  const leaderboard = {
    position: 3,
    totalPartners: 25,
    weeklyDeliveries: 47
  };

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
              <Bike size={32} className="text-indigo-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">{profile.name}</h2>
            <p className="text-gray-600">Delivery Partner</p>
            
            <div className="flex items-center justify-center mt-3">
              <span className="text-sm text-gray-600 mr-2">Shift Status:</span>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={isOnShift}
                  onChange={(e) => setIsOnShift(e.target.checked)}
                  className="mr-2"
                />
                <span className={`text-sm font-medium ${isOnShift ? 'text-green-600' : 'text-red-600'}`}>
                  {isOnShift ? 'On Shift' : 'Off Shift'}
                </span>
              </label>
            </div>
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

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type</label>
                {isEditing ? (
                  <select
                    value={profile.vehicleType}
                    onChange={(e) => setProfile({...profile, vehicleType: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  >
                    <option value="Motorcycle">Motorcycle</option>
                    <option value="Bicycle">Bicycle</option>
                    <option value="Scooter">Scooter</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    value={profile.vehicleType}
                    disabled
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
                  />
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                <input
                  type="text"
                  value={profile.capacity}
                  onChange={(e) => setProfile({...profile, capacity: e.target.value})}
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

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
          <button
            onClick={() => setShowBankModal(true)}
            className="w-full bg-gray-100 text-gray-800 py-3 rounded-lg font-medium"
          >
            Manage Bank/UPI Details
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Leaderboard</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600">#{leaderboard.position}</div>
            <div className="text-sm text-gray-600">out of {leaderboard.totalPartners} partners</div>
            <div className="text-sm text-gray-600 mt-1">{leaderboard.weeklyDeliveries} deliveries this week</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Badges</h3>
          <div className="grid grid-cols-3 gap-3">
            {badges.map((badge, idx) => (
              <div key={idx} className={`text-center p-3 rounded-lg ${
                badge.earned ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50 border border-gray-200'
              }`}>
                <div className={`mb-1 ${badge.earned ? 'text-yellow-500' : 'text-gray-400'}`}>{badge.icon}</div>
                <div className={`text-xs font-medium ${
                  badge.earned ? 'text-yellow-800' : 'text-gray-500'
                }`}>
                  {badge.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showBankModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Bank Account Number"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                placeholder="IFSC Code"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                placeholder="UPI ID (Optional)"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setShowBankModal(false)}
                className="flex-1 py-2 border border-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowBankModal(false)}
                className="flex-1 py-2 bg-indigo-500 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryPartnerProfile;