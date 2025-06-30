-- Portfolio Data Update Based on Latest CV
-- Oğuz Berkay BAL - Updated CV Information (Aralık 2024)

-- Clear existing data for fresh update
DELETE FROM projects;
DELETE FROM skills;
DELETE FROM experiences;
DELETE FROM users;

-- ========================================
-- UPDATED USER PROFILE INFORMATION
-- ========================================

INSERT INTO users (username, email, first_name, last_name, role, status, email_verified, bio, phone, location, linkedin_url, github_url) VALUES
('oguzberkaybal', 'oguzberkaybal@icloud.com', 'Oğuz Berkay', 'BAL', 'admin', 'active', true,
'Bilgisayar Mühendisliği 4. sınıf öğrencisi olarak Süleyman Demirel Üniversitesi''nde eğitim görmekteyim ve Temmuz 2025''te mezun olacağım. Bilgi teknolojileri dünyasında her gün kendimi geliştirmeye odaklanan, yenilikçi ve tutkulu bir yazılımcıyım. MERN stack teknolojilerine hakimiyetimle birlikte, Python, TypeScript, Java, PostgreSQL ve MongoDB gibi farklı programlama dilleri ve veritabanlarıyla çalışıyorum.',
'0542 260 27 32',
'Nevşehir/Merkez/Türkiye',
'https://www.linkedin.com/in/oguzberkaybal',
'https://github.com/OguzBerkayBAL');

-- ========================================
-- UPDATED PROJECTS FROM CV
-- ========================================

INSERT INTO projects (title, description, long_description, technologies, github_url, live_url, featured, status, start_date, end_date) VALUES
('Insight Hub', 'AI-powered knowledge access and chatbot platform', 
'Insight Hub, yapay zeka destekli bir bilgi erişim ve chatbot platformudur. Belgeleri analiz ederek sorulara anlamlı yanıtlar üretir ve kullanıcıların eklenen büyük dil modelleri (LLM) ile veritabanındaki bilgilere hızlı erişimini sağlar. RAG mimarisi sayesinde, güncel ve doğru verileri kullanarak etkili bir bilgi yönetimi sunar.',
'{Python,LangChain,NLP,LLM,RAG,PostgreSQL,Docker,FastAPI}', 
'https://github.com/OguzBerkayBAL/insight-hub', 
null, 
true, 
'in_progress',
'2024-09-01',
null),

('Bambi-Clone', 'MERN stack e-commerce platform clone', 
'Bambi Hermanos, MERN (MongoDB, Express.js, React, Node.js) stack kullanılarak geliştirilmiş bir e-ticaret platformu klonudur. Proje, kullanıcı dostu bir arayüz ve modern tasarım prensipleri ile oluşturulmuş olup, ürün listeleme, detaylı filtreleme ve alışveriş sepeti gibi temel e-ticaret fonksiyonlarını içermektedir.',
'{MongoDB,Express.js,React,Node.js,JavaScript,CSS}', 
'https://github.com/OguzBerkayBAL/bambi-clone', 
null, 
true, 
'completed',
'2024-02-01',
'2024-07-01'),

('Mekanbul', 'Location-based venue discovery platform', 
'Mekanbul insanların konumları civarındaki mekanları, sunduğu imkanları görmelerini, mekanlara yorum yapabilmelerini sağlayan bir web uygulamadır. Uygulamanın aynı zamanda bir admin paneli mevcuttur. Admin mekan ekleme, silme, güncelleme, tüm mekanları görme gibi işlemleri yapabilmektedir.',
'{Node.js,Express.js,MongoDB,JavaScript,Bootstrap,EJS}', 
'https://github.com/OguzBerkayBAL/mekanbul', 
null, 
false, 
'completed',
'2023-09-01',
'2024-01-01'),

('Dark Tech Portfolio', 'Modern cyberpunk-themed portfolio website', 
'Tam yığın portfolio web sitesi React, NestJS ve PostgreSQL ile geliştirilmiştir. Karanlık cyberpunk teması, terminal tarzı UI, matrix yağmuru animasyonları ve kapsamlı proje vitrinini içerir.',
'{React,TypeScript,NestJS,PostgreSQL,Docker,Redis}', 
'https://github.com/OguzBerkayBAL/portfolio', 
null, 
true, 
'in_progress',
'2024-12-01',
null);

-- ========================================
-- UPDATED SKILLS FROM CV
-- ========================================

INSERT INTO skills (name, category, level, icon, color, "order", description, years_of_experience) VALUES
-- Backend & Core Programming
('Python', 'backend', 4, 'python', '#3776AB', 1, 'AI/ML projeleri ve backend geliştirme için kullanıyorum', 2),
('JavaScript', 'backend', 4, 'javascript', '#F7DF1E', 2, 'Full-stack web geliştirme için temel dil', 3),
('TypeScript', 'backend', 3, 'typescript', '#3178C6', 3, 'Tip güvenli JavaScript geliştirme', 2),
('Node.js', 'backend', 4, 'nodejs', '#339933', 4, 'Backend API ve server geliştirme', 3),
('Express.js', 'backend', 4, 'express', '#000000', 5, 'RESTful API geliştirme framework', 3),
('NestJS', 'backend', 3, 'nestjs', '#E0234E', 6, 'Enterprise backend uygulamaları', 1),
('Java', 'backend', 2, 'java', '#ED8B00', 7, 'Üniversite dersleri ve temel projeler', 1),

-- Frontend
('React.js', 'frontend', 4, 'react', '#61DAFB', 1, 'Modern frontend uygulamaları geliştirme', 3),
('HTML5', 'frontend', 4, 'html5', '#E34F26', 2, 'Web yapısı ve semantik markup', 4),
('CSS3', 'frontend', 4, 'css3', '#1572B6', 3, 'Responsive ve modern UI tasarımı', 4),
('Bootstrap', 'frontend', 3, 'bootstrap', '#7952B3', 4, 'Hızlı responsive UI geliştirme', 2),

-- Database
('MongoDB', 'database', 4, 'mongodb', '#47A248', 1, 'NoSQL veritabanı tasarım ve yönetimi', 3),
('PostgreSQL', 'database', 3, 'postgresql', '#336791', 2, 'İlişkisel veritabanı tasarım ve optimizasyon', 1),
('SQL', 'database', 3, 'database', '#CC2927', 3, 'Veritabanı sorguları ve optimizasyon', 2),
('Redis', 'database', 3, 'redis', '#DC382D', 4, 'Caching ve session yönetimi', 1),

-- AI & Machine Learning Tools
('Large Language Models', 'tools', 4, 'brain', '#FF6B35', 1, 'LLM entegrasyonu ve fine-tuning', 1),
('LangChain', 'tools', 4, 'link', '#1C3A3A', 2, 'AI uygulamaları için framework', 1),
('NLP', 'tools', 3, 'message-square', '#00D4AA', 3, 'Doğal dil işleme teknikleri', 1),
('LLMOps', 'tools', 3, 'settings', '#7C3AED', 4, 'LLM operasyonları ve deployment', 1),
('RAG Architecture', 'tools', 4, 'layers', '#F59E0B', 5, 'Retrieval-Augmented Generation sistemleri', 1),

-- DevOps & Tools
('Docker', 'devops', 3, 'docker', '#2496ED', 1, 'Konteynerleştirme ve deployment', 1),
('Git', 'devops', 4, 'git-branch', '#F05032', 2, 'Version control ve işbirliği', 4),
('Linux', 'devops', 3, 'terminal', '#FCC624', 3, 'Server yönetimi ve scripting', 2),

-- Additional Technologies
('RESTful APIs', 'tools', 4, 'api', '#009688', 6, 'API tasarım ve geliştirme', 3),
('Agile', 'tools', 3, 'users', '#0052CC', 7, 'Agile metodolojileri ve Scrum', 1),
('Postman', 'tools', 3, 'send', '#FF6C37', 8, 'API testing ve dokümantasyon', 2),
('Swagger', 'tools', 3, 'book-open', '#85EA2D', 9, 'API dokümantasyonu', 1);

-- ========================================
-- UPDATED WORK EXPERIENCE
-- ========================================

INSERT INTO experiences (title, company, location, start_date, end_date, current, description, technologies, achievements, company_description) VALUES
('Yazılım Geliştirici ve Bilgi Teknolojileri Stajyeri', 'MorphosiumSoftware', 'Antalya, Türkiye', '2024-07-01', '2024-08-31', false,
'Morphosium Software şirketinde back-end developer stajyeri olarak, Çek ve Senet işlemlerini yöneten bir atölye projesinde NestJS ile servisler geliştirdim. API entegrasyonları ve veri yönetimi üzerine çalışarak, kodun ölçeklenebilir ve sürdürülebilir olmasına odaklandım. Swagger ile API dokümantasyonlarını oluşturdum ve Postman kullanarak servisleri test ettim. Verilerin doğruluğunu sağlamak için PostgreSQL üzerinde kontroller gerçekleştirdim. Takım çalışması içinde aktif rol alarak geliştirme süreçlerine katkıda bulundum ve Agile metodolojileri deneyimledim.',
'{NestJS,PostgreSQL,Swagger,Postman,API Development,Agile,TypeScript}',
'{Scalable back-end services geliştirme,Comprehensive API documentation oluşturma,Data validation ve checks implementation,Team environment collaboration,Agile development practices experience}',
'Software development company specializing in custom solutions');

-- ========================================
-- EDUCATION INFORMATION
-- ========================================

INSERT INTO resume (title, content, file_url, uploaded_at) VALUES
('Eğitim Bilgileri', 
'Süleyman Demirel Üniversitesi - Bilgisayar Mühendisliği Lisans (2021-2025, Beklenen Mezuniyet: Temmuz 2025) - GPA: 2.70. 
Dil Yeterliliği: Türkçe (Ana Dil), İngilizce (B1 Seviye)',
null,
NOW());

-- ========================================
-- UPDATE CONTACT MESSAGES WITH PROFILE INFO
-- ========================================

INSERT INTO contact_messages (name, email, subject, message, status, created_at) VALUES
('Portfolio Admin', 'oguzberkaybal@icloud.com', 'Profile Update', 
'Portfolio site CV bilgileri ile güncellendi. İletişim: 0542 260 27 32, Konum: Nevşehir/Merkez/Türkiye', 
'read', NOW()); 