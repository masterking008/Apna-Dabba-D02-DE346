import React from 'react';
import { Package, DollarSign } from 'lucide-react';

const TiffinDepositScreen: React.FC = () => {
  const depositData = {
    currentDeposit: 200,
    refundableAmount: 150,
    status: 'Active'
  };

  const depositHistory = [
    { id: 1, type: 'deposit', amount: 200, date: '2024-01-12', status: 'Active', description: 'Initial Tiffin Deposit' },
    { id: 2, type: 'refund', amount: 50, date: '2024-01-10', status: 'Completed', description: 'Partial Refund - Damage Deduction' },
    { id: 3, type: 'deposit', amount: 200, date: '2024-01-01', status: 'Refunded', description: 'Previous Tiffin Deposit' }
  ];

  return (
    <div className="bg-gray-50">
      <div className="bg-white shadow-sm p-4">
        <h1 className="text-2xl font-bold text-gray-800">Tiffin Deposit</h1>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Current Status</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">₹{depositData.currentDeposit}</div>
              <div className="text-sm text-gray-600">Current Deposit</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">₹{depositData.refundableAmount}</div>
              <div className="text-sm text-gray-600">Refundable Amount</div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${
              depositData.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {depositData.status}
            </span>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">How Tiffin Deposit Works</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• ₹200 deposit required for tiffin container</li>
              <li>• Full refund on return in good condition</li>
              <li>• Damage charges may apply</li>
              <li>• Refund processed within 3-5 business days</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Deposit History</h3>
          <div className="space-y-3">
            {depositHistory.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    item.type === 'deposit' ? 'bg-indigo-100' : 'bg-green-100'
                  }`}>
                    {item.type === 'deposit' ? 
                      <Package size={16} className="text-indigo-600" /> : 
                      <DollarSign size={16} className="text-green-600" />
                    }
                  </div>
                  <div>
                    <div className="font-medium text-sm">{item.description}</div>
                    <div className="text-xs text-gray-500">{item.date}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-semibold ${
                    item.type === 'deposit' ? 'text-indigo-600' : 'text-green-600'
                  }`}>
                    {item.type === 'deposit' ? '-' : '+'}₹{item.amount}
                  </div>
                  <div className={`text-xs ${
                    item.status === 'Active' ? 'text-green-600' : 
                    item.status === 'Completed' ? 'text-blue-600' : 'text-gray-600'
                  }`}>
                    {item.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <button className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors">
            Request Refund
          </button>
          <p className="text-xs text-gray-500 text-center mt-2">
            Refund will be processed after tiffin return verification
          </p>
        </div>
      </div>
    </div>
  );
};

export default TiffinDepositScreen;