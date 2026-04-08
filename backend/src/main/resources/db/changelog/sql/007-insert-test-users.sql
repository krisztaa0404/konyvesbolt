-- Insert test users for development and testing
-- All test users have the password: "password"
-- BCrypt hash: $2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG

-- Test User (USER role)
INSERT INTO users (
    id,
    external_id,
    email,
    password_hash,
    first_name,
    last_name,
    phone,
    role,
    is_loyalty_member,
    loyalty_discount_percent,
    total_spent,
    registration_date,
    address_data,
    preferences
) VALUES (
    'a0000000-0000-0000-0000-000000000001'::uuid,
    1001,
    'user@test.com',
    '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG',
    'Test',
    'User',
    '+36 30 123 4567',
    'USER',
    false,
    0,
    0,
    CURRENT_TIMESTAMP,
    '[{"street": "Test utca 1", "city": "Budapest", "postal_code": "1011", "country": "Hungary", "type": "home", "is_default": true}]'::jsonb,
    '{"newsletter": true, "favorite_genres": [], "notification_email": false}'::jsonb
);

-- Test Manager (MANAGER role)
INSERT INTO users (
    id,
    external_id,
    email,
    password_hash,
    first_name,
    last_name,
    phone,
    role,
    is_loyalty_member,
    loyalty_discount_percent,
    total_spent,
    registration_date,
    address_data,
    preferences
) VALUES (
    'a0000000-0000-0000-0000-000000000002'::uuid,
    1002,
    'manager@test.com',
    '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG',
    'Test',
    'Manager',
    '+36 30 234 5678',
    'MANAGER',
    false,
    0,
    0,
    CURRENT_TIMESTAMP,
    '[{"street": "Manager utca 2", "city": "Budapest", "postal_code": "1012", "country": "Hungary", "type": "home", "is_default": true}]'::jsonb,
    '{"newsletter": true, "favorite_genres": [], "notification_email": true}'::jsonb
);

-- Test Admin (ADMIN role)
INSERT INTO users (
    id,
    external_id,
    email,
    password_hash,
    first_name,
    last_name,
    phone,
    role,
    is_loyalty_member,
    loyalty_discount_percent,
    total_spent,
    registration_date,
    address_data,
    preferences
) VALUES (
    'a0000000-0000-0000-0000-000000000003'::uuid,
    1003,
    'admin@test.com',
    '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG',
    'Test',
    'Admin',
    '+36 30 345 6789',
    'ADMIN',
    false,
    0,
    0,
    CURRENT_TIMESTAMP,
    '[{"street": "Admin utca 3", "city": "Budapest", "postal_code": "1013", "country": "Hungary", "type": "home", "is_default": true}]'::jsonb,
    '{"newsletter": true, "favorite_genres": [], "notification_email": true}'::jsonb
);

-- Test Loyalty Member (USER role with loyalty benefits)
INSERT INTO users (
    id,
    external_id,
    email,
    password_hash,
    first_name,
    last_name,
    phone,
    role,
    is_loyalty_member,
    loyalty_discount_percent,
    total_spent,
    registration_date,
    address_data,
    preferences
) VALUES (
    'a0000000-0000-0000-0000-000000000004'::uuid,
    1004,
    'loyalty@test.com',
    '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG',
    'Loyalty',
    'Member',
    '+36 30 456 7890',
    'USER',
    true,
    10,
    55000,
    CURRENT_TIMESTAMP,
    '[{"street": "Loyalty utca 4", "city": "Budapest", "postal_code": "1014", "country": "Hungary", "type": "home", "is_default": true}]'::jsonb,
    '{"newsletter": true, "favorite_genres": ["Fiction", "Mystery"], "notification_email": true}'::jsonb
);
