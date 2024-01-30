import {
  QueueListIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/outline";
import { QueueListIcon as QueueListIconSolid } from "@heroicons/react/24/solid";
import { MutableRefObject, useEffect, useState } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { useRightSidebar } from "@/hooks/use-data-zustand";
import { localStorageKey } from "@/config/site";
import { Slider } from "./my-slider";

interface MoreActionPlayer {
  audioRef: MutableRefObject<HTMLAudioElement | null>;
}

export const MoreActionPlayer = ({ audioRef }: MoreActionPlayer) => {
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(
    Number(localStorage.getItem(`${localStorageKey}volume`)) || 0.5
  );

  const Icon = isMuted ? SpeakerXMarkIcon : SpeakerWaveIcon;

  useEffect(() => {
    if (!audioRef || !audioRef.current) return;

    audioRef.current.volume = volume;
    if (volume === 0) setIsMuted(true);
    else setIsMuted(false);

    localStorage.setItem(`${localStorageKey}volume`, JSON.stringify(volume));
  }, [audioRef, volume]);

  const handleToggleVolume = () => {
    if (!audioRef || !audioRef.current) return;

    if (!isMuted) {
      audioRef.current.muted = true;
      setIsMuted(true);
      setVolume(0);
    } else {
      audioRef.current.muted = false;
      setIsMuted(false);
      setVolume(0.1);
    }
  };

  const rightSidebar = useRightSidebar();
  const toggleOpen = () => {
    rightSidebar.setIsShow(!rightSidebar.isShow);
  };

  return (
    <div className="h-full flex items-center justify-end gap-x-4 px-2.5 py-2">
      <div className="cursor-pointer" onClick={toggleOpen}>
        {rightSidebar.isShow ? (
          <QueueListIconSolid className="w-5 h-5 text-sky-600" />
        ) : (
          <QueueListIcon className="w-5 h-5" />
        )}
      </div>
      <div className="h-full flex items-center justify-end text-neutral-400 gap-1.5">
        <Icon className="w-5 h-5 cursor-pointer" onClick={handleToggleVolume} />
        <Slider
          min={0}
          max={1}
          step={0.02}
          defaultValue={1}
          value={volume}
          onValueChange={setVolume}
          className="w-[93px]"
        />
      </div>
    </div>
  );
};
