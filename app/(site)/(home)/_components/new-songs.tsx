import { CardMedia, CardMediaSkeleton } from "@/components/my-ui/card-media";
import useOnMusicPLay from "@/hooks/use-on-music-play";
import { Song } from "@/types/custom";

interface NewSongsProps {
  songs: Song[];
}

export const NewSongs = ({ songs }: NewSongsProps) => {
  const onMusicPlay = useOnMusicPLay(songs);

  if (songs.length === 0)
    return (
      <div>
        <h2 className="text-2xl font-semibold">New Songs</h2>
        <div>No new song(s) upload.</div>
      </div>
    );

  return (
    <div className="my-1 mx-2">
      <h2 className="text-2xl font-semibold">New Songs</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 mt-4">
        {songs.map((song) => (
          <CardMedia
            key={song.id}
            song={song}
            priority={false}
            onClick={(id: string) => onMusicPlay(id)}
          />
        ))}
      </div>
    </div>
  );
};

NewSongs.Skeleton = function SkeletonNewSongs() {
  return (
    <div className="my-1 mx-2">
      <h2 className="text-2xl font-semibold">New Songs</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 mt-4">
        <CardMediaSkeleton />
        <CardMediaSkeleton />
        <CardMediaSkeleton />
      </div>
    </div>
  );
};
