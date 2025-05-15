/*
  # Create initial schema for nail salon

  1. New Tables
    - `services` - Stores all available nail services
      - `id` (integer, primary key)
      - `name` (text, required)
      - `description` (text, required)
      - `price` (numeric, required)
      - `duration` (integer, required) - in minutes
      - `image_url` (text, optional)
      - `category` (text, not null)
      - `created_at` (timestamp with time zone, defaults to now())
    
    - `appointments` - Stores client bookings
      - `id` (integer, primary key)
      - `client_id` (uuid, references auth.users)
      - `service_id` (integer, references services.id)
      - `appointment_date` (timestamp with time zone, required)
      - `status` (text, required) - pending, confirmed, completed, cancelled
      - `created_at` (timestamp with time zone, defaults to now())
      - `client_name` (text, required)
      - `client_email` (text, required)
      - `client_phone` (text, required)
      - `notes` (text, optional)

  2. Security
    - Enable RLS on all tables
    - Create policies for appointment access
    - Create policies for service access
*/

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id serial PRIMARY KEY,
  name text NOT NULL,
  description text NOT NULL,
  price numeric NOT NULL,
  duration integer NOT NULL,
  image_url text,
  category text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id serial PRIMARY KEY,
  client_id uuid REFERENCES auth.users(id),
  service_id integer REFERENCES services(id) NOT NULL,
  appointment_date timestamptz NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  client_name text NOT NULL,
  client_email text NOT NULL,
  client_phone text NOT NULL,
  notes text
);

-- Enable Row Level Security
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Services policies
CREATE POLICY "Services are viewable by everyone"
  ON services
  FOR SELECT
  TO public
  USING (true);

-- Appointments policies
CREATE POLICY "Users can view their own appointments"
  ON appointments
  FOR SELECT
  TO authenticated
  USING (auth.uid() = client_id);

CREATE POLICY "Users can insert their own appointments"
  ON appointments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = client_id);

CREATE POLICY "Users can update their own appointments"
  ON appointments
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = client_id);

CREATE POLICY "Anon users can insert appointments"
  ON appointments
  FOR INSERT
  TO public
  WITH CHECK (client_id IS NULL);

-- Sample data for services
INSERT INTO services (name, description, price, duration, image_url, category)
VALUES
  ('Классический маникюр', 'Традиционный маникюр с приданием формы ногтям, уходом за кутикулой, массажем рук и покрытием по вашему выбору.', 25, 30, 'https://images.pexels.com/photos/704815/pexels-photo-704815.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'Маникюр'),
  ('Гель-лак', 'Долговременное покрытие гель-лаком, которое защищает ваши натуральные ногти и обеспечивает великолепный цвет без сколов на несколько недель.', 40, 45, 'https://images.pexels.com/photos/939836/pexels-photo-939836.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'Маникюр'),
  ('Люкс педикюр', 'Побалуйте себя люкс педикюром с пилингом, удалением мозолей, расширенным массажем и идеальным покрытием.', 55, 60, 'https://images.pexels.com/photos/3997385/pexels-photo-3997385.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'Педикюр'),
  ('Наращивание гелем', 'Потрясающее наращивание гелем, которое обеспечивает прочность, длину и идеальную основу для дизайна ногтей.', 70, 90, 'https://images.pexels.com/photos/3997391/pexels-photo-3997391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'Наращивание'),
  ('Индивидуальный дизайн', 'Выразите свой личный стиль с помощью индивидуальных ручных рисунков, блесток, страз или 3D-элементов.', 20, 30, 'https://images.pexels.com/photos/704815/pexels-photo-704815.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'Дизайн'),
  ('Парафинотерапия', 'Успокаивающая и увлажняющая процедура для сухих рук с использованием теплого парафина, которая делает кожу мягкой и омоложенной.', 25, 20, 'https://images.pexels.com/photos/3997304/pexels-photo-3997304.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'Спа');