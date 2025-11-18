import React, { useState, useEffect } from 'react';
import { menuService, MealType } from '../../services';

interface StudentDashboardProps {
  onMealSelect?: (meal: string) => void;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ onMealSelect }) => {
  const [mealTypes, setMealTypes] = useState<MealType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMealTypes = async () => {
      try {
        const data = await menuService.getMealTypes();
        setMealTypes(data);
      } catch (error) {
        console.error('Failed to fetch meal types:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMealTypes();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="bg-gray-50">
      <div className="bg-white shadow-sm p-4">
        <h1 className="text-2xl font-bold text-gray-800">Today's Meals</h1>
      </div>

      <div className="p-4 grid grid-cols-2 gap-4">
          {mealTypes.map((meal) => {
            const currentTime = new Date();
            const startTime = new Date(`1970-01-01T${meal.start_time}`);
            const endTime = new Date(`1970-01-01T${meal.end_time}`);
            const currentTimeOnly = new Date(`1970-01-01T${currentTime.toTimeString().slice(0, 8)}`);
            const isAvailable = currentTimeOnly >= startTime && currentTimeOnly <= endTime;
            
            return (
              <div key={meal.id} className="bg-white rounded-xl shadow-md p-4">
                <div className="text-4xl mb-2">{meal.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{meal.name}</h3>
                <div className="text-sm text-gray-600 mb-3">
                  <div>⏰ {meal.start_time} - {meal.end_time}</div>
                </div>
                <div className={`text-xs mb-3 ${isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                  {isAvailable ? '✅ Available' : '❌ Not Available'}
                </div>
                <button
                  onClick={() => onMealSelect?.(meal.name)}
                  disabled={!isAvailable}
                  className={`w-full py-2 rounded-lg font-medium ${
                    isAvailable 
                      ? 'bg-indigo-500 text-white hover:bg-indigo-600' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Book
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default StudentDashboard;