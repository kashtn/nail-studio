import { Service } from "../types/service";

export const featureService: Service[] = [
  {
    id: 1,
    name: "Классический маникюр",
    description:
      "Традиционный маникюр с приданием формы ногтям, уходом за кутикулой, массажем рук и покрытием по вашему выбору.",
    price: 25,
    duration: 30,
    image_url:
      "https://images.pexels.com/photos/704815/pexels-photo-704815.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    created_at: new Date().toISOString(),
    category: "Маникюр"
  },
  {
    id: 2,
    name: "Гель-лак",
    description:
      "Долговременное покрытие гель-лаком, которое защищает ваши натуральные ногти и обеспечивает великолепный цвет без сколов на несколько недель.",
    price: 40,
    duration: 45,
    image_url:
      "https://images.pexels.com/photos/939836/pexels-photo-939836.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    created_at: new Date().toISOString(),
    category: "Маникюр"
  },
  {
    id: 3,
    name: "Люкс педикюр",
    description:
      "Побалуйте себя люкс педикюром с пилингом, удалением мозолей, расширенным массажем и идеальным покрытием.",
    price: 55,
    duration: 60,
    image_url:
      "https://images.pexels.com/photos/3997385/pexels-photo-3997385.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    created_at: new Date().toISOString(),
    category: "Педикюр"
  },
];

const services: Service[] = [
  {
    id: 1,
    name: "Классический маникюр",
    description:
      "Традиционный маникюр с приданием формы ногтям, уходом за кутикулой, массажем рук и покрытием по вашему выбору.",
    price: 25,
    duration: 30,
    image_url:
      "https://images.pexels.com/photos/704815/pexels-photo-704815.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    created_at: new Date().toISOString(),
    category: "Маникюр"
  },
  {
    id: 2,
    name: "Гель-лак",
    description:
      "Долговременное покрытие гель-лаком, которое защищает ваши натуральные ногти и обеспечивает великолепный цвет без сколов на несколько недель.",
    price: 40,
    duration: 45,
    image_url:
      "https://images.pexels.com/photos/939836/pexels-photo-939836.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    created_at: new Date().toISOString(),
    category: "Маникюр"
  },
  {
    id: 3,
    name: "Люкс педикюр",
    description:
      "Побалуйте себя люкс педикюром с пилингом, удалением мозолей, расширенным массажем и идеальным покрытием.",
    price: 55,
    duration: 60,
    image_url:
      "https://images.pexels.com/photos/3997385/pexels-photo-3997385.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    created_at: new Date().toISOString(),
    category: "Педикюр"
  },
  {
    id: 4,
    name: "Наращивание гелем",
    description:
      "Потрясающее наращивание гелем, которое обеспечивает прочность, длину и идеальную основу для дизайна ногтей.",
    price: 70,
    duration: 90,
    image_url:
      "https://images.pexels.com/photos/3997391/pexels-photo-3997391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    created_at: new Date().toISOString(),
    category: "Наращивание"
  },
  {
    id: 5,
    name: "Индивидуальный дизайн",
    description:
      "Выразите свой личный стиль с помощью индивидуальных ручных рисунков, блесток, страз или 3D-элементов.",
    price: 20,
    duration: 30,
    image_url:
      "https://images.pexels.com/photos/704815/pexels-photo-704815.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    created_at: new Date().toISOString(),
    category: "Дизайн"
  },
  {
    id: 6,
    name: "Парафинотерапия",
    description:
      "Успокаивающая и увлажняющая процедура для сухих рук с использованием теплого парафина, которая делает кожу мягкой и омоложенной.",
    price: 25,
    duration: 20,
    image_url:
      "https://images.pexels.com/photos/3997304/pexels-photo-3997304.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    created_at: new Date().toISOString(),
    category: "Спа"
  },
];

export default services;
