import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { authService } from './services'
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
  const [selectedMeal, setSelectedMeal] = useState('Lunch')
  const [userType, setUserType] = useState<'Student' | 'Mess Worker' | 'Delivery Partner'>('Student')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      const authenticated = authService.isAuthenticated()
      const user = authService.getUser()
      setIsAuthenticated(authenticated)
      if (user) {
        const userTypeMap: Record<string, 'Student' | 'Mess Worker' | 'Delivery Partner'> = {
          'student': 'Student',
          'mess_worker': 'Mess Worker',
          'delivery_partner': 'Delivery Partner'
        }
        setUserType(userTypeMap[user.user_type] || 'Student')
      }
      setLoading(false)
    }
    checkAuth()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🍽️</div>
          <div className="text-heading-2 mb-2">Apna Dabba</div>
          <div className="skeleton h-4 w-32 mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/onboarding" element={<OnboardingCarousel />} />
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
