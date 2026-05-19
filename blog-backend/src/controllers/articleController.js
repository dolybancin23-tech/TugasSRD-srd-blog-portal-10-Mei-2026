// src/controllers/articleController.js
import * as articleService from '../services/articleService.js';
import { BadRequestError, NotFoundError } from '../utils/appError.js';
import { z } from 'zod';

// Validasi skema ketat menggunakan Zod 
const articleSchema = z.object({
  judul: z.string().min(5, "Judul minimal harus terdiri dari 5 karakter"),
  isi: z.string().min(10, "Ringkasan isi minimal harus terdiri dari 10 karakter"),
  lengkap: z.string().min(20, "Konten lengkap minimal harus terdiri dari 20 karakter")
});

export const getArticles = async (req, res, next) => {
  try {
    const articles = await articleService.fetchAllArticles();
    // Format respons sukses 
    res.status(200).json({ status: "success", data: articles }); 
  } catch (error) { next(error); } // Dilempar ke Global Error Handler 
};

export const getArticle = async (req, res, next) => {
  try {
    const article = await articleService.fetchArticleById(req.params.id);
    // Jika data tidak ditemukan, pemicu Custom Error (404) 
    if (!article) throw new NotFoundError(`Artikel dengan ID ${req.params.id} tidak ditemukan`);
    res.status(200).json({ status: "success", data: article }); 
  } catch (error) { next(error); }
};

export const postArticle = async (req, res, next) => {
  try {
    const validatedData = articleSchema.parse(req.body); 
    const newArticle = await articleService.addArticle(validatedData, req.user.id);
    
    // Status 201 Created untuk data baru yang berhasil disimpan 
    res.status(201).json({ 
      status: "success", 
      message: "Artikel baru berhasil dibuat", 
      data: newArticle 
    });
  } catch (error) {
    // Jika validasi Zod mendeteksi input salah, ubah mnjadi BadRequestError (400) 
    if (error.name === 'ZodError') {
      return next(new BadRequestError(`Validasi gagal: ${error.errors[0].message}`));
    }
    next(error);
  }
};