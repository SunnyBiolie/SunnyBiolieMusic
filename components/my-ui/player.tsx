"use client";

import { useLoadSongPath } from "@/hooks/useLoadSongPath";
import { Song } from "@/types/custom";
import {
  BackwardIcon,
  ForwardIcon,
  PauseIcon,
  PlayIcon,
} from "@heroicons/react/24/solid";
import { ElementRef, useEffect, useRef, useState } from "react";
import { Slider } from "../ui/slider";
import { TimerTransform } from "./timer-transform";
import { cn } from "@/lib/utils";

interface PlayerProps {
  song: Song;
}

export const Player = ({ song }: PlayerProps) => {
  const songPath = useLoadSongPath({ song });
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [position, setPosition] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState(0);

  const audioRef = useRef<ElementRef<"audio">>(null);

  const handleClick = () => {
    if (!isPlaying) {
      audioRef.current?.play();
      setIsPlaying(true);
    } else {
      audioRef.current?.pause();
      setIsPlaying(false);
    }
  };

  const handldeGoTo = (position: number) => {
    if (!audioRef.current) return;
    const currentTrack = audioRef.current;

    setPosition(position);

    currentTrack.currentTime = (position / 100) * currentTrack.duration;
    setCurrentTime((position / 100) * currentTrack.duration);
  };

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      console.log("loop");
      if (!audioRef.current) return;
      const currentTrack = audioRef.current;

      if (currentTrack.ended) {
        setIsPlaying(false);
      }

      setCurrentTime(currentTrack.currentTime);
      setPosition((currentTrack.currentTime / currentTrack.duration) * 100);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  useEffect(() => {
    handleClick();
  }, []);

  return (
    <div className="flex flex-col h-full">
      <audio src={songPath} ref={audioRef} className="hidden" />
      <div className="flex items-center justify-center py-2 gap-x-4">
        <div>
          <BackwardIcon className="w-6 h-6 text-neutral-400" />
        </div>
        <div
          className={cn(
            "w-8 h-8 rounded-full bg-sky-600 hover:bg-sky-700",
            isPlaying ? "flex items-center justify-center" : "relative"
          )}
          onClick={handleClick}
        >
          {isPlaying ? (
            <PauseIcon className="w-5 h-5" />
          ) : (
            <PlayIcon className="absolute w-5 h-5 top-1/2 left-1/2 -translate-x-[45%] -translate-y-1/2" />
          )}
        </div>
        <div>
          <ForwardIcon className="w-6 h-6 text-neutral-400" />
        </div>
      </div>
      {audioRef.current && (
        <div className=" flex items-center justify-center gap-2">
          <div className="">
            {audioRef.current && (
              <TimerTransform duration={audioRef.current.currentTime} />
            )}
          </div>
          <div className="grow">
            <Slider
              defaultValue={[0]}
              value={[position]}
              onValueChange={([e]) => handldeGoTo(e)}
              min={0}
              max={100}
              step={100 / audioRef.current.duration}
            />
          </div>
          <div>
            {audioRef.current && (
              <TimerTransform duration={audioRef.current.duration} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
