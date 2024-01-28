"use client";

import { HorizontalMedia } from "../my-ui/horizontal-media";
import { useMusicPlayer } from "@/hooks/use-data-zustand";

import { useGetSongById } from "@/hooks/use-get-song";
import { PlayerMainControl } from "../my-ui/player-main-control";
import { ElementRef, useRef } from "react";
import { MoreActionPlayer } from "../my-ui/player-more-action";

export const SongController = () => {
  const musicPLayer = useMusicPlayer();
  const { isLoading, song } = useGetSongById(musicPLayer.activedId);

  const audioRef = useRef<ElementRef<"audio"> | null>(null);

  if (isLoading) {
    return (
      <div className="w-full min-h-[72px] flex items-center justify-center text-xl font-semibold tracking-widest">
        Loading...
      </div>
    );
  }

  if (!song) {
    return <></>;
  }

  return (
    <div key={song.id} className="w-full min-h-[72px] flex">
      <div className="flex-1 items-center max-w-[30%] lg:max-w-[28%]">
        <HorizontalMedia
          song={song}
          thumbnail={true}
          onClick={() => {}}
          className="hover:bg-neutral-700/0"
          isInPlayer
        />
      </div>
      <div className="max-w-[50%] min-w-0 grow px-2">
        <PlayerMainControl
          song={song}
          musicPlayer={musicPLayer}
          className="lg:px-4"
          ref={audioRef}
        />
      </div>
      <div className="shrink-0 w-[30%] lg:max-w-[28%] overflow-hidden">
        <MoreActionPlayer audioRef={audioRef} />
      </div>
    </div>
  );
};
