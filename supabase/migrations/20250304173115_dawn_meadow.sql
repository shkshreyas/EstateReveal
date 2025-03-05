/*
  # Initial schema for EstateReveal

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `full_name` (text)
      - `avatar_url` (text)
      - `created_at` (timestamp)
    - `properties`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `location` (text)
      - `address` (text)
      - `price` (numeric)
      - `bedrooms` (integer)
      - `bathrooms` (numeric)
      - `area` (numeric)
      - `lot_size` (numeric)
      - `year_built` (integer)
      - `type` (text)
      - `category` (text)
      - `is_new` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `user_id` (uuid, foreign key)
    - `property_images`
      - `id` (uuid, primary key)
      - `property_id` (uuid, foreign key)
      - `url` (text)
      - `is_primary` (boolean)
      - `created_at` (timestamp)
    - `property_features`
      - `id` (uuid, primary key)
      - `property_id` (uuid, foreign key)
      - `feature` (text)
    - `favorites`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `property_id` (uuid, foreign key)
      - `created_at` (timestamp)
    - `agents`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `phone` (text)
      - `bio` (text)
      - `created_at` (timestamp)
    - `neighborhoods`
      - `id` (uuid, primary key)
      - `name` (text)
      - `city` (text)
      - `avg_price` (numeric)
      - `price_change` (numeric)
      - `inventory` (integer)
      - `days_on_market` (integer)
      - `walk_score` (integer)
      - `image_url` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    - `market_reports`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `date` (date)
      - `image_url` (text)
      - `content` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read and manage their own data
    - Add policies for public access to property listings and market data
*/

-- Create users table (extends auth.users)
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  avatar_url text,
  created_at timestamptz DEFAULT now()
);

-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  location text NOT NULL,
  address text,
  price numeric NOT NULL,
  bedrooms integer,
  bathrooms numeric,
  area numeric,
  lot_size numeric,
  year_built integer,
  type text NOT NULL,
  category text,
  is_new boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE
);

-- Create property_images table
CREATE TABLE IF NOT EXISTS property_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid REFERENCES properties(id) ON DELETE CASCADE,
  url text NOT NULL,
  is_primary boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create property_features table
CREATE TABLE IF NOT EXISTS property_features (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid REFERENCES properties(id) ON DELETE CASCADE,
  feature text NOT NULL
);

-- Create favorites table
CREATE TABLE IF NOT EXISTS favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  property_id uuid REFERENCES properties(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, property_id)
);

-- Create agents table
CREATE TABLE IF NOT EXISTS agents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  phone text,
  bio text,
  created_at timestamptz DEFAULT now()
);

-- Create neighborhoods table
CREATE TABLE IF NOT EXISTS neighborhoods (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  city text NOT NULL,
  avg_price numeric NOT NULL,
  price_change numeric,
  inventory integer,
  days_on_market integer,
  walk_score integer,
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create market_reports table
CREATE TABLE IF NOT EXISTS market_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  date date NOT NULL,
  image_url text,
  content text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE neighborhoods ENABLE ROW LEVEL SECURITY;
ALTER TABLE market_reports ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies

-- Users policies
CREATE POLICY "Users can view their own profile"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Properties policies
CREATE POLICY "Anyone can view properties"
  ON properties
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Users can insert their own properties"
  ON properties
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own properties"
  ON properties
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own properties"
  ON properties
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Property images policies
CREATE POLICY "Anyone can view property images"
  ON property_images
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Users can insert images for their properties"
  ON property_images
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = property_images.property_id
      AND properties.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update images for their properties"
  ON property_images
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = property_images.property_id
      AND properties.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete images for their properties"
  ON property_images
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = property_images.property_id
      AND properties.user_id = auth.uid()
    )
  );

-- Property features policies
CREATE POLICY "Anyone can view property features"
  ON property_features
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Users can insert features for their properties"
  ON property_features
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = property_features.property_id
      AND properties.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update features for their properties"
  ON property_features
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = property_features.property_id
      AND properties.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete features for their properties"
  ON property_features
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = property_features.property_id
      AND properties.user_id = auth.uid()
    )
  );

-- Favorites policies
CREATE POLICY "Users can view their own favorites"
  ON favorites
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own favorites"
  ON favorites
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own favorites"
  ON favorites
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Agents policies
CREATE POLICY "Anyone can view agents"
  ON agents
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Users can update their own agent profile"
  ON agents
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Neighborhoods policies
CREATE POLICY "Anyone can view neighborhoods"
  ON neighborhoods
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Market reports policies
CREATE POLICY "Anyone can view market reports"
  ON market_reports
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_properties_updated_at
BEFORE UPDATE ON properties
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_neighborhoods_updated_at
BEFORE UPDATE ON neighborhoods
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_market_reports_updated_at
BEFORE UPDATE ON market_reports
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();