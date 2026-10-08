"use client";

import { useState } from "react";
import KartuProduk from "./KartuProduk";

export default function KatalogDinamis({ produkList }) {
  const [filter, setFilter] = useState("All");
  
  const filteredProducts = filter === "All" 
    ? produkList 
    : produkList.filter(p => p.kategori === filter);

  return (
    <div className="flex flex-col gap-8 pb-20">
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {["All", "Coffee", "Non-Coffee"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ${
              filter === cat
                ? "bg-utama text-white shadow-md"
                : "bg-permukaan text-teks-lembut hover:bg-garis hover:text-teks"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      
      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-teks-lembut">
          <p>Belum ada produk untuk kategori ini.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-6">
          {filteredProducts.map((produk) => (
            <KartuProduk key={produk.id} produk={produk} />
          ))}
        </div>
      )}
    </div>
  );
}

