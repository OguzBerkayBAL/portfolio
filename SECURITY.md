# 🔒 Güvenlik Notları

## ⚠️ ÖNEMLİ: İlk Kurulum

1. **Environment dosyası oluştur:**
   ```bash
   cp .env.example .env
   # .env dosyasını düzenleyerek güçlü şifreler ekleyin
   ```

2. **Docker compose oluştur:**
   ```bash
   cp docker-compose.example.yml docker-compose.yml
   ```

## 🔧 Production İçin Değiştirin

- [ ] JWT_SECRET - güçlü anahtar kullanın
- [ ] Database şifreleri - varsayılan şifreleri değiştirin  
- [ ] Contact.tsx - kendi iletişim bilgilerinizi ekleyin
- [ ] Database init scriptleri - kişisel bilgileri güncelleyin

## 🚫 Commit Etmeyin

- `.env` dosyaları
- Gerçek şifreler içeren dosyalar 