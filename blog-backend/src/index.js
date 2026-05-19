// src/index.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import articleRoutes from './routes/articleRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();
const app = express();

// Global Middlewares Pendukung Keamanan & Parsing 
app.use(express.json()); // Parsing data body bertipe JSON 
app.use(cors()); // Mengontrol origin domain yang berhak mengakses API 
app.use(helmet()); // Mengaktifkan proteksi HTTP Header otomatis 

// Rate Limiting untuk mencegah Brute Force dan serangan DoS 
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100 // Batas maksimal 100 request dari satu alamat IP 
}));

// Mengarahkan alur routing rute artikel
app.use('/api/articles', articleRoutes);

// Registrasi Global Error Handler (WAJIB didaftarkan paling terakhir setelah routes!) 
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend server KOMATIK berjalan lancar di port ${PORT}`));