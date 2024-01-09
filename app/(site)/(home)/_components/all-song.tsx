import { Card } from "@/components/card";
import { Song } from "@/types/custom";

interface AllSongProps {
  songs: Song[];
}

export const AllSong = ({ songs }: AllSongProps) => {
  if (songs.length === 0)
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 mt-4">
        <Card data={""} />
        <Card data={""} />
        <Card data={""} />
      </div>
    );

  return (
    <div>
      <h2 className="text-3xl font-semibold">All Songs</h2>
      <div>
        {songs.map((song) => (
          <div key={song.id}>{song.title}</div>
        ))}
      </div>
    </div>
  );
};
