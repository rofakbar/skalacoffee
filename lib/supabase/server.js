import { createClient } from "@supabase/supabase-js";

export function createSupabaseServerClient() {
  const supabaseUrl = process.env.SUPABASE_URL?.trim();
  const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY?.trim();

  if (!supabaseUrl || !supabaseSecretKey) {
    throw new Error("Supabase environment variables are missing");
  }

  return createClient(supabaseUrl, supabaseSecretKey);
}

