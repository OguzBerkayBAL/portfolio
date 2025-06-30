# 🚀 Oğuz Berkay BAL - Portfolio Deployment

> ⚠️ **NOT:** Bu kişisel portfolio sitesidir. Kopyalama veya başka projeler için kullanım izni bulunmamaktadır.

## 📋 Sadece Geliştirici İçin Notlar

- [x] GitHub repository: OguzBerkayBAL/portfolio
- [x] Render.com hesabı ([render.com](https://render.com))
- [x] PostgreSQL database (production)

## 🗄️ 1. PostgreSQL Database Oluşturma

### 1.1 Render Dashboard'da Database Oluştur
1. **Render.com** → **Dashboard** → **New** → **PostgreSQL**
2. **Database Name:** `dark-tech-portfolio-db`
3. **Database User:** `portfolio_user`
4. **Region:** Frankfurt (Avrupa)
5. **Plan:** Starter ($7/month)
6. **Create Database**

### 1.2 Database Bilgilerini Kopyala
```
Database URL: postgres://portfolio_user:password@hostname/database_name
Internal Database URL: postgres://portfolio_user:password@hostname/database_name
PSQL Command: psql postgres://portfolio_user:password@hostname/database_name
```

## 🚀 2. Backend API Deployment

### 2.1 Render'da Backend Service Oluştur
1. **Dashboard** → **New** → **Web Service**
2. **Connect GitHub** → Repository seç: `OguzBerkayBAL/portfolio`
3. **Root Directory:** `backend`
4. **Environment:** `Node`
5. **Build Command:** `npm run render-build`
6. **Start Command:** `npm run start:prod`
7. **Plan:** Starter ($7/month)

### 2.2 Production Environment Variables (PRIVATE)
```bash
NODE_ENV=production
PORT=10000
API_PREFIX=api/v1

# Production Database - Oğuz Berkay BAL
DATABASE_URL=[PRIVATE_PRODUCTION_DB_URL]
DATABASE_HOST=[PRIVATE_HOST]
DATABASE_PORT=5432
DATABASE_USERNAME=portfolio_user
DATABASE_PASSWORD=[PRIVATE_PASSWORD]
DATABASE_NAME=berkay_portfolio_db

# Security Keys - PRIVATE
JWT_SECRET=[PRIVATE_JWT_SECRET_64_CHARS]
JWT_EXPIRES_IN=7d

# Email Configuration - Oğuz Berkay BAL
SMTP_HOST=smtp.icloud.com
SMTP_PORT=587
SMTP_USER=oguzberkaybal@icloud.com
SMTP_PASS=[PRIVATE_ICLOUD_APP_PASSWORD]
SMTP_FROM=oguzberkaybal@icloud.com

# File Upload
UPLOAD_DEST=./uploads
MAX_FILE_SIZE=5242880

# Rate Limiting
THROTTLE_TTL=60
THROTTLE_LIMIT=100

# Production URLs - Oğuz Berkay BAL Portfolio
FRONTEND_URL=https://oguzberkaybal-portfolio.onrender.com
CORS_ORIGIN=https://oguzberkaybal-portfolio.onrender.com
```

### 2.3 Deploy Backend
- **Deploy** butonuna tıkla
- Build loglarını izle (~3-5 dakika)
- Backend URL'i kopyala: `https://your-backend-name.onrender.com`

## 🎨 3. Frontend Deployment

### 3.1 Render'da Frontend Service Oluştur
1. **Dashboard** → **New** → **Static Site**
2. **Connect GitHub** → Repository seç: `OguzBerkayBAL/portfolio`
3. **Root Directory:** `frontend`
4. **Build Command:** `npm run render-build`
5. **Publish Directory:** `build`

### 3.2 Frontend Environment Variables (PRIVATE)
```bash
REACT_APP_API_URL=https://berkay-portfolio-api.onrender.com/api/v1
REACT_APP_EMAILJS_PUBLIC_KEY=[PRIVATE_EMAILJS_KEY]
```

### 3.3 Deploy Frontend
- **Deploy** butonuna tıkla
- Build loglarını izle (~2-3 dakika)
- Frontend URL'i kopyala: `https://your-frontend-name.onrender.com`

## 🔗 4. Backend CORS Güncelleme

### 4.1 Backend Environment Variables Güncelle
```bash
FRONTEND_URL=https://your-frontend-name.onrender.com
CORS_ORIGIN=https://your-frontend-name.onrender.com
```

### 4.2 Backend'i Redeploy Et
- Backend service'e git
- **Manual Deploy** → **Deploy latest commit**

## 🗄️ 5. Database Kurulumu

### 5.1 Database Connection Test
Backend deploy loglarında şu mesajları gör:
```
✅ Database connected successfully
✅ Application listening on port 10000
```

### 5.2 Database'e Veri Ekleme
1. **Render Database** → **Shell** → **Open Terminal**
2. Aşağıdaki komutları çalıştır:

```sql
-- Admin kullanıcı oluştur
INSERT INTO users (username, email, password, first_name, last_name, role, status, email_verified) 
VALUES ('oguzberkaybal', 'oguzberkaybal@icloud.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewJyytK.F2U7Yy5a', 'Oğuz Berkay', 'BAL', 'admin', 'active', true);

-- Test projesi ekle
INSERT INTO projects (title, description, status, featured) 
VALUES ('Portfolio Website', 'Modern cyberpunk portfolio', 'completed', true);
```

## ✅ 6. Test Etme

### 6.1 URLs Kontrol
- **Frontend:** https://your-frontend-name.onrender.com
- **Backend API:** https://your-backend-name.onrender.com/api/v1
- **API Docs:** https://your-backend-name.onrender.com/api/v1/docs

### 6.2 Fonksiyonlar Test Et
- [ ] Ana sayfa yükleniyor
- [ ] Projects sayfası API'den veri çekiyor
- [ ] Contact form çalışıyor
- [ ] Admin login çalışıyor

## 💡 Önemli Notlar

### ⚡ Cold Start
- Render free tier'da 15 dakika sonra uyur
- İlk istek 30-60 saniye sürebilir

### 🔄 Auto Deploy
- GitHub'a push yapınca otomatik deploy olur
- Main branch için auto-deploy aktif

### 💰 Maliyet (Aylık)
- PostgreSQL: $7
- Backend Web Service: $7
- Frontend Static Site: Ücretsiz
- **Toplam: $14/month**

## 🆘 Sorun Giderme

### Database Bağlantı Hatası
```bash
# Backend loglarında kontrol et:
# "Database connection failed"
# Environment variables'ları kontrol et
```

### CORS Hatası
```bash
# Backend'de CORS_ORIGIN güncel mi?
# Frontend'den doğru API URL kullanılıyor mu?
```

### Build Hatası
```bash
# package.json'da render-build script var mı?
# Dependencies güncel mi?
``` 