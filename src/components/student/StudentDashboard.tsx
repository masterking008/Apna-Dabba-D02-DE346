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
    return (
      <div className="min-h-screen bg-neutral-50">
        <div className="bg-white shadow-sm p-6">
      <div className="min-h-screen bg-background-light dark:bg-background-dark">
        <div className="bg-white dark:bg-gray-800 shadow-sm p-6">
          <div className="skeleton h-8 w-48 mb-2"></div>
          <div className="skeleton h-4 w-32"></div>
        </div>
        <div className="container py-6">
          <div className="grid-responsive">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card loading">
                <div className="skeleton h-12 w-12 rounded-full mb-4"></div>
                <div className="skeleton h-6 w-24 mb-2"></div>
                <div className="skeleton h-4 w-32 mb-4"></div>
                <div className="skeleton h-10 w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-neutral-200">
        <div className="container py-6">
          <h1 className="text-heading-1 mb-2">Today's Meals</h1>
          <p className="text-body-sm text-subtext">Choose from our fresh, homemade meals</p>
      <div className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-10">
        <h2 className="text-gray-900 dark:text-white text-xl font-bold leading-tight tracking-[-0.015em] flex-1">
          Good Morning, User!
        </h2>
        <div className="text-gray-900 dark:text-white flex size-12 shrink-0 items-center justify-end">
          <span className="material-symbols-outlined">notifications</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="sticky top-[72px] z-10 bg-background-light dark:bg-background-dark">
        <div className="pb-3">
          <div className="flex border-b border-gray-200 dark:border-gray-700 px-4 justify-between">
            <a className="flex flex-col items-center justify-center border-b-[3px] border-b-primary text-primary pb-[13px] pt-4 flex-1" href="#">
              <p className="text-sm font-bold leading-normal tracking-[0.015em]">Home</p>
            </a>
            <a className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-gray-500 dark:text-gray-400 pb-[13px] pt-4 flex-1" href="#">
              <p className="text-sm font-bold leading-normal tracking-[0.015em]">History</p>
            </a>
            <a className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-gray-500 dark:text-gray-400 pb-[13px] pt-4 flex-1" href="#">
              <p className="text-sm font-bold leading-normal tracking-[0.015em]">Profile</p>
            </a>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container py-6">
      <div className="flex flex-col gap-4 p-4">
        {mealTypes.length === 0 ? (
          <div className="card text-center py-12">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-heading-2 mb-2">No Meals Available</h3>
            <p className="text-body text-subtext">Check back later for today's meal options</p>
          </div>
        ) : (
          <div className="grid-responsive">
            {mealTypes.map((meal) => {
              const currentTime = new Date();
              const startTime = new Date(`1970-01-01T${meal.start_time}`);
              const endTime = new Date(`1970-01-01T${meal.end_time}`);
              const currentTimeOnly = new Date(`1970-01-01T${currentTime.toTimeString().slice(0, 8)}`);
              const isAvailable = currentTimeOnly >= startTime && currentTimeOnly <= endTime;
              
              return (
                <div key={meal.id} className="card hover:shadow-lg transition-all duration-200">
                  <div className="text-center mb-4">
                    <div className="text-5xl mb-3">{meal.icon}</div>
                    <h3 className="text-heading mb-2">{meal.name}</h3>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-center text-body-sm text-subtext">
                      <span className="mr-2">⏰</span>
                      <span>{meal.start_time} - {meal.end_time}</span>
          mealTypes.map((meal) => {
            const currentTime = new Date();
            const startTime = new Date(`1970-01-01T${meal.start_time}`);
            const endTime = new Date(`1970-01-01T${meal.end_time}`);
            const currentTimeOnly = new Date(`1970-01-01T${currentTime.toTimeString().slice(0, 8)}`);
            const isAvailable = currentTimeOnly >= startTime && currentTimeOnly <= endTime;
            
            return (
              <div key={meal.id} className="p-0 @container">
                <div className={`flex flex-col items-stretch justify-start rounded-lg @xl:flex-row @xl:items-start shadow-md bg-white dark:bg-gray-800 ${!isAvailable ? 'opacity-60' : ''}`}>
                  <div className="w-full @xl:w-1/3 bg-center bg-no-repeat aspect-video @xl:aspect-square bg-cover rounded-t-lg @xl:rounded-l-lg @xl:rounded-t-none" style={{backgroundImage: `url(${meal.image})`}} />
                  <div className="flex w-full grow flex-col items-stretch justify-center gap-2 p-4">
                    <p className={`text-sm font-medium leading-normal ${
                      isAvailable ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {isAvailable ? 'Available Now' : 'Closed'}
                    </p>
                    <p className="text-gray-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">
                      {meal.name}
                    </p>
                    <div className="flex items-end gap-3 justify-between">
                      <div className="flex flex-col gap-1">
                        <p className="text-gray-600 dark:text-gray-400 text-base font-normal leading-normal">
                          Available from [Hostel Name]
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 text-base font-normal leading-normal">
                          {meal.description}
                        </p>
                      </div>
                      <button
                        onClick={() => onMealSelect?.(meal.name)}
                        disabled={!isAvailable}
                        className={`flex min-w-[84px] max-w-[480px] items-center justify-center overflow-hidden rounded-lg h-10 px-4 text-sm font-medium leading-normal ${
                          isAvailable 
                            ? 'cursor-pointer bg-primary text-white shadow-sm hover:bg-primary/90 focus:ring-2 focus:ring-primary/50'
                            : 'cursor-not-allowed bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400'
                        }`}
                      >
                        <span className="truncate">Book</span>
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-center">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        isAvailable 
                          ? 'bg-success-50 text-success-600' 
                          : 'bg-error-50 text-error-600'
                      }`}>
                        <span className="mr-1">{isAvailable ? '✅' : '❌'}</span>
                        {isAvailable ? 'Available Now' : 'Not Available'}
                      </span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => onMealSelect?.(meal.name)}
                    disabled={!isAvailable}
                    className={`btn w-full ${
                      isAvailable ? '' : 'btn-secondary'
                    }`}
                    style={isAvailable ? {
                      backgroundColor: '#002122',
                      color: 'white',
                      borderColor: '#002122'
                    } : {}}
                    onMouseEnter={(e) => {
                      if (isAvailable) {
                        e.currentTarget.style.backgroundColor = '#001a1b';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (isAvailable) {
                        e.currentTarget.style.backgroundColor = '#002122';
                      }
                    }}
                  >
                    {isAvailable ? 'Book Now' : 'Unavailable'}
                  </button>
                </div>
              );
            })}
          </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
