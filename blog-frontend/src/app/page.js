"use client";

import { useState, useEffect } from "react";
import CardArtikel from "@/components/CardArtikel";

export default function Home() {
  const [keyword, setKeyword] = useState("");
  // State baru untuk menampung artikel asli yang bersumber dari database backend
  const [articles, setArticles] = useState([]);
  // State untuk indikator loading saat mengambil data
  const [loading, setLoading] = useState(true);

  // Memicu pengambilan data otomatis saat halaman pertama kali dibuka
  useEffect(() => {
    async function fetchArticles() {
      try {
        // Ambil data langsung dari endpoint REST API backend Express.js kamu
        const response = await fetch("http://localhost:5000/api/articles");
        const json = await response.json();

        // Sesuai standar KOMATIK, data sukses dibungkus dalam properti "data" [cite: 137, 141]
        if (json.status === "success") {
          setArticles(json.data);
        }
      } catch (error) {
        console.error("Gagal memuat artikel dari database backend:", error);
      } finally {
        setLoading(false); // Matikan indikator loading
      }
    }

    fetchArticles();
  }, []);

  // Fitur filter pencarian real-time milikmu tetap berjalan menggunakan data dinamis database!
  const filteredArticles = articles.filter((artikel) =>
    artikel.judul.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-50 font-sans pb-20">
      <header className="bg-white border-b py-12 mb-8 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-extrabold text-blue-800 mb-2">SRD Blog Portal</h1>
          <p className="text-gray-500 text-lg italic">Portal Blog Akses Info</p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6">
        <section className="mb-12">
          <input
            type="text"
            placeholder="Cari artikel..."
            className="w-full p-4 rounded-2xl border-2 focus:border-blue-500 outline-none transition-all"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </section>

        <section className="grid gap-6">
          {/* Tampilkan pesan loading jika data sedang diproses */}
          {loading ? (
            <p className="text-center text-gray-500">Sedang memuat data artikel...</p>
          ) : filteredArticles.length === 0 ? (
            // Tampilkan pesan ini jika database masih kosong atau tidak ada judul yang cocok
            <p className="text-center text-gray-500">Tidak ada artikel yang dapat ditampilkan.</p>
          ) : (
            // Looping menampilkan data artikel dari database SQLite
            filteredArticles.map((art) => (
              <CardArtikel key={art.id} {...art} />
            ))
          )}
        </section>
      </div>
    </main>
  );
}