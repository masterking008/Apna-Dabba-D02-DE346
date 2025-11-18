import React, { useState, useEffect } from 'react';
import { menuService } from '../../services';
import type { MealType } from '../../services';

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
        setMealTypes(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to fetch meal types:', error);
        setMealTypes([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMealTypes();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-64 bg-neutral-50"><span className="text-subtext">Loading...</span></div>;
  }

  return (
    <div className="bg-neutral-50 min-h-screen">
      <div className="bg-white shadow-sm p-4">
        <h1 className="text-2xl text-heading">Today's Meals</h1>
      </div>

      <div className="p-4 grid grid-cols-2 gap-4">
        {mealTypes.length === 0 ? (
          <div className="col-span-2 text-center py-8 text-subtext">
            No meals available at the moment
          </div>
        ) : (
          mealTypes.map((meal) => {
            const currentTime = new Date();
            const startTime = new Date(`1970-01-01T${meal.start_time}`);
            const endTime = new Date(`1970-01-01T${meal.end_time}`);
            const currentTimeOnly = new Date(`1970-01-01T${currentTime.toTimeString().slice(0, 8)}`);
            const isAvailable = currentTimeOnly >= startTime && currentTimeOnly <= endTime;
            
            return (
              <div key={meal.id} className="card">
                <div className="text-4xl mb-2">{meal.icon}</div>
                <h3 className="text-lg font-semibold text-heading mb-2">{meal.name}</h3>
                <div className="text-sm text-subtext mb-3">
                  <div>⏰ {meal.start_time} - {meal.end_time}</div>
                </div>
                <div className={`text-xs mb-3 ${isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                  {isAvailable ? '✅ Available' : '❌ Not Available'}
                </div>
                <button
                  onClick={() => onMealSelect?.(meal.name)}
                  disabled={!isAvailable}
                  className={isAvailable ? 'btn-primary w-full' : 'btn-secondary w-full opacity-50 cursor-not-allowed'}
                >
                  Book
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;