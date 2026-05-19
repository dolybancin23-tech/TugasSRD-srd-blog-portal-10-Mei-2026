// src/seed.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Memulai proses penyuntikan data artikel...');

  // Bersihkan sisa data lama agar tidak bentrok
  await prisma.article.deleteMany({});
  await prisma.user.deleteMany({});

  // 1. Buat data User 'Doly' sebagai Penulis
  const user = await prisma.user.create({
    data: {
      id: 1,
      username: 'Doly',
      password: 'passwordbebas'
    }
  });

  // 2. Suntikkan 3 data artikel tiruan dari Tugas 1 kemarin
  await prisma.article.createMany({
    data: [
      {
        id: 1,
        judul: 'Belajar React di KOMATIK',
        isi: 'React adalah library UI yang populer untuk membangun antarmuka.',
        lengkap: 'React telah menjadi standar industri dalam pengembangan frontend. Di komunitas KOMATIK, kita mempelajari bagaimana React menggunakan komponen untuk mempercepat proses development. Dengan konsep \'Learn Once, Write Anywhere\', React memungkinkan kita membangun aplikasi web yang sangat interaktif dan efisien dalam penggunaan resource melalui mekanisme Virtual DOM.',
        penulisId: user.id
      },
      {
        id: 2,
        judul: 'Mengenal Next.js App Router',
        isi: 'Next.js mempermudah routing dan optimasi aplikasi web modern.',
        lengkap: 'App Router adalah revolusi dalam Next.js yang memperkenalkan Server Components. Fitur ini memungkinkan kita untuk melakukan fetch data langsung di server, mengurangi beban JavaScript di sisi klien, dan meningkatkan performa SEO secara signifikan. Dengan struktur folder yang intuitif, pengelolaan rute menjadi jauh lebih terorganisir.',
        penulisId: user.id
      },
      {
        id: 3,
        judul: 'Tips Menjadi Software Engineer',
        isi: 'Pelajari fundamental programming dan perbanyak latihan proyek.',
        lengkap: 'Menjadi Software Engineer yang handal bukan hanya soal menghafal sintaks, tapi soal problem solving. Fokuslah pada algoritma, struktur data, dan prinsip Clean Code. Jangan ragu untuk mencoba berbagai framework, namun pastikan kamu memahami \'under the hood\' dari teknologi yang kamu gunakan tersebut agar bisa beradaptasi dengan cepat.',
        penulisId: user.id
      }
    ]
  });

  console.log('3 Data artikel tiruan berhasil disuntikkan ke SQLite!');
}

main()
  .catch((e) => {
    console.error('Waduh, seed gagal:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });