-- Admin Password Update Script
-- Updates the password for the main admin user

-- Update admin user password (new password: "admin123")
-- Hash generated with bcrypt saltRounds=12
UPDATE users 
SET 
    password = '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewJyytK.F2U7Yy5a',
    updated_at = NOW()
WHERE email = 'oguzberkaybal@icloud.com';

-- If user doesn't exist, create new admin
INSERT INTO users (username, email, password, first_name, last_name, role, status, email_verified) 
SELECT 'oguzberkaybal', 'oguzberkaybal@icloud.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewJyytK.F2U7Yy5a', 'Oğuz Berkay', 'BAL', 'admin', 'active', true
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'oguzberkaybal@icloud.com');

-- Display success message
DO $$
BEGIN
    RAISE NOTICE '🔐 Admin password updated successfully!';
    RAISE NOTICE '📧 Email: oguzberkaybal@icloud.com';
    RAISE NOTICE '🔑 Password: admin123';
    RAISE NOTICE '⚡ Login ready!';
END $$; 