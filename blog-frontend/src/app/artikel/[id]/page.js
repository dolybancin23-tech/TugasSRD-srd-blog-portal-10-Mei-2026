"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function DetailArtikel() {
  const params = useParams();
  const router = useRouter();
  
  // State untuk menampung satu data artikel tunggal dari database
  const [artikel, setArtikel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    async function fetchDetail() {
      try {
        // Menembak endpoint API detail berdasarkan ID dinamis params URL
        const response = await fetch(`http://localhost:5000/api/articles/${params.id}`);
        const json = await response.json();

        if (json.status === "success") {
          setArtikel(json.data);
        }
      } catch (error) {
        console.error("Gagal mengambil data detail dari backend:", error);
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchDetail();
    }
  }, [params.id]);

  if (loading) return <div className="p-20 text-center text-gray-500">Sedang memuat isi artikel...</div>;
  if (!artikel) return <div className="p-20 text-center text-red-500">Artikel tidak ditemukan...</div>;

  // Mengambil nama penulis dari objek relasi database
  const namaPenulis = artikel.penulis?.username || "Anonim";

  return (
    <main className="min-h-screen bg-white">
      <nav className="p-6 border-b">
        <button onClick={() => router.back()} className="text-blue-600 font-medium hover:underline">
          ← Kembali ke Beranda
        </button>
      </nav>
      
      <article className="max-w-3xl mx-auto py-16 px-6">
        <h1 className="text-5xl font-bold mb-6 text-gray-900 leading-tight">
          {artikel.judul}
        </h1>
        <p className="text-gray-500 mb-10 text-lg">
          Ditulis oleh <span className="font-semibold text-blue-600">{namaPenulis}</span>
        </p>
        
        <div className="text-gray-700 leading-relaxed text-xl mb-12">
          {artikel.lengkap}
        </div>

        <div className="border-t pt-8 flex items-center justify-between">
          <button 
            onClick={() => setLikes(likes + 1)}
            className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition transform active:scale-95"
          >
            👍 Suka Artikel Ini ({likes})
          </button>
          <span className="text-gray-400 text-sm">Interaksi State: Aktif</span>
        </div>
      </article>
    </main>
  );
}