import { createSupabaseClientComponent } from "@/lib/supabase/client-component";
import { Song } from "@/types/custom";

interface useLoadSongPathProps {
  song: Song;
}

export const useLoadSongPath = ({ song }: useLoadSongPathProps) => {
  const supabase = createSupabaseClientComponent();
  const { data } = supabase.storage.from("songs").getPublicUrl(song.song_path);

  return data.publicUrl;
};
