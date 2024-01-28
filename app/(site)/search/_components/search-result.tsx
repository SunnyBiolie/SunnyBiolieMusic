import { HorizontalMedia } from "@/components/my-ui/horizontal-media";
import useOnMusicPLay from "@/hooks/use-on-music-play";
import { Song } from "@/types/custom";

interface SearchResultProps {
  songs: Song[] | null;
  className?: string;
}

export const SearchResult = ({ songs, className }: SearchResultProps) => {
  console.log("Search result: " + songs);
  const onMusicPlay = useOnMusicPLay(songs!);

  if (!songs) {
    return <div className={className}>{"Type song's title to search"}</div>;
  }
  if (songs.length === 0) {
    return <div className={className}>No song found.</div>;
  }

  return (
    <div className={className}>
      {songs.map((song) => (
        <HorizontalMedia
          key={song.id}
          song={song}
          thumbnail={false}
          onClick={(songId: string) => onMusicPlay(songId)}
        />
      ))}
    </div>
  );
};
