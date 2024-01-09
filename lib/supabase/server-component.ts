import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { url_key } from "@/config/supabase";

export const createSupabaseServerComponent = () => {
  const cookieStore = cookies();

  const supabase = createServerClient(...url_key, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
    },
  });
  return supabase;
};
