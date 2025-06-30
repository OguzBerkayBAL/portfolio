-- 🚀 Dark Tech Portfolio - Database Initialization
-- This script creates the initial database schema and sample data

-- ========================================
-- CREATE ENUMS
-- ========================================

CREATE TYPE project_status_enum AS ENUM (
    'planning',
    'in_progress', 
    'completed',
    'archived'
);

CREATE TYPE skill_category_enum AS ENUM (
    'frontend',
    'backend',
    'database',
    'devops',
    'design',
    'tools'
);

CREATE TYPE message_status_enum AS ENUM (
    'unread',
    'read',
    'replied',
    'archived'
);

CREATE TYPE user_role_enum AS ENUM (
    'user',
    'admin',
    'moderator'
);

CREATE TYPE user_status_enum AS ENUM (
    'active',
    'inactive',
    'suspended',
    'pending'
);

-- ========================================
-- CREATE TABLES
-- ========================================

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    long_description TEXT,
    technologies TEXT[] NOT NULL DEFAULT '{}',
    github_url VARCHAR(255),
    live_url VARCHAR(255),
    image_url VARCHAR(255),
    featured BOOLEAN DEFAULT false,
    status project_status_enum DEFAULT 'planning',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Skills table
CREATE TABLE IF NOT EXISTS skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL,
    category skill_category_enum NOT NULL,
    level INTEGER CHECK (level >= 1 AND level <= 4),
    icon VARCHAR(100),
    color VARCHAR(7),
    "order" INTEGER DEFAULT 0
);

-- Experiences table
CREATE TABLE IF NOT EXISTS experiences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(100) NOT NULL,
    company VARCHAR(100) NOT NULL,
    location VARCHAR(100),
    start_date DATE NOT NULL,
    end_date DATE,
    current BOOLEAN DEFAULT false,
    description TEXT NOT NULL,
    technologies TEXT[] DEFAULT '{}',
    achievements TEXT[] DEFAULT '{}'
);

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    published BOOLEAN DEFAULT false,
    featured_image VARCHAR(255),
    read_time INTEGER DEFAULT 5,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    status message_status_enum DEFAULT 'unread',
    created_at TIMESTAMP DEFAULT NOW(),
    read_at TIMESTAMP
);

-- Users table (for authentication)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    avatar VARCHAR(255),
    role user_role_enum DEFAULT 'user',
    status user_status_enum DEFAULT 'active',
    reset_password_token VARCHAR(255),
    reset_password_expires TIMESTAMP,
    email_verification_token VARCHAR(255),
    email_verified BOOLEAN DEFAULT false,
    last_login_at TIMESTAMP,
    last_login_ip VARCHAR(45),
    login_attempts INTEGER DEFAULT 0,
    locked_until TIMESTAMP,
    preferences JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ========================================
-- CREATE INDEXES
-- ========================================

-- Projects indexes
CREATE INDEX IF NOT EXISTS idx_projects_featured_status ON projects(featured, status);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);

-- Skills indexes  
CREATE INDEX IF NOT EXISTS idx_skills_category_order ON skills(category, "order");

-- Experiences indexes
CREATE INDEX IF NOT EXISTS idx_experiences_current_start_date ON experiences(current, start_date DESC);

-- Blog posts indexes
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_created_at ON blog_posts(published, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);

-- Contact messages indexes
CREATE INDEX IF NOT EXISTS idx_contact_messages_status_created_at ON contact_messages(status, created_at DESC);

-- Users indexes
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role_status ON users(role, status);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at DESC);

-- ========================================
-- INSERT SAMPLE DATA
-- ========================================

-- Sample Projects
INSERT INTO projects (title, description, long_description, technologies, github_url, live_url, featured, status) VALUES
('Dark Tech Portfolio', 'Modern portfolio website with cyberpunk aesthetics', 'A full-stack portfolio website built with React, NestJS, and PostgreSQL. Features dark theme, terminal-style UI, and matrix rain animations.', '{React,TypeScript,NestJS,PostgreSQL,Docker}', 'https://github.com/berkay/dark-tech-portfolio', 'https://portfolio.berkay.dev', true, 'completed'),
('E-Commerce Platform', 'Scalable e-commerce solution', 'Full-stack e-commerce platform with microservices architecture, real-time inventory management, and AI-powered recommendations.', '{React,Node.js,Redis,PostgreSQL,Docker,AWS}', 'https://github.com/berkay/ecommerce-platform', 'https://shop.example.com', true, 'completed'),
('Real-time Chat App', 'WebSocket-based chat application', 'Real-time messaging application with rooms, file sharing, and message encryption. Built with Socket.io and modern web technologies.', '{React,Socket.io,Express,MongoDB}', 'https://github.com/berkay/realtime-chat', 'https://chat.example.com', false, 'completed');

-- Sample Skills
INSERT INTO skills (name, category, level, icon, color, "order") VALUES
-- Frontend
('React', 'frontend', 4, 'react', '#61DAFB', 1),
('TypeScript', 'frontend', 4, 'typescript', '#3178C6', 2),
('Next.js', 'frontend', 3, 'nextjs', '#000000', 3),
('Vue.js', 'frontend', 3, 'vuejs', '#4FC08D', 4),
('Tailwind CSS', 'frontend', 4, 'tailwindcss', '#06B6D4', 5),

-- Backend
('Node.js', 'backend', 4, 'nodejs', '#339933', 1),
('NestJS', 'backend', 4, 'nestjs', '#E0234E', 2),
('Express.js', 'backend', 4, 'express', '#000000', 3),
('Python', 'backend', 3, 'python', '#3776AB', 4),
('PHP', 'backend', 3, 'php', '#777BB4', 5),

-- Database
('PostgreSQL', 'database', 4, 'postgresql', '#336791', 1),
('MongoDB', 'database', 3, 'mongodb', '#47A248', 2),
('Redis', 'database', 3, 'redis', '#DC382D', 3),
('MySQL', 'database', 3, 'mysql', '#4479A1', 4),

-- DevOps
('Docker', 'devops', 4, 'docker', '#2496ED', 1),
('AWS', 'devops', 3, 'aws', '#FF9900', 2),
('GitHub Actions', 'devops', 3, 'github', '#2088FF', 3),
('Linux', 'devops', 3, 'linux', '#FCC624', 4),

-- Tools
('Git', 'tools', 4, 'git', '#F05032', 1),
('VS Code', 'tools', 4, 'vscode', '#007ACC', 2),
('Figma', 'design', 3, 'figma', '#F24E1E', 1),
('Photoshop', 'design', 2, 'photoshop', '#31A8FF', 2);

-- Sample Experiences
INSERT INTO experiences (title, company, location, start_date, end_date, current, description, technologies, achievements) VALUES
('Senior Full Stack Developer', 'TechCorp Solutions', 'Istanbul, Turkey', '2022-01-01', NULL, true, 
'Leading development of enterprise web applications and mentoring junior developers. Responsible for architecture decisions and code quality standards.', 
'{React,TypeScript,NestJS,PostgreSQL,Docker,AWS}',
'{Increased application performance by 40%,Led team of 5 developers,Implemented CI/CD pipeline,Reduced deployment time from 2 hours to 15 minutes}'),

('Full Stack Developer', 'StartupX', 'Remote', '2020-06-01', '2021-12-31', false,
'Developed and maintained multiple client projects using modern web technologies. Collaborated with design and product teams to deliver high-quality solutions.',
'{React,Node.js,MongoDB,Express,Socket.io}',
'{Delivered 15+ client projects,Improved code coverage to 85%,Reduced bug reports by 60%,Implemented real-time features}'),

('Frontend Developer', 'WebAgency Pro', 'Ankara, Turkey', '2019-03-01', '2020-05-31', false,
'Specialized in creating responsive and interactive user interfaces. Worked closely with UX designers to implement pixel-perfect designs.',
'{HTML,CSS,JavaScript,React,Vue.js,SASS}',
'{Created 25+ responsive websites,Improved page load speeds by 50%,Achieved 98% cross-browser compatibility,Mentored 2 junior developers}');

-- Sample Blog Posts
INSERT INTO blog_posts (title, slug, excerpt, content, tags, published, read_time) VALUES
('Building a Dark Theme Portfolio with React and NestJS', 'dark-theme-portfolio-react-nestjs', 
'Learn how to create a cyberpunk-inspired portfolio website with modern web technologies.',
'# Building a Dark Theme Portfolio\n\nIn this article, we''ll explore how to create a stunning dark-themed portfolio website using React, NestJS, and PostgreSQL...\n\n## Getting Started\n\nFirst, let''s set up our development environment...',
'{React,NestJS,PostgreSQL,Dark Theme,Portfolio}', true, 8),

('Modern Authentication with JWT and NestJS', 'modern-authentication-jwt-nestjs',
'Implementing secure authentication in NestJS applications using JWT tokens.',
'# Modern Authentication with JWT\n\nAuthentication is a crucial aspect of any web application...\n\n## Why JWT?\n\nJSON Web Tokens provide a stateless authentication mechanism...',
'{NestJS,JWT,Authentication,Security,TypeScript}', true, 12),

('Docker Compose for Full-Stack Development', 'docker-compose-fullstack-development',
'Streamline your development workflow with Docker Compose for full-stack applications.',
'# Docker Compose for Development\n\nDocker Compose makes it easy to manage multi-container applications...\n\n## Setting Up the Environment\n\nLet''s start by creating our docker-compose.yml file...',
'{Docker,Development,DevOps,PostgreSQL,React}', true, 10);

-- Resume table (for PDF generation feature)
CREATE TABLE IF NOT EXISTS resumes (
    id SERIAL PRIMARY KEY,
    version VARCHAR(100) UNIQUE NOT NULL,
    personal_info JSONB NOT NULL,
    education JSONB DEFAULT '[]'::jsonb,
    experience JSONB DEFAULT '[]'::jsonb,
    skills JSONB DEFAULT '[]'::jsonb,
    projects JSONB DEFAULT '[]'::jsonb,
    languages JSONB DEFAULT '[]'::jsonb,
    certifications JSONB DEFAULT '[]'::jsonb,
    is_active BOOLEAN DEFAULT true,
    custom_sections TEXT,
    template VARCHAR(20) DEFAULT 'modern',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Resume indexes
CREATE INDEX IF NOT EXISTS idx_resumes_active ON resumes(is_active);
CREATE INDEX IF NOT EXISTS idx_resumes_version ON resumes(version);
CREATE INDEX IF NOT EXISTS idx_resumes_template ON resumes(template);

-- Sample Resume Data
INSERT INTO resumes (version, personal_info, education, experience, skills, projects, languages, certifications, is_active, template) VALUES
('v2024.1', 
'{
  "name": "Berkay Özkan",
  "title": "Senior Full Stack Developer",
  "email": "berkay@portfolio.dev",
  "phone": "+90 555 123 4567",
  "location": "Istanbul, Turkey",
  "summary": "Passionate full-stack developer with 5+ years of experience building scalable web applications. Specialized in React, NestJS, and cloud technologies. Proven track record of leading development teams and delivering high-quality solutions.",
  "website": "https://berkayozkan.dev",
  "linkedin": "https://linkedin.com/in/berkayozkan",
  "github": "https://github.com/berkayozkan"
}',
'[
  {
    "degree": "Bachelor of Computer Science",
    "school": "Istanbul Technical University",
    "year": "2019",
    "gpa": "3.7/4.0",
    "description": "Specialized in Software Engineering and Web Technologies"
  }
]',
'[
  {
    "title": "Senior Full Stack Developer",
    "company": "TechCorp Solutions",
    "location": "Istanbul, Turkey",
    "startDate": "2022-01",
    "endDate": null,
    "description": "Leading development of enterprise web applications using React, NestJS, and PostgreSQL. Responsible for architecture decisions, code quality standards, and mentoring junior developers.",
    "technologies": ["React", "TypeScript", "NestJS", "PostgreSQL", "Docker", "AWS"],
    "achievements": [
      "Increased application performance by 40%",
      "Led team of 5 developers",
      "Implemented CI/CD pipeline reducing deployment time by 85%"
    ]
  },
  {
    "title": "Full Stack Developer",
    "company": "StartupX",
    "location": "Remote",
    "startDate": "2020-06",
    "endDate": "2021-12",
    "description": "Developed and maintained multiple client projects using modern web technologies. Collaborated with design and product teams to deliver high-quality solutions.",
    "technologies": ["React", "Node.js", "MongoDB", "Express", "Socket.io"],
    "achievements": [
      "Delivered 15+ client projects",
      "Improved code coverage to 85%",
      "Reduced bug reports by 60%"
    ]
  }
]',
'[
  {
    "category": "Frontend Development",
    "skills": ["React", "TypeScript", "Next.js", "Vue.js", "Tailwind CSS"]
  },
  {
    "category": "Backend Development", 
    "skills": ["NestJS", "Node.js", "Express.js", "Python", "RESTful APIs"]
  },
  {
    "category": "Database & Storage",
    "skills": ["PostgreSQL", "MongoDB", "Redis", "MySQL"]
  },
  {
    "category": "DevOps & Cloud",
    "skills": ["Docker", "AWS", "GitHub Actions", "Linux", "CI/CD"]
  },
  {
    "category": "Tools & Other",
    "skills": ["Git", "VS Code", "Figma", "Jira", "Agile/Scrum"]
  }
]',
'[
  {
    "name": "Dark Tech Portfolio",
    "description": "Modern portfolio website with cyberpunk aesthetics and terminal-style UI",
    "technologies": ["React", "TypeScript", "NestJS", "PostgreSQL", "Docker"],
    "url": "https://portfolio.berkay.dev",
    "github": "https://github.com/berkay/dark-tech-portfolio"
  },
  {
    "name": "E-Commerce Platform",
    "description": "Scalable e-commerce solution with microservices architecture",
    "technologies": ["React", "Node.js", "Redis", "PostgreSQL", "AWS"],
    "url": "https://shop.example.com",
    "github": "https://github.com/berkay/ecommerce-platform"
  }
]',
'[
  {
    "name": "Turkish",
    "level": "Native"
  },
  {
    "name": "English",
    "level": "Advanced"
  },
  {
    "name": "German",
    "level": "Intermediate"
  }
]',
'[
  {
    "name": "AWS Solutions Architect Associate",
    "issuer": "Amazon Web Services",
    "date": "2023-08",
    "credentialId": "AWS-SAA-2023-12345",
    "url": "https://aws.amazon.com/verification"
  },
  {
    "name": "React Professional Certificate",
    "issuer": "Meta",
    "date": "2022-12",
    "credentialId": "META-REACT-2022-6789"
  }
]',
true,
'cyberpunk');

-- Sample Users (Authentication)
-- Admin user (password: Admin123!)
INSERT INTO users (username, email, password, first_name, last_name, role, status, email_verified) VALUES
('admin', 'admin@portfolio.dev', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewJyytK.F2U7Yy5a', 'System', 'Administrator', 'admin', 'active', true),
('berkay_dev', 'berkay@portfolio.dev', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewJyytK.F2U7Yy5a', 'Berkay', 'Özkan', 'admin', 'active', true),
('demo_user', 'demo@portfolio.dev', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewJyytK.F2U7Yy5a', 'Demo', 'User', 'user', 'active', true),
('moderator', 'mod@portfolio.dev', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewJyytK.F2U7Yy5a', 'Content', 'Moderator', 'moderator', 'active', true);

-- Success message
DO $$
BEGIN
    RAISE NOTICE '🚀 Dark Tech Portfolio database initialized successfully!';
    RAISE NOTICE '📊 Sample data inserted:';
    RAISE NOTICE '   • % projects', (SELECT COUNT(*) FROM projects);
    RAISE NOTICE '   • % skills', (SELECT COUNT(*) FROM skills);
    RAISE NOTICE '   • % experiences', (SELECT COUNT(*) FROM experiences);
    RAISE NOTICE '   • % blog posts', (SELECT COUNT(*) FROM blog_posts);
    RAISE NOTICE '⚡ Matrix mode: ENABLED';
END $$; 