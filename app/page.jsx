import { toko } from "@/lib/toko";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import Link from "next/link";
import KatalogDinamis from "@/components/KatalogDinamis";
import FloatingCart from "@/components/FloatingCart";

export default async function HalamanKatalog() {
  // Hanya ambil data produk dari Supabase, TANPA ada pengecekan session login
  const supabase = createSupabaseServerClient();
  const { data: daftarProduk, error } = await supabase
    .from("produk")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="relative min-h-screen">
      
      {/* Tombol Login Admin di pojok kanan atas */}
      <div className="absolute top-6 right-6 md:top-8 md:right-8 z-50">
        <Link 
          href="/admin/login" 
          className="text-sm font-medium px-5 py-2.5 rounded-full bg-white text-[#4A3628] border border-gray-200 shadow-sm hover:bg-gray-50 transition-all"
        >
          Admin Login
        </Link>
      </div>

      <section className="relative overflow-hidden py-16 sm:py-24 flex flex-col items-center justify-center text-center">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-utama/10 via-latar to-latar"></div>
        
        <h1 className="max-w-3xl text-5xl font-extrabold leading-[1.1] tracking-tight sm:text-7xl text-teks">
          Ruang Nyaman Untuk <br/> 
          <span className="text-teks">
            Waktu Yang Lambat
          </span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-teks-lembut font-medium">
          {toko.nama} - {toko.tagline}
        </p>
        <div className="mt-8 flex items-center justify-center gap-2 text-sm font-semibold text-teks bg-permukaan px-4 py-2 rounded-full border border-garis shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          {toko.jamBuka}
        </div>
      </section>

      <section aria-labelledby="judul-produk" className="flex flex-col gap-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 id="judul-produk" className="text-2xl font-bold tracking-tight text-teks">
            Our Menu
          </h2>
        </div>
        
        {error ? (
          <div className="rounded-xl bg-bahaya/10 p-6 text-center text-bahaya shadow-sm border border-bahaya/20">
            <p className="font-semibold">Gagal mengambil produk</p>
            <p className="text-sm mt-1">{error.message}</p>
          </div>
        ) : !daftarProduk || daftarProduk.length === 0 ? (
          <div className="rounded-xl border border-garis bg-permukaan p-12 text-center shadow-sm">
            <p className="text-teks-lembut">Belum ada menu yang tersedia.</p>
          </div>
        ) : (
          <KatalogDinamis produkList={daftarProduk} />
        )}
      </section>
      
      <FloatingCart />
    </div>
  );
}