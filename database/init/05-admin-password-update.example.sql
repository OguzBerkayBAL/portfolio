-- Admin Password Update Script Template
-- IMPORTANT: Copy this file to 05-admin-password-update.sql and update with real credentials
-- Never commit the actual file with real passwords!

-- Update admin user password
-- Generate hash with: node -e "const bcrypt=require('bcrypt'); console.log(bcrypt.hashSync('YOUR_PASSWORD', 12))"
UPDATE users 
SET 
    password = 'YOUR_BCRYPT_HASH_HERE',
    updated_at = NOW()
WHERE email = 'YOUR_EMAIL@example.com';

-- If user doesn't exist, create new admin
INSERT INTO users (username, email, password, first_name, last_name, role, status, email_verified) 
SELECT 'YOUR_USERNAME', 'YOUR_EMAIL@example.com', 'YOUR_BCRYPT_HASH_HERE', 'Your First', 'Your Last', 'admin', 'active', true
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'YOUR_EMAIL@example.com');

-- Display success message
DO $$
BEGIN
    RAISE NOTICE '🔐 Admin password updated successfully!';
    RAISE NOTICE '📧 Email: YOUR_EMAIL@example.com';
    RAISE NOTICE '🔑 Password: [HIDDEN FOR SECURITY]';
    RAISE NOTICE '⚡ Login ready!';
END $$; 