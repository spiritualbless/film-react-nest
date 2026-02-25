-- Выполнять в базе film_db (под пользователем film_user).
-- Создаёт таблицы, совместимые с нашим бэкендом (film_db / film_user).

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS films (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  rating decimal(3,1) NOT NULL,
  director varchar(255) NOT NULL,
  tags text[] DEFAULT '{}',
  image varchar(255) NOT NULL,
  cover varchar(255) NOT NULL,
  title varchar(255) NOT NULL,
  about text NOT NULL,
  description text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS schedules (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  film_id uuid NOT NULL REFERENCES films(id) ON DELETE CASCADE,
  daytime timestamp NOT NULL,
  hall integer NOT NULL,
  rows integer NOT NULL,
  seats integer NOT NULL,
  price decimal(10,2) NOT NULL,
  taken text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
