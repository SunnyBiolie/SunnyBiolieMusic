import { cn } from "@/lib/utils";
import { Song } from "@/types/custom";
import { TruncateText } from "./truncate-text";

interface QueueItemProps {
  index: number;
  song: Song;
  isActive: boolean;
}

export const QueueItem = ({ index, song, isActive }: QueueItemProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-x-3 font-medium p-2 rounded-lg",
        isActive && "bg-neutral-800"
      )}
    >
      {/* <div className="font-bold text-lg">{index + 1}</div> */}
      <div className="flex-1 min-w-0">
        <TruncateText
          className={cn(isActive && "font-semibold text-sky-600")}
          text={song.title}
          lineClamp={2}
        />
        <TruncateText
          className="text-sm text-neutral-400"
          text={song.authors}
          lineClamp={2}
        />
      </div>
    </div>
  );
};
