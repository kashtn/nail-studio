import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-6xl font-bold text-pink-500">404</h1>
      <p className="mt-4 text-xl text-gray-700">Страница не найдена</p>
      <Link to="/" className="mt-6 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition-colors">
        Вернуться на главную
      </Link>
    </div>
  );
};

export default NotFound; 