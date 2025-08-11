# Grispi Müşteri Portalı & Veri İçe Aktarma Sistemi

Bu proje, Müşterilerin destek taleplerini yönetebilecekleri ve veri içe aktarma işlemlerini gerçekleştirebilecekleri kapsamlı bir portal uygulamasıdır. React ve Ant Design kullanılarak geliştirilmiştir.


![Grispi-Customer-Portal-Google-Chrome-2025-08-11-15-02-12-_online-video-cutter com_-_2_](https://github.com/user-attachments/assets/6d692b54-243a-4177-b091-22288c8457a6)
##  Özellikler

###  Destek Talep Yönetimi
- **Destek Talepleri Listesi**: Kullanıcılar tüm destek taleplerini görüntüleyebilir, filtreleyebilir ve sıralayabilir
- **Destek Talebi Detayı**: Kullanıcılar bir destek talebinin tüm detaylarını, mesaj geçmişini ve durum güncellemelerini görüntüleyebilir
- **Yeni Destek Talebi Oluşturma**: Kullanıcılar konu, kategori ve açıklama belirterek yeni destek talepleri oluşturabilir ve dosya ekleyebilir
- **Gerçek Zamanlı Mesajlaşma**: Destek ekibi ile anlık mesajlaşma imkanı

###  Veri İçe Aktarma Sistemi
- **Çoklu Dosya Formatı Desteği**: CSV ve Excel (.xlsx) dosyalarını destekler
- **Akıllı Veri Önizleme**: Dosya içeriğini yüklemeden önce önizleme imkanı
- **Dinamik Alan Eşleştirme**: Excel kolonlarını Grispi alanlarına esnek eşleştirme
- **Gerçek Zamanlı Doğrulama**: Email, telefon ve zorunlu alan kontrolü
- **Detaylı Hata Raporlama**: Başarısız satırlar için ayrıntılı hata mesajları
- **JSON Çıktı**: İşlenen verilerin JSON formatında indirilmesi

###  Kullanıcı Yönetimi
- **Kullanıcı Profili**: Kişisel bilgileri, adres bilgilerini ve şifrelerini güncelleme
- **Güvenli Giriş**: Kimlik doğrulama sistemi
- **Oturum Yönetimi**: Güvenli oturum açma/kapama

##  Teknolojiler

- **React.js 19.1.0**: Modern kullanıcı arayüzü geliştirme
- **Ant Design 5.26.6**: Profesyonel UI bileşenleri ve tasarım sistemi
- **React Router DOM 7.7.1**: Sayfa yönlendirme ve navigasyon
- **XLSX 0.18.5**: Excel dosya işleme
- **Vite 7.0.4**: Hızlı geliştirme ve build aracı
- **ESLint**: Kod kalitesi ve standartları

##  Kurulum

### Gereksinimler
- Node.js (v16 veya üzeri)
- npm veya yarn

### Adımlar

```bash
# Projeyi klonlayın
git clone [repository-url]
cd Fronted

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev

# Tarayıcınızda açın
# http://localhost:5173
```

### Diğer Komutlar

```bash
# Üretim için build
npm run build

# Kod kalitesi kontrolü
npm run lint

# Build önizlemesi
npm run preview
```

##  Kullanım

### Giriş Yapma
1. Uygulamayı başlatın ve `http://localhost:5173` adresine gidin
2. Login sayfasında kimlik bilgilerinizi girin
3. Ana dashboard'a yönlendirileceksiniz

### Destek Talep Yönetimi
- **Ana Sayfa**: Tüm destek taleplerini listeler
- **Yeni Talep**: "Yeni Talep" butonuna tıklayarak yeni destek talebi oluşturun
- **Talep Detayı**: Herhangi bir talebe tıklayarak detayları görüntüleyin
- **Mesajlaşma**: Talep detayında destek ekibi ile mesajlaşın

### Veri İçe Aktarma
1. **Dosya Yükleme**: Menüden "İçe Aktarma" seçin ve CSV/Excel dosyanızı yükleyin
2. **Veri Önizleme**: Dosya içeriğini kontrol edin, başlık satırı seçeneğini ayarlayın
3. **Alan Eşleştirme**: Excel kolonlarını Grispi alanlarına eşleştirin
4. **Özet Kontrolü**: İçe aktarma ayarlarını gözden geçirin
5. **Sonuç**: İşlem sonuçlarını görüntüleyin ve JSON çıktısını indirin

### Desteklenen Veri Türleri
- **Kişi (Contact)**: Ad, soyad, email, telefon, şirket bilgileri
- **Talep (Ticket)**: Konu, açıklama, öncelik, durum, kategori
- **Organizasyon**: Şirket adı, domain, sektör, büyüklük

##  Proje Yapısı

```
src/
├── assets/       # Resimler ve statik dosyalar
├── components/   # Yeniden kullanılabilir bileşenler
├── layouts/      # Sayfa düzenleri
├── pages/        # Ana sayfa bileşenleri
│   ├── TicketList.jsx      # Destek talepleri listesi
│   ├── TicketDetail.jsx    # Destek talebi detayı
│   ├── NewTicket.jsx       # Yeni destek talebi oluşturma
│   └── UserProfile.jsx     # Kullanıcı profili yönetimi
└── utils/        # Yardımcı fonksiyonlar ve araçlar
```
