import React from "react";
import { useLocation, Link, Navigate } from "react-router-dom";
import { CheckCircle, Calendar, Clock, RussianRuble } from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

const BookingConfirmationPage: React.FC = () => {
  const location = useLocation();
  const { appointment, serviceName } = location.state || {};

  // Redirect if accessed directly without appointment data
  if (!appointment) {
    return <Navigate to="/booking" replace />;
  }

  const appointmentDate = new Date(appointment.appointment_date);

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-serif font-medium text-gray-800 mb-2">
              Вы записаны!
            </h1>
          </div>

          <div className="border-t border-b border-gray-200 py-6 mb-6">
            <h2 className="text-xl font-medium text-gray-800 mb-4">
              Детали записи
            </h2>

            <div className="space-y-4">
              <div className="flex items-start">
                <Calendar className="w-5 h-5 text-pink-500 mt-1 mr-3" />
                <div>
                  <p className="font-medium text-gray-700">Дата и время</p>
                  <p className="text-gray-600">
                    {format(appointmentDate, "d MMMM yyyy, HH:mm", {
                      locale: ru,
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <RussianRuble className="w-5 h-5 text-pink-500 mt-1 mr-3" />
                <div>
                  <p className="font-medium text-gray-700">Услуга</p>
                  <p className="text-gray-600">{serviceName}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="w-5 h-5 text-pink-500 mt-1 mr-3" />
                <div>
                  <p className="font-medium text-gray-700">
                    Информация о клиенте
                  </p>
                  <p className="text-gray-600">{appointment.client_name}</p>

                  <p className="text-gray-600">+{appointment.client_phone}</p>
                </div>
              </div>

              {appointment.notes && (
                <div className="flex items-start">
                  <div className="w-5 h-5 text-pink-500 mt-1 mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Пожелания</p>
                    <p className="text-gray-600">{appointment.notes}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-md mb-6">
            <h3 className="font-medium text-gray-800 mb-2">Напоминание</h3>
            <p className="text-gray-600 text-sm">
              Пожалуйста, приходите за 5-10 минут до начала вашей записи. Если
              вам нужно отменить или перенести запись, пожалуйста, сделайте это
              за 24 часа заранее, чтобы избежать штрафов за отмену.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/appointments"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-md font-medium transition-colors text-center"
            >
              Посмотреть все записи
            </Link>
            <Link
              to="/"
              className="px-6 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-md font-medium transition-colors text-center"
            >
              Вернуться на главную
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationPage;
