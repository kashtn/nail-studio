import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import ServiceCard from "../components/ServiceCard";
import { Service } from "../types/service";
import { supabase } from "../lib/supabase";
import defaultServices from "../data/services";

const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [categories] = useState<string[]>([
    "Все",
    "Маникюр",
    "Педикюр",
    "Наращивание",
    "Дизайн",
    "Спа",
  ]);
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        // Fetch services from Supabase
        const { data, error } = await supabase.from("services").select("*");

        if (error) throw error;

        if (data) {
          setServices(data.sort((a, b) => a.id - b.id));
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        // Use default services if fetch fails
        setServices(defaultServices);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Filter services based on selected category

  const filteredServices =
    selectedCategory === "Все"
      ? services
      : services.filter((service) => service.category === selectedCategory);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-pink-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-medium text-gray-800 mb-4">
            Наши услуги
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Откройте для себя наш ассортимент премиальных услуг по уходу за
            ногтями, разработанных для поддержания красоты ваших рук и ног.
          </p>
        </div>
      </section>

      {/* Services Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-pink-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Services Grid */}
          {loading ? (
            <div className="flex justify-center">
              <div className="animate-pulse w-full max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-gray-200 rounded-lg h-80"></div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              {filteredServices.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredServices.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600">В этой категории нет услуг.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-medium text-gray-800 mb-3">
              Часто задаваемые вопросы
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Найдите ответы на часто задаваемые вопросы о наших услугах и
              процессе записи.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <FAQItem
              question="Сколько обычно держатся гель-лаки?"
              answer="Наши гель-лаки обычно держатся 2-3 недели без сколов и отслоений, в зависимости от роста ваших натуральных ногтей и повседневной активности. Правильный уход может продлить срок службы гель-лака."
            />
            <FAQItem
              question="Что делать, если ноготь сломался или появился скол?"
              answer="Если у вас произошел скол или поломка, пожалуйста, свяжитесь с нами для записи на быстрый ремонт. Избегайте самостоятельного ремонта, так как это может привести к большему ущербу. Небольшие ремонты обычно занимают 15-30 минут."
            />
            <FAQItem
              question="Как часто нужно делать маникюр или педикюр?"
              answer="Для обычного лака мы рекомендуем делать маникюр каждые 1-2 недели и педикюр каждые 3-4 недели. Для гель-лака или дип-пудры идеально делать процедуру каждые 2-3 недели, чтобы поддерживать внешний вид по мере роста натуральных ногтей."
            />
            <FAQItem
              question="Можно ли перенести или отменить запись?"
              answer="Да, вы можете перенести или отменить запись через нашу онлайн-систему бронирования или позвонив нам. Мы будем благодарны за уведомление об отмене как минимум за 24 часа, чтобы мы могли предложить это время другому клиенту."
            />
            <FAQItem
              question="Предлагаете ли вы услуги для особых случаев?"
              answer="Конечно! Мы предлагаем специальные пакеты услуг для свадеб, выпускных и других особых мероприятий. Вы можете записаться индивидуально или группой. Рекомендуем бронировать заранее для особых случаев, особенно в пиковые сезоны."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
      <button
        className="flex justify-between items-center w-full px-6 py-4 text-left focus:outline-none hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-medium text-gray-800">{question}</h3>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`px-6 overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-96 opacity-100 pb-4" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-gray-600">{answer}</p>
      </div>
    </div>
  );
};

export default ServicesPage;
