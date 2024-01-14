"use client";

import { Song } from "@/types/custom";
import { HorizontalMedia } from "../my-ui/horizontal-media";
import useMusicPlayer from "@/hooks/use-music-player";

import { useGetSongById } from "@/hooks/use-get-song";
import { Player } from "../my-ui/player";

export const SongController = () => {
  const musicPLayer = useMusicPlayer();
  const { isLoading, song } = useGetSongById(musicPLayer.activedId);

  if (!song) {
    return <></>;
  }

  return (
    <div key={song.id} className="w-full h-[80px] grid grid-cols-3">
      <div className="flex items-center">
        <HorizontalMedia
          song={song}
          thumbnail={true}
          onClick={() => {}}
          className="hover:bg-neutral-700/0 w-auto"
          isInPlayer
        />
      </div>
      <div>
        <Player song={song} />
      </div>
      <div>More options</div>
    </div>
  );
};
