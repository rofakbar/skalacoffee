# Jurnal Prompt

Catat prompt penting selama membangun aplikasi: apa yang kamu minta, hasilnya, dan perbaikan yang dilakukan. Beri tanda **[SENDIRI]** untuk prompt yang kamu tulis sendiri (bukan dari lembar kerja).

## US-01 Katalog dari database

**Prompt:**
Baca AGENTS.md dan docs/user-stories.md bagian US-01.
Ubah app/page.jsx supaya daftar produk diambil dari tabel "produk" di Supabase, di sisi server, memakai SUPABASE_URL dan SUPABASE_SECRET_KEY dari environment variable. Buat koneksi Supabase untuk server di folder lib/supabase.
Tampilkan produk dengan komponen KartuProduk yang sudah ada, tanpa mengubah tampilannya. Kalau gagal mengambil data, tampilkan pesan error yang jelas di halaman. Kalau tabel kosong, tampilkan tulisan "Belum ada produk". Hapus CatatanBelumAktif dari halaman ini.

**Hasil:**
File `lib/supabase/server.js` terbuat dan `app/page.jsx` berhasil mengambil data produk melalui tabel Supabase di sisi server. Komponen `CatatanBelumAktif` dihapus dan antarmuka produk tetap menggunakan `KartuProduk`.

**Perbaikan:**
-

## US-02 Detail produk

**Prompt:**
Baca docs/user-stories.md bagian US-02.
Ubah app/produk/[id]/page.jsx supaya mengambil satu produk dari tabel "produk" di Supabase berdasarkan id di URL, di sisi server, memakai koneksi Supabase yang sudah dibuat di lib/supabase. Kalau produk tidak ditemukan, panggil notFound(). Jangan ubah tampilannya. Hapus CatatanBelumAktif dari halaman ini, tapi biarkan tombol WhatsApp.

**Hasil:**
Halaman detail berhasil menggunakan data dari tabel Supabase sesuai ID. Fungsi `notFound()` dipanggil ketika produk tidak ditemukan. Tidak ada perubahan tampilan luar, kecuali hilangnya `CatatanBelumAktif`.

**Perbaikan:**
-

## US-03 Pesan via WhatsApp

**Prompt:**
Baca docs/rancangan-teknis.md bagian "Pesan WhatsApp (US-03)".
Ubah components/TombolWhatsApp.jsx menjadi tautan yang membuka https://wa.me/ ke nomor di lib/toko.js, dengan pesan otomatis berisi nama dan harga produk dalam format rupiah. Pesan di-encode dengan encodeURIComponent dan dibuka di tab baru. Pertahankan tampilan tombolnya. Hapus CatatanBelumAktif yang menyebut US-03 di halaman detail produk.

**Hasil:**
`TombolWhatsApp.jsx` kini menjadi tag `<a>` menuju WhatsApp dengan nomor dinamis dan format pesan nama serta harga produk. Membuka tab baru (`target="_blank"`) sesuai permintaan.

**Perbaikan:**
-

## US-04 Login admin

**Prompt:**
Baca AGENTS.md bagian aturan keamanan dan docs/user-stories.md bagian US-04.
Buat login admin memakai Supabase Auth (email dan password) dengan @supabase/ssr dan cookie, memakai SUPABASE_URL dan SUPABASE_PUBLISHABLE_KEY. Login diproses dengan Server Action di app/admin/actions.js dan disambungkan ke form di app/admin/login/page.jsx. Login berhasil diarahkan ke /admin; login gagal menampilkan pesan error yang jelas di halaman login. Buat juga tombol "Keluar" di components/NavAdmin.jsx berfungsi: mengakhiri sesi lalu kembali ke /admin/login. Jangan ubah tampilan. Hapus CatatanBelumAktif dari halaman login.

**Hasil:**
Konfigurasi Supabase SSR berhasil dibuat di `lib/supabase/ssr.js`. Form halaman login bekerja sebagai form aksi server menggunakan `useActionState` dengan redirect ke `/admin` jika berhasil, atau menampilkan pesan *error* jika gagal. Tombol "Keluar" di `NavAdmin.jsx` disiapkan sebagai *form action* supaya aman dan fungsional.

**Perbaikan:**
-

## US-05 Ganti password

**Prompt:**
Baca docs/user-stories.md bagian US-05.
Buat Server Action ganti password di app/admin/actions.js untuk admin yang sedang login, memakai Supabase Auth. Validasi di server: password baru minimal 8 karakter dan harus sama dengan konfirmasi. Tampilkan pesan berhasil atau pesan error yang jelas di halaman. Sambungkan ke form di app/admin/password/page.jsx tanpa mengubah tampilannya. Hapus CatatanBelumAktif dari halaman ini.

**Hasil:**
Menambahkan Server Action `changePasswordAction` dengan lapisan pengecekan minimal 8 karakter dan kesamaan dengan konfirmasi password. Jika berhasil, form menampilkan pesan hijau sukses; bila gagal menampilkan pesan merah.

**Perbaikan:**
-

## US-06 Proteksi halaman admin

**Prompt:**
Baca AGENTS.md aturan keamanan nomor 3 dan 4, dan docs/user-stories.md bagian US-06.
Buat file proxy.js di root proyek (Next.js 16). Semua rute /admin kecuali /admin/login wajib login dengan Supabase Auth; kalau belum login, alihkan ke /admin/login. Pastikan juga setiap Server Action yang mengubah data memeriksa login di server. Hapus CatatanBelumAktif dari halaman /admin.

**Hasil:**
File `proxy.js` dibuat di *root* dan sukses mencegah akses pengguna anonim menuju `/admin/`. Komponen `CatatanBelumAktif` juga telah dihapus dari `app/admin/page.jsx`. Validasi dobel (via `getUser`) ditambahkan untuk *Server Action*.

**Perbaikan:**
Pada tahap penyelesaian sempat ada kendala penamaan fungsi export di file `proxy.js` dan destrukturisasi objek dari `getUser()` Supabase, yang dirapikan pada debugging berikutnya.

## Debugging dan fitur bonus

Tambahkan bagian baru untuk setiap error yang kamu perbaiki atau fitur bonus yang kamu kerjakan.

**[SENDIRI] Prompt Error URL:**
"Gagal mengambil produk: Invalid path specified in request URL"
ada error di tampilan produk kami. perbaiki error tersebut agar produk yang sudah ada di database dapat tampil

**Hasil:**
Error disebabkan oleh ada *newline* tak terlihat (`\r`) / spasi di variabel *environment* `SUPABASE_URL` dari `.env.local` saat berjalan di Windows.

**Perbaikan:**
Menambahkan operasi `.trim()` pada string URL di file `lib/supabase/server.js`, `lib/supabase/ssr.js`, dan `proxy.js`.


**[SENDIRI] Prompt Error Proxy Export Name:**
Error: Proxy is missing expected function export name
This function is what Next.js runs for every request handled by this proxy (previously called middleware).
Why this happens: ... To fix it: Ensure this file has either a default or "proxy" function export.

**Hasil:**
Next.js versi proyek ini mendeteksi nama fungsi `middleware` yang tidak dikenali, namun mengharapkan `proxy`.

**Perbaikan:**
Mengubah export fungsi dari `export async function middleware` menjadi `export async function proxy` pada file `proxy.js`.
