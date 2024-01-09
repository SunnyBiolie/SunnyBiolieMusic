"use server";

import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

import { url_key } from "@/config/supabase";
import { InputType } from "./types";

const handler = async (data: InputType) => {
  const cookieStore = cookies();
  const supabase = createServerClient(...url_key, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        cookieStore.set({ name, value, ...options });
      },
      remove(name: string, options: CookieOptions) {
        cookieStore.set({ name, value: "", ...options });
      },
    },
  });

  const { data: sessionData } = await supabase.auth.getSession();

  if (!sessionData.session) {
    return;
  }

  const { title, authors, song, image } = data;
  let songObject;
  return { title, authors, song, image };
  try {
  } catch (error) {
    return;
  }
};

export default handler;
