-- Make external_id nullable across all tables to allow application-created records
-- without external IDs. Only CSV-imported records need external_id values for
-- reference tracking.

-- Users table
ALTER TABLE users ALTER COLUMN external_id DROP NOT NULL;

-- Books table
ALTER TABLE books ALTER COLUMN external_id DROP NOT NULL;

-- Genres table
ALTER TABLE genres ALTER COLUMN external_id DROP NOT NULL;

-- Orders table
ALTER TABLE orders ALTER COLUMN external_id DROP NOT NULL;
