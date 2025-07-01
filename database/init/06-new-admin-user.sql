-- Create New Admin User
-- Email: berkaybal5@gmail.com
-- Password: Berkay225.

-- First, remove any existing user with this email
DELETE FROM users WHERE email = 'berkaybal5@gmail.com';

-- Create new admin user
-- Password hash for "Berkay225." with bcrypt saltRounds=12
INSERT INTO users (
    username, 
    email, 
    password, 
    first_name, 
    last_name, 
    role, 
    status, 
    email_verified,
    created_at,
    updated_at
) VALUES (
    'berkaybal5',
    'berkaybal5@gmail.com',
    '$2b$12$FBgfJA6i7zUlMr1/tW.Akeirm3swddhLbRB8LLQE/GIwkoGGq28ca',
    'Berkay',
    'BAL',
    'admin',
    'active',
    true,
    NOW(),
    NOW()
);

-- Display success message
DO $$
BEGIN
    RAISE NOTICE '🚀 New admin user created successfully!';
    RAISE NOTICE '📧 Email: berkaybal5@gmail.com';
    RAISE NOTICE '👤 Username: berkaybal5';
    RAISE NOTICE '🔑 Password: Berkay225.';
    RAISE NOTICE '⚡ Ready to login!';
END $$; 