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

