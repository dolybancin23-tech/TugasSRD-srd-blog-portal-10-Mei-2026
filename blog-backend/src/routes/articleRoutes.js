// src/routes/articleRoutes.js
import express from 'express';
import { getArticles, getArticle, postArticle } from '../controllers/articleController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Endpoint Publik (Dapat diakses tanpa login)
router.get('/', getArticles);          // GET /api/articles 
router.get('/:id', getArticle);        // GET /api/articles/:id 

// Endpoint Terproteksi (Wajib menyertakan token JWT penulis di headers) 
router.post('/', verifyToken, postArticle); // POST /api/articles

export default router;