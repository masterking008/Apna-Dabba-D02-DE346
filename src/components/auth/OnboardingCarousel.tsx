import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, Salad, DollarSign } from 'lucide-react';

const OnboardingCarousel: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Fast Delivery",
      description: "Get your mess meals delivered hot and fresh to your doorstep within 30 minutes",
      icon: <Truck size={64} className="text-white" />
    },
    {
      title: "Nutritional Info",
      description: "Track calories, proteins, and nutrients in every meal to maintain a healthy lifestyle",
      icon: <Salad size={64} className="text-white" />
    },
    {
      title: "SMA Savings",
      description: "Save money with our Student Meal Allowance program and prepaid meal plans",
      icon: <DollarSign size={64} className="text-white" />
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate('/login');
    }
  };

  const skipOnboarding = () => {
    navigate('/login');
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-pink-400 to-red-500 p-8 relative">
      <div className="text-center max-w-sm w-full">
        <button 
          className="absolute top-8 right-8 bg-transparent text-white border border-white/50 px-4 py-2 rounded-full text-sm" 
          onClick={skipOnboarding}
        >
          Skip
        </button>

        <div className="mb-12">
          <div className="flex justify-center mb-6">{slides[currentSlide].icon}</div>
          <h2 className="text-3xl font-bold text-white mb-4">{slides[currentSlide].title}</h2>
          <p className="text-lg text-white/90 leading-relaxed">{slides[currentSlide].description}</p>
        </div>

        <div className="flex justify-center gap-2 mb-8">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white scale-125' : 'bg-white/40'
              }`}
            />
          ))}
        </div>

        <button 
          className="bg-white text-red-500 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300" 
          onClick={nextSlide}
        >
          {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default OnboardingCarousel;