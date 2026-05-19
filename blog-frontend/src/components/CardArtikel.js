// src/components/CardArtikel.js (Di dalam proyek blog-frontend)
import Link from "next/link"; // JALUR IMPORT YANG BENAR UNTUK KOMPONEN TAUTAN

export default function CardArtikel({ id, judul, isi, penulis }) {
  // Mengantisipasi jika data penulis datang dari database berbentuk objek relasi
  const namaPenulis = penulis?.username || penulis || "Anonim";

  return (
    <div className="p-6 border rounded-xl shadow-sm hover:shadow-md transition bg-white group">
      <h2 className="text-2xl font-semibold mb-2 text-gray-800 group-hover:text-blue-700 transition">
        {judul}
      </h2>
      <p className="text-gray-600 mb-4">{isi}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-blue-500 font-medium">Oleh: {namaPenulis}</span>
        <Link 
          href={`/artikel/${id}`} 
          className="text-blue-600 font-bold hover:underline flex items-center gap-1"
        >
          Baca Selengkapnya <span>→</span>
        </Link>
      </div>
    </div>
  );
}