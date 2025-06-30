# 🔒 Güvenlik Kurulum Rehberi

## ⚠️ ÖNEMLİ GÜVENLİK UYARILARI

Bu proje hassas bilgiler içerebilir. Güvenli kurulum için aşağıdaki adımları takip edin.

## 🚨 İlk Kurulum

### 1. Environment Dosyası Oluşturun
```bash
cp .env.example .env
```

### 2. .env Dosyasını Düzenleyin
```bash
# Güçlü şifreler kullanın
DATABASE_PASSWORD=en_az_16_karakter_guvenli_sifre
JWT_SECRET=en_az_32_karakter_jwt_secret_key_buraya
REDIS_PASSWORD=redis_icin_guvenli_sifre
```

### 3. Docker Compose Dosyasını Oluşturun
```bash
cp docker-compose.example.yml docker-compose.yml
```

### 4. Admin Kullanıcı Scripti Oluşturun
```bash
cp database/init/05-admin-password-update.example.sql database/init/05-admin-password-update.sql
# Dosyayı düzenleyerek gerçek bilgileri ekleyin
```

## 🔐 Şifre Hash Oluşturma

Bcrypt hash oluşturmak için:
```bash
node -e "const bcrypt=require('bcrypt'); console.log(bcrypt.hashSync('YourPassword123', 12))"
```

## 🛡️ Güvenlik Kontrol Listesi

- [ ] .env dosyası oluşturuldu ve güçlü şifreler kullanıldı
- [ ] Admin şifreleri güncellendi  
- [ ] JWT secret en az 32 karakter
- [ ] Database şifresi en az 16 karakter
- [ ] E-posta adresleri gerçek adreslerle değiştirildi
- [ ] Production'da debug modları kapatıldı
- [ ] CORS ayarları kontrol edildi

## 🚫 Asla Commit Etmeyin

- `.env` dosyları
- Admin şifre scriptleri
- Docker compose dosyaları (gerçek şifreler içeren)
- Personal bilgiler içeren dosyalar

## 🔍 Güvenlik Denetimi

Düzenli olarak şunları kontrol edin:
- [ ] Git geçmişinde şifre yok
- [ ] Public repository'de hassas bilgi yok
- [ ] Environment değişkenleri güncel
- [ ] Admin hesapları güvenli

## 📞 Güvenlik Sorunu Bildirimi

Güvenlik açığı bulursanız lütfen özel olarak bildirin.
**Asla public issue olarak paylaşmayın!** 