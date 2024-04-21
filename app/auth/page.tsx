"use client";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa, ViewType } from "@supabase/auth-ui-shared";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useUser } from "@/hooks/use-user";
import { createSupabaseClientComponent } from "@/lib/supabase/client-component";
import Link from "next/link";

const supabase = createSupabaseClientComponent();

interface AuthPageProps {
  searchParams: {
    m: string;
  };
}

const AuthPage = ({ searchParams }: AuthPageProps) => {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      redirect("/");
    }
  }, [user]);

  let view;
  if (searchParams?.m === "signin") view = "sign_in";
  else if (searchParams?.m === "signup") view = "sign_up";

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-6">
      <div className="text-3xl font-semibold shadow-md">
        <Link href="/">SBmusic</Link>
      </div>
      <div className="w-full md:w-1/2 lg:w-2/6 max-w-[550px] border rounded-md shadow-lg p-4 md:py-6 md:px-8">
        <Auth
          redirectTo={"https://sbmusic.vercel.app/"}
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={["google"]}
          view={view as ViewType}
          theme="dark"
        />
      </div>
    </div>
  );
};

export default AuthPage;
