import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, CreditCard, Lock, Mail, User, Phone, HelpCircle, Shield } from 'lucide-react';
import { authAPI } from '../utils/api';

const Login = () => {
  const navigate = useNavigate();
  
  // Redirect to home if already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/', { replace: true });
    }
  }, [navigate]);
  
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState('student');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    studentId: '',
    staffId: '',
    securityId: '',
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
    rememberMe: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isSignUp) {
        // Sign Up
        if (!formData.name || !formData.email || !formData.password) {
          alert('Please fill in all required fields');
          setLoading(false);
          return;
        }
        if (formData.password !== formData.confirmPassword) {
          alert('Passwords do not match');
          setLoading(false);
          return;
        }

        let idNumber = '';
        if (userType === 'student') idNumber = formData.studentId;
        if (userType === 'staff') idNumber = formData.staffId;
        if (userType === 'security') idNumber = formData.securityId;
        if (userType === 'visitor') idNumber = formData.email;

        if (!idNumber) {
          alert(`Please provide your ${userType} ID`);
          setLoading(false);
          return;
        }

        const response = await authAPI.register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          userType: userType,
          idNumber: idNumber
        });

        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        alert('Account created successfully!');
        navigate('/');
      } else {
        // Login
        let loginEmail = formData.email;
        if (userType === 'student') loginEmail = formData.studentId;
        if (userType === 'staff') loginEmail = formData.staffId;
        if (userType === 'security') loginEmail = formData.securityId;

        if (!loginEmail || !formData.password) {
          alert('Please enter your credentials');
          setLoading(false);
          return;
        }

        const response = await authAPI.login(loginEmail, formData.password);
        
        // Save token and user
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        
        navigate('/');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      studentId: '',
      staffId: '',
      securityId: '',
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
      rememberMe: false,
    });
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    resetForm();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white pt-12 pb-16 px-6 rounded-b-3xl">
        <div className="flex flex-col items-center">
          <div className="bg-white rounded-full p-6 mb-4">
            <svg className="w-12 h-12 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2">Campus Finder</h1>
          <p className="text-blue-100 text-sm">Find what's lost, return what's found</p>
        </div>
      </div>

      {/* Login/Signup Form */}
      <div className="flex-1 px-6 -mt-8 pb-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-gray-600 text-sm mb-6">
            {isSignUp ? 'Sign up to start using Campus Finder' : 'Sign in to your account'}
          </p>

          {/* User Type Selector */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              I am a:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setUserType('student')}
                className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  userType === 'student'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => setUserType('staff')}
                className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  userType === 'staff'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Staff
              </button>
              <button
                type="button"
                onClick={() => setUserType('visitor')}
                className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  userType === 'visitor'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Visitor
              </button>
              <button
                type="button"
                onClick={() => setUserType('security')}
                className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  userType === 'security'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Security
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name (Sign Up only) */}
            {isSignUp && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {/* Student ID */}
            {userType === 'student' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Student ID *
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleInputChange}
                    placeholder="Enter your Student ID"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {/* Staff ID */}
            {userType === 'staff' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Staff ID *
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="staffId"
                    value={formData.staffId}
                    onChange={handleInputChange}
                    placeholder="Enter your Staff ID"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {/* Security ID */}
            {userType === 'security' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Security ID *
                </label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="securityId"
                    value={formData.securityId}
                    onChange={handleInputChange}
                    placeholder="Enter your Security ID"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            {(userType === 'visitor' || isSignUp) && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email {isSignUp ? '*' : ''}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {/* Password Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password (Sign Up only) */}
            {isSignUp && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {/* Remember Me & Forgot Password (Login only) */}
            {!isSignUp && (
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-600"
                  />
                  <span className="ml-2 text-sm text-gray-700">Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-sm text-blue-600 font-medium hover:text-blue-800"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Loading...' : (isSignUp ? 'Create Account' : 'Sign In')}
              {!loading && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              )}
            </button>
          </form>

          {/* Toggle Sign Up / Sign In */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                type="button"
                onClick={toggleMode}
                className="text-blue-600 font-semibold hover:text-blue-800"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 mb-6 text-center">
          <p className="text-gray-600 text-sm mb-4">Need help accessing your account?</p>
          
          <button className="flex items-center justify-center gap-2 text-gray-700 hover:text-blue-600 transition-colors mx-auto mb-3">
            <Phone className="w-4 h-4" />
            <span className="text-sm font-medium">Contact IT Support</span>
          </button>

          <button className="flex items-center justify-center gap-2 text-gray-700 hover:text-blue-600 transition-colors mx-auto">
            <HelpCircle className="w-4 h-4" />
            <span className="text-sm font-medium">ID Help</span>
          </button>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 pb-6">
          <p className="mb-2">
            By {isSignUp ? 'signing up' : 'signing in'}, you agree to our{' '}
            <button className="text-blue-600 hover:underline">Terms of Service</button> and{' '}
            <button className="text-blue-600 hover:underline">Privacy Policy</button>
          </p>
          <p>© 2025 Campus Finder. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;