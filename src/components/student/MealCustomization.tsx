import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { menuService, favoriteService } from '../../services';
import type { MenuItem, ExtraItem } from '../../services';
import Swal from 'sweetalert2';

interface MealCustomizationProps {
  mealName: string;
}

const MealCustomization: React.FC<MealCustomizationProps> = ({ mealName }) => {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<{id: number, quantity: number}[]>([]);
  const [selectedExtras, setSelectedExtras] = useState<{id: number, quantity: number}[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [extraItems, setExtraItems] = useState<ExtraItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [items, extras] = await Promise.all([
          menuService.getMenuItems(mealName.toLowerCase()),
          menuService.getExtraItems()
        ]);
        setMenuItems(items);
        setExtraItems(extras);
      } catch (error) {
        console.error('Failed to fetch menu data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [mealName]);

  const nutrition = {
    calories: selectedItems.length * 150 + selectedExtras.length * 50,
    protein: selectedItems.length * 8 + selectedExtras.length * 3,
    carbs: selectedItems.length * 25 + selectedExtras.length * 6,
    fat: selectedItems.length * 5 + selectedExtras.length * 2
  };

  const toggleItem = (itemId: number) => {
    setSelectedItems(prev => {
      const existing = prev.find(i => i.id === itemId);
      if (existing) {
        return prev.filter(i => i.id !== itemId);
      }
      return [...prev, { id: itemId, quantity: 1 }];
    });
  };

  const toggleExtra = (extraId: number) => {
    setSelectedExtras(prev => {
      const existing = prev.find(e => e.id === extraId);
      if (existing) {
        return prev.filter(e => e.id !== extraId);
      }
      return [...prev, { id: extraId, quantity: 1 }];
    });
  };

  const addToFavorites = async (itemId: number) => {
    try {
      await favoriteService.addFavorite(itemId);
      Swal.fire('Success!', 'Added to favorites!', 'success');
    } catch (error) {
      console.error('Failed to add to favorites:', error);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-neutral-50 p-4">
      <div className="card mb-4">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => navigate('/dashboard')} className="text-primary-500">← Back</button>
          <h1 className="text-xl text-heading">Customize {mealName}</h1>
          <div className="w-6"></div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-heading mb-3">Main Items</h3>
          {menuItems.map((item) => {
            const isSelected = selectedItems.some(s => s.id === item.id);
            return (
              <div key={item.id} className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  {item.image && (
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  )}
                  <div>
                    <span className="font-medium">{item.name}</span>
                    <button onClick={() => addToFavorites(item.id)} className="ml-2 text-sm">🤍</button>
                  </div>
                </div>
                <button
                  onClick={() => toggleItem(item.id)}
                  className={`w-6 h-6 rounded border-2 ${
                    isSelected ? 'bg-primary-500 border-primary-500' : 'border-neutral-300'
                  }`}
                >
                  {isSelected && <span className="text-white text-xs">✓</span>}
                </button>
              </div>
            );
          })}
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-heading mb-3">Extras</h3>
          {extraItems.map((item) => {
            const isSelected = selectedExtras.some(e => e.id === item.id);
            return (
              <div key={item.id} className="flex items-center justify-between py-2">
                <span>{item.name} (+₹{item.price})</span>
                <button
                  onClick={() => toggleExtra(item.id)}
                  className={`w-6 h-6 rounded border-2 ${
                    isSelected ? 'bg-primary-500 border-primary-500' : 'border-neutral-300'
                  }`}
                >
                  {isSelected && <span className="text-white text-xs">✓</span>}
                </button>
              </div>
            );
          })}
        </div>

        <div className="bg-primary-50 rounded-card p-4 mb-6">
          <h3 className="text-lg font-semibold text-heading mb-3">Nutrition Info</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>Calories: {nutrition.calories}</div>
            <div>Protein: {nutrition.protein}g</div>
            <div>Carbs: {nutrition.carbs}g</div>
            <div>Fat: {nutrition.fat}g</div>
          </div>
        </div>

        <button
          onClick={() => navigate('/address-delivery')}
          className="btn-primary w-full"
        >
          Continue to Address
        </button>
      </div>
    </div>
  );
};

export default MealCustomization;