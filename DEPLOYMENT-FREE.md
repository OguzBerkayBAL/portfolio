# 🆓 Render.com ÜCRETSİZ Deployment Rehberi

> **Oğuz Berkay BAL Portfolio** - Tamamen ücretsiz deployment

## 💰 Maliyet: $0 (TAMAMEN ÜCRETSİZ!)

- ✅ **Backend Web Service:** Ücretsiz (512MB RAM, Cold start)
- ✅ **Frontend Static Site:** Ücretsiz  
- ✅ **SQLite Database:** Ücretsiz (dosya tabanlı)
- ✅ **Toplam:** $0/month

## ⚡ Ücretsiz Plan Özellikleri:

### ✅ Avantajlar:
- Tamamen ücretsiz
- SSL sertifikası dahil
- GitHub auto-deploy
- Custom domain desteği

### ⚠️ Sınırlamalar:
- 15 dakika sonra uyur (cold start)
- İlk istek 30-60 saniye sürebilir
- 512MB RAM limiti
- SQLite (PostgreSQL değil)

## 🚀 DEPLOYMENT ADIMLARI

### 1️⃣ Backend (SQLite) Deployment

#### 1.1 Render'da Backend Service Oluştur
1. **[Render.com](https://render.com)** → **Dashboard** → **New** → **Web Service**
2. **Connect GitHub** → Repository seç: `OguzBerkayBAL/portfolio`
3. **Service Details:**
   - **Name:** `berkay-portfolio-api`
   - **Region:** Frankfurt
   - **Root Directory:** `backend`
   - **Environment:** Node
   - **Build Command:** `npm run render-build`
   - **Start Command:** `npm run start:prod`
   - **Plan:** Free

#### 1.2 Backend Environment Variables (ÜCRETSİZ)
```bash
# Database Configuration - SQLite (FREE)
NODE_ENV=production
USE_SQLITE=true
DATABASE_TYPE=sqlite
DATABASE_PATH=./data/portfolio.sqlite

# API Configuration
PORT=10000
API_PREFIX=api/v1

# JWT Secret (güçlü üret)
JWT_SECRET=your_super_strong_jwt_secret_min_32_chars_here
JWT_EXPIRES_IN=7d

# Email Configuration (iCloud SMTP)
SMTP_HOST=smtp.mail.me.com
SMTP_PORT=587
SMTP_USER=oguzberkaybal@icloud.com
SMTP_PASS=your_icloud_app_password_here
SMTP_FROM=oguzberkaybal@icloud.com

# File Upload
UPLOAD_DEST=./uploads
MAX_FILE_SIZE=5242880

# Rate Limiting
THROTTLE_TTL=60
THROTTLE_LIMIT=100

# CORS (sonradan güncellenecek)
FRONTEND_URL=https://oguzberkaybal-portfolio.onrender.com
CORS_ORIGIN=https://oguzberkaybal-portfolio.onrender.com
```

#### 1.3 Deploy Backend
- **Create Web Service** butonuna tıkla
- Build loglarını izle (~3-5 dakika)
- Backend URL'i kopyala: `https://berkay-portfolio-api.onrender.com`
- Otomatik veri ekleme çalışacak (admin kullanıcı + sample projeler)

### 2️⃣ Frontend Deployment

#### 2.1 Render'da Frontend Service Oluştur
1. **Dashboard** → **New** → **Static Site**
2. **Connect GitHub** → Repository seç: `OguzBerkayBAL/portfolio`
3. **Site Details:**
   - **Name:** `oguzberkaybal-portfolio`
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run render-build`
   - **Publish Directory:** `build`

#### 2.2 Frontend Environment Variables
```bash
REACT_APP_API_URL=https://berkay-portfolio-api.onrender.com/api/v1
REACT_APP_EMAILJS_PUBLIC_KEY=your_emailjs_public_key_optional
```

#### 2.3 Deploy Frontend
- **Create Static Site** butonuna tıkla
- Build loglarını izle (~2-3 dakika)
- Frontend URL'i kopyala: `https://oguzberkaybal-portfolio.onrender.com`

### 3️⃣ Backend CORS Güncelleme

#### 3.1 Backend Environment Variables Güncelle
```bash
FRONTEND_URL=https://oguzberkaybal-portfolio.onrender.com
CORS_ORIGIN=https://oguzberkaybal-portfolio.onrender.com
```

#### 3.2 Backend'i Redeploy Et
- Backend service'e git → **Manual Deploy** → **Deploy latest commit**

## ✅ DEPLOYMENT TAMAMLANDI!

### 🌐 Live URLs:
- **Portfolio Site:** https://oguzberkaybal-portfolio.onrender.com
- **API:** https://berkay-portfolio-api.onrender.com/api/v1
- **API Docs:** https://berkay-portfolio-api.onrender.com/api/v1/docs

### 🔐 Admin Login:
- **Email:** oguzberkaybal@icloud.com
- **Şifre:** admin123
- **Login URL:** https://oguzberkaybal-portfolio.onrender.com/auth

## 🎯 Test Checklist

- [ ] Frontend yükleniyor
- [ ] Projects sayfası veri gösteriyor
- [ ] Skills sayfası çalışıyor
- [ ] Contact form çalışıyor (SMTP ayarıyla)
- [ ] Admin login çalışıyor
- [ ] API documentation erişilebilir

## 💡 Önemli Notlar

### ⚡ Cold Start
- Site 15 dakika kullanılmazsa uyur
- İlk ziyaret 30-60 saniye sürebilir
- Sonraki istekler hızlı

### 🔄 Auto Deploy
- GitHub'a push yapınca otomatik deploy
- Main branch değişikliği = Auto deploy

### 📊 SQLite Database
- Veriler `/data/portfolio.sqlite` dosyasında
- Render restart'ta kalıcı (persistent disk)
- Backup gerekmez (auto-seeding var)

### 🚀 Performance
- Static frontend = Hızlı
- Backend cold start = Yavaş ilk istek
- Sonraki istekler = Normal hız

## 🆘 Sorun Giderme

### ❄️ Cold Start Çok Yavaş
```bash
# Normal - ilk istek 30-60sn sürebilir
# Çözüm: UptimeRobot ile 14 dakikada ping at
```

### 🗄️ Database Hatası
```bash
# SQLite dosyası oluşamıyor olabilir
# Build loglarını kontrol et
# data/ klasörü oluştu mu?
```

### 🌐 CORS Hatası
```bash
# FRONTEND_URL ve CORS_ORIGIN güncel mi?
# https:// ile başlıyor mu?
```

### 📧 Email Çalışmıyor
```bash
# iCloud App Password oluşturdun mu?
# SMTP_PASS environment variable doğru mu?
```

## 🎉 BAŞARILI DEPLOYMENT!

Artık portfolio siteniz tamamen ücretsiz olarak canlıda! 🚀 