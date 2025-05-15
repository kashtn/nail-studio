export interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: number;
  image_url: string | null;
  created_at: string;
  category: string;
}