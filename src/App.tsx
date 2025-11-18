import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import SplashScreen from './components/auth/SplashScreen'
import OnboardingCarousel from './components/auth/OnboardingCarousel'
import LoginScreen from './components/auth/LoginScreen'
import RegisterScreen from './components/auth/RegisterScreen'
import ForgotPasswordEnter from './components/auth/ForgotPasswordEnter'
import ForgotPasswordOTP from './components/auth/ForgotPasswordOTP'
import ForgotPasswordReset from './components/auth/ForgotPasswordReset'
import PasswordResetSuccess from './components/auth/PasswordResetSuccess'
import UnifiedBottomTab from './components/shared/UnifiedBottomTab'
import MealCustomization from './components/student/MealCustomization'
import AddressDelivery from './components/student/AddressDelivery'
import OrderConfirmation from './components/student/OrderConfirmation'

function App() {
  const [selectedMeal, setSelectedMeal] = useState('')
  const [userType, setUserType] = useState<'Student' | 'Mess Worker' | 'Delivery Partner'>('Student')

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<LoginScreen onLogin={setUserType} />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/forgot-password" element={<ForgotPasswordEnter />} />
        <Route path="/forgot-otp" element={<ForgotPasswordOTP />} />
        <Route path="/forgot-reset" element={<ForgotPasswordReset />} />
        <Route path="/reset-success" element={<PasswordResetSuccess />} />
        <Route path="/dashboard" element={<UnifiedBottomTab userType={userType} onMealSelect={setSelectedMeal} />} />
        <Route path="/meal-customize" element={<MealCustomization mealName={selectedMeal} />} />
        <Route path="/address-delivery" element={<AddressDelivery />} />
        <Route path="/order-confirm" element={<OrderConfirmation />} />
      </Routes>
    </Router>
  )
}

export default App
