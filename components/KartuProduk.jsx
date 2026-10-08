import Link from "next/link";
import { formatRupiah } from "@/lib/format";

export default function KartuProduk({ produk }) {
  return (
    <Link
      href={`/produk/${produk.id}`}
      className="group relative flex flex-col overflow-hidden rounded-3xl bg-permukaan shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative">
        <img
          src={produk.foto_url}
          alt={produk.nama}
          className="aspect-square w-full bg-latar object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      
      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="text-[11px] font-bold uppercase tracking-wider text-teks-lembut">
          {produk.kategori}
        </p>
        <h3 className="text-lg font-semibold leading-snug text-teks group-hover:text-utama">
          {produk.nama}
        </h3>
        
        <div className="mt-auto flex items-end justify-between pt-3">
          <p className="text-base font-bold text-utama">
            {formatRupiah(produk.harga)}
          </p>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-utama text-white transition-transform hover:scale-110 active:scale-95 shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
