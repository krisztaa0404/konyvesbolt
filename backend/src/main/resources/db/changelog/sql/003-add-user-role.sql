-- Add role column to users table for authentication and authorization

-- Add role column with default value 'USER'
ALTER TABLE users
ADD COLUMN role VARCHAR(20) NOT NULL DEFAULT 'USER';

-- Add check constraint to ensure valid role values
ALTER TABLE users
ADD CONSTRAINT chk_user_role CHECK (role IN ('USER', 'MANAGER', 'ADMIN'));

-- Create index on role for faster queries
CREATE INDEX idx_users_role ON users(role);

-- Update existing users to have USER role (already set by default)
-- This is just for clarity
UPDATE users SET role = 'USER' WHERE role IS NULL;

-- Optional: Create a manager user for testing
-- Password is 'manager123' hashed with BCrypt
-- You can generate this with: new BCryptPasswordEncoder().encode("manager123")
-- INSERT INTO users (id, external_id, email, password_hash, first_name, last_name, role, registration_date)
-- VALUES (
--     gen_random_uuid(),
--     (SELECT COALESCE(MAX(external_id), 0) + 1 FROM users),
--     'manager@bookstore.com',
--     '$2a$10$YourBCryptHashHere',
--     'Manager',
--     'Admin',
--     'MANAGER',
--     CURRENT_TIMESTAMP
-- );

COMMENT ON COLUMN users.role IS 'User role for authorization: USER (customer), MANAGER (inventory manager), ADMIN (system admin)';
