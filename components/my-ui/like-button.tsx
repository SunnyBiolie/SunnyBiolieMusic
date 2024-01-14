"use client";

import { HeartIcon as HeartIconFill } from "@heroicons/react/24/solid";
import { HeartIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useUser } from "@/hooks/use-user";
import { toast } from "sonner";
import { createSupabaseClientComponent } from "@/lib/supabase/client-component";

interface LikeButtonProps {
  songId: string;
}

export const LikeButton = ({ songId }: LikeButtonProps) => {
  const [isLiked, setIsLiked] = useState<boolean>();
  const { user, userInfo } = useUser();
  const supabase = createSupabaseClientComponent();

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    setIsLiked(userInfo?.liked_songs?.includes(songId));
  }, [userInfo?.liked_songs]);

  if (!user?.id || !userInfo) {
    return <></>;
  }

  const handleClick = async () => {
    if (!user) return toast.error(`Please log in to continue.`);

    if (!songId) return toast.error(`There is no song to continue.`);

    if (isLiked) {
      let updatedData = userInfo.liked_songs ? userInfo.liked_songs : [];
      const index = updatedData.indexOf(songId);
      if (index > -1) {
        updatedData?.splice(index, 1);
      }

      const { error } = await supabase
        .from("users")
        .update({ liked_songs: updatedData })
        .eq("id", user.id);

      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(false);
        toast.success(`Removed out from favorites.`);
      }
    } else {
      let updatedData = userInfo.liked_songs ? userInfo.liked_songs : [];
      updatedData.push(songId);

      const { error } = await supabase
        .from("users")
        .update({ liked_songs: updatedData })
        .eq("id", user.id);

      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(true);
        toast.success(`Added this song to favorites.`);
      }
    }
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      {isLiked ? (
        <HeartIconFill className="text-sky-600 w-6 h-6" />
      ) : (
        <HeartIcon className="text-neutral-400 w-6 h-6" />
      )}
    </div>
  );
};
