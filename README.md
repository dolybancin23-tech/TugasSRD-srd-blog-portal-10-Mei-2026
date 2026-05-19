# SRD Blog Portal - Fullstack Application

Aplikasi Portal Blog Digital terintegrasi penuh (*Full-stack Integration*) yang dibangun menggunakan kombinasi Next.js di sisi frontend dan Express.js di sisi backend untuk memenuhi penugasan meski banyak kekurangan. Proyek ini dikelola secara rapi dalam satu repositori induk (Monorepo).

---
### 1. Frontend (Next.js)
- Component-Based Architecture: Memisahkan antarmuka menjadi komponen modular yang dapat digunakan kembali secara bersih (seperti komponen CardArtikel).
- Dynamic Routing: Memanfaatkan fitur App Router untuk navigasi halaman detail artikel berbasis ID dinamis (/artikel/[id]).
- State Management & Hooks: Menggunakan useState untuk pencarian filter real-time dan useEffect untuk memicu pengambilan data (fetch) dari API backend secara asinkron.

### 2. Backend (Express.js)
- Layered Architecture (Arsitektur Berlapis): Logika kode dipisahkan secara ketat demi kepatuhan terhadap prinsip keterbacaan kode (clean code) dan kemudahan pemeliharaan (maintainability):
  - routes/: Menangani pendaftaran dan pemetaan titik akhir (endpoint) URL API.
  - middlewares/: Menyaring request serta menangani isu lintas domain dan keamanan (cors, helmet, express-rate-limit).
  - controllers/: Mengatur lalu lintas data, membaca input/parameter request, dan mengirim kembali respons HTTP resmi.
  - services/: Wadah utama untuk seluruh logika bisnis inti aplikasi.
  - repositories/: Berinteraksi langsung dengan database menggunakan Prisma Client.
- Robust Security: Dilindungi menggunakan pembatasan akses domain CORS, proteksi celah-celah keamanan header via Helmet, dan pencegahan serangan brute-force/spam menggunakan Rate Limiter.
- Zod Schema Validation: Memastikan setiap data yang masuk melalui request body telah tervalidasi strukturnya dengan aman sebelum menyentuh lapisan database.
- Professional Error Handling: Penanganan eror terpusat memanfaatkan kelas kustom AppError dan Global Error Handler Middleware.

### 3. Database & ORM
- SQLite Database: Penyimpanan data lokal yang ringkas, cepat, dan handal menggunakan berkas database dev.db.
- Prisma ORM (v6): Memetakan objek kode ke dalam tabel database secara type-safe serta menangani proses migrasi skema dan manipulasi data secara otomatis.

---

## 🚀 Panduan Menjalankan Proyek di Lokal

Ikuti panduan di bawah ini untuk memasang dependensi dan menyalakan aplikasi di lingkungan komputer lokal Anda menggunakan terminal Git Bash.

### Prasyarat Awal
- Pastikan komputer Anda sudah terinstal Node.js (versi v18 ke atas direkomendasikan).
- Gunakan terminal Git Bash terintegrasi di VS Code atau aplikasi Git Bash mandiri.

---

### Langkah 1: Konfigurasi dan Jalankan Backend

1. Buka terminal Git Bash Anda, pastikan berada di folder induk terluar, lalu masuk ke direktori backend:
   cd blog-backend

2. Pasang semua paket dependensi yang diperlukan oleh Express dan Prisma:
   npm install

3. Jalankan migrasi skema Prisma untuk membentuk berkas database SQLite lokal Anda:
   npx prisma migrate dev --name init

4. Suntikkan data artikel tiruan awal (data dari Tugas 1) ke dalam database menggunakan script seed:
   node src/seed.js

5. Jalankan server backend Express dalam mode pengembangan (development):
   npm run dev

*Indikator Sukses:* Server backend akan aktif dan berjalan lancar di alamat http://localhost:5000.

---

### Langkah 2: Konfigurasi dan Jalankan Frontend

1. Buka tab/jendela terminal Git Bash baru di VS Code (jangan matikan terminal backend), lalu arahkan ke direktori frontend dari folder induk:
   cd ../blog-frontend

2. Pasang semua paket dependensi frontend Next.js:
   npm install

3. Jalankan server Next.js dalam mode pengembangan menggunakan engine Turbopack:
   npm run dev

*Indikator Sukses:* Aplikasi web frontend dapat diakses melalui browser Anda di alamat http://localhost:3000.

---

## 📂 Struktur Repositori (Monorepo)

srd-blog-portal/
├── blog-backend/          # Layanan REST API (Express.js)
│   ├── prisma/            # Skema database & migrasi Prisma (dev.db)
│   ├── src/
│   │   ├── controllers/   # Logika kontroler HTTP API
│   │   ├── middlewares/   # Middleware keamanan & penanganan eror global
│   │   ├── repositories/  # Query database terisolasi via Prisma Client
│   │   ├── routes/        # Definisi rute jalan masuk API
│   │   ├── services/      # Pusat logika bisnis aplikasi
│   │   ├── index.js       # Entry point utama server Express
│   │   └── seed.js        # Script penyuntik data otomatis awal
│   └── package.json
│
├── blog-frontend/         # Antarmuka Aplikasi Web (Next.js)
│   ├── src/
│   │   ├── app/           # Beranda utama & rute dinamis detail artikel
│   │   └── components/    # Komponen modular React (CardArtikel, dll)
│   └── package.json
│
└── .gitignore             # Saringan berkas lokal agar tidak mengotori repositori Git
