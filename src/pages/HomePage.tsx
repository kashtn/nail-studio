import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import ServiceCard from "../components/ServiceCard";
import TestimonialCard from "../components/TestimonialCard";
import { Service } from "../types/service";
import { supabase } from "../lib/supabase";
import {
  Calendar,
  Sparkles,
  Palette,
  Award,
  Users,
  TrendingUp,
} from "lucide-react";
import { featureService } from "../data/services";

const HomePage: React.FC = () => {
  const [featuredServices, setFeaturedServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        // Fetch services from Supabase
        const { data, error } = await supabase
          .from("services")
          .select("*")
          .limit(3)
          .lt("id", 4);

        if (error) throw error;

        if (data) {
          setFeaturedServices(data.sort((a, b) => a.id - b.id));
        }
      } catch (error) {
        console.error("Error fetching services:", error);

        // Fallback data for demo purposes
        setFeaturedServices(featureService);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Demo testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Елена Алфёрова",
      image: "/elena.jpg",
      rating: 5,
      date: "15 мая 2024",
      comment:
        "Обожаю этот салон! Мастера по маникюру такие талантливые и дружелюбные. Мои гель-лаки держались неделями без сколов.",
    },
    {
      id: 2,
      name: "София Чен",
      image: "/chen.jpg",
      rating: 5,
      date: "28 апреля 2024",
      comment:
        "Я принесла сложный дизайн для примера, и они сделали его идеально! Отличное внимание к деталям и расслабляющая атмосфера.",
    },
    {
      id: 3,
      name: "Мишель Родригес",
      image: "/michelle.jpg",
      rating: 4,
      date: "3 июня 2024",
      comment:
        "Система бронирования очень удобная! Мне нравится возможность записываться на прием онлайн. Педикюр был потрясающим.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Hero />

      {/* Featured Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-medium text-gray-800 mb-3">
              Наши Сигнатурные Услуги
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Опыт наших клиентов впечатляет.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <div className="animate-pulse w-full max-w-4xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-gray-200 rounded-lg h-80"></div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredServices.map((service, index) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  featured={index === 1} // Make the middle card featured
                />
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <Link
              to="/services"
              className="inline-flex items-center text-pink-600 font-medium hover:text-pink-800 transition-colors"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Показать все услуги
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-medium text-gray-800 mb-3">
              Почему выбирают нас
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Мы гордимся тем, что обеспечиваем исключительный опыт ухода за
              ногтями от начала до конца.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Calendar className="w-8 h-8 text-pink-500" />}
              title="Простая онлайн-запись"
              description="Запишитесь на прием в любое время с помощью нашей удобной системы онлайн-бронирования."
            />
            <FeatureCard
              icon={<Sparkles className="w-8 h-8 text-pink-500" />}
              title="Премиум продукты"
              description="Мы используем только продукцию высочайшего качества, нетоксичные материалы для красивых и долговечных результатов."
            />
            <FeatureCard
              icon={<Users className="w-8 h-8 text-pink-500" />}
              title="Опытные мастера"
              description="Наши квалифицированные мастера обучены новейшим техникам и трендам."
            />
            <FeatureCard
              icon={<Palette className="w-8 h-8 text-pink-500" />}
              title="Индивидуальный дизайн"
              description="Выразите свой уникальный стиль с помощью наших услуг по дизайну ногтей."
            />
            <FeatureCard
              icon={<Award className="w-8 h-8 text-pink-500" />}
              title="Гарантия гигиены"
              description="Мы поддерживаем высочайшие стандарты чистоты и стерилизации для вашей безопасности."
            />
            <FeatureCard
              icon={<TrendingUp className="w-8 h-8 text-pink-500" />}
              title="Последние тренды"
              description="Будьте впереди с новейшими трендами в мире ногтевой моды и инновационными техниками."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-pink-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between bg-white rounded-lg shadow-lg p-8">
            <div className="mb-8 md:mb-0 md:mr-8">
              <h3 className="text-2xl font-serif font-medium text-gray-800 mb-3">
                Готовы к красивым ногтям?
              </h3>
              <p className="text-gray-600 mb-6">
                Запишитесь на прием сегодня и ощутите разницу наших премиальных
                услуг по уходу за ногтями.
              </p>
              <Link
                to="/booking"
                className="inline-block px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-md font-medium transition-colors"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Записаться
              </Link>
            </div>
            <div className="w-full md:w-1/3">
              <img
                src="/ready.jpg"
                alt="Nail art close-up"
                className="rounded-lg shadow-md w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-medium text-gray-800 mb-3">
              Отзывы клиентов
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Вот что говорят наши довольные клиенты о своем опыте.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                name={testimonial.name}
                image={testimonial.image}
                rating={testimonial.rating}
                date={testimonial.date}
                comment={testimonial.comment}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md transition-transform duration-300 hover:translate-y-[-4px]">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-medium text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default HomePage;
