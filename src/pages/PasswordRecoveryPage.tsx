import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Phone, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const PasswordRecoveryPage: React.FC = () => {
  const navigate = useNavigate();
  const { resetPassword, updatePassword } = useAuth();
  const [phone, setPhone] = useState('+7');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResetSuccess, setIsResetSuccess] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters except the + at the start
    const cleaned = value.replace(/\D/g, '');
    
    // Ensure it starts with 7
    let formatted = cleaned.startsWith('7') ? cleaned : '7' + cleaned;
    
    // If there are digits after 7, ensure the first one is 9
    if (formatted.length > 1) {
      formatted = '7' + '9' + formatted.slice(2);
    }
    
    // Limit to 11 digits (including the 7)
    formatted = formatted.slice(0, 11);
    
    // Format the number
    let result = '+7';
    if (formatted.length > 1) {
      result += ' (' + formatted.slice(1, 4);
      if (formatted.length > 4) {
        result += ') ' + formatted.slice(4, 7);
        if (formatted.length > 7) {
          result += '-' + formatted.slice(7, 9);
          if (formatted.length > 9) {
            result += '-' + formatted.slice(9, 11);
          }
        }
      }
    }
    
    return result;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    // Validate phone number length (should be 11 digits including the 7)
    const cleanedPhone = phone.replace(/\D/g, '');
    if (cleanedPhone.length !== 11) {
      setErrorMessage('Введите корректный номер телефона');
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await resetPassword(phone);
      
      if (error) throw error;
      
      setIsResetSuccess(true);
    } catch (error) {
      console.error('Reset error:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Произошла ошибка при сбросе пароля');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (newPassword !== confirmPassword) {
      setErrorMessage('Пароли не совпадают');
      return;
    }

    if (newPassword.length < 6) {
      setErrorMessage('Пароль должен содержать минимум 6 символов');
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await updatePassword(newPassword);
      
      if (error) throw error;
      
      // После успешного обновления пароля перенаправляем на страницу входа
      navigate('/login');
    } catch (error) {
      console.error('Update password error:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Произошла ошибка при обновлении пароля');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20 pb-12 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 sm:p-12 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-medium text-gray-800">
            {isResetSuccess ? 'Создание нового пароля' : 'Восстановление пароля'}
          </h1>
          <p className="text-gray-600 mt-2">
            {isResetSuccess 
              ? 'Придумайте новый надежный пароль'
              : 'Введите номер телефона, указанный при регистрации'}
          </p>
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 text-red-800 rounded-md">
            {errorMessage}
          </div>
        )}

        {isResetSuccess ? (
          <form onSubmit={handleUpdatePassword} className="space-y-6">
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Новый пароль
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
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

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Подтвердите пароль
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

            <button
              type="submit"
              className="w-full py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-md font-medium transition-colors disabled:bg-pink-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
                  Обновление...
                </span>
              ) : (
                'Обновить пароль'
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetSubmit} className="space-y-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Номер телефона
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone size={18} className="text-gray-400" />
                </div>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={handlePhoneChange}
                  className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                  placeholder="+7 (___) ___-__-__"
                  required
                  maxLength={18}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-md font-medium transition-colors disabled:bg-pink-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
                  Отправка...
                </span>
              ) : (
                'Сбросить пароль'
              )}
            </button>
          </form>
        )}

        <div className="text-center mt-8">
          <Link to="/login" className="text-gray-500 hover:text-gray-700 transition-colors">
            Вернуться к входу
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PasswordRecoveryPage; 