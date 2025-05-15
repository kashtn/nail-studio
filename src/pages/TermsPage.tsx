import React from 'react';

const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-4xl font-serif font-medium text-gray-800 mb-8 text-center">Условия использования</h1>
          
          <div className="space-y-12">
            <section className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
              <h2 className="text-2xl font-medium text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mr-3">1</span>
                Общие положения
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Настоящие условия использования регулируют отношения между салоном красоты "Nail Studio" 
                  (далее – Салон) и клиентами при использовании услуг салона.
                </p>
                <p>
                  Используя услуги Салона, вы соглашаетесь с настоящими условиями использования.
                </p>
              </div>
            </section>

            <section className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
              <h2 className="text-2xl font-medium text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mr-3">2</span>
                Правила записи
              </h2>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                  Запись на услуги осуществляется через онлайн-систему или по телефону
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                  При отмене записи менее чем за 2 часа до назначенного времени взимается штраф
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                  При опоздании более чем на 15 минут администрация оставляет за собой право отказать в услуге
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                  Предоплата может потребоваться для некоторых услуг
                </li>
              </ul>
            </section>

            <section className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
              <h2 className="text-2xl font-medium text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mr-3">3</span>
                Правила поведения
              </h2>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                  В салоне запрещено курение и употребление алкоголя
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                  Просим соблюдать тишину и не мешать другим клиентам
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                  Дети до 14 лет допускаются только в сопровождении взрослых
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                  За порчу имущества салона клиент несет материальную ответственность
                </li>
              </ul>
            </section>

            <section className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
              <h2 className="text-2xl font-medium text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mr-3">4</span>
                Гарантии и ответственность
              </h2>
              <p className="text-gray-600 mb-4">
                Салон гарантирует:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                  Качество предоставляемых услуг
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                  Использование безопасных материалов
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                  Соблюдение санитарных норм
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                  Профессионализм мастеров
                </li>
              </ul>
            </section>

            <section className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
              <h2 className="text-2xl font-medium text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mr-3">5</span>
                Изменение условий
              </h2>
              <p className="text-gray-600">
                Салон оставляет за собой право вносить изменения в настоящие условия использования. 
                Актуальная версия условий всегда доступна на нашем сайте.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage; 