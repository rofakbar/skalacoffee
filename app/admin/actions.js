"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createSupabaseActionClient } from "@/lib/supabase/ssr";

export async function loginAction(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return { error: "Email dan password wajib diisi." };
  }

  const supabase = await createSupabaseActionClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: "Login gagal. Periksa kembali email dan password Anda." };
  }

  redirect("/admin");
}

export async function logoutAction() {
  const supabase = await createSupabaseActionClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function changePasswordAction(prevState, formData) {
  const passwordBaru = formData.get("password_baru");
  const konfirmasiPassword = formData.get("konfirmasi_password");

  if (!passwordBaru || !konfirmasiPassword) {
    return { error: "Semua kolom wajib diisi.", success: false };
  }

  if (passwordBaru.length < 8) {
    return { error: "Password minimal 8 karakter.", success: false };
  }

  if (passwordBaru !== konfirmasiPassword) {
    return { error: "Password baru dan konfirmasi tidak sama.", success: false };
  }

  const supabase = await createSupabaseActionClient();

  const { data, error: userError } = await supabase.auth.getUser();
  const user = data?.user;

  if (!user) {
    return { error: "Anda harus login untuk mengganti password.", success: false };
  }

  const { error } = await supabase.auth.updateUser({
    password: passwordBaru,
  });

  if (error) {
    return { error: error.message || "Gagal mengganti password.", success: false };
  }

  return { success: true, message: "Password berhasil diganti." };
}

export async function tambahProdukAction(prevState, formData) {
  const supabase = await createSupabaseActionClient();

  const { data: userData } = await supabase.auth.getUser();
  if (!userData?.user) {
    return { error: "Anda harus login untuk menambah produk." };
  }

  const nama = formData.get("nama")?.trim();
  const harga = Number(formData.get("harga"));
  const kategori = formData.get("kategori")?.trim() || null;
  const foto_url = formData.get("foto_url")?.trim() || null;
  const deskripsi = formData.get("deskripsi")?.trim() || null;

  if (!nama || !harga) {
    return { error: "Nama dan harga produk wajib diisi." };
  }

  const { error } = await supabase.from("produk").insert({
    nama,
    harga,
    kategori,
    foto_url,
    deskripsi,
  });

  if (error) {
    return { error: error.message || "Gagal menambah produk." };
  }

  revalidatePath("/admin");
  revalidatePath("/");
  redirect("/admin");
}

export async function ubahProdukAction(prevState, formData) {
  const supabase = await createSupabaseActionClient();

  const { data: userData } = await supabase.auth.getUser();
  if (!userData?.user) {
    return { error: "Anda harus login untuk mengubah produk." };
  }

  const id = formData.get("id");
  const nama = formData.get("nama")?.trim();
  const harga = Number(formData.get("harga"));
  const kategori = formData.get("kategori")?.trim() || null;
  const foto_url = formData.get("foto_url")?.trim() || null;
  const deskripsi = formData.get("deskripsi")?.trim() || null;

  if (!id || !nama || !harga) {
    return { error: "Data produk tidak lengkap." };
  }

  const { error } = await supabase
    .from("produk")
    .update({ nama, harga, kategori, foto_url, deskripsi })
    .eq("id", id);

  if (error) {
    return { error: error.message || "Gagal mengubah produk." };
  }

  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath(`/produk/${id}`);
  redirect("/admin");
}

export async function hapusProdukAction(formData) {
  const supabase = await createSupabaseActionClient();

  const { data: userData } = await supabase.auth.getUser();
  if (!userData?.user) {
    return { error: "Anda harus login untuk menghapus produk." };
  }

  const id = formData.get("id");

  if (!id) {
    return { error: "ID produk tidak ditemukan." };
  }

  const { error } = await supabase.from("produk").delete().eq("id", id);

  if (error) {
    return { error: error.message || "Gagal menghapus produk." };
  }

  revalidatePath("/admin");
  revalidatePath("/");
  redirect("/admin");
}
