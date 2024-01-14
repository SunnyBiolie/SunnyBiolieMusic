import { Song } from "@/types/custom";
import { useUser } from "./use-user";
import useMusicPlayer from "./use-music-player";

const useOnMusicPLay = (songs: Song[]) => {
  const { user } = useUser();
  const musicPlayer = useMusicPlayer();

  const onMusicPLay = (id: string) => {
    if (!user) return;

    musicPlayer.setId(id);
    musicPlayer.setIds(songs.map((song) => song.id));
  };

  return onMusicPLay;
};

export default useOnMusicPLay;
