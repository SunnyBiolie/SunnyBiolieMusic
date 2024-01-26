import { Song } from "@/types/custom";
import { useUser } from "./use-user";
import { useMusicPlayer, useQueue } from "./use-data-zustand";

const useOnMusicPLay = (songs: Song[]) => {
  const { user } = useUser();
  const musicPlayer = useMusicPlayer();
  const queue = useQueue();

  const onMusicPLay = (id: string) => {
    // if (!user) return;

    musicPlayer.setId(id);
    musicPlayer.setIds(songs.map((song) => song.id));

    queue.setSongs(songs);
  };

  return onMusicPLay;
};

export default useOnMusicPLay;
