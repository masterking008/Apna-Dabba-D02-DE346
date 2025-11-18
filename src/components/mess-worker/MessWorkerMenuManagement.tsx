import React, { useState } from 'react';

const MessWorkerMenuManagement: React.FC = () => {
  const [selectedMeal, setSelectedMeal] = useState('Breakfast');
  const [showAddModal, setShowAddModal] = useState(false);

  const menuItems = {
    Breakfast: [
      { name: 'Poha', available: true, orders: 45 },
      { name: 'Upma', available: true, orders: 32 },
      { name: 'Bread Butter', available: false, orders: 0 }
    ],
    Lunch: [
      { name: 'Dal Rice', available: true, orders: 78 },
      { name: 'Roti', available: true, orders: 65 },
      { name: 'Sabzi', available: true, orders: 58 }
    ],
    Snacks: [
      { name: 'Samosa', available: true, orders: 25 },
      { name: 'Tea', available: true, orders: 89 }
    ],
    Dinner: [
      { name: 'Chapati', available: true, orders: 72 },
      { name: 'Dal', available: true, orders: 68 }
    ]
  };

  const extras = [
    { name: 'Lassi', price: 15, available: true, orders: 23 },
    { name: 'Chhass', price: 10, available: true, orders: 18 },
    { name: 'Curd', price: 12, available: false, orders: 0 }
  ];

  const analytics = {
    totalOrders: 156,
    popularItem: 'Tea',
    estimatedWastage: '12%'
  };

  return (
    <div className="bg-gray-50">
      <div className="bg-white shadow-sm p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Menu Management</h1>
        
        <div className="flex gap-2 mb-4 overflow-x-auto">
          {Object.keys(menuItems).map((meal) => (
            <button
              key={meal}
              onClick={() => setSelectedMeal(meal)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
                selectedMeal === meal ? 'bg-indigo-500 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              {meal}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-blue-50 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">{analytics.totalOrders}</div>
            <div className="text-sm text-blue-600">Total Orders</div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg text-center">
            <div className="text-lg font-bold text-green-600">{analytics.popularItem}</div>
            <div className="text-sm text-green-600">Most Popular</div>
          </div>
          <div className="bg-red-50 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-red-600">{analytics.estimatedWastage}</div>
            <div className="text-sm text-red-600">Est. Wastage</div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="bg-white rounded-xl shadow-md p-4 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">{selectedMeal} Items</h3>
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm"
            >
              + Add Item
            </button>
          </div>
          
          <div className="space-y-3">
            {menuItems[selectedMeal as keyof typeof menuItems].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-gray-600">{item.orders} orders today</div>
                </div>
                <div className="flex items-center gap-3">
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      checked={item.available} 
                      className="mr-2"
                    />
                    <span className="text-sm">Available</span>
                  </label>
                  <button className="text-red-500 text-sm">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4">
          <h3 className="text-lg font-semibold mb-4">Extras</h3>
          <div className="space-y-3">
            {extras.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">{item.name} (₹{item.price})</div>
                  <div className="text-sm text-gray-600">{item.orders} orders today</div>
                </div>
                <div className="flex items-center gap-3">
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      checked={item.available} 
                      className="mr-2"
                    />
                    <span className="text-sm">Available</span>
                  </label>
                  <button className="text-blue-500 text-sm">Edit</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-4">Add New Item</h3>
            <input
              type="text"
              placeholder="Item Name"
              className="w-full p-3 border border-gray-300 rounded-lg mb-3"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2 border border-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2 bg-indigo-500 text-white rounded-lg"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessWorkerMenuManagement;