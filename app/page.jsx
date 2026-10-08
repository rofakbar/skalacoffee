import { toko } from "@/lib/toko";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseActionClient } from "@/lib/supabase/ssr";
import { redirect } from "next/navigation";
import KatalogDinamis from "@/components/KatalogDinamis";
import FloatingCart from "@/components/FloatingCart";

export default async function HalamanKatalog() {
  // 1. Panggil Supabase SSR client untuk membaca cookies (cek sesi login)
  const supabaseAuth = await createSupabaseActionClient();
  
  // 2. Ambil data user saat ini dari cookies
  const { data: { user } } = await supabaseAuth.auth.getUser();

  // 3. Jika TIDAK ADA user (belum login), tendang langsung ke halaman login
  if (!user) {
    redirect("/admin/login");
  }

  // === JIKA SUDAH LOGIN, KODE DI BAWAH INI AKAN DIEKSEKUSI ===

  // 4. Panggil Supabase Server client untuk mengambil data produk
  const supabase = createSupabaseServerClient();
  const { data: daftarProduk, error } = await supabase
    .from("produk")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="relative min-h-screen">
      <section className="relative overflow-hidden py-16 sm:py-24 flex flex-col items-center justify-center text-center">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-utama/10 via-latar to-latar"></div>
        
        <h1 className="max-w-3xl text-5xl font-extrabold leading-[1.1] tracking-tight sm:text-7xl text-teks">
          Ruang Nyaman Untuk <br/> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-utama to-harga">
            Waktu Yang Lambat
          </span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-teks-lembut font-medium">
          {toko.nama} - {toko.tagline}
        </p>
        <div className="mt-8 flex items-center justify-center gap-2 text-sm font-semibold text-utama bg-utama/5 px-4 py-2 rounded-full border border-utama/10">
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