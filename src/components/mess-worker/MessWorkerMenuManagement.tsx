import React, { useState, useEffect } from 'react';
import { menuService } from '../../services';
import type { MenuItem, ExtraItem, MealType } from '../../services';

const MessWorkerMenuManagement: React.FC = () => {
  const [selectedMeal, setSelectedMeal] = useState('breakfast');
  const [showAddModal, setShowAddModal] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [extraItems, setExtraItems] = useState<ExtraItem[]>([]);
  const [mealTypes, setMealTypes] = useState<MealType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [meals, items, extras] = await Promise.all([
          menuService.getMealTypes(),
          menuService.getMenuItems(selectedMeal),
          menuService.getExtraItems()
        ]);
        setMealTypes(Array.isArray(meals) ? meals : []);
        setMenuItems(Array.isArray(items) ? items : []);
        setExtraItems(Array.isArray(extras) ? extras : []);
      } catch (error) {
        console.error('Failed to fetch menu data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedMeal]);

  const analytics = {
    totalOrders: menuItems.length,
    popularItem: menuItems.find(item => item.is_available)?.name || 'N/A',
    estimatedWastage: '12%'
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="bg-gray-50">
      <div className="bg-white shadow-sm p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Menu Management</h1>
        
        <div className="flex gap-2 mb-4 overflow-x-auto">
          {mealTypes.map((meal) => (
            <button
              key={meal.id}
              onClick={() => setSelectedMeal(meal.name.toLowerCase())}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
                selectedMeal === meal.name.toLowerCase() ? 'bg-indigo-500 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              {meal.name}
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
            {menuItems.length === 0 ? (
              <div className="text-center py-4 text-gray-500">No items available</div>
            ) : (
              menuItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-600">Menu item</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center">
                      <input 
                        type="checkbox" 
                        checked={item.is_available} 
                        className="mr-2"
                        readOnly
                      />
                      <span className="text-sm">Available</span>
                    </label>
                    <button className="text-red-500 text-sm">Delete</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4">
          <h3 className="text-lg font-semibold mb-4">Extras</h3>
          <div className="space-y-3">
            {extraItems.length === 0 ? (
              <div className="text-center py-4 text-gray-500">No extra items available</div>
            ) : (
              extraItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{item.name} (₹{item.price})</div>
                    <div className="text-sm text-gray-600">Extra item</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center">
                      <input 
                        type="checkbox" 
                        checked={item.is_available} 
                        className="mr-2"
                        readOnly
                      />
                      <span className="text-sm">Available</span>
                    </label>
                    <button className="text-blue-500 text-sm">Edit</button>
                  </div>
                </div>
              ))
            )}
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