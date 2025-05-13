import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail as Nail, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();
  
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const toggleView = () => {
    setIsLogin(!isLogin);
    setErrorMessage('');
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);
    
    try {
      if (isLogin) {
        // Login
        const { error } = await signIn(email, password);
        
        if (error) throw error;
        
        // Redirect to homepage on success
        navigate('/');
      } else {
        // Sign up
        if (password !== confirmPassword) {
          setErrorMessage('Passwords do not match');
          return;
        }
        
        const { error } = await signUp(email, password);
        
        if (error) throw error;
        
        // Redirect to homepage on success
        navigate('/');
      }
    } catch (error) {
      console.error('Auth error:', error);
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20 pb-12 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 sm:p-12 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Nail size={36} className="text-pink-500" />
          </div>
          <h1 className="text-3xl font-serif font-medium text-gray-800">
            {isLogin ? 'Добро пожаловать' : 'Создать аккаунт'}
          </h1>
          <p className="text-gray-600 mt-2">
            {isLogin 
              ? 'Войдите, чтобы получить доступ к своему аккаунту и записям' 
              : 'Присоединяйтесь к нам для удобной записи и эксклюзивных предложений'}
          </p>
        </div>
        
        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 text-red-800 rounded-md">
            {errorMessage}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={18} className="text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>
          
          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                placeholder="••••••••"
                required
                minLength={6}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={18} className="text-gray-400" />
                ) : (
                  <Eye size={18} className="text-gray-400" />
                )}
              </button>
            </div>
          </div>
          
          {/* Confirm Password Field (Sign Up only) */}
          {!isLogin && (
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>
            </div>
          )}
          
          {/* Forgot Password Link (Login only) */}
          {isLogin && (
            <div className="flex justify-end">
              <a href="#" className="text-sm text-pink-600 hover:text-pink-800">
                Forgot password?
              </a>
            </div>
          )}
          
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-md font-medium transition-colors disabled:bg-pink-300"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
                {isLogin ? 'Signing in...' : 'Creating account...'}
              </span>
            ) : (
              isLogin ? 'Sign In' : 'Create Account'
            )}
          </button>
          
          {/* Toggle between Login and Sign Up */}
          <div className="text-center mt-4">
            <p className="text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                type="button"
                onClick={toggleView}
                className="ml-1 text-pink-600 hover:text-pink-800 font-medium"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </form>
        
        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link to="/" className="text-gray-500 hover:text-gray-700 transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;