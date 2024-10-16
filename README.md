# **Çevre, Şehircilik ve İklim Değişikliği Bakanlığı - Yapı Denetim Sistemi - YİBF Listesi**

## **Karşılama**
Bu proje, **Çevre, Şehircilik ve İklim Değişikliği Bakanlığı**'nın mevcut **Yapı Denetim Sistemi** içerisinde yer alan **YİBF Listesi** hizmetini yeniden yazmayı hedefleyen bir uygulamadır. Proje, **React** ve **Node.js** tabanlı olup **Redux** kullanarak state management yapılmıştır.
- *YİBF: Yapıya İlişkin Bilgi Formu, ilgili yapı hakkında bilgiler içeren bir formdur. Projede, YİBF numaraları referans alınarak işlem geçmişi tutulur.*

## **Genel Mimari**
- **Teknolojiler:** React, Node.js, Redux, TailwindCSS, Express, CORS.
- **Backend:** Sunucu tarafında statik veri simülasyonu yapılmış, NoSQL yapısında fonksiyonlar kullanılmıştır.
- **Frontend:** Ana sayfada bir tablo görüntülenir ve pop-up ile detaylar gösterilmektedir.

## **API Dökümantasyonu**

### **Endpoint: `/api/data`**
Bu endpoint, filtrelenmiş, sıralanmış ve sayfalanmış şekilde YİBF listesi döner.
- **Parametreler:**
  - `filters`: İstenilen filtreyi iletmek için kullanılır.
  - `page`: Hangi sayfanın gösterileceğini belirler.
  - `limit`: Her sayfada gösterilecek yibf sayısını belirler.
  - `sorting`: Yibflerin sıralanma düzenini bildirir.

### **Endpoint: `/api/data/log`**
Bu endpoint, ilgili yibf için işlem geçmişini listeler.
- **Parametreler:**
  - `log`: İlgili YİBF No iletir.
  - `page`: İşlem geçmişinde hangi sayfanın gösterileceğini belirler.
  - `limit`: İşlem geçmişi pop-up'ında her sayfada gösterilecek yibf sayısı belirler.

## **Statik Veri İle Veritabanı Simülasyonu**

Sunucu tarafında 2 fonksiyon ile statik veri simülasyonu yapılmıştır. Rastgele olarak String, Number, Date ve Boolean türünde veri üretimi yapılır, NoSQL yapıdaki verileri simüle eder.

Yapay zeka ile rastgele isimler ve adresler üretilip kullanılmıştır.

### **YİBF Üretici Fonksiyon**
- Veritabanı simülasyonunun temelini oluşturan NoSQL olarak veri üretimi yapan üretici fonksiyonun döndürdüğü veri yapısı.
```
{
"Ana Bilgiler": {
    "YİBF No": 10003396,
    ...
},
"YIBF-Ozellik": { "Yibf-Turu": "Normal" },
"Yapı Bilgileri": {
    "Ada": 5879,
    "Parsel": 66,
    ...
},
"YIBF-Errors": [
    "Sorun Başlangıç Zamanı": "2023-11-24T13:41:30.017Z",
    "Sorun Adı ve Tipi": [
        "YİBF Zaman Çizelgesi Uygun Değil",
        "Normal"
    ]
],
"Yapı Sahibi Bilgileri": {...},
"Sözleşme Bilgileri": {...},
"Müteahhit Bilgileri": {...},
"Şantiye Şefi Bilgileri": {...},
"Yapı Teknik Özellikleri": {...}
}
```

### **İşlem Tarihçesi Oluşturan Fonksiyon**
- İlgili YİBF No alarak işlem geçmişi koleksiyonu için rastgele veri üretimi yapan fonksiyonun döndürdüğü veri yapısı.
```
{
"YİBF_NO": 10003396,
"İşlem Zamanı": "2024-10-10T16:02:20.998Z",
"İşlem": "Numune Toplama İstasyonu İzin Belgesi Pasif Yapılması",
"Denetim Elemanı": null,
"YDK/LAB": null,
"Gerçekleştiren": "Oğuzhan Polat"
}
```

## **Redux Yapısı**
- Redux store, YİBF ile ilgili popup'ları ve verileri yönetmek için kullanılır.
- **Reducer'lar:**
  - `YibfGosterPopup`: YİBF detaylarını gösteren popup.
  - `islemGecmisiPopup`: YİBF işlem geçmişini gösteren popup.
  - `YibfErrorsPopup`: YİBF ile ilgili sorunların gösterildiği popup.



## **Frontend Tasarım ve TailwindCSS Kullanımı**
- **Ana Sayfa:** YİBF verilerini tablo halinde görüntüler. 
- **Popuplar:** YİBF detayları, işlem geçmişi ve YİBF sorunları gibi verileri gösterir.
- **TailwindCSS:** Şablon ve stiller için kullanılmıştır.

## **Lokal Kurulum ve Çalıştırma**

### **Adım 1: Depoyu Klonlama**
Sunucu tarafında gerekli bağımlılıkları yüklemek için aşağıdaki komutları çalıştırın:
```bash
git clone https://github.com/ksyusuf/csb-yds-yibf-listesi.git
cd csb-yds-yibf-listesi
```

### **Adım 2: Server (Backend) Kurulumu**
Öncelikle projeyi lokal makinenize klonlayın:
```bash
cd server
npm install
```

Sunucu çalıştırmak için:
```bash
npm start
```

### **Adım 3: Client (Frontend) Kurulumu**
İstemci tarafında gerekli bağımlılıkları yüklemek için şu komutları çalıştırın:
```bash
cd ../client
npm install
```

İstemciyi başlatmak için:
```bash
npm start
```

Bu komut sonrasında proje varsayılan olarak http://localhost:3000 adresinde çalışacaktır.

### Notlar:

- Server tarafı http://localhost:5000 adresinde çalışacak şekilde yapılandırılmıştır.
- CORS ayarları sunucu tarafında yapıldığı için istemci ve sunucu arasında veri iletişimi sorunsuz olacaktır.

<br><br>
~Yusuf Akçakaya