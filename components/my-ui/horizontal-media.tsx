import { cn } from "@/lib/utils";
import Image from "next/image";
import { PlayIcon } from "@heroicons/react/24/solid";
import { useLoadImagePath } from "@/hooks/useLoadImagePath";
import { Song } from "@/types/custom";
import { LikeButton } from "./like-button";
import { memo } from "react";
import { TruncateText } from "./truncate-text";
import { TimerTransform } from "./timer-transform";
import { Skeleton } from "../ui/skeleton";
import { SongOptions } from "./song-options";

interface HorizontalMediaProps {
  song: Song;
  className?: string;
  thumbnail: boolean;
  onClick: (songId: string) => void;
  isInPlayer?: boolean;
  isInCollection?: boolean;
}

export const HorizontalMedia = memo(function HorizontalMedia({
  song,
  className,
  thumbnail,
  onClick,
  isInPlayer,
  isInCollection,
}: HorizontalMediaProps) {
  const thumbImagePath = useLoadImagePath({
    song,
    fetch: thumbnail,
  });

  if (!song) {
    return <></>;
  }

  const handleClick = () => {
    onClick(song.id);
  };

  return (
    <div
      className={cn(
        "hover:bg-neutral-700/75 rounded-lg w-full flex items-center gap-x-3 px-2.5 py-2 group",
        className
      )}
    >
      {thumbnail ? (
        <div className="shrink-0 relative h-12 aspect-square rounded-sm overflow-hidden">
          <Image
            src={thumbImagePath!}
            alt="Thumb Image"
            fill
            sizes="full"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="shrink-0 flex items-center justify-center h-12 aspect-square rounded-sm overflow-hidden bg-neutral-700/50">
          <PlayIcon className="w-1/2" />
        </div>
      )}
      <div
        className={cn(
          "flex-1 flex-col overflow-hidden",
          isInPlayer && "basis-[auto] grow-0 shrink-1"
        )}
      >
        <TruncateText
          className="capitalize text-sm font-semibold hover:underline cursor-pointer"
          text={song.title}
          lineClamp={1}
          onClick={() => handleClick()}
        />
        <TruncateText
          text={song.authors}
          className={cn(
            "text-sm font-medium text-neutral-400",
            isInPlayer && "text-xs font-medium"
          )}
          lineClamp={1}
        />
      </div>
      <div className="shrink-0 mx-2">
        <LikeButton
          songId={song.id}
          isInPlayer={isInPlayer}
          className="hidden group-hover:block"
        />
      </div>
      {!isInPlayer && (
        <div className="flex items-center justify-center gap-x-1">
          <TimerTransform duration={song.duration} />
          <SongOptions
            song={song}
            className="opacity-0 group-hover:opacity-100"
            isInCollection={isInCollection}
          />
        </div>
      )}
    </div>
  );
});

export const HorizontalMediaSkeleton = function SkeletonHorizontalMedia() {
  return <Skeleton className="w-auto h-12 mx-2.5" />;
};
