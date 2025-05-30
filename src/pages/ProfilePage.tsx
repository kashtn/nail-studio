import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";
import { User, Phone, Save } from "lucide-react";

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    preferences: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) throw error;

        if (data) {
          setFormData({
            fullName: data.full_name || "",
            email: user.email || "",
            phone: data.phone || "",
            preferences: data.preferences || "",
          });
        }
      } catch (error) {
        console.error("Ошибка при загрузке профиля:", error);
        setFormData((prev) => ({
          ...prev,
          email: user?.email || "",
        }));
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSaving(true);
    setMessage(null);

    try {
      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        full_name: formData.fullName,
        phone: formData.email.split("@")[0],
        preferences: formData.preferences,
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;

      const endPoint = import.meta.env.VITE_GATEAWAY_URL;

      fetch(endPoint + "/sync/profiles", { method: "POST" });

      setMessage({
        type: "success",
        text: "Профиль успешно обновлен!",
      });
    } catch (error) {
      console.error("Ошибка при обновлении профиля:", error);
      setMessage({
        type: "error",
        text: "Не удалось обновить профиль. Пожалуйста, попробуйте снова.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-serif font-medium text-gray-800 mb-8">
            Мой профиль
          </h1>

          <div className="bg-white rounded-lg shadow-md p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Полное имя */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Полное имя
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                    placeholder="Ваше полное имя"
                  />
                </div>
              </div>

              {/* Телефон */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Номер телефона
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.email.split("@")[0]}
                    onChange={handleChange}
                    disabled
                    className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                    placeholder="Ваш номер телефона"
                  />
                </div>
              </div>

              {/* Предпочтения */}
              <div>
                <label
                  htmlFor="preferences"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Предпочтения по услугам
                </label>
                <textarea
                  id="preferences"
                  name="preferences"
                  value={formData.preferences}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                  placeholder="Ваши предпочтения по услугам маникюра..."
                />
              </div>

              {/* Сообщения */}
              {message && (
                <div
                  className={`p-4 rounded-md ${
                    message.type === "success"
                      ? "bg-green-50 text-green-800"
                      : "bg-red-50 text-red-800"
                  }`}
                >
                  {message.text}
                </div>
              )}

              {/* Кнопка сохранения */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="flex items-center px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-md font-medium transition-colors disabled:bg-pink-300"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
                      Сохранение...
                    </>
                  ) : (
                    <>
                      <Save size={18} className="mr-2" />
                      Сохранить изменения
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
