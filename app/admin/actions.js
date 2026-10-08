"use server";

import { redirect } from "next/navigation";
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

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Anda harus login untuk mengganti password.", success: false };
  }

  const { error } = await supabase.auth.updateUser({
    password: passwordBaru
  });

  if (error) {
    return { error: error.message || "Gagal mengganti password.", success: false };
  }

  return { success: true, message: "Password berhasil diganti." };
}
