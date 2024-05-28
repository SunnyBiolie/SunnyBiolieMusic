"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { MouseEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { HeartIcon as HeartIconFill } from "@heroicons/react/24/solid";
import { HeartIcon } from "@heroicons/react/24/outline";
import { createSupabaseClientComponent } from "@/lib/supabase/client-component";
import { useUser } from "@/hooks/use-user";

interface LikeButtonProps {
  songId: string;
  isInPlayer?: boolean;
  className?: string;
}

export const LikeButton = ({
  songId,
  isInPlayer,
  className,
}: LikeButtonProps) => {
  const [isLiked, setIsLiked] = useState<boolean>();
  const { user, userInfo } = useUser();
  const supabase = createSupabaseClientComponent();

  const router = useRouter();

  useEffect(() => {
    if (!user?.id) {
      return;
    }
    const isLiked = userInfo?.liked_songs?.includes(songId);
    setIsLiked(isLiked);
  }, [userInfo?.liked_songs?.length, songId, user?.id, userInfo?.liked_songs]);

  if (!user?.id || !userInfo) {
    return <></>;
  }

  const handleClick = async (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    e.stopPropagation();

    if (!user) return toast.error(`Please log in to continue.`);

    if (!songId) return toast.error(`There is no song to continue.`);

    if (isLiked) {
      setIsLiked(false);
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
        setIsLiked(true);
        toast.error(error.message);
      } else {
        toast.success(`Removed out from favorites.`);

        userInfo.liked_songs = updatedData;
      }
    } else {
      setIsLiked(true);
      let updatedData = userInfo.liked_songs ? userInfo.liked_songs : [];
      if (updatedData.indexOf(songId) > -1) {
        return toast.error(
          `UI error: This song has already been added to favorites.`
        );
      }
      updatedData.push(songId);

      const { error } = await supabase
        .from("users")
        .update({ liked_songs: updatedData })
        .eq("id", user.id);

      if (error) {
        setIsLiked(false);
        toast.error(error.message);
      } else {
        toast.success(`Added this song to favorites.`);

        userInfo.liked_songs = updatedData;
      }
    }

    router.refresh();
  };

  return (
    <div
      onClick={(e) => handleClick(e)}
      className={cn(
        "cursor-pointer",
        className,
        (isLiked || isInPlayer) && "block"
      )}
    >
      {isLiked ? (
        <HeartIconFill className="text-sky-600 w-6 h-6" />
      ) : (
        <HeartIcon className="text-neutral-400 w-6 h-6" />
      )}
    </div>
  );
};
