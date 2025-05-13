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
INSERT INTO services (name, description, price, duration, image_url)
VALUES
  ('Classic Manicure', 'A traditional manicure with nail shaping, cuticle care, hand massage, and polish of your choice.', 25, 30, 'https://images.pexels.com/photos/704815/pexels-photo-704815.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'),
  ('Gel Manicure', 'Long-lasting gel polish application that protects your natural nails while providing gorgeous, chip-free color for weeks.', 40, 45, 'https://images.pexels.com/photos/939836/pexels-photo-939836.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'),
  ('Luxury Pedicure', 'Indulge in our luxury pedicure with exfoliation, callus removal, extended massage, and perfect polish.', 55, 60, 'https://images.pexels.com/photos/3997385/pexels-photo-3997385.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'),
  ('Gel Extensions', 'Stunning gel extensions that provide strength, length and the perfect canvas for nail art.', 70, 90, 'https://images.pexels.com/photos/3997391/pexels-photo-3997391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'),
  ('Custom Nail Art', 'Express your personal style with custom hand-painted designs, glitter, gems, or 3D elements.', 20, 30, 'https://images.pexels.com/photos/704815/pexels-photo-704815.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'),
  ('Paraffin Treatment', 'Soothe and moisturize dry hands with a warm paraffin wax treatment that leaves skin soft and rejuvenated.', 25, 20, 'https://images.pexels.com/photos/3997304/pexels-photo-3997304.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');