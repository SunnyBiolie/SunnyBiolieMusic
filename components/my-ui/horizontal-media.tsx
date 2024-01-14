import { cn } from "@/lib/utils";
import Image from "next/image";
import { PlayIcon } from "@heroicons/react/24/solid";
import { useLoadImagePath } from "@/hooks/useLoadImagePath";
import { Song } from "@/types/custom";
import { LikeButton } from "./like-button";

interface HorizontalMediaProps {
  song: Song;
  className?: string;
  thumbnail: boolean;
  onClick: (songId: string) => void;
  isInPlayer?: boolean;
}

export const HorizontalMedia = ({
  song,
  className,
  thumbnail,
  onClick,
  isInPlayer,
}: HorizontalMediaProps) => {
  const thumbImagePath = useLoadImagePath({
    song,
    fetch: thumbnail,
  });

  if (!song) {
    return <></>;
  }

  return (
    <div
      className={cn(
        "hover:bg-neutral-700/75 rounded-lg flex items-center gap-x-3 px-2.5 py-2",
        className
      )}
      onClick={() => onClick(song.id)}
    >
      {thumbnail ? (
        <div className="relative h-12 aspect-square rounded-sm overflow-hidden">
          <Image
            src={thumbImagePath!}
            alt="Thumb Image"
            fill
            sizes="auto"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="flex items-center justify-center h-12 aspect-square rounded-sm overflow-hidden bg-neutral-700/50">
          <PlayIcon className="w-1/2" />
        </div>
      )}
      <div className={cn("grow flex items-center", isInPlayer && "grow-0")}>
        <div className="grow flex flex-col">
          <div className={cn(isInPlayer && "text-sm")}>
            <span className="capitalize font-semibold truncate hover:underline cursor-pointer">
              {song.title}
            </span>
          </div>
          <p
            className={cn(
              "text-sm font-medium text-neutral-400",
              isInPlayer && "text-xs"
            )}
          >
            {song.authors}
          </p>
        </div>
        <div className="px-2">
          <LikeButton songId={song.id} />
        </div>
      </div>
    </div>
  );
};
