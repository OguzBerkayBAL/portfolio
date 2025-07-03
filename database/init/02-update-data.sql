-- Update Portfolio Data with Real CV Information
-- Oğuz Berkay BAL - CV Based Data

-- Clear existing data
DELETE FROM projects;
DELETE FROM skills;
DELETE FROM experiences;

-- ========================================
-- REAL PROJECTS FROM CV
-- ========================================

INSERT INTO projects (title, description, long_description, technologies, github_url, live_url, featured, status, created_at) VALUES
('Insight Hub', 'AI-powered knowledge access and chatbot platform', 
'Insight Hub is an AI-powered knowledge access and chatbot platform that analyzes documents to provide meaningful answers to questions. It enables users to quickly access information in the database through integrated large language models (LLM). With RAG architecture, it provides effective knowledge management using current and accurate data.',
'{Python,LangChain,NLP,LLM,RAG,PostgreSQL,Docker,FastAPI}', 
'https://github.com/OguzBerkayBAL/InsightHub', 
null, 
true, 
'in_progress',
'2025-01-01 00:00:00'),

('Wedding Album Application', 'Web application developed for sharing wedding photos', 
'A responsive web application featuring wedding album creation and viewing, photo uploading and sharing, photo viewing and filtering capabilities. Enables guests to upload their own photos. Developed with modern UI/UX design compatible with both mobile and desktop.',
'{React,TypeScript,NestJS,MongoDB,Mongoose,Multer,Styled Components,React Router}', 
'https://github.com/OguzBerkayBAL/wedding-album', 
'https://wedding-album-frontend.onrender.com/', 
true, 
'completed',
'2025-01-02 00:00:00'),

('Bambi-Clone (E-commerce Platform)', 'MERN stack e-commerce platform clone', 
'Bambi Hermanos is an e-commerce platform clone developed using the MERN (MongoDB, Express.js, React, Node.js) stack. The project was created with a user-friendly interface and modern design principles, including basic e-commerce functions such as product listing, detailed filtering and shopping cart.',
'{MongoDB,Express.js,React,Node.js,JavaScript,CSS}', 
'https://github.com/OguzBerkayBAL/bambi-clone', 
null, 
true, 
'completed',
'2025-01-03 00:00:00'),

('Mekanbul', 'Location-based venue discovery platform', 
'Mekanbul is a web application that allows people to see venues around their locations, the facilities they offer, and comment on venues. The application also has an admin panel. The admin can perform operations such as adding, deleting, updating venues, and viewing all venues.',
'{Node.js,Express.js,MongoDB,JavaScript,Bootstrap,EJS}', 
'https://github.com/OguzBerkayBAL/mekanbul', 
null, 
false, 
'completed',
'2025-01-04 00:00:00'),

('Dark Tech Portfolio', 'Modern cyberpunk-themed portfolio website', 
'A full-stack portfolio website built with React, NestJS, and PostgreSQL. Features dark cyberpunk theme, terminal-style UI, matrix rain animations, and comprehensive project showcase.',
'{React,TypeScript,NestJS,PostgreSQL,Docker,Redis}', 
'https://github.com/OguzBerkayBAL/portfolio', 
null, 
true, 
'in_progress',
'2025-01-05 00:00:00');

-- ========================================
-- REAL SKILLS FROM CV
-- ========================================

INSERT INTO skills (name, category, level, icon, color, "order") VALUES
-- Backend & Core Programming
('Python', 'backend', 4, 'python', '#3776AB', 1),
('JavaScript', 'backend', 4, 'javascript', '#F7DF1E', 2),
('TypeScript', 'backend', 3, 'typescript', '#3178C6', 3),
('Node.js', 'backend', 4, 'nodejs', '#339933', 4),
('Express.js', 'backend', 4, 'express', '#000000', 5),
('NestJS', 'backend', 3, 'nestjs', '#E0234E', 6),

-- Frontend
('React.js', 'frontend', 4, 'react', '#61DAFB', 1),
('HTML5', 'frontend', 4, 'html5', '#E34F26', 2),
('CSS3', 'frontend', 4, 'css3', '#1572B6', 3),
('Bootstrap', 'frontend', 3, 'bootstrap', '#7952B3', 4),

-- Database
('MongoDB', 'database', 4, 'mongodb', '#47A248', 1),
('PostgreSQL', 'database', 3, 'postgresql', '#336791', 2),
('SQL', 'database', 3, 'database', '#CC2927', 3),
('Redis', 'database', 3, 'redis', '#DC382D', 4),

-- AI & Machine Learning
('Large Language Models', 'tools', 4, 'brain', '#FF6B35', 1),
('LangChain', 'tools', 4, 'link', '#1C3A3A', 2),
('NLP', 'tools', 3, 'message-square', '#00D4AA', 3),
('LLMOps', 'tools', 3, 'settings', '#7C3AED', 4),
('RAG Architecture', 'tools', 4, 'layers', '#F59E0B', 5),

-- DevOps & Tools
('Docker', 'devops', 3, 'docker', '#2496ED', 1),
('Git', 'devops', 4, 'git-branch', '#F05032', 2),
('Linux', 'devops', 3, 'terminal', '#FCC624', 3),
('AWS', 'devops', 2, 'cloud', '#FF9900', 4),

-- Additional Technologies
('RESTful APIs', 'backend', 4, 'api', '#009688', 7),
('JSON', 'backend', 4, 'braces', '#000000', 8),
('Agile', 'tools', 3, 'users', '#0052CC', 6),
('Postman', 'tools', 3, 'send', '#FF6C37', 7),
('Swagger', 'tools', 3, 'book-open', '#85EA2D', 8);

-- ========================================
-- REAL WORK EXPERIENCE
-- ========================================

INSERT INTO experiences (title, company, location, start_date, end_date, current, description, technologies, achievements) VALUES
('Software Developer & IT Intern', 'MorphosiumSoftware', 'Antalya, Türkiye', '2024-07-01', '2024-08-31', false,
'As a back-end developer intern at Morphosium Software, I developed services with NestJS in a workshop project that manages Check and Note transactions. I focused on API integrations and data management, ensuring the code was scalable and maintainable. I created API documentation with Swagger and tested services using Postman. I performed checks on PostgreSQL to ensure data accuracy. I took an active role in teamwork, contributed to development processes and experienced Agile methodologies.',
'{NestJS,PostgreSQL,Swagger,Postman,API Development,Agile}',
'{Developed scalable back-end services,Created comprehensive API documentation,Implemented data validation and checks,Collaborated effectively in team environment,Gained experience with Agile development practices}');

-- ========================================
-- CONTACT & PROFILE INFORMATION UPDATE
-- ========================================

-- Update any existing contact info or create user profile
INSERT INTO users (username, email, password, first_name, last_name, role, status, email_verified) VALUES
('oguzberkaybal', 'oguzberkaybal@icloud.com', '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', 'Oğuz Berkay', 'BAL', 'admin', 'active', true)
ON CONFLICT (email) DO UPDATE SET
    username = EXCLUDED.username,
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    updated_at = NOW(); 