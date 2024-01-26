"use client";

import { ElementRef, forwardRef, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { PauseIcon, PlayIcon } from "@heroicons/react/24/solid";
import {
  ShuffleIcon,
  TrackPreviousIcon,
  TrackNextIcon,
  LoopIcon,
} from "@radix-ui/react-icons";
import { Slider } from "../ui/slider";
import { Song } from "@/types/custom";
import { useLoadSongPath } from "@/hooks/useLoadSongPath";
import { TimerTransform } from "./timer-transform";
import { MusicPlayerStore } from "@/hooks/use-data-zustand";
import { localStorageKey } from "@/config/site";

interface PlayerMainControlProps {
  song: Song;
  musicPlayer: MusicPlayerStore;
  className?: string;
}

export const PlayerMainControl = forwardRef(function PlayerMainControl(
  { song, musicPlayer, className }: PlayerMainControlProps,
  ref: any
) {
  const songPath = useLoadSongPath({ song });
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [position, setPosition] = useState<number>(0);
  const [isLoop, setIsLoop] = useState<boolean>(
    JSON.parse(localStorage.getItem(`${localStorageKey}loop`)!) || false
  );
  const [isShuffle, setIsShuffle] = useState<boolean>(
    JSON.parse(localStorage.getItem(`${localStorageKey}shuffle`)!) || false
  );
  // const [currentTime, setCurrentTime] = useState(0);

  const audioRef = useRef<ElementRef<"audio">>(null);

  useEffect(() => {
    ref.current = audioRef.current;
  }, [ref]);

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
    // setCurrentTime((position / 100) * currentTrack.duration);
  };

  const handleChangeSong = (number: number) => {
    const songsId = musicPlayer.ids;

    if (songsId.length <= 1) {
      return;
    }
    const currIndex = songsId.indexOf(musicPlayer.activedId);
    const lastIndex = songsId.length - 1;

    switch (number) {
      case 1: {
        if (currIndex !== lastIndex) {
          musicPlayer.setId(songsId[currIndex + number]);
        } else {
          musicPlayer.setId(songsId[0]);
        }
        break;
      }
      case -1: {
        console.log("-1");
        if (currIndex !== 0) {
          musicPlayer.setId(songsId[currIndex + number]);
        } else {
          musicPlayer.setId(songsId[lastIndex]);
        }
        break;
      }
      // Shuffle
      case 0: {
        let randomResult = Math.floor(Math.random() * musicPlayer.ids.length);
        // while (randomResult !== currIndex) {
        //   randomResult = Math.floor(Math.random() * musicPlayer.ids.length);
        // }
        musicPlayer.setId(songsId[randomResult]);
        break;
      }
      default:
        break;
    }
  };

  const toggleShuffle = () => {
    if (!isShuffle) {
      if (musicPlayer.ids.length <= 2) {
        toast.info(
          `Queue only has ${musicPlayer.ids.length} song(s). Not shuffle this queue.`
        );
        return;
      }
      setIsShuffle(true);
      localStorage.setItem(`${localStorageKey}shuffle`, "true");
    } else {
      setIsShuffle(false);
      localStorage.setItem(`${localStorageKey}shuffle`, "false");
    }
  };

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      console.log("loop");
      if (!audioRef.current) return;
      const currentTrack = audioRef.current;

      if (currentTrack.ended) {
        if (musicPlayer.ids.length > 1 && !isLoop) {
          if (isShuffle) {
            handleChangeSong(0);
          } else {
            handleChangeSong(1);
          }
        }
        setIsPlaying(false);
      }

      // setCurrentTime(currentTrack.currentTime);
      setPosition((currentTrack.currentTime / currentTrack.duration) * 100);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.loop = isLoop;
  }, [isLoop]);

  useEffect(() => {
    handleClick();

    if (musicPlayer.ids.length <= 2 && isShuffle) {
      toast.info(
        `Queue only has ${musicPlayer.ids.length} song(s). Not shuffle this queue.`
      );
      setIsShuffle(false);
      localStorage.setItem(`${localStorageKey}shuffle`, "false");
    }
  }, []);

  return (
    <div className={cn("flex flex-col h-full pb-2.5", className)}>
      <audio
        src={songPath}
        ref={audioRef}
        className="hidden"
        controls={false}
      />
      <div className="flex items-center justify-center py-2 gap-x-5">
        <div>
          <ShuffleIcon
            className={cn(
              "w-4 h-4 cursor-pointer text-neutral-400",
              isShuffle && "text-sky-600"
            )}
            onClick={toggleShuffle}
          />
        </div>
        <div>
          <TrackPreviousIcon
            className="w-5 h-5 text-neutral-400 cursor-pointer hover:text-sky-600"
            onClick={() => {
              if (isShuffle) handleChangeSong(0);
              else handleChangeSong(-1);
            }}
          />
        </div>
        <div
          className={cn(
            "w-8 h-8 rounded-full bg-sky-600 hover:bg-sky-700 cursor-pointer transition",
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
          <TrackNextIcon
            className="w-5 h-5 text-neutral-400 cursor-pointer hover:text-sky-600"
            onClick={() => {
              if (isShuffle) handleChangeSong(0);
              else handleChangeSong(1);
            }}
          />
        </div>
        <div>
          <LoopIcon
            className={cn(
              "w-4 h-4 cursor-pointer text-neutral-400",
              isLoop && "text-sky-600"
            )}
            onClick={() => {
              setIsLoop(!isLoop);
              localStorage.setItem(`${localStorageKey}loop`, `${!isLoop}`);
            }}
          />
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
});
