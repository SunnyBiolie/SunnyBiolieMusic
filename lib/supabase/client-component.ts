import { createBrowserClient } from "@supabase/ssr";
import { url_key } from "@/config/supabase";
import { Database } from "@/types/supabase";

export const createSupabaseClientComponent = () => {
  const supabase = createBrowserClient<Database>(...url_key);
  return supabase;
};
