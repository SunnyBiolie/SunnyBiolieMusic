import {
  HorizontalMedia,
  HorizontalMediaSkeleton,
} from "@/components/my-ui/horizontal-media";
import useOnMusicPLay from "@/hooks/use-on-music-play";
import { Song } from "@/types/custom";

interface AllRestSongProps {
  songs: Song[] | undefined;
}

export const AllRestSong = ({ songs }: AllRestSongProps) => {
  const onMusicPlay = useOnMusicPLay(songs!);

  if (!songs || songs.length === 0) {
    return <></>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold pb-2">Rest songs</h2>
      <div>
        {songs.map((song) => (
          <HorizontalMedia
            key={song.id}
            song={song}
            thumbnail={true}
            onClick={(songId: string) => onMusicPlay(songId)}
          />
        ))}
      </div>
    </div>
  );
};

AllRestSong.Skeleton = function SkeletonAllRestSong() {
  return (
    <div>
      <h2 className="text-2xl font-semibold pb-4">Rest songs</h2>
      <div className="flex flex-col gap-y-3">
        <HorizontalMediaSkeleton />
        <HorizontalMediaSkeleton />
        <HorizontalMediaSkeleton />
      </div>
    </div>
  );
};
