"use client";

import { HorizontalMedia } from "@/components/my-ui/horizontal-media";
import { useData } from "@/hooks/use-data";
import { useMusicPlayer } from "@/hooks/use-data-zustand";
import useOnMusicPLay from "@/hooks/use-on-music-play";
import { useUser } from "@/hooks/use-user";
import { Song } from "@/types/custom";
import { useEffect } from "react";
import { toast } from "sonner";

const FavoritesPage = () => {
  const { userInfo } = useUser();
  const { allSong } = useData();

  const favoriteSongs = allSong?.filter((song: Song) =>
    userInfo?.liked_songs?.includes(song.id)
  );

  const onMusicPlay = useOnMusicPLay(favoriteSongs!);

  useEffect(() => {
    if (favoriteSongs?.length! < userInfo?.liked_songs?.length!) {
      const deleted = userInfo?.liked_songs?.filter(
        (songId) => !favoriteSongs?.map((song) => song.id).includes(songId)
      );

      toast.info(`Some song(s) have been deleted by admin ${deleted![0]}`);
    }
  }, []);

  if (favoriteSongs?.length === 0) {
    return (
      <div className="p-4">
        <div className="text-2xl font-semibold mb-4">Favorites</div>
        <div>{`No song in your "favorites" to display.`}</div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="text-2xl font-semibold mb-4">Favorites</div>
      {favoriteSongs?.map((song) => (
        <HorizontalMedia
          key={song.id}
          song={song}
          thumbnail={false}
          onClick={() => onMusicPlay(song.id)}
        />
      ))}
    </div>
  );
};

export default FavoritesPage;
