// src/repositories/articleRepository.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Operasi Read (Mengambil semua artikel dari database)
export const getAllArticles = async () => {
  return await prisma.article.findMany({
    include: { penulis: { select: { username: true } } } 
  });
};

// Operasi Read (Mengambil satu artikel berdasarkan ID) 
export const getArticleById = async (id) => {
  return await prisma.article.findUnique({
    where: { id: parseInt(id) },
    include: { penulis: { select: { username: true } } }
  });
};

// Operasi Create (Menyimpan data artikel baru ke database)
export const createArticle = async (data, penulisId) => {
  return await prisma.article.create({
    data: {
      judul: data.judul,
      isi: data.isi,
      lengkap: data.lengkap,
      penulisId: penulisId
    }
  });
};