-- Script de criação da tabela de inscrições para o PostgreSQL
CREATE TABLE IF NOT EXISTS registrations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  ticket VARCHAR(100) NOT NULL,
  institution VARCHAR(255),
  consent BOOLEAN NOT NULL DEFAULT FALSE,
  password_hash VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de inscrições dos minicursos
CREATE TABLE IF NOT EXISTS minicurso_registrations (
  id SERIAL PRIMARY KEY,
  registration_id INT NOT NULL REFERENCES registrations(id) ON DELETE CASCADE,
  minicurso_id INT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(registration_id, minicurso_id)
);
