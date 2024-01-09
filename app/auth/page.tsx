"use client";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa, ViewType } from "@supabase/auth-ui-shared";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useUser } from "@/hooks/use-user";
import { createSupabaseClientComponent } from "@/lib/supabase/client-component";

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
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full md:w-1/2 lg:w-2/6 max-w-[550px] border rounded-md shadow-lg p-4 md:py-6 md:px-8">
        {/* {isSignInForm ? (
          <div className="py-2 flex flex-col gap-y-2">
            <h2 className="font-semibold text-2xl md:text-3xl">Sign in</h2>
            <div className="text-neutral-500">to continue to SBmusic</div>
          </div>
        ) : (
          <div className="py-2 flex flex-col gap-y-2">
            <h2 className="font-semibold text-2xl md:text-3xl">Sign up</h2>
            <div className="text-neutral-500">to continue to SBmusic</div>
          </div>
        )} */}
        <Auth
          redirectTo="http://localhost:3000/"
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={[]}
          view={view as ViewType}
          theme="dark"
        />
      </div>
    </div>
  );
};

export default AuthPage;
