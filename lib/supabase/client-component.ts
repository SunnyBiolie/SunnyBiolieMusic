import { createBrowserClient } from "@supabase/ssr";
import { url_key } from "@/config/supabase";

export const createSupabaseClientComponent = () => {
  const supabase = createBrowserClient(...url_key);
  return supabase;
};
