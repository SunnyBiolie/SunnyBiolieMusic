"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useUser } from "@/hooks/use-user";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Skeleton } from "./ui/skeleton";
import { Navigation } from "./navigation";
import { createSupabaseClientComponent } from "@/lib/supabase/client-component";

export const Header = () => {
  const router = useRouter();
  const supabase = createSupabaseClientComponent();
  const { user, isLoading } = useUser();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out!");
    }
  };

  if (isLoading) {
    return <Header.Skeleton />;
  }

  return (
    <div className="w-full h-16 px-4 flex items-center justify-between">
      <Navigation />
      {user ? (
        <div>
          <Button
            onClick={handleSignOut}
            className="rounded-full font-semibold text-[14px]"
          >
            Sign out
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-x-4">
          <Button
            className="rounded-full font-semibold text-[14px]"
            variant="ghost"
            asChild
          >
            <Link href="/auth?m=signin">Log in</Link>
          </Button>
          <Button className="rounded-full font-semibold text-[14px]" asChild>
            <Link href="/auth?m=signup">Sign up</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

Header.Skeleton = function SkeletionHeader() {
  return (
    <div className="w-full h-16 px-4 flex items-center justify-between">
      <Navigation />
      <div className="z-50 w-full h-16 flex items-center justify-end gap-x-4">
        <Skeleton className="w-20 h-9 px-4 py-2 rounded-full" />
        <Skeleton className="w-24 h-9 px-4 py-2 rounded-full" />
      </div>
    </div>
  );
};
