import { cn } from "@/lib/utils";
import { ArrowUpOnSquareIcon, HeartIcon } from "@heroicons/react/24/outline";
import { MusicalNoteIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";

interface PlaylistItemProps {
  title: string;
  className?: string;
  link: string;
  isActive: boolean;
  type?: "favorites" | "your-upload" | "playlist";
}

export const PlaylistItem = ({
  className,
  title,
  link,
  isActive,
  type = "playlist",
}: PlaylistItemProps) => {
  return (
    <Link
      href={link}
      className={cn(
        "bg-neutral-800/80 hover:bg-gradient-to-r to-cyan-500 from-blue-500 rounded-lg w-full flex items-center gap-x-3 px-2.5 py-2 hover:bg-opacity-50 font-medium",
        className,
        isActive && "bg-gradient-to-r to-cyan-500 from-blue-500"
      )}
    >
      {type === "playlist" ? (
        <MusicalNoteIcon className="w-5 h-5" />
      ) : type === "favorites" ? (
        <HeartIcon className="w-5 h-5" />
      ) : (
        <ArrowUpOnSquareIcon className="w-5 h-5" />
      )}
      <div className="">{title}</div>
    </Link>
  );
};

PlaylistItem.Skeleton = function SkeletonPlaylistItem() {
  return <Skeleton className="w-full h-10" />;
};
