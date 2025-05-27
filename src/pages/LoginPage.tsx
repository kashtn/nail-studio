import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Phone as PhoneIcon, Lock, Eye, EyeOff } from "lucide-react";

import { supabase } from "../lib/supabase";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [phone, setPhone] = useState("+7");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters except the + at the start
    const cleaned = value.replace(/\D/g, "");

    // Ensure it starts with 7
    let formatted = cleaned.startsWith("7") ? cleaned : "7" + cleaned;

    // If there are digits after 7, ensure the first one is 9
    if (formatted.length > 1) {
      formatted = "7" + "9" + formatted.slice(2);
    }

    // Limit to 11 digits (including the 7)
    formatted = formatted.slice(0, 11);

    // Format the number
    let result = "+7";
    if (formatted.length > 1) {
      result += " (" + formatted.slice(1, 4);
      if (formatted.length > 4) {
        result += ") " + formatted.slice(4, 7);
        if (formatted.length > 7) {
          result += "-" + formatted.slice(7, 9);
          if (formatted.length > 9) {
            result += "-" + formatted.slice(9, 11);
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

  const toggleView = () => {
    setIsLogin(!isLogin);
    setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Validate phone number length (should be 11 digits including the 7)
    const cleanedPhone = phone.replace(/\D/g, "");
    if (cleanedPhone.length !== 11) {
      setErrorMessage("Введите корректный номер телефона");
      return;
    }

    setIsLoading(true);

    try {
      if (isLogin) {
        // Login
        const { error } = await signIn(phone, password);

        if (error) throw error;

        // Redirect to homepage on success
        navigate("/");
      } else {
        // Sign up
        if (password !== confirmPassword) {
          setErrorMessage("Пароли не совпадают");
          return;
        }

        const { error, data: userData } = await signUp(phone, password);

        if (error) throw error;

        const { error: upsertError } = await supabase.from("profiles").upsert({
          id: userData?.user?.id,
          phone: cleanedPhone,
          updated_at: new Date().toISOString(),
        });

        if (upsertError) throw error;

        fetch("http://localhost:3001/api/sync/profiles", { method: "POST" });

        // Redirect to homepage on success
        navigate("/");
      }
    } catch (error) {
      console.error("Auth error:", error);
      setErrorMessage(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20 pb-12 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 sm:p-12 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-medium text-gray-800">
            {isLogin ? "Добро пожаловать" : "Создать аккаунт"}
          </h1>
          <p className="text-gray-600 mt-2">
            {isLogin
              ? "Войдите, чтобы получить доступ к своему аккаунту и записям"
              : "Присоединяйтесь к нам для удобной записи и эксклюзивных предложений"}
          </p>
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 text-red-800 rounded-md">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Phone Field */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Номер телефона
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <PhoneIcon size={18} className="text-gray-400" />
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

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Пароль
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
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
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
          )}

          {/* Forgot Password Link (Login only) */}
          {/* {isLogin && (
            <div className="flex justify-end">
              <Link
                to="/password-recovery"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="text-sm text-pink-600 hover:text-pink-800"
              >
                Забыли пароль?
              </Link>
            </div>
          )} */}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-md font-medium transition-colors disabled:bg-pink-300"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
                {isLogin ? "Вход..." : "Регистрация..."}
              </span>
            ) : isLogin ? (
              "Войти"
            ) : (
              "Создать аккаунт"
            )}
          </button>

          {/* Toggle between Login and Sign Up */}
          <div className="text-center mt-4">
            <p className="text-gray-600">
              {isLogin ? "Еще нет аккаунта?" : "Уже есть аккаунт?"}
              <button
                type="button"
                onClick={toggleView}
                className="ml-1 text-pink-600 hover:text-pink-800 font-medium"
              >
                {isLogin ? "Зарегестрироваться" : "Войти"}
              </button>
            </p>
          </div>
        </form>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link
            to="/"
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            На Главную
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
