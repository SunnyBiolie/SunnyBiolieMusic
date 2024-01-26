"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { BoxWrapper } from "./box-wrapper";
import {
  useMusicPlayer,
  useQueue,
  useRightSidebar,
} from "@/hooks/use-data-zustand";
import { QueueItem } from "../my-ui/queue-item";
import { cn } from "@/lib/utils";

interface RightSibebarProps {
  className: string;
}

export const RightSibebar = ({ className }: RightSibebarProps) => {
  const rightSidebar = useRightSidebar();
  const musicPLayer = useMusicPlayer();
  const queue = useQueue();

  const handleClose = () => {
    rightSidebar.setIsShow(false);
  };

  if (!rightSidebar.isShow) {
    return <></>;
  }

  return (
    <BoxWrapper className={cn("my-2 mr-2 p-2", className)}>
      <div className="w-60">
        <div className="flex items-center justify-between mt-1 mb-3">
          <span className="font-bold text-xl pl-2">Queue</span>
          <XMarkIcon
            className="h-5 w-5 cursor-pointer font-bold"
            onClick={handleClose}
          />
        </div>
        <div className="flex flex-col justify-center gap-y-2">
          {queue.songs.map((song, index) => (
            <QueueItem
              key={song.id}
              index={index}
              song={song}
              isActive={song.id === musicPLayer.activedId}
            />
          ))}
        </div>
      </div>
    </BoxWrapper>
  );
};
