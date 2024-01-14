import { HorizontalMedia } from "@/components/my-ui/horizontal-media";
import useOnMusicPLay from "@/hooks/use-on-music-play";
import { Song } from "@/types/custom";

interface AllRestSongProps {
  songs: Song[] | undefined;
}

export const AllRestSong = ({ songs }: AllRestSongProps) => {
  console.log("all rest songs");
  const onMusicPlay = useOnMusicPLay(songs!);

  if (!songs || songs.length === 0) {
    return <></>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold pb-2">All song</h2>
      <div>
        {songs.map((song) => (
          <HorizontalMedia
            key={song.id}
            song={song}
            thumbnail={false}
            onClick={(songId: string) => onMusicPlay(songId)}
          />
        ))}
      </div>
    </div>
  );
};
