import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-4xl font-serif font-medium text-gray-800 mb-8 text-center">Политика конфиденциальности</h1>
          
          <div className="space-y-12">
            <section className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
              <h2 className="text-2xl font-medium text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mr-3">1</span>
                Общие положения
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Настоящая политика конфиденциальности определяет порядок обработки и защиты персональных данных 
                  салона красоты "Nail Studio" (далее – Оператор).
                </p>
                <p>
                  Оператор ставит своей важнейшей целью и условием осуществления своей деятельности соблюдение 
                  прав и свобод человека и гражданина при обработке его персональных данных.
                </p>
              </div>
            </section>

            <section className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
              <h2 className="text-2xl font-medium text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mr-3">2</span>
                Сбор информации
              </h2>
              <p className="text-gray-600 mb-4">
                Мы собираем следующие виды персональных данных:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                  Контактная информация (имя, телефон, email)
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                  Информация о записях на услуги
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                  История посещений
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                  Предпочтения по услугам
                </li>
              </ul>
            </section>

            <section className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
              <h2 className="text-2xl font-medium text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mr-3">3</span>
                Использование информации
              </h2>
              <p className="text-gray-600 mb-4">
                Собранная информация используется для:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                  Организации записи на услуги
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                  Улучшения качества обслуживания
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                  Информирования о специальных предложениях
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                  Соблюдения требований законодательства
                </li>
              </ul>
            </section>

            <section className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
              <h2 className="text-2xl font-medium text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mr-3">4</span>
                Защита информации
              </h2>
              <p className="text-gray-600">
                Мы принимаем необходимые правовые, организационные и технические меры для защиты персональных 
                данных от неправомерного или случайного доступа к ним, уничтожения, изменения, блокирования, 
                копирования, предоставления, распространения, а также от иных неправомерных действий в отношении 
                персональных данных.
              </p>
            </section>

            <section className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
              <h2 className="text-2xl font-medium text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mr-3">5</span>
                Контактная информация
              </h2>
              <p className="text-gray-600">
                По всем вопросам, связанным с обработкой персональных данных, вы можете обратиться к нам по 
                электронной почте: <a href="mailto:privacy@nailartistry.ru" className="text-pink-600 hover:text-pink-800">privacy@nailstudio.ru</a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage; 