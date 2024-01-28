"use client";

import { useLoadImagePath } from "@/hooks/useLoadImagePath";
import { Song } from "@/types/custom";
import { PlayIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { TruncateText } from "./truncate-text";
import { memo } from "react";
import { Skeleton } from "../ui/skeleton";
import { SongOptions } from "./song-options";

interface CardMediaProps {
  song: Song;
  priority?: boolean;
  onClick: (id: string) => void;
}

export const CardMedia = memo(function CardMedia({
  song,
  priority,
  onClick,
}: CardMediaProps) {
  console.log("Reload card");
  const imagePath = useLoadImagePath({ song });

  return (
    <div className="group relative flex flex-col gap-y-4 p-4 bg-neutral-700 bg-opacity-20 hover:bg-opacity-40 rounded-md transition">
      <div className="shrink-0 relative w-full aspect-square rounded-md overflow-hidden">
        <Image
          src={imagePath as string}
          alt="Thumb Image"
          fill
          sizes="full"
          className="object-cover"
          priority={priority}
        />
        <div
          className="absolute opacity-0 group-hover:opacity-100 w-1/2 h-1/2 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90 group-hover:rotate-0 rounded-full bg-sky-700 p-3 shadow-xl transition duration-500 cursor-pointer hover:w-[51%] hover:h-[51%] z-10"
          onClick={() => onClick(song.id)}
        >
          <PlayIcon className="w-1/2 h-1/2 absolute left-1/2 top-1/2 -translate-x-[45%] -translate-y-1/2" />
        </div>
      </div>
      <div className="flex flex-col gap-y-2 text-sm font-semibold">
        <TruncateText text={song.title} className="capitalize" lineClamp={1} />
        <TruncateText
          text={song.authors}
          className="text-xs text-neutral-500"
          lineClamp={2}
        />
      </div>
      <div className="hidden group-hover:block absolute top-2 right-2 bg-neutral-950/20 hover:bg-neutral-950/80 rounded-full p-[2px] z-0 transition cursor-pointer">
        <SongOptions song={song} className="w-5 h-5" />
      </div>
    </div>
  );
});

export const CardMediaSkeleton = () => {
  return (
    <Skeleton className="group flex flex-col gap-y-4 p-4 aspect-[3/4] transition cursor-pointer"></Skeleton>
  );
};
